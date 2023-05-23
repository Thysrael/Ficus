import buildGraphFromFileTree from '../block/factory/filesToGraph'

class DataManager {
  constructor () {
    this.graph = undefined
  }

  buildGraph (info) {
    const newGraph = buildGraphFromFileTree(info.files, info.relations, info.aerials)
    this.graph = newGraph
  }

  get nodes () {
    if (this.graph) {
      return this.graph.getNodes()
    } else {
      return []
    }
  }

  get links () {
    if (this.graph) {
      return this.graph.getLinks()
    } else {
      return []
    }
  }

  getGraphNodes () {
    return this.graph.getNodes()
  }

  getGraphLinks () {
    return this.graph.getLinks()
  }
}

export default DataManager
