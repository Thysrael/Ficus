import { BrowserWindow, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
import { isOsx, isDevelopment } from '../config'
import { initPath } from '../filesystem/fileManipulate'

class FicusWindow {
  constructor() {
    this.browserWindow = null
  }

  async init (keyBinding, menu) {
    this.browserWindow = await this._createWindow()
    keyBinding.registerKeyHandlers(this.browserWindow)
    menu.setWindowRawMenu(this.browserWindow)
  }

  async _createWindow() {
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
    if (!isDevelopment && process.argv.length > 1) {
      const initInfo = initPath(process.argv[1])
      win.webContents.send('ficus::open-init-file', initInfo)
    }
    // 令窗口初始为最大
    if (isOsx) {
      win.setFullScreen(true)
    } else {
      win.maximize()
    }
    return win
  }
}

export default FicusWindow
