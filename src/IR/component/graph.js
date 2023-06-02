import { buildFolderNode, buildFileNode, buildTagNode } from '../block/factory/buildNode'
const linkType = {
  file: 0,
  tag: 1,
  cite: 2
}
export default class IRGraph {
  constructor (files, relations = [], aerials = []) {
    this._initID()
    this.graph = undefined
    // node
    this.treenodes = []
    this.tagnodes = []
    // links
    this.edges = []
    this.relations = []
    this.aerials = []
    // init
    this.idMap = new Map()

    this.addFiles(files)
    this.addRelations(relations)
    this.addAerials(aerials)
  }

  addFiles (files) {
    this.graph = this._parseFileTree(files, 1)
    this._makeEdges()
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
      const tagNodeId = this._allocNodeID()
      this.idMap.set(tagInfo.tagName, tagNodeId)
      const tagNode = buildTagNode(tagNodeId, tagInfo.tagName)
      this.tagnodes.push(tagNode)
      tagInfo.attach.forEach(filepath => {
        if (pathToNodeId.has(filepath)) {
          this.relations.push({
            id: this._allocLinkID(),
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
      if (pathToNodeId.has(aerialInfo.sourcePath) && pathToNodeId.has(aerialInfo.targetPath)) {
        this.aerials.push({
          id: this._allocLinkID(),
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

  queryNodeId (name) {
    return this.idMap.get(name) || -1
  }

  queryNodesByToken (token) {
    const nodes = this.getNodes()
    const res = []
    for (const node of nodes) {
      if (node.name.indexOf(token) !== -1) {
        res.push(node)
      }
    }
    return res
  }

  getLinks () {
    return this.edges.concat(this.relations).concat(this.aerials)
  }

  /** private */
  _makeEdges () {
    for (const node of this.treenodes) {
      node.children.forEach(chnode => {
        this.edges.push({
          id: this._allocLinkID(),
          source: node.content.id,
          target: chnode.content.id,
          type: linkType.file
        })
      })
    }
  }

  /**
   * 获得一个独有的nodeID
   */
  _allocNodeID () {
    return this.nodeid++
  }

  /**
   * 获得一个独有的linkID
   */
  _allocLinkID () {
    return this.linkid++
  }

  _initID () {
    this.nodeid = 1
    this.linkid = 0
  }

  /**
     * private
     * @param {{name: string, path: string, children: [any], type: string}} fileOrFolder
     * @returns
     */
  _parseFileTree (fileOrFolder, depth) {
    let newNode
    const { type, path, name, children, isMd } = fileOrFolder
    if (type === 'folder') {
      const subNodes = []
      children.forEach(e => {
        const chnode = this._parseFileTree(e, depth + 1)
        if (chnode) {
          subNodes.push(chnode)
        }
      })
      // 只有根节点或有孩子节点的文件夹显示
      if (subNodes.length >= 1 || depth === 1) {
        const nid = depth === 1 ? 0 : this._allocNodeID()
        this.idMap.set(path, nid)
        newNode = buildFolderNode(nid, name, path, depth)
        this.treenodes.push(newNode)
        subNodes.forEach(node => newNode.insertAtLast(node))
      }
    } else if (isMd) {
      const nid = this._allocNodeID()
      this.idMap.set(path, nid)
      newNode = buildFileNode(nid, name, path, depth)
      this.treenodes.push(newNode)
    }
    return newNode
  }
}
