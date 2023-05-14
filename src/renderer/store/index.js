import { bus } from 'vue3-eventbus'
import { createStore } from 'vuex'
import filesManager from './dataManager'
import commands from '../commands'

const state = {
  xy: {
    x: 0,
    y: 0
  },
  mode: {
    value: -1 // -1表示当前模式为欢迎界面，0表示纯文本，1表示源码，2表示树形，3表示图
  },
  sideBarWidth: {
    value: 250
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
  updateSideBarWidth (state, sideBarWidth) {
    state.sideBarWidth = sideBarWidth
  },
  REFRESH (state, status) {
    bus.emit('openDir', status)
  },
  OPENINITFILE (state, initInfo) {
    bus.emit('openDir', initInfo[0])
    if (initInfo[1] != null) {
      bus.emit('openNewTab', initInfo[1])
    }
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
  updateSideBarWidth (context, sideBarWidth) {
    context.commit('updateSideBarWidth', sideBarWidth)
  },
  LISTEN_REFRESH ({ commit }) {
    window.electronAPI.passiveRefresh((e, value) => {
      commit('REFRESH', value)
    })
  },
  LISTEN_OPENINITFILE ({ commit }) {
    window.electronAPI.openInitFile((e, value) => {
      commit('OPENINITFILE', value)
    })
  },
  LISTEN_KEYBOARD_EVENT () {
    window.electronAPI.keyboardEvent((e, eventId) => {
      const command = commands.filter(e => e.id === eventId)
      if (command[0]) {
        command[0].execute()
      }
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
  },
  getSideBarWidth (state) {
    return state.sideBarWidth.value
  }
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    filesManager
  }
})
