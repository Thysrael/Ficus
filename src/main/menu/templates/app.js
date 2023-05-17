import { app } from 'electron'

export default function (keybindings) {
  return {
    label: 'Ficus',
    submenu: [
      {
        label: '退出',
        accelerator: keybindings.getAccelerator('file.quit'),
        click: app.quit
      }
    ]
  }
}
