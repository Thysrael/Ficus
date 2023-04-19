const { app, dialog } = require('electron')
const fs = require('fs-extra')
const { getTree } = require('./getFileTree')

// 打开文件：
exports.getFileFromUser = async () => {
  return await dialog.showOpenDialog({
    buttonLabel: '选择',
    defaultPath: app.getPath('desktop'),
    properties: ['multiSelections', 'createDirectory', 'openFile'],
    filters: [ // filters属性允许我们指定应用程序应该能够打开那些类型的文件，并禁止不符合我们标准的任何文件。
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'images', extensions: ['jpg', 'png'] }
    ]
  }).then((result) => {
    if (result.canceled === true) {
      return []
    }
    const filePaths = result.filePaths
    const fileObjs = []
    for (const filePath of filePaths) {
      const content = fs.readFileSync(filePath).toString()
      const pathSplit = filePath.split('\\')
      const fileName = pathSplit[pathSplit.length - 1]
      const file = {
        name: fileName, // 文件名
        curChild: -1, // 直接填充-1即可
        path: filePath, // 绝对路径
        absolutePath: pathSplit, // 希望将绝对路径分割成数组
        offset: -1, // 直接填充-1即可
        children: [], // 对于文件没有子节点则填充空数组，对于文件夹则嵌套文件,
        content // 文件内容
      }
      file.type = 'file'
      const index = filePath.lastIndexOf('.')
      const ext = filePath.substring(index + 1)
      const isMd = (ext === 'md')
      file.isMd = isMd
      fileObjs.push(file)
    }
    return fileObjs
  })
}
// 打开文件夹：
exports.getFolderFromUser = async () => {
  return await dialog.showOpenDialog({
    buttonLabel: '选择',
    defaultPath: app.getPath('desktop'),
    properties: ['createDirectory', 'openDirectory'],
    filters: [ // filters属性允许我们指定应用程序应该能够打开那些类型的文件，并禁止不符合我们标准的任何文件。
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'images', extensions: ['jpg', 'png'] }
    ]
  }).then(async (result) => {
    if (result.canceled === true) {
      return []
    }
    const folderPath = result.filePaths[0]
    const pathSplit = folderPath.split('\\')
    const folderName = pathSplit[pathSplit.length - 1]
    const tree = await getTree(folderPath, folderName)
    // console.log(tree.children[0].absolutePath[2])
    const folder = {
      name: folderName, // 文件名
      curChild: -1, // 直接填充-1即可
      path: folderPath, // 绝对路径
      absolutePath: pathSplit, // 希望将绝对路径分割成数组
      offset: -1, // 直接填充-1即可
      children: tree.children.filter(item => item.name !== '.ficus'), // 对于文件没有子节点则填充空数组，对于文件夹则嵌套文件,
      content: '', // 文件内容
      type: 'folder'
    }
    // console.log(folder)
    return folder
  })
}

// 读取文件内容:
exports.readFile = (filePath) => {
  return fs.readFileSync(filePath).toString()
}

// 保存文件：
exports.saveFile = (filePath, fileContent) => {
  console.log(filePath)
  console.log(fileContent)
  fs.writeFile(filePath, fileContent, (err) => {
    // 写入失败
    if (err) {
      console.log(`Fail:(${err})`)
    }
    // 写入成功
    console.log('Success!')
  })
}

// 文件另存为：
exports.saveToTarget = (fileContent) => {
  dialog.showSaveDialog({
    buttonLabel: '保存',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles', 'createDirectory'],
    filters: [ // filters属性允许我们指定应用程序应该能够打开那些类型的文件，并禁止不符合我们标准的任何文件。
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'images', extensions: ['jpg', 'png'] }
    ]
  }).then((result) => {
    console.log(result)
    fs.writeFileSync(result.filePath, fileContent)
  })
}
