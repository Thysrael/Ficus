import IRGraph from '../component/graph'

export default class GraphManager {
  constructor () {
    this.graph = undefined
    this.focusId = 0
  }

  buildGraph (info) {
    this.graph = new IRGraph(info.files, info.relations, info.aerials)
    this.focusId = 0
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

  queryNodeId (name) {
    if (this.graph) {
      return this.graph.queryNodeId(name)
    } else {
      return -1
    }
  }

  queryNodesByToken (token) {
    if (this.graph) {
      return this.graph.queryNodesByToken(token)
    } else {
      return []
    }
  }
}
