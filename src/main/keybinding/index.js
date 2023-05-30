import electronLocalshortcut from 'electron-localshortcut'
import keybindingsDarwin from './keybindingsDarwin'
import keybindingsLinux from './keybindingsLinux'
import keybindingsWindows from './keybindingsWindows'
import { isLinux, isOsx } from '../config'
import COMMANDS from '../../common/commands'
import { BrowserWindow, ipcMain } from 'electron'
import EventEmitter from 'events'

const _normalizeAccelerator = accelerator => {
  return accelerator.toLowerCase()
    .replace('commandorcontrol', isOsx ? 'cmd' : 'ctrl')
    .replace('cmdorctrl', isOsx ? 'cmd' : 'ctrl')
    .replace('control', 'ctrl')
    .replace('meta', 'cmd') // meta := cmd (macOS only) or super
    .replace('command', 'cmd')
    .replace('option', 'alt')
}

const isEqualAccelerator = (a, b) => {
  a = _normalizeAccelerator(a)
  b = _normalizeAccelerator(b)
  const i1 = a.indexOf('+')
  const i2 = b.indexOf('+')
  if (i1 === -1 && i2 === -1) {
    return a === b
  } else if (i1 === -1 || i2 === -1) {
    return false
  }

  const partsA = a.split('+')
  const partsB = b.split('+')
  if (partsA.length !== partsB.length) {
    return false
  }

  const intersection = new Set([...partsA, ...partsB])
  return intersection.size === partsB.length
}
class KeyBinding extends EventEmitter {
  constructor () {
    super()
    const defaultKeybinding = this._loadDefaultKeybingdings()
    this._keys = defaultKeybinding
    for (const id of defaultKeybinding.keys()) {
      if (Object.values(COMMANDS).indexOf(id) === -1) {
        this._keys.delete(id)
      }
    }
    this._listenForIpcMain()
  }

  getAccelerator (id) {
    const accelerator = this._keys.get(id)
    if (!accelerator) {
      return null
    }
    return accelerator
  }

  registerKeyHandlers (win) {
    // macOS上菜单栏也会触发一次事件
    if (!isOsx) {
      for (const [id, accelerator] of this._keys) {
        if (accelerator && accelerator.length > 1) {
          electronLocalshortcut.register(win, accelerator, () => {
            win.webContents.send('ficus::keyboard-event', { id })
          })
        }
      }
    }
  }

  getKeybindingsMap () {
    return this._keys
  }

  disableAll () {
    if (isOsx) {
      this.emit('set-settings-menu')
    } else {
      electronLocalshortcut.unregisterAll()
    }
  }

  enableAll (win) {
    if (isOsx) {
      this.emit('set-editor-menu')
    } else {
      this.registerKeyHandlers(win)
    }
  }

  loadKeybindings (win) {
    // TODO: merge registerKeyHandlers?
    win.webContents.send('load-keybindings-map', this._keys)
  }

  update (win, id, accelerator) {
    if (accelerator) {
      for (const [key, value] of this._keys) {
        if (key !== id && isEqualAccelerator(value, accelerator)) {
          this._keys.set(key, '')
        }
      }
    }
    this._keys.set(id, accelerator)
    this.loadKeybindings(win)
  }

  /**
   * FIXME: 请同步修改下面三个对象以实现快捷键
   * @returns {object}
   */
  _loadDefaultKeybingdings () {
    if (isOsx) {
      return keybindingsDarwin
    } else if (isLinux) {
      return keybindingsLinux
    } else {
      return keybindingsWindows
    }
  }

  _listenForIpcMain () {
    ipcMain.handle('get-keybindings-map', (e) => {
      return this._keys
    })

    ipcMain.on('disable-all-keybindings', (e) => {
      this.disableAll()
    })

    ipcMain.on('enable-all-keybindings', (e) => {
      const win = BrowserWindow.fromWebContents(e.sender)
      this.enableAll(win)
    })

    ipcMain.on('set-keybinding-item', (e, { id, accelerator }) => {
      const win = BrowserWindow.fromWebContents(e.sender)
      this.update(win, id, accelerator)
    })
  }
}

export default KeyBinding
