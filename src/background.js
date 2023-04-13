'use strict'

import { app, BrowserWindow, ipcMain, protocol } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { getFileFromUser, getFolderFromUser, saveFile, saveToTarget } from './main/filesystem/fileManipulate'
// import { initFromEmptyFolder } from './main/filesystem/database'
import { initFromEmptyFolder } from '@/main/filesystem/database'
import path from 'path'
// const { initFromEmptyFolder } = require('./main/filesystem/database')
const isDevelopment = process.env.NODE_ENV !== 'production'
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../src/main/filesystem/preload.js'),
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

  win.removeMenu()
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
  }
  ipcMain.handle('newProject', async (e, data) => {
    const relation = await initFromEmptyFolder(data)
    console.log(relation)
    return relation
  })
  ipcMain.handle('dialog:openFile', async (e) => {
    const fileObjs = await getFileFromUser()
    // console.log(fileObjs)
    return fileObjs
  })
  ipcMain.handle('dialog:openFolder', async (e) => {
    const folderObj = await getFolderFromUser()
    // console.log(folderObj.children.children[0])
    // console.log(folderObj)
    return folderObj
  })
  ipcMain.handle('save_file', (e, path, content) => {
    saveFile(path, content)
  })
  ipcMain.handle('saveToTarget', (e, content) => {
    saveToTarget(content)
  })
  createWindow()
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
