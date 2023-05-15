import { bus } from 'vue3-eventbus'

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
  }
]

export default commands
