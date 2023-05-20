import { buildFrontMatter } from '../factory/buildNode.js'
import LinkedNode from './linkedList/linkedNode.js'
import { headingTypeName, listTypeName, listItemTypeName, frontmatterTypeName } from './type/constant.js'
export default class TreeNode extends LinkedNode {
  /**
   *
   * @param {string} nodeType
   * @param {Content} content
   */
  constructor (nodeType, content) {
    super()
    this.nodeType = nodeType
    this.content = content
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
      if (ch.nodeType !== frontmatterTypeName) {
        res.children.push(ch.toMindJson())
      }
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

export class RootNode extends TreeNode {
  getTags () {
    if (this.hasFrontMatter()) {
      return this.children.head.content.getTags()
    } else {
      return []
    }
  }

  addTag (tagname) {
    if (this.hasFrontMatter()) {
      this.children.head.content.addTag(tagname)
    } else {
      this.children.insertBefore(buildFrontMatter('', 'yaml', '-'), this.children.head)
      this.children.head.content.addTag(tagname)
    }
  }

  removeTag (tagname) {
    if (this.hasFrontMatter()) {
      this.children.head.content.removeTag(tagname)
      if (this.children.head.content.isEmpty()) {
        this.children.head.removeSelf()
      }
    }
  }

  hasFrontMatter () {
    return this.children.head !== null &&
      this.children.head.nodeType === frontmatterTypeName
  }
}
