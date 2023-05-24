import { buildRootNode } from '../block/factory/buildNode'
import { markdownToTree } from '../block/factory/markdownToTree'

export default class IRForest {
  constructor () {
    this.filesRoot = buildRootNode('Forest')
    this.filesMap = new Map()
  }

  /**
   * 更新森林
   * @param {[{path: string, content: string}]} files
   */
  update (files) {
    const newFilepaths = new Set()
    for (const file of files) {
      if (this.filesMap.has(file.path)) {
        continue
      }
      const chnode = markdownToTree(file.content, window.pathAPI.basename(file.path))
      this.filesRoot.insertAtLast(chnode)
      this.filesMap.set(file.path, chnode)
      newFilepaths.add(file.path)
    }

    const filesToRemove = []
    for (const filepath of this.filesMap.keys()) {
      if (!newFilepaths.has(filepath)) {
        filesToRemove.push(newFilepaths)
      }
    }
    this.removeFiles(filesToRemove)
  }

  filterPaths (filepaths) {
    const newFilepaths = []
    for (const filepath of filepaths) {
      if (!this.filesMap.has(filepath)) {
        newFilepaths.push(filepath)
      }
    }
    return newFilepaths
  }

  clear () {
    this.filesRoot = buildRootNode('Forest')
    this.filesMap.clear()
  }

  removeFiles (filepaths) {
    for (const filepath of filepaths) {
      if (!this.filesMap.has(filepath)) {
        continue
      }
      const chnode = this.filesMap.get(filepath)
      chnode.removeSelf()
    }
  }

  addBase (filename = 'new_base') {
    const chnode = buildRootNode(filename)
    this.filesRoot.insertAtHead(chnode)
  }

  exportAll () {
    const exportFiles = []
    for (const node of this.filesRoot.children) {
      exportFiles.push({
        name: node.content.text,
        content: node.toMarkdown()
      })
    }
    return exportFiles
  }

  get mind () {
    if (this.filesRoot) {
      return this.filesRoot.toMindJson()
    } else {
      return {}
    }
  }

  get markdown () {
    if (this.filesRoot) {
      return this.filesRoot.getChildrenHead.toMarkdown()
    } else {
      return ''
    }
  }
}
