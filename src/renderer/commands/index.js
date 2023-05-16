import { bus } from 'vue3-eventbus'

const state = {
  openDev: false
}

/**
 * FIXME: 请在这里添加事件
 */
const commands = [
  {
    id: 'edit.cut',
    execute: async () => {
      bus.emit('cutSelectedText')
    }
  },
  {
    id: 'edit.copy',
    execute: async () => {
      bus.emit('copySelectedText', { type: 'text' })
    }
  },
  {
    id: 'edit.copy-as-markdown',
    execute: async () => {
      bus.emit('copySelectedText', { type: 'md' })
    }
  },
  {
    id: 'edit.copy-as-html',
    execute: async () => {
      bus.emit('copySelectedText', { type: 'html' })
    }
  },
  {
    id: 'edit.paste',
    execute: async () => {
      bus.emit('pasteSelectedText', { type: 'origin' })
    }
  },
  {
    id: 'edit.paste-as-plaintext',
    execute: async () => {
      bus.emit('pasteSelectedText', { type: 'plain' })
    }
  },
  {
    id: 'file.open-file',
    execute: async () => {
      const files = await window.electronAPI.openFile()
      for (const file of files) {
        bus.emit('openNewTab', file)
      }
    }
  },
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
    id: 'paragraph.heading-1',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-1' })
    }
  },
  {
    id: 'paragraph.heading-2',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-2' })
    }
  },
  {
    id: 'paragraph.heading-3',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-3' })
    }
  },
  {
    id: 'paragraph.heading-4',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-4' })
    }
  },
  {
    id: 'paragraph.heading-5',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-5' })
    }
  },
  {
    id: 'paragraph.heading-6',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-6' })
    }
  },
  {
    id: 'paragraph.table',
    execute: async () => {
      bus.emit('addBlock', { type: 'table' })
    }
  },
  {
    id: 'paragraph.math-formula',
    execute: async () => {
      bus.emit('addBlock', { type: 'math-block' })
    }
  },
  {
    id: 'paragraph.code-fence',
    execute: async () => {
      bus.emit('addBlock', { type: 'code-block' })
    }
  },
  {
    id: 'paragraph.quote-block',
    execute: async () => {
      bus.emit('addBlock', { type: 'quote' })
    }
  },
  {
    id: 'paragraph.order-list',
    execute: async () => {
      bus.emit('addBlock', { type: 'ordered-list' })
    }
  },
  {
    id: 'paragraph.bullet-list',
    execute: async () => {
      bus.emit('addBlock', { type: 'unordered-list' })
    }
  },
  {
    id: 'paragraph.task-list',
    execute: async () => {
      bus.emit('addBlock', { type: 'task-list' })
    }
  },
  {
    id: 'paragraph.horizontal-line',
    execute: async () => {
      bus.emit('addBlock', { type: 'horizontal-line' })
    }
  },
  {
    id: 'format.strong',
    execute: async () => {
      bus.emit('addFormat', { type: 'bold' })
    }
  },
  {
    id: 'format.emphasis',
    execute: async () => {
      bus.emit('addFormat', { type: 'italic' })
    }
  },
  {
    id: 'format.strike',
    execute: async () => {
      bus.emit('addFormat', { type: 'strike' })
    }
  },
  {
    id: 'format.inline-code',
    execute: async () => {
      bus.emit('addFormat', { type: 'inline-code' })
    }
  },
  {
    id: 'format.inline-math',
    execute: async () => {
      bus.emit('addFormat', { type: 'inline-math' })
    }
  },
  {
    id: 'format.highlight',
    execute: async () => {
      bus.emit('addFormat', { type: 'highlight' })
    }
  },
  {
    id: 'format.hyperlink',
    execute: async () => {
      bus.emit('addFormat', { type: 'link' })
    }
  },
  {
    id: 'format.image',
    execute: async () => {
      bus.emit('addFormat', { type: 'img-link' })
    }
  },
  {
    id: 'format.clear-format',
    execute: async () => {
      bus.emit('removeFormat')
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
