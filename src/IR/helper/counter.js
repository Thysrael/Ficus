class IdMarker {
  constructor () {
    this.reset()
  }

  reset () {
    this._id = -1
  }

  /**
     *
     * @param {children} obj
     */
  markId (obj) {
    obj.id = this.allocId()
    if (obj.children) {
      for (const child of obj.children) {
        this.markId(child)
      }
    }
  }

  allocId () {
    return this._id++
  }
}

module.exports = {
  IdMarker
}
