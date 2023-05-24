import IRForest from '@/IR/component/forest'
import GraphManager from '@/IR/manager/graphManager'
import TreeManager from '@/IR/manager/treeManager'
import bus from 'vue3-eventbus'

const state = {
  trees: new TreeManager(),
  forest: new IRForest(),
  graph: new GraphManager()
}

const mutations = {
  buildByMarkdownContent (state, fileStats) {
    state.trees.build(fileStats.filepath, { content: fileStats.content })
  },
  updateByMarkdown (state, fileStats) {
    if (fileStats.filepath) {
      state.trees.update(fileStats.filepath, { content: fileStats.content })
    } else {
      state.trees.updateCurrent({ content: fileStats.content })
    }
  },
  updateByMind (state, fileStats) {
    if (fileStats.filepath) {
      state.trees.update(fileStats.filepath, { mindJson: fileStats.mindJson })
    } else {
      state.trees.updateCurrent({ mindJson: fileStats.mindJson })
    }
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
  buildForest (state, files) {
    state.forest.build(files)
  },

  addFilesToForest (state, files) {
    state.forest.addFiles(files)
  },

  addBaseToForest (state, filename) {
    state.forest.addBase(filename)
  },

  clearForest (state) {
    state.forest.clear()
  },

  exportAll (state) {
    const files = state.forest.exportAll()
    console.log(files) // TODO: 保存
  },

  /** graph */
  buildGraph (state, info) {
    state.graph.buildGraph(info)
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
          throw new Error(`读取${filepath}失败`)
        }
      }
      context.commit('setCurrentFile', filepath)
    }
  },

  async makeForest ({ commit }, filepaths) {
    const files = []
    for (const filepath of filepaths) {
      const file = {
        path: filepath,
        content: await window.electronAPI.readFile(filepath)
      }
      files.push(file)
    }
    commit('buildForest', files)
  },

  async addFilesToForest ({ commit }, filepaths) {
    const files = []
    for (const filepath of filepaths) {
      const file = {
        path: filepath,
        content: await window.electronAPI.readFile(filepath)
      }
      files.push(file)
    }
    commit('addFilesToForest', files)
  },

  LISTEN_FILE_MOVE ({ commit }) {
    window.electronAPI.setFilePathByMove((e, pathInfo) => {
      commit('move', pathInfo)
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

const filesManager = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default filesManager
