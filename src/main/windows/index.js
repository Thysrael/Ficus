import { BrowserWindow, ipcMain, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
import { isOsx, isDevelopment } from '../config'
import { initPath } from '../filesystem/fileManipulate'
import BaseWindow from './base'
import { makeFolderStatInGraph } from '../filesystem/statistic'

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
    this.preferences.setWindowPreferences(win)

    this.windows.push(new BaseWindow(win))
  }

  get defaultWindow () {
    return this.windows[this.activeIndex].win
  }

  closeAll () {
    for (const baseWindow of this.windows) {
      baseWindow.resetWatcher()
    }
    this.windows = []
  }

  _closeWindow (id) {
    const baseWindow = this.windows.find(({ win }) => win.id === id)
    const index = this.windows.find(({ win }) => win.id === id)
    delete this.windows[index]
    baseWindow.resetWatcher()
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
      // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      await win.loadURL('app://.de/index.html')
    }
    win.setMinimumSize(800, 600)
    win.setMenu(null)
    win.removeMenu()
    win.webContents.setWindowOpenHandler((detail) => {
      if (detail.url === undefined || detail.url.startsWith('ficus://')) {
        return { action: 'deny' }
      } else {
        shell.openExternal(detail.url)
        return { action: 'deny' }
      }
    })
    win.on('close', () => this._closeWindow(win.id))
    win.on('focus', () => {
      this.activeIndex = win.id
    })
    if (!isDevelopment && process.argv.length > 1) {
      const initInfo = initPath(process.argv[1])
      win.webContents.send('ficus::open-init-file', initInfo)
    }
    // 令窗口初始为最大
    if (this.preferences.getItem('autoFullScreen')) {
      if (isOsx) {
        win.setFullScreen(true)
      } else {
        win.maximize()
      }
    }
    return win
  }

  _listenForIpcMain () {
    ipcMain.handle('link::get-folder-stat-in-graph', async (e, dirpath) => {
      return await makeFolderStatInGraph(dirpath)
    })

    // FileSystem
    ipcMain.handle('newFileFromDialog', async (e) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return await baseWindow.filesystem.newFileFromDialog()
    })

    ipcMain.handle('search-token-globally', async (e, token) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return await baseWindow.filesystem.searchToken(token)
    })

    ipcMain.on('export-forest', (e, files) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      baseWindow.filesystem.exportForest(files)
    })

    // linkManager
    ipcMain.handle('ficus::getTags', (e, tagName) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      console.log(this.windows)
      console.log(baseWindow)
      return baseWindow.linkManager.findTags(tagName)
    })

    ipcMain.handle('ficus::getLinks', (e) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return baseWindow.linkManager.getLinks()
    })

    ipcMain.handle('find_tags', (e, tagName, folderPath) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return baseWindow.linkManager.findTags(tagName, folderPath)
    })

    ipcMain.handle('getLinksAndTags', (e, file) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return baseWindow.linkManager.getLinks(file)
    })

    ipcMain.on('link::tag-to-folder', async (e, tagname, dirPath, filepaths) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      const name = await baseWindow.linkManager.tagToFolder(tagname, dirPath, filepaths)
      baseWindow.win.send('set-focus-id-by-name', name)
    })

    ipcMain.on('link::folder-to-tag', async (e, dirPath) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      const name = await baseWindow.linkManager.folderToTag(dirPath)
      baseWindow.win.send('set-focus-id-by-name', name)
    })

    ipcMain.on('link::cite-to-tag', async (e, srcFilepath, citeFilepaths) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      const name = await baseWindow.linkManager.citeToTag(srcFilepath, citeFilepaths)
      baseWindow.win.webContents.send('set-focus-id-by-name', name)
    })

    ipcMain.handle('ficus::getCites', async (e, filePath) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return baseWindow.linkManager.getCiteInfo(filePath)
    })

    ipcMain.handle('link::get-tag-groups', async (e, tagName) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return baseWindow.linkManager.getTagGroups(tagName)
    })

    ipcMain.handle('link::get-file-cite-traverse', async (e, filepath) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return baseWindow.linkManager.getFileCiteTraverseInfo(filepath)
    })

    ipcMain.handle('link::get-files-by-tag', async (e, tagname) => {
      const baseWindow = this.getBaseWindowById(BrowserWindow.fromWebContents(e.sender).id)
      return baseWindow.linkManager.getFilesByTag(tagname)
    })
  }
}

export default WindowsManager
