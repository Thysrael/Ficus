import { frontmatterTypeName } from '../block/base/type/constant'
import { buildFrontMatter } from '../block/factory/buildNode'
import History from '../history/index'

class IRTree {
  constructor (filepath, doc, options = {}) {
    this.filepath = filepath
    this.root = null
    this.history = new History(this, doc, options)
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
    const mindJson = this.root.toMindJson()
    if (this.hasFrontMatter()) {
      mindJson.frontmatter = this.root.getChildrenHead().toMindJson()
    }
    return mindJson
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

export {
  IRTree
}
