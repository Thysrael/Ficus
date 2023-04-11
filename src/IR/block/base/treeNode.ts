import { BaseNodeType } from '../type/type'
import LinkedNode from './linkedList/linkedNode'

class TreeNode extends LinkedNode {
  private nodeType: BaseNodeType
  private classList: string[]
  private attributes: {}
  private datasets: {}

  constructor (nodeType: BaseNodeType) {
    super()
    this.nodeType = nodeType
    // DOM相关
    this.classList = []
    this.attributes = {}
    this.datasets = {}
  }

  public isLeafNode (): boolean {
    return this.nodeType.isLeaf()
  }
}

export default TreeNode
