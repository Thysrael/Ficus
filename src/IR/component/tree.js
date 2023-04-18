const { History } = require('../history/index')

class IRTree {
  constructor (doc) {
    this.tree = undefined
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
    return this.tree.toMarkdown()
  }

  toOutlineJson () {
    return this.tree.toOutlineJson()
  }

  toMindJson () {
    return this.tree.toMindJson()
  }
}

module.exports = {
  IRTree
}
