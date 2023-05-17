import { Menu, app } from 'electron'
import { isOsx, isWindows } from '../config'
import { getMenuTemplates } from './templates'

class AppMenu {
  constructor () {
    this.isOsxOrWindows = isOsx || isWindows
    this.keybinding = null
  }

  init (keybinding) {
    this.keybinding = keybinding

    if (isOsx) {
      Menu.setApplicationMenu(this._buildMenu())
    }
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
}

export default AppMenu
