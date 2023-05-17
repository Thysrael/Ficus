import { isOsx } from '@/main/config'
import { app } from 'electron'

export default function (keybindings) {
  const fileMenu = {
    label: '文件',
    submenu: [{
      label: '新建文件',
      accelerator: keybindings.getAccelerator('file.new-tab')
    }, {
      type: 'separator'
    }, {
      label: '打开文件',
      accelerator: keybindings.getAccelerator('file.open-file')
    }, {
      label: '打开文件夹',
      accelerator: keybindings.getAccelerator('file.open-folder')
    }, {
      type: 'separator'
    }, {
      label: '保存文件',
      accelerator: keybindings.getAccelerator('file.save')
    }, {
      label: '重命名当前文件',
      accelerator: keybindings.getAccelerator('file.rename-file')
    }, {
      label: '导出文件',
      submenu: [{
        label: '导出HTML文件'
      }, {
        label: '导出PDF文件'
      }, {
        label: '导出PNG'
      }]
    }, {
      label: '退出',
      accelerator: keybindings.getAccelerator('file.quit'),
      visible: !isOsx,
      click: app.quit
    }]
  }

  return fileMenu
}
