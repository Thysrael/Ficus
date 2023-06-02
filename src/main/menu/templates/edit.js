export default function (keybindings) {
  const editMenu = {
    label: '编辑',
    submenu: [{
      label: '撤销',
      id: 'edit.undo',
      accelerator: keybindings.getAccelerator('edit.undo'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '重做',
      id: 'edit.redo',
      accelerator: keybindings.getAccelerator('edit.redo'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '剪切',
      id: 'edit.cut',
      accelerator: keybindings.getAccelerator('edit.cut'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '复制为纯文本',
      id: 'edit.copy',
      accelerator: keybindings.getAccelerator('edit.copy'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '复制为Markdown',
      id: 'edit.copy-as-markdown',
      accelerator: keybindings.getAccelerator('edit.copy-as-markdown'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '复制为HTML代码',
      id: 'edit.copy-as-html',
      accelerator: keybindings.getAccelerator('edit.copy-as-html'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '粘贴',
      id: 'edit.paste',
      accelerator: keybindings.getAccelerator('edit.paste'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '粘贴为纯文本',
      id: 'edit.paste-as-plaintext',
      accelerator: keybindings.getAccelerator('edit.paste-as-plaintext'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '文档内搜索替换',
      id: 'edit.find',
      accelerator: keybindings.getAccelerator('edit.find'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '删除',
      id: 'edit.delete',
      accelerator: keybindings.getAccelerator('edit.delete'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }]
  }

  return editMenu
}
