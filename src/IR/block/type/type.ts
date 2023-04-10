import { TitleTypeName, UnorderedListTypeName } from './constant'

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

export class TitleNodeType extends BaseNodeType {
  constructor () {
    super(true, TitleTypeName)
  }
}

export class UnorderedListNodeType extends BaseNodeType {
  constructor () {
    super(true, UnorderedListTypeName)
  }
}
