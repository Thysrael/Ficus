import { BrowserWindow, ipcMain } from 'electron'
import Watcher from '../filesystem/watcher'
import LinkManager from '../filesystem/linkManager'
import Preference from '../preferences'
import AppMenu from '../menu'
import FileSystem from '../filesystem'

/**
 *
 */
class App {
  constructor () {
    this.watcher = new Watcher()
    this.linkManager = new LinkManager()
    this.preferences = new Preference()
    this.menu = new AppMenu()
    this.filesystem = new FileSystem()
    this._listenForIpcMain()
  }

  init () {
    this.watcher.on('add', (filepath) => this.linkManager.addFile(filepath))
    this.watcher.on('change', (filepath) => this.linkManager.updateFile(filepath))
    this.watcher.on('unlink', (filepath) => this.linkManager.removeFile(filepath))
  }

  quit () {
    this.watcher.close()
  }

  _listenForIpcMain () {
    ipcMain.handle('newProject', async (e, data) => {
      const win = BrowserWindow.fromWebContents(e.sender)
      await this.watcher.close()
      this.linkManager.reset()
      const relation = await this.filesystem.newProject(data)
      if (relation) {
        this.watcher.watch(win, relation.path, 'dir')
      }
      return relation
    })
  }
}

export default App
