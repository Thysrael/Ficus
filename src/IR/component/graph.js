const { buildFolderNode, buildFileNode, buildTagNode } = require('../block/factory/buildNode')

class IRGraph {
  constructor () {
    this.treenodes = []
    this.nodeid = 0
    this.linkid = 0
    this.graph = undefined

    this.tagnodes = []

    this.edges = []
    this.relations = []
    this.aerials = []
  }

  /**
     * private
     * @param {{name: string, path: string, children: [any]}} files
     * @returns
     */
  parseFileTree (files) {
    let newNode
    if (files.children) {
      newNode = buildFolderNode(this.nodeid, files.name, files.path)
      this.treenodes.push(newNode)
      this.nodeid += 1
      files.children.forEach(e => {
        newNode.insertAtLast(this.parseFileTree(e))
      })
    } else {
      newNode = buildFileNode(this.nodeid, files.name, files.path, files.content)
      this.treenodes.push(newNode)
      this.nodeid += 1
    }
    return newNode
  }

  addFiles (files) {
    this.graph = this.parseFileTree(files)

    this.makeEdges()
  }

  /**
   *
   * @param {[{tagInfo: string, attach: [string]}]} relations
   */
  addRelations (relations) {
    const pathToNodeId = {}
    for (const node of this.treenodes) {
      pathToNodeId[node.content.path] = node.content.id
    }

    for (const tagInfo of relations) {
      const tagNode = buildTagNode(this.nodeid, tagInfo.tagName)
      this.tagnodes.push(tagNode)
      tagInfo.attach.forEach(filepath => {
        if (this.pathToNodeId[filepath] !== undefined) {
          this.relations.push({
            id: this.linkid,
            source: this.nodeid,
            target: this.pathToNodeId[filepath],
            type: 1
          })
          this.linkid += 1
        }
      })
      this.nodeid += 1
    }
  }

  /**
   *
   * @param {[{name: string, sourcePath: string, targetPath: string}]} aerials
   */
  addAerials (aerials) {
    for (const aerialInfo of aerials) {
      if (this.pathToNodeId[aerialInfo.sourcePath] !== undefined &&
            this.pathToNodeId[aerialInfo.targetPath] !== undefined) {
        this.relations.push({
          id: this.linkid,
          source: this.pathToNodeId[aerialInfo.sourcePath],
          target: this.pathToNodeId[aerialInfo.targetPath],
          name: aerialInfo.name,
          type: 2
        })
        this.linkid += 1
      }
    }
  }

  getNodes () {
    const res = []
    for (const node of this.treenodes) {
      res.push(node.toNodeJson())
    }
    for (const node of this.tagnodes) {
      res.push(node.toNodeJson())
    }
    return res
  }

  /**
   * private
   */
  makeEdges () {
    for (const node of this.treenodes) {
      node.children.forEach(chnode => {
        this.edges.push({
          id: this.linkid,
          source: node.content.id,
          target: chnode.content.id,
          type: 0
        })
        this.linkid += 1
      })
    }
  }

  getLinks () {
    return this.edges.concat(this.relations).concat(this.aerials)
  }

  getFileTreeJson () {
    if (this.graph) {
      return this.graph.toFileTreeJson()
    }
  }
}

module.exports = {
  IRGraph
}
