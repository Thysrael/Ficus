import { buildRootNode } from '../block/factory/buildNode'
import { markdownToTree } from '../block/factory/markdownToTree'

export default class IRForest {
  constructor () {
    this.files = []
    this.filesRoot = undefined
  }

  /**
   * 构建森林
   * @param {[{path: string, content: string}]} files
   */
  build (files) {
    this.files = files
    this.filesRoot = buildRootNode('All')
    this.filesRoot.insertAtLast(buildRootNode('新文档'))
    for (const file of files) {
      const chnode = markdownToTree(file.content, window.pathAPI.basename(file.path))
      this.filesRoot.insertAtLast(chnode)
    }
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
