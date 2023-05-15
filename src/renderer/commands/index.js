import { bus } from 'vue3-eventbus'

const state = {
  openDev: false
}

/**
 * FIXME: 请在这里添加事件
 */
const commands = [
  {
    id: 'file.open-folder',
    execute: async () => {
      try {
        const projectStat = await window.electronAPI.newFicusVault()
        bus.emit('openDir', projectStat)
      } catch {}
    }
  },
  {
    id: 'format.strong',
    execute: async () => {
      bus.emit('addFormat', { type: 'bold' })
    }
  },
  {
    id: 'window.open-dev-tool',
    execute: async () => {
      if (state.openDev) {
        await window.electronAPI.closeDev()
      } else {
        await window.electronAPI.openDev()
      }
      state.openDev = !state.openDev
    }
  }
]

export default commands
