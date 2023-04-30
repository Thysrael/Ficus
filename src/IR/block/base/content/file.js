import { folderTypeName, tagTypeName, fileTypeName } from '../type/constant'
import { Content } from './base'
const category = {
  folder: 0,
  file: 1,
  tag: 2
}

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
      category: category.file
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
      category: category.folder
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
      category: category.tag
    }
  }
}

export {
  FileContent,
  FolderContent,
  TagContent
}
