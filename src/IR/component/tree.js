const { frontmatterNodeType } = require('../block/base/type/type')
const { buildFrontMatter } = require('../block/factory/buildNode')
const { History } = require('../history/index')

class IRTree {
  constructor (doc) {
    this.root = null
    this.history = new History(this, doc)
  }

  update (doc) {
    this.history.record(doc)
  }

  redo () {
    this.history.redo()
  }

  undo () {
    this.history.undo()
  }

  toMarkdown () {
    return this.root.toMarkdown()
  }

  toOutlineJson () {
    return this.root.toOutlineJson()
  }

  toMindJson () {
    return this.root.toMindJson()
  }

  getTags () {
    if (this.root.children.head !== null &&
      this.root.children.head.nodeType === frontmatterNodeType) {
      return this.root.children.head.content.getTags()
    } else {
      return []
    }
  }

  addTag (tagname) {
    if (this.root.children.head !== null &&
      this.root.children.head.nodeType === frontmatterNodeType) {
      this.root.children.head.content.addTag(tagname)
    } else {
      this.root.children.insertBefore(buildFrontMatter('', 'yaml', '-'), this.root.children.head)
      this.root.children.head.content.addTag(tagname)
    }
  }

  removeTag (tagname) {
    if (this.root.children.head !== null &&
      this.root.children.head.nodeType === frontmatterNodeType) {
      this.root.children.head.content.removeTag(tagname)
      if (this.root.children.head.content.isEmpty()) {
        this.root.children.head.removeSelf()
      }
    }
  }
}

module.exports = {
  IRTree
}
