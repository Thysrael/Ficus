import chokidar from 'chokidar'
import { isOsx } from '../config'
import { isValidMarkdownFilePath } from '../helper/path'
import EventEmitter from 'events'

class Watcher extends EventEmitter {
  constructor () {
    super()
    this.watchId = 0
    this.watchers = {}
    this.pathMap = new Map()
  }

  /**
     * 监控某个文件/文件夹的变化
     * @param {string} watchPath
     * @param {'file' | 'dir'} type
     */
  watch (watchPath, type = 'file') {
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
      .on('add', pathname => this.add(pathname))
      .on('change', pathname => this.change(pathname))
      .on('unlink', pathname => this.unlink(pathname))
      .on('error', error => console.log(`Watcher error: ${error}`))
      .on('ready', () => this.ready())
    if (type !== 'file') {
      watcher
        .on('addDir', pathname => this.addDir(pathname))
        .on('unlinkDir', pathname => this.unlinkDir(pathname))
    }
  }

  unwatch (watchPath) {
    if (this.pathMap.has(watchPath)) {
      const watcherId = this.pathMap.get(watchPath)
      this.watchers[watcherId].close()
      delete this.watchers[watcherId]
      this.pathMap.delete(watchPath)
    }
  }

  close () {
    for (const watcher of Object.values(this.watchers)) {
      watcher.close()
    }

    this.watchId = 0
    this.watchers = {}
  }

  /* private */
  /* 处理监听事件 */
  add (pathname) {
    console.log(`file ${pathname} has been added`)
    this.emit('add', pathname)
  }

  change (pathname) {
    console.log(`file ${pathname} has been changed`)
    this.emit('change', pathname)
  }

  unlink (pathname) {
    console.log(`file ${pathname} has been removed`)
    this.emit('unlink', pathname)
  }

  addDir (pathname) {
    console.log(`Directory ${pathname} has been removed`)
    this.emit('addDir', pathname)
  }

  unlinkDir (pathname) {
    console.log(`Directory ${pathname} has been removed`)
    this.emit('unlinkDir', pathname)
  }

  ready () {
    console.log('ready')
    this.emit('ready')
  }

  /* private */
  _allocWatchId () {
    return this.watchId++
  }
}

export default Watcher
