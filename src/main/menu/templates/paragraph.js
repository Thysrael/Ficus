export default function (keybindings) {
  const paragraphMenu = {
    label: '段落',
    submenu: [{
      label: '一级标题',
      id: 'paragraph.heading-1',
      accelerator: keybindings.getAccelerator('paragraph.heading-1'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '二级标题',
      id: 'paragraph.heading-2',
      accelerator: keybindings.getAccelerator('paragraph.heading-2'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '三级标题',
      id: 'paragraph.heading-3',
      accelerator: keybindings.getAccelerator('paragraph.heading-3'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '四级标题',
      id: 'paragraph.heading-4',
      accelerator: keybindings.getAccelerator('paragraph.heading-4'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '五级标题',
      id: 'paragraph.heading-5',
      accelerator: keybindings.getAccelerator('paragraph.heading-5'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '六级标题',
      id: 'paragraph.heading-6',
      accelerator: keybindings.getAccelerator('paragraph.heading-6'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '插入表格',
      id: 'paragraph.table',
      accelerator: keybindings.getAccelerator('paragraph.table'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '数学公式块',
      id: 'paragraph.math-formula',
      accelerator: keybindings.getAccelerator('paragraph.math-formula'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '代码块',
      id: 'paragraph.code-fence',
      accelerator: keybindings.getAccelerator('paragraph.code-fence'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '引用',
      id: 'paragraph.quote-block',
      accelerator: keybindings.getAccelerator('paragraph.quote-block'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '有序列表',
      id: 'paragraph.order-list',
      accelerator: keybindings.getAccelerator('paragraph.order-list'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '无序列表',
      id: 'paragraph.bullet-list',
      accelerator: keybindings.getAccelerator('paragraph.bullet-list'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '任务清单',
      id: 'paragraph.task-list',
      accelerator: keybindings.getAccelerator('paragraph.task-list'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '水平线',
      id: 'paragraph.horizontal-line',
      accelerator: keybindings.getAccelerator('paragraph.horizontal-line'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }]
  }

  return paragraphMenu
}
