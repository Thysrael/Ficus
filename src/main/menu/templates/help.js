export default function (keybindings) {
  const viewMenu = {
    label: '帮助',
    submenu: [{
      label: '关于',
      id: 'help.about',
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', menuItem.id)
      }
    }]
  }

  return viewMenu
}
