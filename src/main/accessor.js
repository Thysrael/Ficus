import AppMenu from './menu'

/**
 * 初始化ficus环境，并读取各项配置
 */
class Accessor {
  constructor () {
    this.menu = new AppMenu()
  }
}

const accessor = new Accessor()
export default accessor
