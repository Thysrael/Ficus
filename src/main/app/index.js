import { ipcMain } from 'electron'
import Watcher from '../filesystem/watcher'
import { initFromFolder } from '../filesystem/database'
import LinkManager from '../filesystem/linkManager'
import Preference from '../preferences'

/**
 *
 */
class App {
  constructor () {
    this.watcher = new Watcher()
    this.linkManager = new LinkManager()
    this.preferences = new Preference()
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
      this.watcher.close()
      this.linkManager.reset()
      const relation = await initFromFolder(data)
      this.watcher.watch(relation.relation.root.path, 'dir')
      return relation
    })
  }
}

export default App
