import { BrowserWindow, ipcMain, shell, dialog, app } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
import { isOsx, isDevelopment } from '../config'
import BaseWindow from './base'

class WindowsManager {
  constructor (preferences, menu, keyBinding) {
    this.windows = []
    this.activeIndex = 0
    this.preferences = preferences
    this.menu = menu
    this.keyBinding = keyBinding

    this._listenForIpcMain()
    this.menu.on('set-app-menu', (menuTemplate) => {
      for (const { win } of this.windows) {
        win.webContents.send('set-app-menu', menuTemplate)
      }
    })
  }

  getBaseWindowById (id) {
    const baseWindow = this.windows.find(({ win }) => win.id === id)
    return baseWindow
  }

  async createWindow () {
    const win = await this._createWindow()
    this.keyBinding.registerKeyHandlers(win)
    this.menu.setWindowRawMenu(win)
    this.keyBinding.loadKeybindings(win)
    this.preferences.setWindowPreferences(win)
    const baseWindow = new BaseWindow(win, this.preferences)
    this.windows.push(baseWindow)
    if (isDevelopment) {
      const demoPath = path.resolve(__dirname, '..', 'demo', 'index.md')
      baseWindow.openFileOrFolder(demoPath, true)
    } else if (process.argv.length > 1) {
      baseWindow.openFileOrFolder(process.argv[1], true)
    }
  }

  get defaultWindow () {
    return this.windows[this.activeIndex].win
  }

  closeAll () {
    for (const baseWindow of this.windows) {
      baseWindow.close()
    }
    this.windows = []
  }

  _closeWindow (id) {
    const index = this.windows.findIndex(({ win }) => win.id === id)
    if (index !== -1) {
      const baseWindow = this.windows[index]
      baseWindow.close()
      this.windows.splice(index, 1)

      if (!isOsx && this.windows.length === 0) {
        app.quit()
      }
    }
  }

  async _createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      titleBarStyle: 'hiddenInset',
      trafficLightPosition: { x: 5, y: 11 },
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
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      await win.loadURL('app://.de/index.html')
    }
    win.setMinimumSize(800, 600)
    win.setMenu(null)
    win.removeMenu()
    // 令窗口初始为最大
    if (this.preferences.getItem('autoFullScreen')) {
      if (isOsx) {
        win.setFullScreen(true)
      } else {
        win.maximize()
      }
    }
    win.webContents.setWindowOpenHandler((detail) => {
      if (detail.url === undefined || detail.url.startsWith('ficus://')) {
        return { action: 'deny' }
      } else {
        shell.openExternal(detail.url)
        return { action: 'deny' }
      }
    })
    win.on('close', (event) => {
      this._closeWindow(win.id)
    })
    win.on('focus', () => {
      this.activeIndex = win.id
    })

    win.webContents.once('render-process-gone', async (event, { reason }) => {
      if (reason === 'clean-exit') {
        return
      }

      if (reason === 'abnormal-exit') {
        return
      }

      const msg = `The renderer process has crashed unexpected or is killed (${reason}).`
      const { response } = await dialog.showMessageBox(win, {
        type: 'warning',
        buttons: ['关闭', '等待'],
        message: 'Ficus has crashed',
        detail: msg
      })

      if (win.id) {
        switch (response) {
          case 0:
            return this._closeWindow(win.id)
        }
      }
    })
    return win
  }

  _listenForIpcMain () {
    ipcMain.handle('link::get-folder-stat-in-graph', async (e, dirpath) => {
      const { filesystem } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return await filesystem.makeFolderStatInGraph(dirpath)
    })

    // FileSystem
    ipcMain.handle('newFileFromDialog', async (e) => {
      const { filesystem } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return await filesystem.newFileFromDialog()
    })

    ipcMain.handle('search-token-globally', async (e, token) => {
      const { filesystem } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return await filesystem.searchToken(token)
    })

    ipcMain.on('export-forest', (e, files, exportPath) => {
      const { filesystem } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      filesystem.exportForest(files, exportPath)
    })

    // linkManager
    ipcMain.handle('ficus::getTags', (e, tagName) => {
      const { linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return linkManager.findTags(tagName)
    })

    ipcMain.handle('ficus::getLinks', (e) => {
      const { linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return linkManager.getLinks()
    })

    ipcMain.handle('find_tags', (e, tagName, folderPath) => {
      const { linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return linkManager.findTags(tagName, folderPath)
    })

    ipcMain.handle('getLinksAndTags', (e, file) => {
      const { linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return linkManager.getLinks(file)
    })

    ipcMain.on('link::tag-to-folder', async (e, tagname, dirPath, filepaths) => {
      const { win, linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      const name = await linkManager.tagToFolder(tagname, dirPath, filepaths)
      win.send('set-focus-id-by-name', name)
    })

    ipcMain.on('link::folder-to-tag', async (e, dirPath) => {
      const { win, linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      const name = await linkManager.folderToTag(dirPath)
      win.send('set-focus-id-by-name', name)
    })

    ipcMain.on('link::cite-to-tag', async (e, srcFilepath, citeFilepaths) => {
      const { win, linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      const name = await linkManager.citeToTag(srcFilepath, citeFilepaths)
      win.webContents.send('set-focus-id-by-name', name)
    })

    ipcMain.handle('ficus::getCites', async (e, filePath) => {
      const { linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return linkManager.getCiteInfo(filePath)
    })

    ipcMain.handle('link::get-tag-groups', async (e, tagName) => {
      const { linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return linkManager.getTagGroups(tagName)
    })

    ipcMain.handle('link::get-file-cite-traverse', async (e, filepath) => {
      const { linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return linkManager.getFileCiteTraverseInfo(filepath)
    })

    ipcMain.handle('link::get-files-by-tag', async (e, tagname) => {
      const { linkManager } = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return linkManager.getFilesByTag(tagname)
    })
  }
}

export default WindowsManager
