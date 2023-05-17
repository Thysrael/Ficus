import path from 'path'
import { getLinksInFile } from '../../common/parseLinks'
import fs, { readFileSync } from 'fs-extra'
import { isLeaveDirectory, isValidMarkdownFilePath } from '../helper/path'
import { ipcMain } from 'electron'
import { deleteFolder, move, makeValidFolderPath, newFolder } from '@/main/filesystem/fileManipulate'
class LinkManager {
  /**
   * 管理tag和cites
   */
  constructor () {
    this.reset()
    this._listenForIpcMain()
  }

  reset () {
    this.validFilePaths = new Set()

    this.fileToTags = new Map()
    this.tagToFiles = new Map()

    this.citingMap = new Map()
    this.citedMap = new Map()
  }

  /**
   * 根据用户输入的tag模糊匹配所有前缀相同的tag
   * 返回的对 [tag] 进行模糊匹配的结果 + 一个以 [tag] 为名称的新标签
   * @param {string} tagname tag名称
   * @returns {[string]}
   */
  findTags (tagname = '') {
    const res = [...this.tagToFiles.keys()].filter(name => name.indexOf(tagname) === 0)
    if (tagname && !res.includes(tagname)) {
      res.push(tagname)
    }
    return res
  }

  getFileTags (filepath) {
    if (this.fileToTags.has(filepath)) {
      return this.fileToTags.get(filepath)
    } else {
      console.log('Unknown File Path ' + filepath)
      return []
    }
  }

  /**
   * 获取引用信息
   * @returns {{cited: [{name: string, path: string}], citing: [{name: string, path: string}]}}
   */
  getCiteInfo (filepath) {
    let cited = []
    let citing = []
    if (this.citingMap.has(filepath)) {
      citing = this.citingMap.get(filepath)
    }
    if (this.citedMap.has(filepath)) {
      cited = this.citedMap.get(filepath)
    }
    return { citing, cited }
  }

  /**
   * 获得所有项目下links内容
   * @returns
   */
  getLinks () {
    const relations = []
    for (const [tagName, attach] of this.tagToFiles.entries()) {
      relations.push({
        tagName,
        attach
      })
    }

    const aerials = []
    for (const [citing, citeds] of this.citingMap.entries()) {
      for (const cited of citeds) {
        aerials.push({
          name: cited.name,
          sourcePath: citing,
          targetPath: cited.path
        })
      }
    }
    return { relations, aerials }
  }

  /**
   * 添加某个文件的信息
   * @param {string} filepath
   */
  addFile (filepath) {
    if (isValidMarkdownFilePath(filepath) && !this.validFilePaths.has(filepath)) {
      try {
        this.validFilePaths.add(filepath)
        const content = readFileSync(filepath).toString()
        const { aerials, tags } = getLinksInFile(content)
        this._addFileTags(filepath, tags)
        this._addFileAerials(filepath, aerials)
      } catch (e) {
        console.log(e)
      }
    }
  }

  /**
   *  将标签转成文件夹，文件夹中的文件是有此标签的全部文件
   *  @returns
   */
  async tagToFolder (tagName, targetPath) {
    if (this.tagToFiles.has(tagName)) {
      const files = this.tagToFiles.get(tagName)
      const newTarPath = makeValidFolderPath(path.resolve(targetPath, tagName))
      await newFolder(path.dirname(newTarPath), /* newTarPath.substring(newTarPath.lastIndexOf(path.sep) + 1) */ path.basename(newTarPath))
      for (const filePath of files) {
        await move(filePath, newTarPath)
      }
      return true
    } else { return false }
  }

  /**
   * 刷新某个文件的信息
   * @param {string} filepath
   */
  updateFile (filepath) {
    if (isValidMarkdownFilePath(filepath)) {
      try {
        this.removeFile(filepath)
        this.addFile(filepath)
      } catch (e) {
        console.log(e)
      }
    }
  }

  /**
   * 删除某个文件的信息
   * @param {string} filepath
   */
  removeFile (filepath) {
    if (isValidMarkdownFilePath(filepath) && this.validFilePaths.delete(filepath)) {
      this.validFilePaths.delete(filepath)
      if (this.fileToTags.has(filepath)) {
        for (const tag of this.fileToTags.get(filepath)) {
          const fileList = this.tagToFiles.get(tag)
          fileList.splice(fileList.indexOf(filepath), 1)

          if (fileList.length === 0) {
            this.tagToFiles.delete(tag)
          }
        }
      }
      this.fileToTags.delete(filepath)

      if (this.citingMap.has(filepath)) {
        for (const citedInfo of this.citingMap.get(filepath)) {
          if (this.citedMap.has(citedInfo.path)) {
            const citedList = this.citedMap.get(citedInfo.path)
            citedList.splice(citedList.indexOf({ name: citedInfo.name, path: filepath }), 1)

            if (citedList.length === 0) {
              this.citedMap.delete(citedInfo.path)
            }
          }
        }
      }
      this.citingMap.delete(filepath)
    }
  }

  /**
   * 将叶子目录转为标签，并将其中文件移到和该目录同一级后删除该目录
   * @param folderPath
   * @returns {boolean}
   */
  async folderToTag (folderPath) {
    if (isLeaveDirectory(folderPath)) {
      const subFileOrFolder = fs.readdirSync(folderPath)
      const tarPath = path.dirname(folderPath)
      const oldPaths = []
      const tagName = path.basename(folderPath)
      for (const subItem of subFileOrFolder) {
        const subItemPath = path.resolve(folderPath, subItem)
        await move(subItemPath, tarPath)
        oldPaths.push(subItemPath)
      }
      await deleteFolder(folderPath)
      const keys = this.tagToFiles.keys()
      for (const oldPath of oldPaths) {
        // 更新fileToTags
        const newPath = path.resolve(tarPath, path.basename(oldPath))
        const tagList = this.fileToTags.get(oldPath)
        this.fileToTags.delete(oldPath)
        this.fileToTags.set(newPath, tagList)
        // 更新tagToFiles
        for (const key of keys) {
          const value = this.tagToFiles.get(key)
          const idx = value.indexOf(oldPath)
          if (idx !== -1) {
            value.splice(idx, 1, newPath)
          }
        }
        // 对移动了位置的文件添加之前所在文件夹的名字的标签
        this._addFileTags(newPath, [tagName])
      }
      // 添加文件夹名的标签
    } else { return false }
  }

  /* private */
  _addFileAerials (citingPath, citeds) {
    // newCiteds 储存绝对路径后的数据
    const newCiteds = []
    for (const cited of citeds) {
      newCiteds.push({
        name: cited.name,
        path: path.resolve(path.dirname(citingPath), cited.path)
      })
    }
    this.citingMap.set(citingPath, newCiteds)
    for (const cited of newCiteds) {
      if (!this.citedMap.has(cited.path)) {
        this.citedMap.set(cited.path, [])
      }
      this.citedMap.get(cited.path).push({
        name: cited.name,
        path: citingPath
      })
    }
  }

  _addFileTags (filepath, tags) {
    this.fileToTags.set(filepath, tags)
    for (const tag of tags) {
      if (!this.tagToFiles.has(tag)) {
        this.tagToFiles.set(tag, [])
      }
      this.tagToFiles.get(tag).push(filepath)
    }
  }

  _listenForIpcMain () {
    // 测试环境下 ipcMain 为undifined
    if (ipcMain) {
      ipcMain.handle('ficus::tagToFolder', async (e, tagName, targetPath) => {
        return await this.tagToFolder(tagName, targetPath)
      })

      ipcMain.handle('ficus::getCites', async (e, filePath) => {
        return this.getCiteInfo(filePath)
      })

      ipcMain.handle('ficus::getTags', async (e, tagName) => {
        return this.findTags(tagName)
      })

      ipcMain.handle('ficus::getLinks', async (e) => {
        return this.getLinks()
      })

      ipcMain.handle('find_tags', async (e, tagName, folderPath) => {
        return this.findTags(tagName, folderPath)
      })

      ipcMain.handle('getLinksAndTags', async (e, file) => {
        return this.getLinks(file)
      })
    }
  }
}

export default LinkManager
