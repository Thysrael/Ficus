const {
  listItemTypeName,
  listTypeName,
  paragraphTypeName,
  headingTypeName,
  rootTypeName,
  quoteTypeName
} = require('./constant')
class BaseNodeType {
  // private leaf: boolean
  // private typeName: string
  constructor (leaf, typeName) {
    this.leaf = leaf
    this.typeName = typeName
  }

  isLeaf () {
    return this.leaf
  }

  getTypeName () {
    return this.typeName
  }
}
exports.BaseNodeType = BaseNodeType

// 对外暴露已经定义好的类型
exports.rootNodeType = new BaseNodeType(true, rootTypeName)
exports.headingNodeType = new BaseNodeType(true, headingTypeName)
exports.paragraphNodeType = new BaseNodeType(false, paragraphTypeName)
exports.listNodeType = new BaseNodeType(true, listTypeName)
exports.listItemNodeType = new BaseNodeType(false, listItemTypeName)
exports.quoteNodeType = new BaseNodeType(true, quoteTypeName)
