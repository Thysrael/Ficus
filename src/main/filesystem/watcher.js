import chokidar from 'chokidar'
import { isOsx } from '../config'
import { isValidMarkdownFilePath } from '../helper/path'
import EventEmitter from 'events'
import { makeFolderStat } from './statistic'

class Watcher extends EventEmitter {
  constructor () {
    super()
    this.watchId = 0
    this.watchers = {}
    this.pathMap = new Map()
    this.rootPath = null
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
    const watcher = chokidar.watch(watchPath, {
      ignored: (pathname, fileInfo) => {
        if (!fileInfo) {
          return /(?:^|[/\\])(?:\..|node_modules|(?:.+\.asar))/.test(pathname)
        }

        if (/(?:^|[/\\])(?:\..|node_modules|(?:.+\.asar))/.test(pathname)) {
          return true
        }
        if (fileInfo.isDirectory()) {
          return false
        }
        return !isValidMarkdownFilePath(pathname)
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
    if (this.rootPath) {
      const info = await makeFolderStat(this.rootPath)
      win.webContents.send('ficus::passive-refresh', info)
    }
    this.emit('add', pathname)
  }

  change (win, pathname) {
    this.emit('change', pathname)
  }

  async unlink (win, pathname) {
    if (this.rootPath) {
      const info = await makeFolderStat(this.rootPath)
      win.webContents.send('ficus::passive-refresh', info)
    }
    this.emit('unlink', pathname)
  }

  async addDir (win, pathname) {
    if (this.rootPath) {
      const info = await makeFolderStat(this.rootPath)
      win.webContents.send('ficus::passive-refresh', info)
    }
    this.emit('addDir', pathname)
  }

  async unlinkDir (win, pathname) {
    if (this.rootPath) {
      const info = await makeFolderStat(this.rootPath)
      win.webContents.send('ficus::passive-refresh', info)
    }
    this.emit('unlinkDir', pathname)
  }

  /* private */
  _allocWatchId () {
    return this.watchId++
  }
}

export default Watcher
