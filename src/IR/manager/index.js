const { buildGraphFromFileTree } = require('../block/factory/filesToGraph')
const { IRTree } = require('../component/tree')

const DEFAULT_OPTIONS = {
  replaced: false
}

class DataManager {
  constructor () {
    this.irtree = undefined
    this.forest = undefined
    this.graph = undefined

    this.treeSet = {}
  }

  /**
   * 从markdown生成FicusTree
   * @param info {{path: UnwrapRef<string>, content: UnwrapRef<string>}}
   * @param replaced 是否替换当前tree
   * @returns
   */
  buildTreeFromMarkdown (info, options = {}) {
    const treeOptions = Object.assign({}, DEFAULT_OPTIONS, options)
    let newTree
    if (this.treeSet[info.path] !== undefined) {
      newTree = this.treeSet[info.path]
    } else {
      newTree = new IRTree({ content: info.content }, treeOptions)
      this.treeSet[info.path] = newTree
    }

    if (treeOptions.replaced) {
      this.irtree = newTree
    }
    return newTree.root
  }

  /**
   *
   * @param {*} markdown md文本
   */
  updateTreeFromMarkdown (content) {
    if (this.irtree === undefined) {
      console.log('IR.manager: IRTree is not exist')
    } else {
      this.irtree.update({ content })
    }
  }

  /**
     * 由当前FicusTree生成md
     * @returns markdown字符串
     */
  getTreeMarkdown () {
    if (this.irtree === undefined) {
      return ''
    }
    return this.irtree.toMarkdown()
  }

  /**
   *
   * @returns 大纲json
   */
  getTreeOutline () {
    if (this.irtree === undefined) {
      return {}
    }
    return this.irtree.toOutlineJson()
  }

  /**
   * 从mindJson生成FicusTree
   * @param info md文本
   * @param replaced 是否替换当前tree
   * @returns
   */
  buildTreeFromMindJson (info, options = {}) {
    const treeOptions = Object.assign({}, DEFAULT_OPTIONS, options)
    let newTree
    if (this.treeSet[info.path] !== undefined) {
      newTree = this.treeSet[info.path]
    } else {
      newTree = new IRTree({ mindJson: info.content }, treeOptions)
      this.treeSet[info.path] = newTree
    }

    if (treeOptions.replaced) {
      this.irtree = newTree
    }
    return newTree.tree
  }

  updateTreeFromMindJson (mindJson) {
    if (this.irtree === undefined) {
      console.log('IR.manager: IRTree is not exist')
    } else {
      this.irtree.update({ mindJson })
    }
  }

  /**
   *
   * @returns mind json
   */
  getTreeMindJson () {
    if (this.irtree === undefined) {
      return {}
    }
    return this.irtree.toMindJson()
  }

  /**
   *
   */
  undoTree () {
    if (this.irtree !== undefined) {
      this.irtree.undo()
    }
  }

  /**
   *
   */
  redoTree () {
    if (this.irtree !== undefined) {
      this.irtree.redo()
    }
  }

  /**
   *
   */
  buildGraphFromFiles (info, options = {}) {
    const treeOptions = Object.assign({}, DEFAULT_OPTIONS, options)
    const newGraph = buildGraphFromFileTree(info.files, info.relations)
    if (treeOptions.replaced) {
      this.graph = newGraph
    }
    return newGraph.graph
  }

  getGraphNodes () {
    return this.graph.getNodes()
  }

  getGraphLinks () {
    return this.graph.getLinks()
  }

  addTag (tagname) {
    if (this.irtree) {
      this.irtree.addTag(tagname)
    }
  }

  removeTag (tagname) {
    if (this.irtree) {
      this.irtree.removeTag(tagname)
    }
  }

  getTags () {
    if (this.irtree) {
      return this.irtree.getTags()
    } else {
      return []
    }
  }
}

module.exports = DataManager
