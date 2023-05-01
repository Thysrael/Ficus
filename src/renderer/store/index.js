import { bus } from 'vue3-eventbus'
import { createStore } from 'vuex'

const state = {
  xy: {
    x: 0,
    y: 0
  },
  mode: {
    value: -1 // -1表示当前模式为欢迎界面，0表示纯文本，1表示源码，2表示树形，3表示图
  }
}

const mutations = {
  // 定义mutations，用于修改状态(同步)
  updateXY (state, xy) {
    state.xy = xy
  },
  updateMode (state, mode) {
    state.mode = mode
  },
  REFRESH (state, status) {
    bus.emit('openDir', status)
  }
}

const actions = {
  // 定义actions，用于修改状态(异步)
  updateXY (context, xy) {
    context.commit('updateXY', xy)
  },
  updateMode (context, mode) {
    context.commit('updateMode', mode)
  },
  LISTEN_REFRESH ({ commit }) {
    window.electronAPI.passiveRefresh((e, value) => {
      commit('REFRESH', value)
    })
  }
}

const getters = {
  // 定义一个getters
  getXY (state) {
    return state.xy.x + '+' + state.xy.y
  },
  getMode (state) {
    return state.mode.value
  }
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})
