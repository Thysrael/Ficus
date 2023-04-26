import { Menu, app } from 'electron'
import { isOsx, isWindows } from '../config'

class AppMenu {
  constructor () {
    this.isOsxOrWindows = isOsx || isWindows
    if (isOsx) {
      Menu.setApplicationMenu(null)
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
}

export default AppMenu
