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
   * @param info {content: md文本, path: 绝对路径}
   * @param replaced 是否替换当前tree
   * @returns
   */
  buildTreeFromMarkdown (info, options = {}) {
    const treeOptions = Object.assign({}, DEFAULT_OPTIONS, options)
    let newTree
    if (this.treeSet[info.path] !== undefined) {
      newTree = this.treeSet[info.path]
    } else {
      newTree = new IRTree({ content: info.content })
    }

    if (treeOptions.replaced) {
      this.irtree = newTree
    }
    return newTree.tree
  }

  /**
   *
   * @param {*} markdown md文本
   */
  updateTreeFromMarkdown (content) {
    if (this.irtree === undefined) {
      console.log('不存在当前文件')
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
    if (this.irtree.tree === undefined) {
      return {}
    }
    return this.irtree.tree.toOutlineJson()
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
      newTree = new IRTree({ mindJson: info.content })
    }

    if (treeOptions.replaced) {
      this.irtree = newTree
    }
    return newTree.tree
  }

  updateTreeFromMindJson (mindJson) {
    if (this.irtree === undefined) {
      console.log('不存在当前文件')
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
  buildGraphFromFiles (info, options = {}) {
    const treeOptions = Object.assign({}, DEFAULT_OPTIONS, options)
    const newGraph = buildGraphFromFileTree(info.files)
    if (treeOptions.replaced) {
      this.graph = newGraph
    }
    return newGraph.graph
  }
}

module.exports = DataManager
