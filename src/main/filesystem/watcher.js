import chokidar from 'chokidar'
import { isOsx } from '../config'

function add (pathname, type = 'file') {
  console.log(`${type} ${pathname} has been added`)
}

function change (pathname, type = 'file') {
  console.log(`${type} ${pathname} has been changed`)
}

function unlink (pathname, type = 'file') {
  console.log(`${type} ${pathname} has been removed`)
}

function addDir (pathname) {
  console.log(`Directory ${pathname} has been removed`)
}

function unlinkDir (pathname) {
  console.log(`Directory ${pathname} has been removed`)
}

class Watcher {
  constructor () {
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
      ignoreInitial: true, // 忽略文件第一次被添加触发add事件
      persistent: true,

      depth,

      usePolling
    })

    watcher
      .on('add', pathname => add(pathname, type))
      .on('change', pathname => change(pathname, type))
      .on('unlink', pathname => unlink(pathname, type))
      .on('error', error => console.log(`Watcher error: ${error}`))
    if (type !== 'file') {
      watcher
        .on('addDir', pathname => addDir(pathname))
        .on('unlinkDir', pathname => unlinkDir(pathname))
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
    for (const watcher of this.watchers.values()) {
      watcher.close()
    }
    this.watchId = 0
    this.watchers = {}
  }

  _allocWatchId () {
    return this.watchId++
  }
}

export default Watcher
