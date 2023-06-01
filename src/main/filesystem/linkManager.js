import path from 'path'
import { addTagToDoc, getLinksInFile, removeTagFromDoc } from '../../common/parseLinks'
import fs from 'fs-extra'
import { isValidMarkdownFilePath } from '../helper/path'
import { deleteFolder, move } from '@/main/filesystem/fileManipulate'
class LinkManager {
  /**
   * 管理tag和cites
   */
  constructor (win, watcher) {
    this.reset()
    this.win = win
    this.watcher = watcher
  }

  reset () {
    this.validFilePaths = new Set()

    this.fileToTags = new Map()
    this.tagToFiles = new Map()

    this.citingMap = new Map() // 文件 引用 其他文件
    this.citedMap = new Map() // 文件 被引用 其他文件
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

  getFilesByTag (tagname) {
    return this.tagToFiles.get(tagname) || []
  }

  getTagGroups (tagname) {
    const res = {
      name: tagname,
      fileNum: 0,
      pathNum: 0,
      children: []
    }
    if (this.tagToFiles.has(tagname)) {
      const attach = this.tagToFiles.get(tagname).sort()

      const groups = []
      for (const filePath of attach) {
        const dirname = path.dirname(filePath)

        if (groups.length > 0 && groups[groups.length - 1].name === dirname) {
          groups[groups.length - 1].children.push(filePath)
        } else {
          groups.push({
            name: dirname,
            children: [filePath],
            handle: '转变为文件夹'
          })
        }
      }
      res.fileNum = attach.length
      res.pathNum = groups.length
      res.children = groups
    }
    return res
  }

  getFileCiteTraverseInfo (filepath) {
    const { citing, cited } = this.getCiteInfo(filepath)
    return {
      name: path.basename(filepath),
      path: filepath,
      citing: citing.length,
      cited: cited.length,
      children: [{
        name: '正向遍历',
        children: this._getFileAllCiting(filepath),
        handle: '转变为tag'
      }, {
        name: '逆向遍历',
        children: this._getFileAllCited(filepath),
        handle: '转变为tag'
      }, {
        name: '无向遍历',
        children: this._getFileAllUndirectedCites(filepath),
        handle: '转变为tag'
      }]
    }
  }

  _getFileAllUndirectedCites (filepath) {
    const vis = new Set()
    const queue = [filepath]

    while (queue.length !== 0) {
      const head = queue.shift()
      if (vis.has(head)) {
        continue
      }
      vis.add(head)
      for (const cited of this.citingMap.get(head) || []) {
        queue.push(cited.path)
      }
      for (const citing of this.citedMap.get(head) || []) {
        queue.push(citing.path)
      }
    }
    vis.delete(filepath)
    return [...vis]
  }

  _getFileAllCited (filepath) {
    const vis = new Set()
    const queue = [filepath]

    while (queue.length !== 0) {
      const head = queue.shift()
      if (vis.has(head)) {
        continue
      }
      vis.add(head)
      for (const citing of this.citedMap.get(head) || []) {
        queue.push(citing.path)
      }
    }
    vis.delete(filepath)
    return [...vis]
  }

  _getFileAllCiting (filepath) {
    const vis = new Set()
    const queue = [filepath]

    while (queue.length !== 0) {
      const head = queue.shift()
      if (vis.has(head)) {
        continue
      }
      vis.add(head)
      for (const cited of this.citingMap.get(head) || []) {
        queue.push(cited.path)
      }
    }
    vis.delete(filepath)
    return [...vis]
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
    const cited = this.citedMap.get(filepath) || []
    const citing = this.citingMap.get(filepath) || []
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
  async addFile (filepath) {
    if (isValidMarkdownFilePath(filepath) && !this.validFilePaths.has(filepath)) {
      try {
        this.validFilePaths.add(filepath)
        const content = (await fs.promises.readFile(filepath)).toString()
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
  async tagToFolder (tagname, dirPath, filepaths) {
    const targetPath = path.resolve(dirPath, tagname)
    if (!fs.existsSync(targetPath)) {
      await fs.promises.mkdir(targetPath)
    }
    for (const filename of filepaths) {
      const filepath = path.resolve(dirPath, filename)
      this.removeFile(filepath)
      const newPath = await move(filepath, targetPath)
      this.addFile(newPath)
      this.win.webContents.send('set-file-path-by-move', { oldPath: filepath, newPath })
      const doc = (await fs.promises.readFile(newPath)).toString()
      fs.writeFile(newPath, removeTagFromDoc(doc, tagname))
    }
    return targetPath
  }

  /**
   * 将叶子目录转为标签，若移动后目录为空删除该目录
   * @param folderPath
   * @returns
   */
  async folderToTag (folderPath) {
    const subFileOrFolder = await fs.promises.readdir(folderPath)
    const targetPath = path.dirname(folderPath)
    const tagname = path.basename(folderPath)
    for (const subItem of subFileOrFolder) {
      const subItemPath = path.resolve(folderPath, subItem)
      if (isValidMarkdownFilePath(subItemPath)) {
        this.removeFile(subItemPath)
        const newPath = await move(subItemPath, targetPath)
        this.addFile(newPath)
        this.win.webContents.send('set-file-path-by-move', { subItemPath, newPath })
        const doc = (await fs.promises.readFile(newPath)).toString()
        fs.writeFile(newPath, addTagToDoc(doc, tagname))
      }
    }
    if ((await (fs.promises.readdir(folderPath))).length === 0) {
      await deleteFolder(folderPath)
    }
    return tagname
  }

  async citeToTag (srcFilepath, citeFilepaths) {
    const tagname = path.parse(srcFilepath).name
    for (const filePath of citeFilepaths) {
      if (fs.existsSync(filePath)) {
        const doc = (await fs.promises.readFile(filePath)).toString()
        fs.writeFile(filePath, addTagToDoc(doc, tagname))
      }
    }
    return tagname
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
}

export default LinkManager
