import { TitleNodeType } from './type'

class TypeManager {
  private typeContainer: object
  private constructor () {
    this.typeContainer = Object.freeze({
      TitleTypeName: new TitleNodeType()
    })
  }
}
