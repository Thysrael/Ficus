import buildGraphFromFileTree from '../block/factory/filesToGraph'

const DEFAULT_OPTIONS = {
  replaced: false
}

class DataManager {
  constructor () {
    this.forest = undefined
    this.graph = undefined
  }

  buildGraphFromFiles (info, options = {}) {
    const treeOptions = Object.assign({}, DEFAULT_OPTIONS, options)
    const newGraph = buildGraphFromFileTree(info.files, info.relations, info.aerials)
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
}

export default DataManager
