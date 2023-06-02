import { getRenamePath } from '@/renderer/utils/pathHelpter'
import { IRTree } from '../component/tree'
import { IdMarker } from '../helper/counter'

class TreeManager {
  constructor () {
    this._tree = undefined
    this._cached = new Map()
  }

  closeCurrentTree () {
    this._tree = undefined
  }

  /**
   * 判断缓存中有某个
   * @param {string} filepath
   * @returns
   */
  containsCached (filepath) {
    return this._cached.has(filepath)
  }

  /**
   * 从缓存中设置当前树
   * @param {string} filepath
   * @returns
   */
  setTreeFromCached (filepath) {
    if (this.containsCached(filepath)) {
      this._tree = this._getTreeFromCached(filepath)
    }
  }

  deleteCached (filepath) {
    this._removeCached(filepath)
  }

  move (oldPath, newPath) {
    this._cached.forEach((value, oldFilePath) => {
      const newFilePath = getRenamePath(oldPath, newPath, oldFilePath)
      if (newFilePath !== oldFilePath) {
        this._replacePath(oldFilePath, newFilePath, value)
      }
    })
  }

  _replacePath (oldPath, newPath, value) {
    this._cached.delete(oldPath)
    this._cached.set(newPath, value)
  }

  /**
   *
   * @param {string} filepath
   * @param {{content|mindJson}} doc
   */
  build (filepath, doc) {
    this._tree = new IRTree(filepath, doc)
    this._addCached(this._tree)
  }

  /**
   *
   * @param {string} filepath
   * @param {{content|mindJson}} doc
   */
  update (filepath, doc) {
    if (this.containsCached(filepath)) {
      const tree = this._getTreeFromCached(filepath)
      tree.update(doc)
      this._addCached(this._tree)
    }
  }

  /**
   *
   * @param {{content|mindJson}} doc
   */
  updateCurrent (doc) {
    if (this._tree) {
      this.update(this._tree.filepath, doc)
    }
  }

  /**
     * 由当前FicusTree生成md
     * @returns markdown字符串
     */
  get markdown () {
    if (this._isValid()) {
      return this._tree.toMarkdown()
    } else {
      return ''
    }
  }

  /**
   * 重做
   */
  undo () {
    if (this._tree !== undefined) {
      this._tree.undo()
    }
  }

  /**
   * 撤销
   */
  redo () {
    if (this._tree !== undefined) {
      this._tree.redo()
    }
  }

  /**
   * 增加tag
   * @param {string} tagname
   */
  addTag (tagname) {
    if (this._tree) {
      this._tree.addTag(tagname)
    }
  }

  /**
   * 删除tag
   * @param {string} tagname
   */
  removeTag (tagname) {
    if (this._tree) {
      this._tree.removeTag(tagname)
    }
  }

  /* ----- get ----- */

  get currentPath () {
    if (this._isValid()) {
      return this._tree.filepath
    } else {
      return ''
    }
  }

  get tags () {
    if (this._isValid()) {
      return this._tree.getTags()
    } else {
      return []
    }
  }

  /**
   *
   * @returns 大纲json
   */
  get outline () {
    if (this._isValid()) {
      const outlineInfo = this._tree.toOutlineJson()
      const idMarker = new IdMarker()
      idMarker.markId(outlineInfo)
      return outlineInfo.children
    } else {
      return {}
    }
  }

  /**
   *
   * @returns mind
   */
  get mind () {
    if (this._isValid()) {
      return this._tree.toMindJson()
    } else {
      return {}
    }
  }

  /* ----- private ----- */

  _isValid () {
    return this._tree !== undefined
  }

  _addCached (tree) {
    this._cached.set(tree.filepath, tree)
  }

  _removeCached (filepath) {
    return this._cached.delete(filepath)
  }

  _getTreeFromCached (filepath) {
    return this._cached.get(filepath)
  }
}

export default TreeManager
