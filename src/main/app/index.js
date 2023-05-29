import { BrowserWindow, ipcMain } from 'electron'
import Preference from '../preferences'
import AppMenu from '../menu'
import WindowsManager from '../windows'
import KeyBinding from '../keybinding'

/**
 *
 */
class App {
  constructor () {
    this.keyBinding = new KeyBinding()
    this.preferences = new Preference()
    this.menu = new AppMenu(this.keyBinding)
    this.windowsManager = new WindowsManager(this.preferences, this.menu, this.keyBinding)
    this._listenForIpcMain()
  }

  init () {
    this.windowsManager.createWindow()
  }

  reinit () {
    this._createFicusWindow()
  }

  quit () {
    this.windowsManager.closeAll()
  }

  getFocusWin () {
    return this.windowsManager.defaultWindow
  }

  _listenForIpcMain () {
    ipcMain.on('open-folder', async (e) => {
      const win = BrowserWindow.fromWebContents(e.sender)
      const baseWindow = this.windowsManager.getBaseWindowById(win.id)
      const pathname = await baseWindow.openFolder()
      if (pathname) {
        this.menu.addRecentlyUsedDocument(pathname)
      }
    })

    ipcMain.on('open-folder-by-path', async (e, folderpath) => {
      const win = BrowserWindow.fromWebContents(e.sender)
      const baseWindow = this.windowsManager.getBaseWindowById(win.id)
      const pathname = await baseWindow.openFolder(folderpath)
      if (pathname) {
        this.menu.addRecentlyUsedDocument(pathname)
      }
    })

    ipcMain.on('new-window', async (e) => {
      this.windowsManager.createWindow()
    })
  }
}

export default App
