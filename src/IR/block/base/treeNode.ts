import { BaseNodeType } from '../type/type'
import { Content } from './content'
import LinkedNode from './linkedList/linkedNode'

class TreeNode extends LinkedNode {
  private nodeType: BaseNodeType
  private content: Content
  private classList: string[]
  private attributes: any
  private datasets: any

  constructor (nodeType: BaseNodeType, content: Content) {
    super()
    this.nodeType = nodeType
    this.content = content
    // DOM相关
    this.classList = []
    this.attributes = {}
    this.datasets = {}
  }

  public isLeafNode (): boolean {
    return this.nodeType.isLeaf()
  }

  public toMarkdown (): string {
    let res = this.content.toMarkdown()
    this.children.forEach((ch: TreeNode) => {
      res += ch.toMarkdown()
    })
    return res
  }
}

export default TreeNode
