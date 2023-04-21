const { frontmatterTypeName } = require('../block/base/type/constant')
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
    if (this.hasFrontMatter()) {
      return this.root.getChildrenHead().content.getTags()
    } else {
      return []
    }
  }

  addTag (tagname) {
    if (this.hasFrontMatter()) {
      this.root.getChildrenHead().content.addTag(tagname)
    } else {
      this.root.children.insertBefore(buildFrontMatter('', 'yaml', '-'), this.root.getChildrenHead())
      this.root.getChildrenHead().content.addTag(tagname)
    }
  }

  removeTag (tagname) {
    if (this.hasFrontMatter()) {
      this.root.getChildrenHead().content.removeTag(tagname)
      if (this.root.getChildrenHead().content.isEmpty()) {
        this.root.getChildrenHead().removeSelf()
      }
    }
  }

  /* private */
  hasFrontMatter () {
    return this.root.getChildrenHead() !== null &&
      this.root.getChildrenHead().nodeType === frontmatterTypeName
  }
}

module.exports = {
  IRTree
}
