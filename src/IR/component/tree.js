import History from '../history/index'

class IRTree {
  constructor (filepath, doc, options = {}) {
    this.filepath = filepath
    this.name = window.pathAPI.basename(filepath)
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
    if (this.root.hasFrontMatter()) {
      mindJson.data.frontmatter = this.root.getChildrenHead().toMindJson()
    }
    mindJson.data.name = this.name
    mindJson.data.text = this.name
    return mindJson
  }

  getTags () {
    return this.root.getTags()
  }

  addTag (tagname) {
    this.root.addTag(tagname)
  }

  removeTag (tagname) {
    this.root.removeTag(tagname)
  }
}

export {
  IRTree
}
