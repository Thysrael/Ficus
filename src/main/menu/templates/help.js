import path from 'path'

export default function (keybindings) {
  const viewMenu = {
    label: '帮助',
    submenu: [{
      label: '关于',
      id: 'help.about',
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '内置文档',
      submenu: [{
        label: '功能规格说明书',
        meta: {
          id: 'file.open-file-by-path',
          filepath: path.resolve(__dirname, '../static/docs/功能规格说明书.md')
        },
        click (menuItem, browserWindow) {
          browserWindow.webContents.send('open-file-tab', menuItem.meta.filepath)
        }
      }]
    }]
  }

  return viewMenu
}
