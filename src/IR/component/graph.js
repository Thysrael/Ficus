const { buildFolderNode, buildFileNode, buildTagNode } = require('../block/factory/buildNode')

class IRGraph {
  constructor () {
    this.treenodes = []
    this.nodeid = 0
    this.linkid = 0
    this.graph = undefined

    this.tagnodes = []

    this.edges = []
    this.aerials = []
  }

  /**
     * private
     * @param {*} files
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
    this.graph = buildFolderNode(this.nodeid, files.folderName, files.path)
    this.treenodes.push(this.graph)
    this.nodeid += 1
    if (files.tree) {
      files.tree.forEach(e => {
        this.graph.insertAtLast(this.parseFileTree(e))
      })
    }

    this.makeEdges()
  }

  addRelations (relations) {
    console.log('add relations')
    console.log(relations)

  }

  addAerials (aerials) {
    let pathToNodeId = {}
    for (let node of this.treenodes) {
      pathToNodeId[node.content.path] = node.content.id
    }

    for (let tagInfo of aerials) {
      const tagNode = buildTagNode(this.nodeid, tagInfo.tagName)
      this.tagnodes.push(tagNode)
      tagInfo.attach.forEach(filepath => {
        if (this.pathToNodeId[filepath] !== undefined) {
          this.aerials.push({
            id: this.linkid,
            source: this.nodeid,
            target: this.pathToNodeId[filepath],
            type: 0
          })
          this.linkid += 1
        }
      })
      this.nodeid += 1
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
   * @returns 
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

  getLinks() {
    return this.edges.concat(this.aerials)
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
