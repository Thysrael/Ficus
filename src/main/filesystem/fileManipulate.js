const { app, dialog } = require('electron')
const fs = require('fs-extra')
const { makeFolderStat, makeMarkdownFileStat, makeFileStat } = require('./statistic')
const path = require('path')
const { isValidMarkdownFilePath, isFileInDirectory, isValidFolderPath, isValidFilePath } = require('../helper/path')

/**
 * 用于 showOpenDialog
 * 指定应用程序应该能够打开那些类型的文件
 */
const markdownFilters = [
  { name: 'Markdown Files', extensions: ['md', 'markdown'] }
]

/**
 * 跳转到引用(cite)
 * @param {string} filePath
 * @param {string} citingPath
 * @returns
 */
exports.linkToFile = async (filePath, citingPath) => {
  return makeMarkdownFileStat(path.resolve(filePath, '..', citingPath))
}

/**
 * 删除文件
 * @param {string} filePath
 */
exports.deleteFile = (filePath) => {
  fs.unlinkSync(filePath)
}

/**
 * 重命名文件或文件夹
 * @param {string} newPath
 * @param {string} oldPath
 */
exports.renameFileOrFolder = async (newPath, oldPath) => {
  fs.renameSync(oldPath, newPath)
}

/**
 * 删除文件夹
 * @param {string} folderPath
 */
exports.deleteFolder = async (folderPath) => {
  fs.removeSync(folderPath)
}

// 新建文件1
exports.newFileFromDialog = async (projPath) => {
  return await dialog.showSaveDialog({
    buttonLabel: '新建',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles'],
    filters: markdownFilters
  }).then(async (result) => {
    if (result.canceled === true) {
      return []
    }

    fs.createFileSync(result.filePath)
    const file = makeFileStat(result.filePath)

    if (isFileInDirectory(result.filePath, projPath)) {
      return [{ file, in: true }]
    } else {
      return [{ file, in: false }]
    }
  })
}

// 新建文件2
exports.newFileFromSidebar = async (folderPath, fileName) => {
  const filePath = path.resolve(folderPath, fileName)
  fs.createFileSync(filePath)
}

/**
 * 新建文件夹
 * @param {string} folderPath
 * @param {string} folderName
 */
exports.newFolder = async (folderPath, folderName) => {
  const basePath = path.join(folderPath, folderName)
  fs.mkdir(basePath, { recursive: true }, err => {
    if (err) console.log(`mkdir path: ${basePath} err`)
  })
}

/**
 * 打开一个或多个md文件
 * @returns {[object]}
 */
exports.getFileFromUser = async () => {
  return await dialog.showOpenDialog({
    buttonLabel: '选择',
    defaultPath: app.getPath('desktop'),
    properties: ['multiSelections', 'createDirectory', 'openFile'],
    filters: markdownFilters
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

function readMarkdownFile (filePath) {
  if (isValidMarkdownFilePath(filePath)) {
    return fs.readFileSync(filePath).toString()
  } else {
    return undefined
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
      if (index.response === 0) {
        fs.writeFileSync(filePath, fileContent)
      }
    })
  } else { // 文件路径存在
    fs.writeFileSync(filePath, fileContent)
  }
}

// 文件另存为：
exports.saveToTarget = async (fileContent, projPath) => {
  dialog.showSaveDialog({
    buttonLabel: '保存',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles', 'createDirectory'],
    filters: markdownFilters
  }).then(async (result) => {
    if (result.canceled === true) {
      return []
    } else {
      fs.writeFileSync(result.filePath, fileContent)
      if (isFileInDirectory(result.filePath, projPath)) {
        const tree = await makeFolderStat(projPath)
        return tree.children
      } else {
        return []
      }
    }
  })
}

/**
 * 导出为PDF
 * @param {*} fileContent
 */
exports.saveToPDFTarget = (fileContent) => {
  dialog.showSaveDialog({
    buttonLabel: '保存',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles', 'createDirectory'],
    filters: [
      { name: 'PDF Files', extensions: ['pdf'] }
    ]
  }).then((result) => {
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

/**
 *
 * @param {string} srcPath 原文件/文件夹路径
 * @param {string} destDir 目标文件夹
 * @param {string} projPath
 * @returns
 */
exports.paste = async (srcPath, destDir, projPath) => {
  if (isValidFolderPath(srcPath)) {
    const destPath = makeValidFilePath(path.resolve(destDir, path.basename(srcPath)))
    fs.copySync(srcPath, destPath)
  } else if (isValidFilePath(srcPath)) {
    const destPath = makeValidFilePath(path.resolve(destDir, path.basename(srcPath)))
    fs.copyFileSync(srcPath, destPath)
  }
}

/**
 * 获得一个不存在的文件路径
 * @param {string} filePath
 * @returns
 */
function makeValidFilePath (filePath) {
  if (!fs.existsSync(filePath)) {
    return filePath
  }
  const { dir, name, ext } = path.parse(filePath)
  let newPath = `${dir}${path.sep}${name} copy${ext}`
  if (!fs.existsSync(newPath)) {
    return newPath
  }

  let id = 2
  while (id <= 100000) {
    newPath = `${dir}${path.sep}${name} copy ${id}${ext}`
    if (!fs.existsSync(newPath)) {
      return newPath
    }
    id += 1
  }
  return 'ficus.md' // FIXME
}
