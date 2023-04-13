const LinkedNode = require('./linkedList/linkedNode.js')
class TreeNode extends LinkedNode {
  // private nodeType: BaseNodeType
  // private content: Content
  // private classList: string[]
  // private attributes: any
  // private datasets: any
  /**
   *
   * @param {BaseNodeType} nodeType
   * @param {Content} content
   */
  constructor (nodeType, content) {
    super()
    this.nodeType = nodeType
    this.content = content
    // DOM相关
    this.classList = []
    this.attributes = {}
    this.datasets = {}
  }

  /**
   *
   * @returns boolean
   */
  isLeafNode () {
    return this.nodeType.isLeaf()
  }

  /**
   *
   * @returns string
   */
  toMarkdown () {
    let res = this.content.toMarkdown()
    this.children.forEach(ch => {
      res += ch.toMarkdown()
    })
    return res
  }
}
module.exports = TreeNode
