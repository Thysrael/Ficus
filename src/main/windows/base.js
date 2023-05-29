import FileSystem from '../filesystem'
import LinkManager from '../filesystem/linkManager'
import { makeFolderStat } from '../filesystem/statistic'
import Watcher from '../filesystem/watcher'

class BaseWindow {
  constructor (win, preferences) {
    this.win = win
    this.preferences = preferences
    this.filesystem = new FileSystem(this.preferences)
    this.watcher = new Watcher(this.preferences)
    this.linkManager = new LinkManager(win, this.watcher)

    this.watcher.on('add', (filepath) => this.linkManager.addFile(filepath))
    this.watcher.on('change', (filepath) => this.linkManager.updateFile(filepath))
    this.watcher.on('unlink', (filepath) => this.linkManager.removeFile(filepath))
  }

  async resetWatcher () {
    await this.watcher.close()
    this.linkManager.reset()
  }

  watch (pathname, type) {
    this.watcher.watch(this.win, pathname, type)
  }

  async openFolder (pathname) {
    const folderPath = pathname || await this.filesystem.selectFolderPathFromDialog()
    if (folderPath) {
      await this.resetWatcher()
      const projectStat = await makeFolderStat(folderPath,
        this.preferences.getIgnoredPaths(folderPath))
      this.filesystem.root = folderPath
      this.watcher.watch(this.win, projectStat.path, 'dir')
      this.win.webContents.send('ficus::passive-refresh', projectStat)
    }
    return folderPath
  }
}

export default BaseWindow
