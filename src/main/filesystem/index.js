import { app, dialog, ipcMain } from 'electron'
import { makeFileStat, makeFolderStat, makeFolderStatInGraph } from './statistic'
import fs from 'fs-extra'
import { SearchEngine } from './search'

/**
 * 用于 showOpenDialog
 * 指定应用程序应该能够打开那些类型的文件
 */
const markdownFilters = [
  { name: 'Markdown Files', extensions: ['md', 'markdown'] }
]

class FileSystem {
  constructor () {
    this.root = undefined
    this._LISTENForIpcMain()
  }

  /**
   * 新建项目
   * @returns 项目信息
   */
  async newProject () {
    return await dialog.showOpenDialog({
      buttonLabel: '选择',
      defaultPath: app.getPath('desktop'),
      properties: ['createDirectory', 'openDirectory']
    }).then(async (result) => {
      if (result.canceled === true) {
        return null
      }
      this.root = result.filePaths[0]

      const projectStat = await makeFolderStat(result.filePaths[0])
      return projectStat
    })
  }

  async newFileFromDialog () {
    return await dialog.showSaveDialog({
      buttonLabel: '新建',
      defaultPath: this.root || app.getPath('desktop'),
      properties: ['showHiddenFiles'],
      filters: markdownFilters
    }).then(async (result) => {
      if (result.canceled === true) {
        return []
      }

      fs.createFileSync(result.filePath)
      const file = makeFileStat(result.filePath)
      return [file]
    })
  }

  async searchToken (token) {
    if (!this.root) {
      return []
    }
    const searchEngine = new SearchEngine(this.root)
    await searchEngine.search(token)
    return searchEngine.results
  }

  _LISTENForIpcMain () {
    ipcMain.handle('newFileFromDialog', async (e) => {
      return await this.newFileFromDialog()
    })

    ipcMain.handle('link::get-folder-stat-in-graph', async (e, dirpath) => {
      return await makeFolderStatInGraph(dirpath)
    })

    ipcMain.handle('search-token-globally', async (e, token) => {
      return await this.searchToken(token)
    })
  }
}

export default FileSystem
