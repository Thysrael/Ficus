import path from 'path'

export default function (keybindings) {
  const viewMenu = {
    label: '帮助',
    submenu: [{
      label: '关于',
      id: 'help.about',
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', menuItem.id)
      }
    }, {
      label: '内置文档',
      submenu: [{
        label: '功能规格说明书',
        id: 'file.open-file-by-path',
        meta: {
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
