const LinkedNode = require('./linkedList/linkedNode.js')
const { headingTypeName, listTypeName, listItemTypeName } = require('./type/constant.js')
class TreeNode extends LinkedNode {
  /**
   *
   * @param {string} nodeType
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
   * @returns string
   */
  toMarkdown (normalPreix = '', spacePreix = '') {
    this.content.setNormalPrefix(normalPreix)
    this.content.setSpacePrefix(spacePreix)
    let res = this.content.toMarkdown(normalPreix, spacePreix)
    if (this.nodeType === listTypeName) {
      let off = 0
      this.children.forEach(ch => {
        res += ch.toMarkdown(normalPreix + this.content.getOneNormalPrefix(off), spacePreix + this.content.getOneSpacePrefix())
        off += 1
      })
    } else if (this.nodeType === listItemTypeName) {
      let first = true
      this.children.forEach(ch => {
        if (first) {
          res += ch.toMarkdown(normalPreix + this.content.getOneNormalPrefix(), spacePreix + this.content.getOneSpacePrefix())
          first = false
        } else {
          res += ch.toMarkdown(spacePreix + this.content.getOneNormalPrefix(), spacePreix + this.content.getOneSpacePrefix())
        }
      })
    } else {
      this.children.forEach(ch => {
        res += ch.toMarkdown(normalPreix + this.content.getOneNormalPrefix(), spacePreix + this.content.getOneSpacePrefix())
      })
    }
    return res
  }

  /**
   *
   * @returns outlineJson
   */
  toOutlineJson () {
    const res = this.content.getOutlineJson()
    this.children.forEach(ch => {
      if (ch.nodeType === headingTypeName) {
        res.children.push(ch.toOutlineJson())
      }
    })
    return res
  }

  /**
   *
   * @returns
   */
  toMindJson () {
    const res = this.content.getMindJson()
    this.children.forEach(ch => {
      res.children.push(ch.toMindJson())
    })
    return res
  }

  /**
   *
   */
  toFileTreeJson () {
    const res = this.content.getFileJson()
    this.children.forEach(ch => {
      res.children.push(ch.toFileTreeJson())
    })
    return res
  }

  /**
   *
   */
  toNodeJson () {
    return this.content.getNodeJson()
  }
}
module.exports = TreeNode
