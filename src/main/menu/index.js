import { Menu, ipcMain } from 'electron'
import { isOsx, isWindows } from '../config'
import { getMenuTemplates, getSettingsMenuTemplates, toRawMenuTemplates } from './templates'
import fs from 'fs'
import path from 'path'
import { ensureDirSync } from '@/main/filesystem/fileManipulate'
import { isValidFilePath, isValidFolderPath } from '@/main/helper/path'
import { getBuiltInDocumentsPath } from './config'
import EventEmitter from 'events'
import { userDataPath } from '../environment/appPaths'

const RECENTLY_USED_DOCUMENTS_FILE_NAME = 'recently-used-documents.json'
const MAX_RECENTLY_USED_DOCUMENTS = 12
class AppMenu extends EventEmitter {
  constructor (keybinding) {
    super()
    this.isOsxOrWindows = isOsx || isWindows
    this.keybinding = keybinding
    this._userDataPath = userDataPath
    this.RECENTS_PATH = path.join(userDataPath, RECENTLY_USED_DOCUMENTS_FILE_NAME)
    this.recentlyUsedDocuments = this.getRecentlyUsedDocuments()
    if (isOsx) {
      Menu.setApplicationMenu(this._buildMenu())
    }
    this._LISTENForIpcMain()

    this.keybinding.on('set-settings-menu', () => {
      if (isOsx) {
        Menu.setApplicationMenu(this._buildSettingsMenu())
      }
    })
    this.keybinding.on('set-editor-menu', () => {
      if (isOsx) {
        Menu.setApplicationMenu(this._buildMenu())
      }
    })
  }

  getRecentlyUsedDocuments () {
    const { RECENTS_PATH } = this
    if (!isValidFilePath(RECENTS_PATH)) {
      return []
    }

    try {
      const recentDocuments = JSON.parse(fs.readFileSync(RECENTS_PATH, 'utf-8'))
        .filter(f => f && (isValidFilePath(f) || isValidFolderPath(f)))

      if (recentDocuments.length > MAX_RECENTLY_USED_DOCUMENTS) {
        recentDocuments.splice(MAX_RECENTLY_USED_DOCUMENTS, recentDocuments.length - MAX_RECENTLY_USED_DOCUMENTS)
      }
      return recentDocuments
    } catch (err) {
      return []
    }
  }

  setWindowRawMenu (win) {
    const menuTemplate = getMenuTemplates(this.keybinding, this.recentlyUsedDocuments)
    win.webContents.send('set-app-menu', toRawMenuTemplates(menuTemplate))
  }

  updateAppMenu (recentlyUsedDocuments) {
    this.recentlyUsedDocuments = recentlyUsedDocuments || this.getRecentlyUsedDocuments()
    if (isOsx) {
      Menu.setApplicationMenu(this._buildMenu())
    }
    const menuTemplate = getMenuTemplates(this.keybinding, this.recentlyUsedDocuments)
    this.emit('set-app-menu', toRawMenuTemplates(menuTemplate))
  }

  /**
     * 添加最近使用的文件（夹）路径
     * @param {string} filePath
     */
  addRecentlyUsedDocument (filePath) {
    const recentDocuments = this.getRecentlyUsedDocuments()
    const index = recentDocuments.indexOf(filePath)
    let needSave = index !== 0
    if (index > 0) {
      recentDocuments.splice(index, 1)
    }
    if (index !== 0) {
      recentDocuments.unshift(filePath)
    }

    if (recentDocuments.length > MAX_RECENTLY_USED_DOCUMENTS) {
      needSave = true
      recentDocuments.splice(MAX_RECENTLY_USED_DOCUMENTS, recentDocuments.length - MAX_RECENTLY_USED_DOCUMENTS)
    }

    this.updateAppMenu(recentDocuments)
    if (needSave) {
      ensureDirSync(this._userDataPath)
      const json = JSON.stringify(recentDocuments, null, 2)
      fs.writeFileSync(this.RECENTS_PATH, json, 'utf-8')
    }
  }

  /**
     * 清除最近使用的文件路径
     */
  clearRecentlyUsedDocument () {
    const { RECENTS_PATH } = this

    const recentDocuments = []
    this.updateAppMenu(recentDocuments)
    const json = JSON.stringify(recentDocuments, null, 2)
    ensureDirSync(this._userDataPath)
    fs.writeFileSync(RECENTS_PATH, json, 'utf-8')
  }

  _buildMenu () {
    const menuTemplate = getMenuTemplates(this.keybinding, this.recentlyUsedDocuments)
    const menu = Menu.buildFromTemplate(menuTemplate)
    return menu
  }

  _buildSettingsMenu () {
    const menuTemplate = getSettingsMenuTemplates(this.keybinding)
    const menu = Menu.buildFromTemplate(menuTemplate)
    return menu
  }

  _LISTENForIpcMain () {
    ipcMain.on('clear-recently-used-files', (e) => {
      this.clearRecentlyUsedDocument()
    })

    ipcMain.handle('get-built-in-documents-path', (e) => {
      return getBuiltInDocumentsPath()
    })
  }
}

export default AppMenu
