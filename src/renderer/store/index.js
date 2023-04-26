import { createStore } from 'vuex'

const state = {
  mode: {
    value: -1 // -1表示当前模式为欢迎界面，0表示纯文本，1表示源码，2表示树形，3表示图
  }
}

const mutations = {
  updateMode (state, mode) {
    state.mode = mode
  }
}

const actions = {
  updateMode (context, mode) {
    context.commit('updateMode', mode)
  }
}

const getters = {
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
