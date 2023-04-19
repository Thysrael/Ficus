const { markdownToTree } = require('../block/factory/markdownToTree')
const { mindToTree } = require('../block/factory/mindToTree')

const DEFAULT_OPTIONS = {
  delay: 1000,
  maxStack: 100,
  userOnly: false
}

class History {
  /**
     *
     * @param {*} irtree 绑定的IRTree
     * @param {*} doc
     * @param {*} options
     */
  constructor (irtree, doc, options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
    this.irtree = irtree
    // 时间戳
    this.lastRecorded = 0

    this.initdoc = doc
    this.updateTree(doc)

    this.stack = { undo: [], redo: [] }
  }

  cutoff () {
    this.lastRecorded = 0
  }

  getLastSelection () {
    this.selectionStack.push(this.selection.getSelection())

    if (this.selectionStack.length > 2) {
      this.selectionStack.shift()
    }

    return this.selectionStack.length === 2 ? this.selectionStack[0] : null
  }

  record (doc) {
    this.stack.redo = []
    this.lastRecorded = Date.now()

    const timestamp = Date.now()
    // 如果两次操作延迟足够短则不记录之前的操作
    if (
      this.lastRecorded + this.options.delay > timestamp &&
        this.stack.undo.length > 0
    ) {
      this.stack.undo.pop()
    } else {
      this.lastRecorded = timestamp
    }

    this.stack.undo.push(doc)
    this.updateTree(doc)

    if (this.stack.undo.length > this.options.maxStack) {
      this.stack.undo.shift()
    }
  }

  redo () {
    if (this.stack.redo.length === 0) {
      return
    }
    const doc = this.stack.redo.pop()
    this.stack.undo.push(doc)
    this.updateTree(doc)

    this.lastRecorded = 0
  }

  undo () {
    if (this.stack.undo.length === 0) {
      return
    }
    const doc = this.stack.undo.pop()
    this.stack.redo.push(doc)

    if (this.stack.undo.length === 0) {
      this.updateTree(this.initdoc)
    } else {
      this.updateTree(this.stack.undo[this.stack.length - 1])
    }

    this.lastRecorded = 0
  }

  updateTree (doc) {
    if (doc.content) {
      this.irtree.tree = markdownToTree(this.initdoc.content)
    } else if (doc.mindJson) {
      this.irtree.tree = mindToTree(this.initdoc.mindJson)
    }
  }
}

module.exports = {
  History
}
