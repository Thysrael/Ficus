import { buildRootNode } from '../block/factory/buildNode'
import { markdownToTree } from '../block/factory/markdownToTree'
import { mindToTree } from '../block/factory/mindToTree'

export default class IRForest {
  constructor () {
    this.filesRoot = buildRootNode('Forest')
  }

  /**
   * 更新森林
   * @param {[{path: string, content: string}]} files
   */
  update (files) {
    const newFilepaths = new Set()
    const rawSubFiles = this.filesRoot.getSubFiles()
    for (const { content, path } of files) {
      newFilepaths.add(path)
      if (rawSubFiles.indexOf(path) !== -1) {
        continue
      }
      const chnode = markdownToTree(content, path)
      this.filesRoot.insertAtLast(chnode)
    }

    for (const filepath of rawSubFiles) {
      if (!newFilepaths.has(filepath)) {
        this.filesRoot.removeSubFileByName(filepath)
      }
    }
  }

  updateByMind (mind) {
    this.filesRoot = mindToTree(mind)
  }

  filterPaths (filepaths) {
    const newFilepaths = []
    const rawSubFiles = this.filesRoot.getSubFiles()
    for (const filepath of filepaths) {
      if (rawSubFiles.indexOf(filepath) === -1) {
        newFilepaths.push(filepath)
      }
    }
    return newFilepaths
  }

  clear () {
    this.filesRoot = buildRootNode('Forest')
  }

  addBase (filename = 'new_base') {
    const chnode = buildRootNode(filename)
    this.filesRoot.insertAtHead(chnode)
  }

  exportAll () {
    const exportFiles = []
    this.filesRoot.children.forEach(node => {
      exportFiles.push({
        name: node.content.text,
        content: node.toMarkdown()
      })
    })
    this.clear()
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
