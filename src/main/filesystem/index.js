import { app, dialog } from 'electron'
import { makeFileStat } from './statistic'
import fs from 'fs-extra'
import { SearchEngine } from './search'
import path from 'path'
import { makeValidFilePath } from './fileManipulate'
import { isValidFolderPath, isValidMarkdownFilePath } from '../helper/path'

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
  }

  /**
   * 打开
   * @returns 文件夹路径
   */
  async selectFolderPathFromDialog () {
    return await dialog.showOpenDialog({
      buttonLabel: '选择',
      defaultPath: app.getPath('desktop'),
      properties: ['createDirectory', 'openDirectory']
    }).then(async ({ canceled, filePaths }) => {
      if (canceled === true) {
        return undefined
      }
      return filePaths[0]
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

  async exportForest (files) {
    if (!this.root) {
      return
    }
    const exportPath = path.resolve(this.root, 'out')
    if (!fs.pathExists(exportPath)) {
      fs.mkdirSync(exportPath)
    }
    for (const file of files) {
      const filepath = makeValidFilePath(path.resolve(exportPath, file.name))
      await fs.createFile(filepath)
      await fs.writeFile(filepath, file.content)
    }
  }

  /**
   * 给榕图的文件夹信息
   * @param {string} dirPath
   * @returns {object?} 文件夹信息对象
   */
  async makeFolderStatInGraph (dirPath) {
    const folderName = path.basename(dirPath)
    if (isValidFolderPath(dirPath) && dirPath !== this.root) {
      // 文件数组
      const subFileOrFolder = await fs.promises.readdir(dirPath)
      const fileChildren = []
      for (const subItem of subFileOrFolder) {
        const subItemPath = path.resolve(dirPath, subItem)
        if (isValidMarkdownFilePath(subItemPath)) {
          fileChildren.push(subItemPath)
        }
      }
      return {
        name: folderName,
        path: dirPath,
        children: [{
          children: fileChildren,
          handle: '转变为tag'
        }]
      }
    } else {
      return {
        name: folderName,
        path: dirPath,
        children: []
      }
    }
  }
}

export default FileSystem
