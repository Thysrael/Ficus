const { app, dialog } = require('electron')
const fs = require('fs-extra')
const { getTree, makeMarkdownFileStat, makeFileStat } = require('./getFileTree')
const path = require('path')
const { clearDir } = require('./general')
const { pasteFile, pasteDir } = require('./general')
const linkManager = require('./linkManager')
const { isValidMarkdownFilePath } = require('../utils')

/**
 * 跳转到引用(cite)
 * @param {string} filePath
 * @returns
 */
exports.linkToFile = async (filePath) => {
  return makeMarkdownFileStat(filePath)
}

/**
 * 删除文件
 * @param {string} filePath
 */
exports.deleteFile = (filePath) => {
  fs.unlink(filePath, async function (err) {
    if (err) throw err
    // 如果没有错误，则文件已成功删除
    console.log('File deleted!')
  })
}

/**
 * 重命名文件或文件夹
 * @param {string} newPath
 * @param {string} oldPath
 */
exports.renameFileOrFolder = async (newPath, oldPath) => {
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      console.log('no such file or directory')
    } else {
      console.log('File Renamed.')
    }
  })
}

// 删除文件夹
exports.deleteFolder = async (folderPath) => {
  clearDir(folderPath)
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
    const file = makeFileStat(result.filePath)

    const fd = fs.openSync(result.filePath, 'w')
    fs.close(fd, (err) => {
      if (err) { console.error('Failed to close file', err) }
    })
    if (result.filePath.startsWith(projPath)) {
      return [{ file, in: true }]
    } else {
      return [{ file, in: false }]
    }
  })
}
// 新建文件2
exports.newFileFromSidebar = async (filePath, fileName) => {
  const pos = path.join(filePath, fileName)
  const fd = fs.openSync(pos, 'w')
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
    if (result.canceled === true) {
      return []
    }
    if (result.filePaths[0].startsWith(projPath)) {
      const pathSplit = projPath.split(path.sep)
      const folderName = pathSplit[pathSplit.length - 1]
      const tree = await getTree(projPath, folderName)
      return tree.children
    } else {
      return []
    }
  })
}

// 新建文件夹2
exports.newFolderFromSidebar = async (folderPath, folderName) => {
  const basePath = path.join(folderPath, folderName)
  fs.mkdir(basePath, { recursive: true }, err => {
    if (err) console.log(`mkdir path: ${basePath} err`)
  })
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
      const mdFileStat = makeMarkdownFileStat(filePath)
      if (mdFileStat) {
        fileObjs.push(mdFileStat)
      }
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
    const pathSplit = folderPath.split(path.sep)
    const folderName = pathSplit[pathSplit.length - 1]
    const tree = await getTree(folderPath, folderName)
    const folder = {
      name: folderName, // 文件名
      curChild: -1, // 直接填充-1即可
      path: folderPath, // 绝对路径
      absolutePath: pathSplit, // 希望将绝对路径分割成数组
      offset: -1, // 直接填充-1即可
      children: tree.children, // 对于文件没有子节点则填充空数组，对于文件夹则嵌套文件
      type: 'folder'
    }
    return folder
  })
}

/**
 * 判断某个markdown文件可以进行读取(路径存在，为md文件，且大小不超过100KB)
 * @param {string} filePath
 */
function isValidMarkdownFilePath (filePath) {
  return fs.existsSync(filePath) &&
        (path.extname(filePath) === '.md') &&
        fs.statSync(filePath).isFile() &&
        fs.statSync(filePath).size <= 100 * 1024
}

function readMarkdownFile (filePath) {
  if (isValidMarkdownFilePath(filePath)) {
    return fs.readFileSync(filePath).toString()
  }
}

// 读取文件内容:
exports.readFile = (filePath) => {
  if (isValidMarkdownFilePath(filePath)) {
    return { error: 0, content: readMarkdownFile(filePath) }
  } else {
    dialog.showMessageBox({
      type: 'error', // 图标类型
      title: '错误', // 信息提示框标题
      message: '不合法的Markdown文件路径或者文件大小>100kb', // 信息提示框内容
      buttons: ['确定'] // 下方显示的按钮
    })
    return { error: -1, content: '' }
  }
}

// 保存文件：
exports.saveFile = (filePath, fileContent) => {
  if (!fs.existsSync(filePath)) { // 文件路径不存在
    dialog.showMessageBox({
      type: 'error', // 图标类型
      title: '错误', // 信息提示框标题
      message: `当前文件:${filePath}不存在，无法保存，是否要创建新文件保存工作区修改`, // 信息提示框内容
      buttons: ['是', '否'], // 下方显示的按钮
      cancelId: 2// 点击x号关闭返回值
    }).then((index) => {
      if (index.response === 1) {
        return { save: false }
      } else {
        fs.writeFileSync(filePath, fileContent, (err) => {
          if (err) {
            console.log(`Fail:(${err})`)
          } else {
            linkManager.updateFile(filePath)
          }
        })
        return { save: true }
      }
    })
  } else { // 文件路径存在
    fs.writeFileSync(filePath, fileContent, (err) => {
      if (err) {
        console.log(`Fail:(${err})`)
      } else {
        linkManager.updateFile(filePath)
      }
    })
  }
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
        const pathSplit = projPath.split(path.sep)
        const folderName = pathSplit[pathSplit.length - 1]
        const tree = await getTree(projPath, folderName)
        return tree.children
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

/**
 * 移动一个文件或文件夹
 * @param {string} srcPath 原文件/文件夹路径
 * @param {string} destDir 目标文件夹
 */
exports.move = async (srcPath, destDir) => {
  try {
    const fname = path.basename(srcPath)
    fs.moveSync(srcPath, path.resolve(destDir, fname))
  } catch (e) {
    console.log(e)
  }
}

exports.paste = async (userSelect, tarPath, projPath) => {
  const selPath = userSelect
  const stat = fs.lstatSync(selPath)
  if (stat.isDirectory()) {
    if (tarPath.startsWith(selPath)) {
      dialog.showMessageBox({
        type: 'error', // 图标类型
        title: '错误', // 信息提示框标题
        message: '不能往选中的文件夹的子文件夹中粘贴！', // 信息提示框内容
        buttons: ['确定'], // 下方显示的按钮
        cancelId: 2// 点击x号关闭返回值
      }).then()
    } else {
      const newPath = path.join(tarPath, path.basename(selPath))
      if (!fs.existsSync(newPath)) {
        fs.mkdir(newPath, (err) => {
          if (err) console.log(err)
        })
        pasteDir(selPath, newPath)
      } else {
        dialog.showMessageBox({
          type: 'error', // 图标类型
          title: '错误', // 信息提示框标题
          message: `当前目录下已有此文件夹:${newPath},复制会覆盖原有文件夹中的内容,是否仍要复制`, // 信息提示框内容
          buttons: ['否', '是'], // 下方显示的按钮
          cancelId: 2// 点击x号关闭返回值
        }).then((index) => {
          if (index.response === 1) {
            pasteDir(selPath, newPath)
          } else { /* empty */ }
        })
      }
    }
  } else {
    const newPath = path.join(tarPath, path.basename(selPath))
    await pasteFile(selPath, newPath)
  }
  const folderName = path.basename(projPath)
  const tree = await getTree(projPath, folderName)
  return tree
}
