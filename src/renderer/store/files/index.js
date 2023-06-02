import IRForest from '@/IR/component/forest'
import GraphManager from '@/IR/manager/graphManager'
import TreeManager from '@/IR/manager/treeManager'
import bus from 'vue3-eventbus'
import { toRaw } from 'vue'

const state = {
  trees: new TreeManager(),
  forest: new IRForest(),
  graph: new GraphManager()
}

const mutations = {
  buildByMarkdownContent (state, { filepath, content }) {
    state.trees.build(filepath, { content })
  },
  updateByMarkdown (state, { filepath, content }) {
    if (filepath) {
      state.trees.update(filepath, { content })
    } else {
      state.trees.updateCurrent({ content })
    }
  },
  updateByMind (state, { filepath, mindJson }) {
    if (filepath) {
      state.trees.update(filepath, { mindJson })
    } else {
      state.trees.updateCurrent({ mindJson })
    }
  },
  closeCurrentFile (state) {
    state.trees.closeCurrentTree()
  },

  // 设置为当前
  setCurrentFile (state, filepath) {
    state.trees.setTreeFromCached(filepath)
  },
  addTag (state, tagname) {
    state.trees.addTag(tagname)
  },
  removeTag (state, tagname) {
    state.trees.removeTag(tagname)
  },
  undo (state) {
    state.trees.undo()
  },
  redo (state) {
    state.trees.redo()
  },

  move (state, pathInfo) {
    state.trees.move(pathInfo.oldPath, pathInfo.newPath)
    bus.emit('renameOpenFiles', pathInfo)
  },

  /** forest */
  updateForest (state, files) {
    state.forest.update(files)
    bus.emit('sendToFicTree', toRaw(state.forest.mind))
  },

  updateForestByMind (state, mind) {
    state.forest.updateByMind(mind)
  },

  addBaseToForest (state, filename) {
    state.forest.addBase(filename)
    bus.emit('sendToFicTree', toRaw(state.forest.mind))
  },

  clearForest (state) {
    state.forest.clear()
    bus.emit('sendToFicTree', toRaw(state.forest.mind))
  },

  exportAll (state) {
    const files = state.forest.exportAll()
    window.electronAPI.exportForest(files, 'out')
    bus.emit('sendToFicTree', toRaw(state.forest.mind))
  },

  /** graph */
  buildGraph (state, info) {
    state.graph.buildGraph(info)
  },

  /**
   * @param {string} name 绝对路径名/tag名
   */
  queryNodeId (state, { name, hidden, timeout }) {
    const id = state.graph.queryNodeId(name)
    if (hidden === undefined) {
      bus.emit('focusById', { id, timeout })
    } else {
      if (hidden !== true) {
        bus.emit('showNode', id)
      } else {
        bus.emit('hideNode', id)
      }
    }
  },

  queryNodesByToken (state, token) {
    const nodes = state.graph.queryNodesByToken(token)
    bus.emit('sendNodesResult', { nodes })
  }
}

const actions = {
  async setCurrentFile (context, { filepath, type }) {
    if (type === 'setting') {
      bus.emit('changeMode', -1)
    } else {
      if (!context.state.trees.containsCached(filepath)) {
        const res = await window.electronAPI.readFile(filepath)
        if (res.error !== -1) {
          context.commit('buildByMarkdownContent', { filepath, content: res.content })
        } else {
          console.error(`读取${filepath}失败`)
        }
      }
      context.commit('setCurrentFile', filepath)
    }
  },

  async updateFilesOfForest (context, filepaths) {
    const files = []
    const validFilepaths = context.state.forest.filterPaths(filepaths)
    for (const filepath of filepaths) {
      if (validFilepaths.indexOf(filepath) !== -1) {
        const file = {
          path: filepath,
          content: (await window.electronAPI.readFile(filepath)).content
        }
        files.push(file)
      } else {
        files.push({ path: filepath })
      }
    }
    context.commit('updateForest', files)
  },

  LISTEN_FILE_MOVE ({ commit }) {
    window.electronAPI.setFilePathByMove((e, pathInfo) => {
      commit('move', pathInfo)
    })
  },

  LISTEN_SET_FOCUS_ID_BY_NAME ({ commit }) {
    window.electronAPI.setFocusIdByName((e, name) => {
      setTimeout(() => commit('queryNodeId', { name }), 300)
    })
  },

  LISTEN_FILE_CHANGED ({ state, commit }) {
    window.electronAPI.listenFileChanged(async (e, filepath) => {
      if (state.trees.containsCached(filepath)) {
        const res = await window.electronAPI.readFile(filepath)
        if (res.error !== -1) {
          commit('updateByMarkdown', { filepath, content: res.content })
        } else {
          console.error(`读取${filepath}失败`)
        }
      }
    })
  }
}

const getters = {
  markdown: (state) => state.trees.markdown,
  mind: (state) => state.trees.mind,
  outline: (state) => state.trees.outline,
  tags: (state) => state.trees.tags,

  forestMind: (state) => state.forest.mind,
  forestMarkdown: (state) => state.forest.markdown,

  graphNodes: (state) => state.graph.nodes,
  graphLinks: (state) => state.graph.links
}

const files = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default files
