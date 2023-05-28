export default function (keybindings) {
  const formatMenu = {
    label: '格式',
    submenu: [{
      label: '加粗',
      id: 'format.strong',
      accelerator: keybindings.getAccelerator('format.strong'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '斜体',
      id: 'format.emphasis',
      accelerator: keybindings.getAccelerator('format.emphasis'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '删除线',
      id: 'format.strike',
      accelerator: keybindings.getAccelerator('format.strike'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '行内代码',
      id: 'format.inline-code',
      accelerator: keybindings.getAccelerator('format.inline-code'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '行内数学公式',
      id: 'format.inline-math',
      accelerator: keybindings.getAccelerator('format.inline-math'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '高亮',
      id: 'format.highlight',
      accelerator: keybindings.getAccelerator('format.highlight'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '引用文件',
      id: 'format.filelink',
      accelerator: keybindings.getAccelerator('format.filelink'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '超链接',
      id: 'format.hyperlink',
      accelerator: keybindings.getAccelerator('format.hyperlink'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '图像',
      id: 'format.image',
      accelerator: keybindings.getAccelerator('format.image'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '清除样式',
      id: 'format.clear-format',
      accelerator: keybindings.getAccelerator('format.clear-format'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }]
  }

  return formatMenu
}
