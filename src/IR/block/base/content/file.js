import { folderTypeName, tagTypeName, fileTypeName } from '../type/constant'
import { Content } from './base'
const CATEGORY = {
  FOLDER: 0,
  FILE: 1,
  TAG: 2
}

class FileContent extends Content {
  constructor (id, name, path, depth) {
    super(fileTypeName, name)
    this.id = id
    this.name = name
    this.path = path
    this.depth = depth
  }

  getNodeJson () {
    return {
      id: this.id,
      name: this.name,
      path: this.path,
      category: CATEGORY.FILE,
      depth: this.depth
    }
  }
}

class FolderContent extends Content {
  constructor (id, name, path, depth) {
    super(folderTypeName, name)
    this.id = id
    this.name = name
    this.path = path
    this.depth = depth
  }

  getNodeJson () {
    return {
      id: this.id,
      name: this.name,
      path: this.path,
      category: CATEGORY.FOLDER,
      depth: this.depth
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
      id: this.id,
      name: this.name,
      category: CATEGORY.TAG
    }
  }
}

export {
  FileContent,
  FolderContent,
  TagContent
}
