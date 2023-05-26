import { bus } from 'vue3-eventbus'
import { createStore } from 'vuex'
import files from './files'
import commands from '../commands'

const executeCommand = (state, eventId, meta) => {
  const command = commands.filter(e => e.id === eventId)
  if (command[0]) {
    command[0].execute(meta)
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
    saveTime: 30, // 自动保存时间
    autoSave: true, // 是否自动保存
    autoFullScreen: true, // 启动时是否自动全屏
    autoUpdate: true, // 是否自动更新
    sideBarInitWidth: 250 // sideBar的初始宽度
  },
  editor: {
    fontSize: 14,
    showLineNumber: false,
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
  },
  OPEN_FILE_TAB (state, filepath) {
    bus.emit('openNewTab', {
      name: window.pathAPI.basename(filepath),
      path: filepath,
      absolutePath: filepath.split(window.pathAPI.sep),
      type: 'file',
      offset: -1
    })
  },
  LOAD_PREFERENCES (state, preferences) {
    state.common.saveTime = preferences.saveTime
    state.common.autoSave = preferences.autoSave
    state.common.autoFullScreen = preferences.autoFullScreen
    state.common.autoUpdate = preferences.autoUpdate
    state.common.sideBarInitWidth = preferences.sideBarInitWidth

    state.editor.fontSize = preferences.fontSize
    state.editor.showLineNumber = preferences.showLineNumber
    state.editor.toolBar.bold = preferences.bold
    state.editor.toolBar.italic = preferences.italic
    state.editor.toolBar.strike = preferences.strike
    state.editor.toolBar.inlineCode = preferences.inlineCode
    state.editor.toolBar.inlineMath = preferences.inlineMath
    state.editor.toolBar.clear = preferences.clear
    state.editor.imgPath = preferences.imgPath
    state.editor.autoSpace = preferences.autoSpace
    state.editor.autoFixTermTypo = preferences.autoFixTermTypo
    state.editor.latexEngine = preferences.latexEngine
    state.editor.codeTheme = preferences.codeTheme
    state.editor.svPreview = preferences.svPreview
    state.sideBarWidth.value = preferences.sideBarInitWidth

    bus.emit('changeSideBarWidth')
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

  SAVE_PREFERENCES ({ state }) {
    const preferences = {
      saveTime: state.common.saveTime,
      autoSave: state.common.autoSave,
      autoFullScreen: state.common.autoFullScreen,
      autoUpdate: state.common.autoUpdate,
      sideBarInitWidth: state.common.sideBarInitWidth,
      fontSize: state.editor.fontSize,
      showLineNumber: state.editor.showLineNumber,
      bold: state.editor.toolBar.bold,
      italic: state.editor.toolBar.italic,
      strike: state.editor.toolBar.strike,
      inlineCode: state.editor.toolBar.inlineCode,
      inlineMath: state.editor.toolBar.inlineMath,
      clear: state.editor.toolBar.clear,
      imgPath: state.editor.imgPath,
      autoSpace: state.editor.autoSpace,
      autoFixTermTypo: state.editor.autoFixTermTypo,
      latexEngine: state.editor.latexEngine,
      codeTheme: state.editor.codeTheme,
      svPreview: state.editor.svPreview
    }
    window.electronAPI.setPreferences(preferences)
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
  LISTEN_OPEN_FILE_TAB ({ commit }) {
    window.electronAPI.openFileTab((e, filepath) => {
      commit('OPEN_FILE_TAB', filepath)
    })
  },
  LISTEN_KEYBOARD_EVENT ({ commit }) {
    window.electronAPI.keyboardEvent((e, id) => {
      executeCommand(state, id)
    })
    bus.on('cmd::execute', ({ id, meta }) => {
      executeCommand(state, id, meta)
    })
  },
  LISTEN_LOAD_PREFERENCES ({ commit }) {
    window.electronAPI.loadPreferences((e, preferences) => {
      commit('LOAD_PREFERENCES', preferences)
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
    return state.sideBarWidth.value
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
    files
  }
})
