import electronLocalshortcut from 'electron-localshortcut'
import keybindingsDarwin from './keybindingsDarwin'
import keybindingsLinux from './keybindingsLinux'
import keybindingsWindows from './keybindingsWindows'
import { isLinux, isOsx } from '../config'

class KeyBinding {
  constructor () {
    this._keys = this._loadDefaultKeybingdings()
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
            win.webContents.send('ficus::keyboard-event', id)
          })
        }
      }
    }
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
}

export default KeyBinding
