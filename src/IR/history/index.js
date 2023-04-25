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
   * @param {IRTree} irtree 绑定的IRTree
   * @param {string} doc
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

    // FIXME: 因为每次undo/redo后会被立刻调用record
    this.ignoreRecord = false
  }

  record (doc) {
    if (this.ignoreRecord) {
      this.ignoreRecord = false
      return
    }
    console.log('record', this.stack.undo)
    this.stack.redo = []
    const timestamp = Date.now()
    console.log('time1', this.lastRecorded + this.options.delay)
    console.log('time2', timestamp)
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
    console.log('record end', this.stack.undo)
  }

  redo () {
    this.ignoreRecord = true
    if (this.stack.redo.length === 0) {
      return
    }
    const doc = this.stack.redo.pop()
    this.stack.undo.push(doc)
    this.updateTree(doc)

    this.lastRecorded = 0
  }

  undo () {
    this.ignoreRecord = true
    if (this.stack.undo.length === 0) {
      return
    }
    const doc = this.stack.undo.pop()
    this.stack.redo.push(doc)

    if (this.stack.undo.length === 0) {
      this.updateTree(this.initdoc)
    } else {
      this.updateTree(this.stack.undo[this.stack.undo.length - 1])
    }

    this.lastRecorded = 0
  }

  updateTree (doc) {
    if (doc.content !== undefined) {
      this.irtree.root = markdownToTree(doc.content)
    } else if (doc.mindJson !== undefined) {
      this.irtree.root = mindToTree(doc.mindJson)
    } else {
      console.log('Error in updateTree: ')
      console.log(doc)
    }
  }
}

module.exports = {
  History
}
