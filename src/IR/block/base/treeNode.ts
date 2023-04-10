import { BaseNodeType } from '../type/type'
import LinkedNode from './linkedList/linkedNode'

class TreeNode extends LinkedNode {
  private nodeType: BaseNodeType
  constructor (nodeType) {
    super()
    this.nodeType = nodeType
  }
}
