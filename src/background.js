'use strict'

import { app, BrowserWindow, ipcMain, protocol, dialog, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import {
  deleteFile, deleteFolder,
  getFileFromUser,
  getFolderFromUser, linkToFile, newFileFromDialog,
  newFileFromSidebar, newFolderFromDialog, newFolderFromSidebar, renameFileOrFolder,
  saveFile,
  saveToTarget,
  saveToPDFTarget,
  readFile, paste, move
} from './main/filesystem/fileManipulate'
import {
  addTag2File,
  deleteTag,
  findTags, getCiteInfo,
  getLinks,
  initFromFolder,
  refresh,
  sendTags
} from '@/main/filesystem/database'
import EAU from './main/update'

import path from 'path'
import * as url from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'
const isOSx = process.platform === 'darwin'
let ficusPath = ''

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://.de/index.html')
  }
  win.setMinimumSize(800, 600)
  win.setMenu(null)
  win.removeMenu()
  return win
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  } else {
    EAU.init({
      api: 'https://ficus.world/update/version.json',
      server: false,
      formatRes: function (res) { return res }
    })

    EAU.check(function (error, last, body) {
      if (error) {
        if (error === 'no_update_available') { return false }
        dialog.showErrorBox('info', error + last + body)
        return false
      }

      EAU.progress(function (state) {
      })

      dialog.showMessageBoxSync(win, {
        type: 'warning',
        title: '更新提醒',
        buttons: ['确定'],
        message: '发现软件更新，软件需要自动重启',
        defaultId: 0,
        cancelId: 1
      })

      EAU.download(function (error) {
        if (error) {
          dialog.showErrorBox('info', error)
          return false
        }
        if (process.platform === 'darwin') {
          app.relaunch()
          app.quit()
        } else {
          app.quit()
        }
      })
    })
  }

  ipcMain.handle('exportPDF', async (event, html) => {
    const printWin = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    })

    printWin.loadURL('data:text/html;charset=UTF-8,' + encodeURIComponent(html))

    const options = {
      marginsType: 0,
      pageSize: 'A4',
      printBackground: true,
      printSelectionOnly: false,
      landscape: false
    }

    printWin.webContents.on('did-finish-load', async () => {
      try {
        const pdf = await printWin.webContents.printToPDF(options)
        saveToPDFTarget(pdf)
      } catch (error) {
        console.log(error)
      }
    })
  })

  protocol.registerFileProtocol('ficus', (request, callback) => {
    try {
      let generalPath = request.url.slice('ficus://'.length)
      generalPath = path.resolve(ficusPath, generalPath)
      const filePath = url.fileURLToPath('file://' + generalPath)
      callback(filePath)
    } catch (error) {
      console.log(error)
    }
  })

  ipcMain.handle('changePath', (e, tarPath) => {
    ficusPath = path.dirname(tarPath)
  })

  ipcMain.handle('ficus::move', async (e, srcPath, destDir) => {
    move(srcPath, destDir)
  })

  ipcMain.handle('paste', async (e, userSelect, tarPath, projPath) => {
    await paste(userSelect, tarPath, projPath)
    // const win = BrowserWindow.fromWebContents(e.sender)
    // win.webContents.send('refreshTree', newChildren)
  })

  ipcMain.handle('readFile', (e, filePath) => {
    const content = readFile(filePath)
    return content
  })

  ipcMain.handle('getPathSep', (e) => {
    return path.sep
  })

  ipcMain.handle('getLinksAndTags', async (e, file) => {
    return await getLinks(file)
  })

  ipcMain.handle('ficus::getCites', async (e, filePath) => {
    return getCiteInfo(filePath)
  })

  ipcMain.handle('ficus::getTags', async (e, tagName) => {
    return findTags(tagName)
  })

  ipcMain.handle('ficus::getLinks', async (e) => {
    return getLinks()
  })

  ipcMain.handle('refresh', async (e, projPath) => {
    return await refresh(projPath)
  })

  ipcMain.handle('sendTags', async (e, projPath) => {
    const tags = await sendTags(projPath)
    return tags
  })

  ipcMain.handle('linkToFile', async (e, filePath) => {
    const file = await linkToFile(filePath)
    return file
  })
  ipcMain.handle('deleteFile', (e, filePath) => {
    deleteFile(filePath)
  })
  ipcMain.handle('deleteFolder', async (e, folderPath) => {
    await deleteFolder(folderPath)
  })
  ipcMain.handle('renameFileOrFolder', async (e, newPath, oldPath) => {
    await renameFileOrFolder(newPath, oldPath)
  })

  ipcMain.handle('newFileFromSidebar', async (e, filePath, fileName) => {
    await newFileFromSidebar(filePath, fileName)
  })

  ipcMain.handle('newFolderFromSidebar', (e, filePath, fileName) => {
    newFolderFromSidebar(filePath, fileName)
  })

  ipcMain.handle('newFileFromDialog', async (e, projPath) => {
    const tree = await newFileFromDialog(projPath)
    // console.log(fileObjs)
    return tree
  })

  ipcMain.handle('newFolderFromDialog', async (e, projPath) => {
    const tree = await newFolderFromDialog(projPath)
    // console.log(fileObjs)
    return tree
  })

  ipcMain.handle('delete_tag', async (e, filePath, tagName, folderPath) => {
    deleteTag(tagName, folderPath, filePath)
  })

  ipcMain.handle('find_tags', async (e, tagName, folderPath) => {
    const tags = await findTags(tagName, folderPath)
    // console.log(fileObjs)
    return tags
  })

  ipcMain.handle('addTagToFile', async (e, filePath, tagName, isNewTag, folderPath) => {
    addTag2File(filePath, tagName, isNewTag, folderPath)
  })

  ipcMain.handle('newProject', async (e, data) => {
    const relation = await initFromFolder(data)
    return relation
  })
  ipcMain.handle('dialog:openFile', async (e) => {
    const fileObjs = await getFileFromUser()
    // console.log(fileObjs)
    return fileObjs
  })
  ipcMain.handle('dialog:openFolder', async (e) => {
    const folderObj = await getFolderFromUser()
    console.log(folderObj.children.children[0])
    console.log(folderObj.absolutePath)
    ficusPath = folderObj.absolutePath
    return folderObj
  })
  ipcMain.handle('save_file', (e, path, content) => {
    saveFile(path, content)
  })
  ipcMain.handle('saveToTarget', (e, content, projPath) => {
    saveToTarget(content, projPath)
  })
  const win = await createWindow()
  ipcMain.handle('window-min', () => {
    win.minimize()
  })
  ipcMain.handle('window-max', () => {
    if (isOSx) {
      if (win.isFullScreen()) {
        win.setFullScreen(false)
      } else {
        win.setFullScreen(true)
      }
    } else {
      if (win.isMaximized()) {
        win.restore()
      } else {
        win.maximize()
      }
    }
  })
  ipcMain.handle('window-close', () => {
    win.close()
  })
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// FIXME: 暂时关闭应用菜单
Menu.setApplicationMenu(null)
