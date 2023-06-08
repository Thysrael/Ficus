import path from 'path'
import FileSystem from '../filesystem'
import LinkManager from '../filesystem/linkManager'
import { makeFolderStat } from '../filesystem/statistic'
import Watcher from '../filesystem/watcher'
import { isValidFolderPath, isValidMarkdownFilePath } from '../helper/path'

class BaseWindow {
  constructor (win, preferences) {
    this.win = win
    this.preferences = preferences
    this.filesystem = new FileSystem(this.preferences)
    this.watcher = new Watcher(this.preferences)
    this.linkManager = new LinkManager(win, this.watcher)

    this.watcher.on('add', (filepath) => this.linkManager.addFile(filepath))
    this.watcher.on('change', (filepath) => {
      this.linkManager.updateFile(filepath)
      this.win.webContents.send('file-changed', filepath)
    })
    this.watcher.on('unlink', (filepath) => this.linkManager.removeFile(filepath))
  }

  async resetWatcher () {
    await this.watcher.close()
    this.linkManager.reset()
  }

  close () {
    this.watcher.removeAllListeners()
    this.resetWatcher()
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

  async openFileOrFolder (pathname, init = false) {
    if (isValidFolderPath(pathname)) {
      this.openFolder(pathname)
    } else if (isValidMarkdownFilePath(pathname)) {
      if (init) {
        this.openFolder(path.dirname(pathname))
      }
      this.win.webContents.send('open-file-tab', pathname)
    }
  }
}

export default BaseWindow
