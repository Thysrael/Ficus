const { app, dialog } = require('electron')
const fs = require('fs-extra')
const { getTree } = require('./getFileTree')
const path = require('path')
const os = require('os')
const { changeRelation, clearDir } = require('./general')
// 跳转到引用：
exports.linkToFile = async (filePath) => {
  if (fs.existsSync(filePath) === false) return null
  const content = fs.readFileSync(filePath).toString()
  let pathSplit = ''
  if (os.platform().toString() === 'win32') {
    pathSplit = filePath.split('\\')
  } else if (os.platform().toString() === 'linux' || os.platform().toString() === 'darwin') {
    pathSplit = filePath.split('/')
  }
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
  return file
}
// 删除文件
exports.deleteFile = (filePath, projPath) => {
  fs.unlink(filePath, async function (err) {
    if (err) throw err
    // 如果没有错误，则文件已成功删除
    console.log('File deleted!')
    await changeRelation(projPath)
  })
}
// 重命名文件或文件夹
exports.renameFileOrFolder = async (newPath, oldPath, projPath) => {
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      console.log('no such file or directory')
    } else {
      console.log('File Renamed.')
    }
  })
  await changeRelation(projPath)
}

// 删除文件夹
exports.deleteFolder = async (folderPath, projPath) => {
  clearDir(folderPath)
  await changeRelation(projPath)
}
// 新建文件1
exports.newFileFromDialog = async (projPath) => {
  return await dialog.showSaveDialog({
    buttonLabel: '新建',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles'],
    filters: [ // filters属性允许我们指定应用程序应该能够打开那些类型的文件，并禁止不符合我们标准的任何文件。
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'images', extensions: ['jpg', 'png'] }
    ]
  }).then(async (result) => {
    if (result.canceled === true) {
      return []
    }
    const fd = fs.openSync(result.filePath, 'w')
    if (result.filePath.startsWith(projPath)) {
      let pathSplit = ''
      if (os.platform().toString() === 'win32') {
        pathSplit = projPath.split('\\')
      } else if (os.platform().toString() === 'linux' || os.platform().toString() === 'darwin') {
        pathSplit = projPath.split('/')
      }
      const folderName = pathSplit[pathSplit.length - 1]
      // console.log(result.filePaths[0])
      const tree = await getTree(projPath, folderName)
      await changeRelation(projPath)
      fs.close(fd, (err) => {
        if (err) { console.error('Failed to close file', err) }
      })
      return tree.children.filter(item => item.name !== '.ficus')
    } else {
      fs.close(fd, (err) => {
        if (err) { console.error('Failed to close file', err) }
      })
      return []
    }
  })
}
// 新建文件2
exports.newFileFromSidebar = async (filePath, fileName, projPath) => {
  const pos = path.join(filePath, fileName)
  const fd = fs.openSync(pos, 'w')
  await changeRelation(projPath)
  fs.close(fd, (err) => {
    if (err) { console.error('Failed to close file', err) }
  })
}

// 新建文件夹1
exports.newFolderFromDialog = async (projPath) => {
  return await dialog.showOpenDialog({
    buttonLabel: '新建',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles', 'createDirectory', 'openDirectory'],
    filters: [ // filters属性允许我们指定应用程序应该能够打开那些类型的文件，并禁止不符合我们标准的任何文件。
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'images', extensions: ['jpg', 'png'] }
    ]
  }).then(async (result) => {
    // fs.mkdir(result, { recursive: true }, err => {
    //   if (err) console.log(`mkdir path: ${basePath} err`)
    // })
    if (result.canceled === true) {
      return []
    }
    if (result.filePaths[0].startsWith(projPath)) {
      let pathSplit = ''
      if (os.platform().toString() === 'win32') {
        pathSplit = projPath.split('\\')
      } else if (os.platform().toString() === 'linux' || os.platform().toString() === 'darwin') {
        pathSplit = projPath.split('/')
      }
      const folderName = pathSplit[pathSplit.length - 1]
      // console.log(result.filePaths[0])
      const tree = await getTree(projPath, folderName)
      // console.log(tree)
      await changeRelation(projPath)
      return tree.children.filter(item => item.name !== '.ficus')
    } else {
      return []
    }
  })
}
// 新建文件夹2
exports.newFolderFromSidebar = async (folderPath, folderName, projPath) => {
  const basePath = path.join(folderPath, folderName)
  fs.mkdir(basePath, { recursive: true }, err => {
    if (err) console.log(`mkdir path: ${basePath} err`)
  })
  await changeRelation(projPath)
}

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
      let pathSplit = ''
      if (os.platform().toString() === 'win32') {
        pathSplit = filePath.split('\\')
      } else if (os.platform().toString() === 'linux' || os.platform().toString() === 'darwin') {
        pathSplit = filePath.split('/')
      }
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
    let pathSplit = ''
    if (os.platform().toString() === 'win32') {
      pathSplit = folderPath.split('\\')
    } else if (os.platform().toString() === 'linux' || os.platform().toString() === 'darwin') {
      pathSplit = folderPath.split('/')
    }
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
exports.saveToTarget = async (fileContent, projPath) => {
  dialog.showSaveDialog({
    buttonLabel: '保存',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles', 'createDirectory'],
    filters: [ // filters属性允许我们指定应用程序应该能够打开那些类型的文件，并禁止不符合我们标准的任何文件。
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'images', extensions: ['jpg', 'png'] }
    ]
  }).then(async (result) => {
    if (result.canceled === true) {
      return []
    } else {
      fs.writeFileSync(result.filePath, fileContent)
      if (result.filePath.startsWith(projPath)) {
        let pathSplit = ''
        if (os.platform().toString() === 'win32') {
          pathSplit = projPath.split('\\')
        } else if (os.platform().toString() === 'linux' || os.platform().toString() === 'darwin') {
          pathSplit = projPath.split('/')
        }
        const folderName = pathSplit[pathSplit.length - 1]
        // console.log(result.filePaths[0])
        const tree = await getTree(projPath, folderName)
        await changeRelation(projPath)
        return tree.children.filter(item => item.name !== '.ficus')
      } else {
        return []
      }
    }
  })
}

exports.saveToPDFTarget = (fileContent) => {
  dialog.showSaveDialog({
    buttonLabel: '保存',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles', 'createDirectory'],
    filters: [ // filters属性允许我们指定应用程序应该能够打开那些类型的文件，并禁止不符合我们标准的任何文件。
      { name: 'PDF Files', extensions: ['pdf'] }
    ]
  }).then((result) => {
    console.log(result)
    fs.writeFileSync(result.filePath, fileContent)
  })
}
