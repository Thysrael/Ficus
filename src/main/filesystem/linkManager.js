const path = require('path')
const { getLinksInFile } = require('../../common/parseLinks')
const { readFileSync } = require('fs-extra')
const { isValidMarkdownFilePath } = require('../utils')

class LinkManager {
  constructor () {
    this.reset()
  }

  reset () {
    this.fileToTags = new Map()
    this.tagToFiles = new Map()

    this.citingMap = new Map()
    this.citedMap = new Map()

    this.validFilePaths = []
  }

  addValidFilePath (filepath) {
    if (isValidMarkdownFilePath(filepath)) {
      this.validFilePaths.push(filepath)
    }
  }

  init () {
    for (const path of this.validFilePaths) {
      try {
        const content = readFileSync(path).toString()
        const { aerials, tags } = getLinksInFile(content)
        this.addFileTags(path, tags)
        this.addFileAerials(path, aerials)
      } catch (e) {
        console.log(e)
        console.log('INVALID FILE PATH ' + path)
      }
    }
  }

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

  updateFile (filepath) {
    if (isValidMarkdownFilePath(filepath)) {
      try {
        const content = readFileSync(filepath).toString()
        const { aerials, tags } = getLinksInFile(content)
        this.delFile(filepath)
        this.addFileTags(filepath, tags)
        this.addFileAerials(filepath, aerials)
      } catch (e) {
        console.log(e)
      }
    }
  }

  addFileTags (filepath, tags) {
    this.fileToTags.set(filepath, tags)
    for (const tag of tags) {
      if (!this.tagToFiles.has(tag)) {
        this.tagToFiles.set(tag, [])
      }
      this.tagToFiles.get(tag).push(filepath)
    }
  }

  delFile (filepath) {
    if (this.fileToTags.has(filepath)) {
      for (const tag of this.fileToTags.get(filepath)) {
        const fileList = this.tagToFiles.get(tag)
        fileList.splice(fileList.indexOf(filepath), 1)
      }
    }
    this.fileToTags.delete(filepath)
    this.citingMap.delete(filepath)
  }

  addFileAerials (citingPath, citeds) {
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
}

const linkManager = new LinkManager()

module.exports = linkManager
