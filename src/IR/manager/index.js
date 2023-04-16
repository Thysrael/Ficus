const { markdownToTree } = require('../block/factory/markdownToTree')

class DataManager {
  constructor () {
    this.tree = undefined
    this.forest = undefined
    this.graph = undefined
  }

  /**
     * 从markdown生成FicusTree
     * @param markdown md文本
     * @param replaced 是否替换当前tree
     * @returns
     */
  buildTreeFromMarkdown (markdown, replaced = false) {
    const newTree = markdownToTree(markdown)
    if (replaced) {
      this.tree = newTree
    }
    return newTree
  }

  /**
     * 由当前FicusTree生成md
     * @returns markdown字符串
     */
  getTreeMarkdown () {
    if (this.tree === undefined) {
      return ''
    }
    return this.tree.toMarkdown()
  }

  /**
   *
   * @returns 大纲json
   */
  getTreeOutline () {
    if (this.tree === undefined) {
      return {}
    }
    return this.tree.toOutlineJson()
  }
}

export default DataManager
