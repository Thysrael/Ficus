import path from 'path'
import fs from 'fs-extra'
import { isValidFolderPath, isValidMarkdownFilePath } from '../helper/path'

export class SearchEngine {
  constructor (dirPath) {
    this.files = []
    this.results = []
    this._getFilePaths(dirPath)
  }

  async search (token) {
    for (const filepath of this.files) {
      const content = await fs.promises.readFile(filepath)
      if (content.toString().indexOf(token) !== -1) {
        this.results.push(filepath)
      }
    }
  }

  _getFilePaths (dirPath) {
    const subFileOrFolder = fs.readdirSync(dirPath)
    for (const subItem of subFileOrFolder) {
      const subItemPath = path.resolve(dirPath, subItem)
      if (isValidFolderPath(subItemPath)) {
        this._getFilePaths(subItemPath)
      } else if (isValidMarkdownFilePath(subItemPath)) {
        this.files.push(subItemPath)
      }
    }
  }
}
