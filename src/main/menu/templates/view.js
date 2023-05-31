export default function (keybindings) {
  const viewMenu = {
    label: '显示',
    submenu: [{
      label: '文本模式',
      id: 'view.text-mode',
      type: 'checkbox',
      checked: false, // TODO: 互斥判断
      accelerator: keybindings.getAccelerator('view.text-mode'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '源码模式',
      id: 'view.source-code-mode',
      type: 'checkbox',
      checked: false,
      accelerator: keybindings.getAccelerator('view.source-code-mode'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '榕树模式',
      id: 'view.ficus-mode',
      type: 'checkbox',
      checked: false,
      accelerator: keybindings.getAccelerator('view.ficus-mode'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '开发者工具',
      id: 'view.toggle-dev-tools',
      accelerator: keybindings.getAccelerator('view.toggle-dev-tools'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '打字机模式',
      id: 'view.typewriter-mode',
      type: 'checkbox',
      checked: false,
      accelerator: keybindings.getAccelerator('view.typewriter-mode'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }]
  }

  return viewMenu
}
