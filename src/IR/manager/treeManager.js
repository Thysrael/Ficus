import { IRTree } from '../component/tree'
import { IdMarker } from '../helper/counter'

class TreeManager {
  constructor () {
    this._tree = undefined
    this._cached = new Map()
  }

  containsCached (filepath) {
    return this._cached.has(filepath)
  }

  setTreeFromCached (filepath) {
    if (this.containsCached(filepath)) {
      this._tree = this._cached[filepath]
    }
  }

  deleteCached (filepath) {
    this._removeCached(filepath)
  }

  /**
   *
   * @param {content|mindJson} doc
   * @param options
   * @returns
   */
  build (filepath, doc) {
    this._tree = new IRTree(filepath, doc)
    this._addCached(this._tree)
  }

  /**
   *
   * @param {content|mindJson} doc
   */
  update (doc) {
    if (this._isValid()) {
      this._tree.update(doc)
      this._addCached(this._tree)
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
   *
   */
  undo () {
    if (this._tree !== undefined) {
      this._tree.undo()
    }
  }

  /**
   *
   */
  redo () {
    if (this._tree !== undefined) {
      this._tree.redo()
    }
  }

  addTag (tagname) {
    if (this._tree) {
      this._tree.addTag(tagname)
    }
  }

  removeTag (tagname) {
    if (this._tree) {
      this._tree.removeTag(tagname)
    }
  }

  get tags () {
    if (this._isValid()) {
      return this._tree.getTags()
    } else {
      return []
    }
  }

  /* ----- get ----- */

  /**
   *
   * @returns 大纲json
   */
  get outline () {
    if (this._isValid()) {
      const outlineInfo = this._tree.toOutlineJson()
      const idMarker = new IdMarker()
      idMarker.markId(outlineInfo)
      return outlineInfo
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
}

export default TreeManager
