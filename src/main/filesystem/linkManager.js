import path from 'path'
import { getLinksInFile } from '../../common/parseLinks'
import { readFileSync } from 'fs-extra'
import { isValidMarkdownFilePath } from '../helper/path'
import { ipcMain } from 'electron'

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

  findTagGroups () {
    const res = []
    for (const [tagName, attach] of this.tagToFiles.entries()) {
      const groups = []
      attach.sort()
      for (const filePath of attach) {
        const dirname = path.dirname(filePath)
        const basename = path.basename(filePath)
        if (groups.length > 0 && groups[groups.length - 1].dirname === dirname) {
          groups[groups.length - 1].files.push(basename)
        } else {
          groups.push({
            dirname,
            files: [basename]
          })
        }
      }
      res.push({
        tagName,
        groups
      })
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
