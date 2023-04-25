import { createStore } from 'vuex'

export default createStore({
  state: {
    xy: {
      x: 0,
      y: 0
    },
    mode: {
      value: -1 // -1表示当前模式为欢迎界面，0表示纯文本，1表示源码，2表示树形，3表示图
    }
  },
  mutations: {
    // 定义mutations，用于修改状态(同步)
    updateXY (state, xy) {
      state.xy = xy
    },
    updateMode (state, mode) {
      state.mode = mode
    }
  },
  actions: {
    // 定义actions，用于修改状态(异步)
    updateXY (context, xy) {
      context.commit('updateXY', xy)
    },
    updateMode (context, mode) {
      context.commit('updateMode', mode)
    }
  },
  getters: {
    // 定义一个getters
    getXY (state) {
      return state.xy.x + '+' + state.xy.y
    },
    // -1表示当前模式为欢迎界面，0表示纯文本，1表示源码，2表示树形，3表示图
    getMode (state) {
      return state.mode.value
    }
  },
  modules: {}
})
