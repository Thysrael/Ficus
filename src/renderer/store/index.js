import { createStore } from 'vuex'

export default createStore({
  state: {
    xy: {
      x: 0,
      y: 0
    }
  },
  mutations: {
    // 定义mutations，用于修改状态(同步)
    updateXY (state, xy) {
      state.xy = xy
    }
  },
  actions: {
    // 定义actions，用于修改状态(异步)
    updateXY (context, xy) {
      context.commit('updateXY', xy)
    }
  },
  getters: {
    // 定义一个getters
    getXY (state) {
      return state.xy.x + '+' + state.xy.y
    }
  },
  modules: {}
})
