class IdMarker {
  constructor () {
    this._id = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    }
  }

  reset (beginIndex) {
    for (let level = beginIndex; level <= 6; level++) {
      this._id[level] = 0
    }
  }

  /**
     *
     * @param {children: [obj], level: number} obj
     */
  markId (obj) {
    obj.id = this.allocId(obj.level)
    if (obj.children) {
      this.reset(obj.level + 1)
      for (const child of obj.children) {
        this.markId(child)
      }
    }
  }

  allocId (level) {
    const res = this._id[level]
    this._id[level] = res + 1
    return res
  }
}

export {
  IdMarker
}
