import { buildRootNode } from '../block/factory/buildNode'
import { markdownToTree } from '../block/factory/markdownToTree'

export default class IRForest {
  constructor () {
    this.filepaths = []
    this.filesRoot = buildRootNode('Forest')
  }

  /**
   * 构建森林
   * @param {[{path: string, content: string}]} files
   */
  build (files) {
    this.filesRoot = buildRootNode('All')
    for (const file of files) {
      const chnode = markdownToTree(file.content, window.pathAPI.basename(file.path))
      this.filesRoot.insertAtLast(chnode)
      this.filepaths.push(file.path)
    }
  }

  clear () {
    this.filesRoot = buildRootNode('Forest')
  }

  /**
   * 添加文件
   * @param {[{path: string, content: string}]} files
   */
  addFiles (files) {
    for (const file of files) {
      if (this.filepaths.findIndex(file.path) >= 0) {
        return
      }
      const chnode = markdownToTree(file.content, window.pathAPI.basename(file.path))
      this.filesRoot.insertAtLast(chnode)
      this.filepaths.push(file.path)
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

  get mindJson () {
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
