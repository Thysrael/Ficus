const { folderTypeName, tagTypeName, fileTypeName } = require('../type/constant')
const { Content } = require('./base')

const folderCategory = 0
const fileCategory = 1
const tagCategory = 1

class FileContent extends Content {
  constructor (id, name, path, content) {
    super(fileTypeName, content)
    this.id = id
    this.name = name
    this.path = path
  }

  getFileJson () {
    return {
      name: this.name,
      path: this.path,
      content: this.text
    }
  }

  getNodeJson () {
    return {
      id: `${this.id}`,
      name: this.name,
      category: fileCategory
    }
  }
}

class FolderContent extends Content {
  constructor (id, name, path) {
    super(folderTypeName, name)
    this.id = id
    this.name = name
    this.path = path
  }

  getFileJson () {
    return {
      name: this.text,
      path: this.path,
      children: []
    }
  }

  getNodeJson () {
    return {
      id: `${this.id}`,
      name: this.name,
      category: folderCategory
    }
  }
}

class TagContent extends Content {
  constructor (id, name) {
    super(tagTypeName, name)
    this.id = id
    this.name = name
  }

  getNodeJson () {
    return {
      id: `${this.id}`,
      name: this.name,
      category: tagCategory
    }
  }
}

module.exports = {
  FileContent,
  FolderContent,
  TagContent
}
