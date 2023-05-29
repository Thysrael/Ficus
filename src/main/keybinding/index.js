import electronLocalshortcut from 'electron-localshortcut'
import keybindingsDarwin from './keybindingsDarwin'
import keybindingsLinux from './keybindingsLinux'
import keybindingsWindows from './keybindingsWindows'
import { isLinux, isOsx } from '../config'
import COMMANDS from '../../common/commands'
import { ipcMain } from 'electron'

class KeyBinding {
  constructor () {
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
  }
}

export default KeyBinding
