import chokidar from 'chokidar'
import { isOsx } from '../config'
import { isValidImageFilePath, isValidMarkdownFilePath, matchPathPattern } from '../helper/path'
import EventEmitter from 'events'
import { makeFolderStat } from './statistic'

const refreshDelay = 200
class Watcher extends EventEmitter {
  constructor (preferences) {
    super()
    this.preferences = preferences
    this.watchId = 0
    this.watchers = {}
    this.pathMap = new Map()
    this.rootPath = null

    this.lastRecorded = 0

    this.enableRefresh = true
  }

  /**
     * 监控某个文件/文件夹的变化
     * @param {string} watchPath
     * @param {'file' | 'dir'} type
     */
  watch (win, watchPath, type = 'file') {
    // Chokidar: https://github.com/paulmillr/chokidar
    const usePolling = isOsx // macOS上不使用轮询方式无法检测目录级别变化
    // Just to be sure when a file is replaced with a directory don't watch recursively.
    const depth = (type === 'file' ? (isOsx ? 1 : 0) : undefined)
    const ignoredPatterns = this.preferences.getIgnoredPaths(watchPath)
    const watcher = chokidar.watch(watchPath, {
      ignored: (pathname, fileInfo) => {
        if (!fileInfo) {
          return matchPathPattern(pathname, ignoredPatterns)
        }

        if (matchPathPattern(pathname, ignoredPatterns)) {
          return true
        }
        if (fileInfo.isDirectory()) {
          return false
        }
        return !(isValidMarkdownFilePath(pathname) || isValidImageFilePath(pathname))
      },
      ignoreInitial: type === 'file', // 忽略文件第一次被添加触发add事件
      persistent: true,

      depth,

      usePolling
    })

    watcher
      .on('add', pathname => this.add(win, pathname))
      .on('change', pathname => this.change(win, pathname))
      .on('unlink', pathname => this.unlink(win, pathname))
      .on('error', error => console.log(`Watcher error: ${error}`))
      .on('ready', () => {
        if (type === 'dir') {
          this.rootPath = watchPath
        }
      })
    if (type !== 'file') {
      watcher
        .on('addDir', pathname => this.addDir(win, pathname))
        .on('unlinkDir', pathname => this.unlinkDir(win, pathname))
    }
  }

  unwatch (watchPath) {
    this.rootPath = null
    if (this.pathMap.has(watchPath)) {
      const watcherId = this.pathMap.get(watchPath)
      this.watchers[watcherId].close()
      delete this.watchers[watcherId]
      this.pathMap.delete(watchPath)
    }
  }

  async close () {
    this.rootPath = null
    for (const watcher of Object.values(this.watchers)) {
      await watcher.close()
    }

    this.watchId = 0
    this.watchers = {}
  }

  /* private */
  /* 处理监听事件 */
  async add (win, pathname) {
    if (this.rootPath && this.enableRefresh) {
      this.refresh(win)
    }
    this.emit('add', pathname)
  }

  change (win, pathname) {
    this.emit('change', pathname)
  }

  async unlink (win, pathname) {
    if (this.rootPath && this.enableRefresh) {
      this.refresh(win)
    }
    this.emit('unlink', pathname)
  }

  async addDir (win, pathname) {
    if (this.rootPath && this.enableRefresh) {
      this.refresh(win)
    }
    this.emit('addDir', pathname)
  }

  async unlinkDir (win, pathname) {
    if (this.rootPath && this.enableRefresh) {
      this.refresh(win)
    }
    this.emit('unlinkDir', pathname)
  }

  async refresh (win) {
    const timestamp = Date.now()
    if (this.lastRecorded + refreshDelay >= timestamp) {
      return
    }
    this.lastRecorded = Date.now()
    setTimeout(async () => {
      const info = await makeFolderStat(this.rootPath,
        this.preferences.getIgnoredPaths(this.rootPath))
      win.webContents.send('ficus::passive-refresh', info)
    }, refreshDelay)
  }

  /* private */
  _allocWatchId () {
    return this.watchId++
  }
}

export default Watcher
