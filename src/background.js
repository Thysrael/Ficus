'use strict'

import { app, BrowserWindow, ipcMain, protocol, dialog, shell } from 'electron'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import {
  deleteFile, deleteFolder,
  getFileFromUser,
  linkToFile,
  newFileFromSidebar, newFolder, renameFileOrFolder,
  saveFile,
  saveToTarget,
  saveToPDFTarget,
  readFile, paste, refresh, makePathCompletion
} from './main/filesystem/fileManipulate'
import EAU from './main/update'

import path from 'path'
import * as url from 'url'
import { isOsx, isWindows } from './main/config'
import App from './main/app'
import express from 'express'

const uploadApp = express()
uploadApp.use(express.urlencoded({ extended: true }))
uploadApp.use(express.json())

uploadApp.post('/upload', (req, res) => {
  console.log()
  res.send({
    msg: '',
    code: 0,
    data: {
      succMap: req.query
    }
  })
})

const instanceUploadApp = uploadApp.listen(0)

const ficusApp = new App()

const isDevelopment = process.env.NODE_ENV !== 'production'
let ficusPath = ''

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!isOsx) {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) ficusApp.reinit()
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

      EAU.progress((state) => { })

      dialog.showMessageBoxSync(ficusApp.getFocusWin(), {
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
        if (isOsx) {
          app.relaunch()
        }
        app.quit()
      })
    })
  }

  ipcMain.handle('exportPDF', async (event, html) => {
    const printWin = new BrowserWindow({
      enableLargerThanScreen: true,
      enablePreferredSizeMode: true,
      width: 65536,
      height: 65536,
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
      landscape: false,
      fitToPageEnabled: true
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

  protocol.registerHttpProtocol('http', (request, callback) => {
    let newReq = { url: request.url }
    if (newReq.url.startsWith('http://ficus.world/local_api/upload')) {
      const jsonData = {}
      for (const fileInfo of request.uploadData) {
        if (fileInfo.type === 'file') {
          jsonData[fileInfo.file] = 'ficus://' + fileInfo.filePath
        }
      }
      newReq.url = 'http://localhost:' + instanceUploadApp.address().port + '/upload?' + new URLSearchParams(jsonData)
    } else {
      newReq = request
    }
    callback(newReq)
  })

  ipcMain.handle('changePath', (e, tarPath) => {
    ficusPath = path.dirname(tarPath)
  })

  ipcMain.handle('paste', async (e, userSelect, tarPath) => {
    await paste(userSelect, tarPath)
  })

  ipcMain.handle('readFile', (e, filePath) => {
    const content = readFile(filePath)
    return content
  })

  ipcMain.handle('getPathSep', (e) => {
    return path.sep
  })

  ipcMain.handle('refresh', async (e, projPath) => {
    return await refresh(projPath)
  })

  ipcMain.handle('linkToFile', async (e, filePath, citingPath) => {
    return await linkToFile(filePath, citingPath)
  })
  ipcMain.on('deleteFile', (e, filePath) => {
    deleteFile(filePath)
  })
  ipcMain.on('deleteFolder', (e, folderPath) => {
    deleteFolder(folderPath)
  })
  ipcMain.on('renameFileOrFolder', (e, newPath, oldPath) => {
    renameFileOrFolder(newPath, oldPath)
  })
  ipcMain.on('newFileFromSidebar', (e, filePath, fileName) => {
    newFileFromSidebar(filePath, fileName)
  })
  ipcMain.on('newFolderFromSidebar', (e, filePath, fileName) => {
    newFolder(filePath, fileName)
  })
  ipcMain.handle('autoPathCompletion', (e, partialPath) => {
    return makePathCompletion(partialPath)
  })

  ipcMain.handle('dialog:openFile', async (e) => {
    const fileObjs = getFileFromUser()
    return fileObjs
  })
  ipcMain.on('save-file', (e, path, content) => {
    saveFile(path, content)
  })
  ipcMain.on('save-as', (e, content, projPath) => {
    saveToTarget(content, projPath)
  })

  ipcMain.handle('main::about', () => {
    shell.openExternal('https://ficus.world/')
  })
  /* window */
  ipcMain.on('window-min', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    if (isOsx && win.isFullScreen()) {
      win.setFullScreen(false)
    }
    win.minimize()
  })
  ipcMain.on('window-max', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    if (isOsx) {
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
  ipcMain.on('window-close', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    win.close()
  })
  ipcMain.on('dev-open', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    win.webContents.openDevTools()
  })
  ipcMain.on('dev-close', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    win.webContents.closeDevTools()
  })

  ficusApp.init()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (isWindows) {
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
