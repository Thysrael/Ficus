import { BrowserWindow, ipcMain } from 'electron'
import Watcher from '../filesystem/watcher'
import { initFromFolder } from '../filesystem/database'
import LinkManager from '../filesystem/linkManager'
import Preference from '../preferences'
import AppMenu from '../menu'

/**
 *
 */
class App {
  constructor () {
    this.watcher = new Watcher()
    this.linkManager = new LinkManager()
    this.preferences = new Preference()
    this.menu = new AppMenu()
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
      this.watcher.close()
      this.linkManager.reset()
      const relation = await initFromFolder(data)
      if (relation.relation.root) {
        this.watcher.watch(win, relation.relation.root.path, 'dir')
      }
      return relation
    })
  }
}

export default App
