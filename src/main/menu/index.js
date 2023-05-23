import { Menu, app } from 'electron'
import { isOsx, isWindows } from '../config'
import { getMenuTemplates, toRawMenuTemplates } from './templates'

class AppMenu {
  constructor (keybinding) {
    this.isOsxOrWindows = isOsx || isWindows
    this.keybinding = keybinding
    if (isOsx) {
      Menu.setApplicationMenu(this._buildMenu())
    }
    this._LISTENForIpcMain()
  }

  setWindowRawMenu (win) {
    const menuTemplate = getMenuTemplates(this.keybinding)
    win.webContents.send('set-app-menu', toRawMenuTemplates(menuTemplate))
  }

  /**
     * 添加最近使用的文件（夹）路径
     * @param {string} filePath
     */
  addRecentlyUsedDocument (filePath) {
    if (this.isOsxOrWindows) {
      app.addRecentDocument(filePath)
    }
  }

  /**
     * 清除最近使用的文件路径
     */
  clearRecentlyUsedDocument () {
    if (this.isOsxOrWindows) {
      app.clearRecentDocuments()
    }
  }

  _buildMenu () {
    const menuTemplate = getMenuTemplates(this.keybinding)
    const menu = Menu.buildFromTemplate(menuTemplate)
    return menu
  }

  _LISTENForIpcMain () {}
}

export default AppMenu
