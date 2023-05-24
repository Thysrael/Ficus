import { bus } from 'vue3-eventbus'
import { createStore } from 'vuex'
import filesManager from './dataManager'
import commands from '../commands'

const executeCommand = (state, eventId) => {
  const command = commands.filter(e => e.id === eventId)
  if (command[0]) {
    command[0].execute()
  }
}

const state = {
  xy: {
    x: 0,
    y: 0
  },
  mode: {
    value: -1 // -1表示当前模式为欢迎界面，0表示纯文本，1表示源码，2表示树形，3表示图
  },
  sideBarWidth: {
    value: 0
  },
  common: {
    saveTime: 10, // 自动保存时间
    autoSave: true, // 是否自动保存
    autoFullScreen: true, // 启动时是否自动全屏
    autoUpdate: true, // 是否自动更新
    sideBarInitWidth: 250 // sideBar的初始宽度
  },
  editor: {
    fontSize: 14,
    showLineNumber: true,
    toolBar: {
      bold: true,
      italic: true,
      strike: true,
      inlineCode: true,
      inlineMath: true,
      clear: true
    },
    imgPath: '',
    autoSpace: false,
    autoFixTermTypo: false,
    latexEngine: 'KaTex',
    codeTheme: 'github',
    svPreview: true
  },
  shortcuts: {
    'file.open-file': 'Ctrl+O',
    'file.open-folder': 'Ctrl+Shift+O'
  },
  ficus: {
    tree: 1,
    forest: 2,
    graphIgnore: '.txt'
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
  updateCommon (state, common) {
    state.common = common
  },
  updateEditor (state, editor) {
    state.editor = editor
  },
  updateShortCuts (state, shortcuts) {
    state.shortcuts = shortcuts
  },
  updateFicus (state, ficus) {
    state.ficus = ficus
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
  updateCommon (context, common) {
    context.commit('updateCommon', common)
  },
  updateEditor (context, editor) {
    context.commit('updateEditor', editor)
  },
  updateShortCuts (context, shortcuts) {
    context.commit('updateShortCuts', shortcuts)
  },
  updateFicus (context, ficus) {
    context.commit('updateFicus', ficus)
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
  LISTEN_KEYBOARD_EVENT ({ commit }) {
    window.electronAPI.keyboardEvent((e, eventId) => {
      executeCommand(state, eventId)
    })
    bus.on('cmd::execute', eventId => {
      executeCommand(state, eventId)
    })
  }
}

const getters = {
  // 定义一个getters
  getXY (state) {
    return state.xy.x + '+' + state.xy.y
  },
  // -1：表示当前模式为欢迎界面，0表示纯文本，1表示源码，2表示树形，3表示图
  getMode (state) {
    return state.mode.value
  },
  getSideBarWidth (state) {
    return (state.sideBarWidth.value === 0) ? state.common.sideBarInitWidth : state.sideBarWidth.value
  },
  getCommon (state) {
    return state.common
  },
  getEditor (state) {
    return state.editor
  },
  getShortCuts (state) {
    return state.shortcuts
  },
  getFicus (state) {
    return state.ficus
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
