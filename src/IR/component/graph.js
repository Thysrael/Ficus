const { buildFolderNode, buildFileNode } = require('../block/factory/buildNode')

class IRGraph {
  constructor () {
    this.treenodes = []
    this.id = 0
    this.graph = undefined
  }

  /**
     * private
     * @param {*} files
     * @returns
     */
  parseFileTree (files) {
    let newNode
    if (files.children) {
      newNode = buildFolderNode(this.id, files.name, files.path)
      this.treenodes.push(newNode)
      this.id += 1
      files.children.forEach(e => {
        newNode.insertAtLast(this.parseFileTree(e))
      })
    } else {
      newNode = buildFileNode(this.id, files.name, files.path, files.content)
      this.treenodes.push(newNode)
      this.id += 1
    }
    return newNode
  }

  addFiles (files) {
    // this.graph = this.parseFileTree(files)
    this.graph = buildFolderNode(this.id, files.folderName, files.path)
    this.treenodes.push(this.graph)
    this.id += 1
    if (files.tree) {
      files.tree.forEach(e => {
        this.graph.insertAtLast(this.parseFileTree(e))
      })
    }
  }

  addRelations (relations) {
    console.log('add relations')
    console.log(relations)
  }

  addAerials (aerials) {
    console.log('add aerials')
    console.log(aerials)
  }

  getNodes () {
    const res = []
    for (const node of this.treenodes) {
      res.push(node.toNodeJson())
    }
    return res
  }

  getLinks () {
    let id = 0
    const res = []

    for (const node of this.treenodes) {
      node.children.forEach(chnode => {
        res.push({
          id,
          source: node.content.id,
          target: chnode.content.id,
          type: 0
        })
        id += 1
      })
    }
    return res
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
