import { BrowserWindow, ipcMain } from 'electron'
import Watcher from '../filesystem/watcher'
import LinkManager from '../filesystem/linkManager'
import Preference from '../preferences'
import AppMenu from '../menu'
import FileSystem from '../filesystem'
import FicusWindow from '../windows'
import KeyBinding from '../keybinding'
import { makeFolderStat } from '../filesystem/statistic'

/**
 *
 */
class App {
  constructor () {
    this.watcher = new Watcher()
    this.keyBinding = new KeyBinding()
    this.ficusWindow = new FicusWindow()
    this.menu = new AppMenu(this.ficusWindow, this.keyBinding)
    this.filesystem = new FileSystem(this.menu)
    this.preferences = new Preference(this.ficusWindow)
    this.linkManager = new LinkManager(this.ficusWindow, this.watcher)
    this._listenForIpcMain()
  }

  async init () {
    this.watcher.on('add', (filepath) => this.linkManager.addFile(filepath))
    this.watcher.on('change', (filepath) => this.linkManager.updateFile(filepath))
    this.watcher.on('unlink', (filepath) => this.linkManager.removeFile(filepath))

    await this.ficusWindow.init(this.keyBinding, this.menu)
    this.preferences.init()
  }

  reinit () {
    this._createFicusWindow()
  }

  quit () {
    this.watcher.close()
  }

  getFocusWin () {
    return this.ficusWindow.defaultWindow
  }

  _listenForIpcMain () {
    ipcMain.on('open-folder', async (e) => {
      const win = BrowserWindow.fromWebContents(e.sender)
      await this.watcher.close()
      this.linkManager.reset()
      const projectStat = await this.filesystem.newProject()
      if (projectStat) {
        this.menu.addRecentlyUsedDocument(projectStat.path)
        this.watcher.watch(win, projectStat.path, 'dir')
        win.webContents.send('ficus::passive-refresh', projectStat)
      }
    })

    ipcMain.on('open-folder-by-path', async (e, folderpath) => {
      const win = BrowserWindow.fromWebContents(e.sender)
      await this.watcher.close()
      this.linkManager.reset()
      const projectStat = await makeFolderStat(folderpath)
      if (projectStat) {
        this.menu.addRecentlyUsedDocument(projectStat.path)
        this.watcher.watch(win, projectStat.path, 'dir')
        win.webContents.send('ficus::passive-refresh', projectStat)
      }
    })
  }
}

export default App
