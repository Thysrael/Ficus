const { getLinksInFile } = require('../../common/parseLinks')
const { readFileSync } = require('fs-extra')

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
    this.validFilePaths.push(filepath)
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

  getAllTags () {
    return [...this.tagToFiles.keys()]
  }

  getFileTags (filepath) {
    if (this.fileToTags.has(filepath)) {
      return this.fileToTags.get(filepath)
    } else {
      console.log('Unknown File Path ' + filepath)
      return []
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

  addFileAerials (citingPath, citedPaths) {
    this.citingMap.set(citingPath, citedPaths)
    for (const cited of citedPaths) {
      if (!this.citedMap.has(cited)) {
        this.citedMap.set(cited, [])
      }
      this.citedMap.get(cited).push(citingPath)
    }
  }
}

const linkManager = new LinkManager()

module.exports = linkManager
