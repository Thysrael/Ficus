import { isOsx } from '@/main/config'
import { app } from 'electron'
export default function (keybindings, recentlyUsedDocuments) {
  const fileMenu = {
    label: '文件',
    submenu: [{
      label: '新建文件',
      id: 'file.new-file',
      accelerator: keybindings.getAccelerator('file.new-file'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      type: 'separator'
    }, {
      label: '打开文件',
      id: 'file.open-file',
      accelerator: keybindings.getAccelerator('file.open-file'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '打开文件夹',
      id: 'file.open-folder',
      accelerator: keybindings.getAccelerator('file.open-folder'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }]
  }
  const recentlyUsedMenu = {
    label: '打开最近…',
    submenu: []
  }
  for (const item of recentlyUsedDocuments) {
    recentlyUsedMenu.submenu.push({
      label: item,
      id: 'file.open-folder-by-path',
      meta: {
        id: 'file.open-folder-by-path',
        pathname: item
      },
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', menuItem.meta)
      }
    })
  }
  recentlyUsedMenu.submenu.push({
    type: 'separator',
    visible: recentlyUsedDocuments.length > 0
  }, {
    label: '清空最近使用文件',
    id: 'file.clear-recently-used-files',
    enabled: recentlyUsedDocuments.length > 0,
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
    }
  })
  fileMenu.submenu.push(recentlyUsedMenu)
  fileMenu.submenu.push({
    type: 'separator'
  }, {
    label: '保存当前文件',
    id: 'file.save',
    accelerator: keybindings.getAccelerator('file.save'),
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
    }
  }, {
    label: '另存为',
    id: 'file.save-as',
    accelerator: keybindings.getAccelerator('file.save-as'),
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
    }
  }, {
    label: '重命名当前文件',
    id: 'file.rename-file',
    accelerator: keybindings.getAccelerator('file.rename-file'),
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
    }
  }, {
    label: '关闭当前标签页',
    id: 'file.close-tab',
    accelerator: keybindings.getAccelerator('file.close-tab'),
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
    }
  }, {
    label: '导出文件',
    submenu: [{
      label: '导出HTML文件',
      id: 'file.export-as-html',
      accelerator: keybindings.getAccelerator('file.export-as-html'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '导出PDF文件',
      id: 'file.export-as-pdf',
      accelerator: keybindings.getAccelerator('file.export-as-pdf'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: '导出PNG',
      id: 'file.export-as-png',
      accelerator: keybindings.getAccelerator('file.export-as-png'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }]
  }, {
    label: '退出',
    id: 'file.quit',
    accelerator: keybindings.getAccelerator('file.quit'),
    visible: !isOsx,
    click (menuItem, browserWindow) {
      if (isOsx) {
        app.quit()
      } else {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }
  })

  return fileMenu
}
