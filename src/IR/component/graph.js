const { buildFolderNode, buildFileNode, buildTagNode } = require('../block/factory/buildNode')

const linkType = {
  file: 0,
  tag: 1,
  cite: 2
}

class IRGraph {
  constructor () {
    this.treenodes = []
    this.initID()
    this.graph = undefined

    this.tagnodes = []

    this.edges = []
    this.relations = []
    this.aerials = []
    this.pathToNodeId = {}
  }

  /**
     * private
     * @param {{name: string, path: string, children: [any]}} files
     * @returns
     */
  parseFileTree (files) {
    let newNode
    if (files.children) {
      newNode = buildFolderNode(this.allocNodeID(), files.name, files.path)
      this.treenodes.push(newNode)
      files.children.forEach(e => {
        newNode.insertAtLast(this.parseFileTree(e))
      })
    } else {
      newNode = buildFileNode(this.allocNodeID(), files.name, files.path, files.content)
      this.treenodes.push(newNode)
    }
    return newNode
  }

  addFiles (files) {
    this.graph = this.parseFileTree(files)

    this.makeEdges()
  }

  /**
   *
   * @param {[{tagName: string, attach: [string]}]} relations
   */
  addRelations (relations) {
    const pathToNodeId = new Map()
    for (const node of this.treenodes) {
      pathToNodeId.set(node.content.path, node.content.id)
    }

    for (const tagInfo of relations) {
      const tagNodeId = this.allocNodeID()
      const tagNode = buildTagNode(tagNodeId, tagInfo.tagName)
      this.tagnodes.push(tagNode)

      tagInfo.attach.forEach(filepath => {
        if (pathToNodeId.has(filepath)) {
          this.relations.push({
            id: this.allocLinkID(),
            source: tagNodeId,
            target: pathToNodeId.get(filepath),
            type: linkType.tag
          })
        }
      })
    }
  }

  /**
   *
   * @param {[{name: string, sourcePath: string, targetPath: string}]} aerials
   */
  addAerials (aerials) {
    const pathToNodeId = new Map()
    for (const node of this.treenodes) {
      pathToNodeId.set(node.content.path, node.content.id)
    }
    for (const aerialInfo of aerials) {
      if (pathToNodeId.has(aerialInfo.sourcePath) &&
            pathToNodeId.has(aerialInfo.targetPath)) {
        this.aerials.push({
          id: this.allocLinkID(),
          source: pathToNodeId.get(aerialInfo.sourcePath),
          target: pathToNodeId.get(aerialInfo.targetPath),
          name: aerialInfo.name,
          type: linkType.cite
        })
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
          id: this.allocLinkID(),
          source: node.content.id,
          target: chnode.content.id,
          type: linkType.file
        })
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

  /**
   * 获得一个独有的nodeID
   */
  allocNodeID () {
    return this.nodeid++
  }

  /**
   * 获得一个独有的linkID
   */
  allocLinkID () {
    return this.linkid++
  }

  initID () {
    this.nodeid = 0
    this.linkid = 0
  }
}

module.exports = {
  IRGraph
}
