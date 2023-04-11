import { listItemTypeName, listTypeName, paragraphTypeName, headingTypeName, rootTypeName, quoteTypeName } from './constant'

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
export const rootNodeType = new BaseNodeType(true, rootTypeName)

export const headingNodeType = new BaseNodeType(true, headingTypeName)
export const paragraphNodeType = new BaseNodeType(false, paragraphTypeName)
export const listNodeType = new BaseNodeType(true, listTypeName)
export const listItemNodeType = new BaseNodeType(false, listItemTypeName)

export const quoteNodeType = new BaseNodeType(true, quoteTypeName)
