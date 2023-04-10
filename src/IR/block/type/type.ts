import { orderedListItemTypeName, orderedListTypeName, paragraphTypeName, taskListItemTypeName, taskListTypeName, headingTypeName, unorderedListItemTypeName, unorderedListTypeName, rootTypeName } from './constant'

export class BaseNodeType {
  private leaf: boolean
  private typeName: string
  constructor (leaf: boolean, typeName: string) {
    this.leaf = leaf
    this.typeName = typeName
  }

  public isLeaf () : boolean {
    return this.leaf
  }

  public getTypeName () : string {
    return this.typeName
  }
}

// 对外暴露已经定义好的类型
export const RootNodeType = new BaseNodeType(true, rootTypeName)
export const headingNodeType = new BaseNodeType(true, headingTypeName)
export const paragraphNodeType = new BaseNodeType(false, paragraphTypeName)
export const orderedListNodeType = new BaseNodeType(true, orderedListTypeName)
export const orderedListItemNodeType = new BaseNodeType(false, orderedListItemTypeName)
export const unorderedListNodeType = new BaseNodeType(true, unorderedListTypeName)
export const unorderedListItemNodeType = new BaseNodeType(false, unorderedListItemTypeName)
export const taskListNodeType = new BaseNodeType(true, taskListTypeName)
export const taskListItemNodeType = new BaseNodeType(false, taskListItemTypeName)
