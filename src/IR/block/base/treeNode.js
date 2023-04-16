const { headingNodeType, listNodeType } = require('../type/type.js')
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
  toMarkdown (pre = '', SpacePre = '') {
    this.content.pre = pre
    this.content.spacePre = SpacePre
    let res = this.content.toMarkdown(pre, SpacePre)
    if (this.nodeType === listNodeType) {
      let off = 0
      this.children.forEach(ch => {
        res += ch.toMarkdown(pre + this.content.getSinglePre(off), SpacePre + this.content.getSingleSpacePre())
        off += 1
      })
    } else {
      this.children.forEach(ch => {
        res += ch.toMarkdown(pre + this.content.getSinglePre(), SpacePre + this.content.getSingleSpacePre())
      })
    }
    return res
  }

  /**
   *
   * @returns json
   */
  toJson () {
    const res = this.content.toJson()
    res.children = []
    this.children.forEach(ch => {
      res.children.push(ch.toJson())
    })
    return res
  }

  /**
   *
   * @returns outlineJson
   */
  toOutlineJson () {
    const res = this.content.getOutlineJson()
    this.children.forEach(ch => {
      if (ch.nodeType === headingNodeType) {
        res.children.push(ch.toOutlineJson())
      }
    })
    return res
  }
}
module.exports = TreeNode
