import { IRTree } from '../component/tree'

const DEFAULT_OPTIONS = {
  replaced: false
}

class DataManager {
  constructor () {
    this.tree = undefined
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
      newTree = new IRTree({ markdown: info.content })
    }

    if (treeOptions.replaced) {
      this.tree = newTree
    }
    return newTree.tree
  }

  /**
   *
   * @param {*} markdown md文本
   */
  updateTreeFromMarkdown (markdown) {
    if (this.tree === undefined) {
      console.log('不存在当前文件')
    } else {
      this.tree.update({ markdown })
    }
  }

  /**
     * 由当前FicusTree生成md
     * @returns markdown字符串
     */
  getTreeMarkdown () {
    if (this.tree === undefined) {
      return ''
    }
    return this.tree.toMarkdown()
  }

  /**
   *
   * @returns 大纲json
   */
  getTreeOutline () {
    if (this.tree === undefined) {
      return {}
    }
    return this.tree.toOutlineJson()
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
      this.tree = newTree
    }
    return newTree.tree
  }

  updateTreeFromMindJson (mindJson) {
    if (this.tree === undefined) {
      console.log('不存在当前文件')
    } else {
      this.tree.update({ mindJson })
    }
  }

  /**
   *
   * @returns mind json
   */
  getTreeMindJson () {
    if (this.tree === undefined) {
      return {}
    }
    return this.tree.toOutlineJson()
  }
}

export default DataManager
