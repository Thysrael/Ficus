const fs = require('fs-extra')
const path = require('path')
const {
  isValidMarkdownFilePath,
  isMarkdownExtname,
  isValidFilePath,
  isValidFolderPath
} = require('../helper/path')

/**
 *
 * @param {string} filePath
 * @returns {object?} markdown文件信息对象，路径无效返回 undifined
 */
function makeMarkdownFileStat (filePath) {
  if (isValidMarkdownFilePath(filePath)) {
    return {
      name: path.basename(filePath), // 文件名
      path: filePath, // 绝对路径
      absolutePath: filePath.split(path.sep), // 绝对路径数组
      type: 'file',
      isMd: true,
      children: [],
      // 样式有关字段
      offset: -1,
      curChild: -1
    }
  } else {
    return undefined
  }
}

/**
 *
 * @param {string} filePath
 * @returns {object?} 文件信息对象，路径无效返回 undifined
 */
function makeFileStat (filePath) {
  if (isValidFilePath(filePath)) {
    return {
      name: path.basename(filePath), // 文件名
      path: filePath, // 绝对路径
      absolutePath: filePath.split(path.sep), // 绝对路径数组
      type: 'file',
      isMd: isMarkdownExtname(filePath),
      children: [],
      // 样式有关字段
      offset: -1,
      curChild: -1
    }
  } else {
    return undefined
  }
}

/**
 * 创建文件夹信息
 * @param {string} dirPath
 * @returns {object?} 文件夹信息对象，路径无效返回 undifined
 */
async function makeFolderStat (dirPath) {
  if (isValidFolderPath(dirPath)) {
    const folderName = path.basename(dirPath)
    // 文件数组
    const subFileOrFolder = await fs.promises.readdir(dirPath)
    const folderChildren = []
    const fileChildren = []
    for (const subItem of subFileOrFolder) {
      const subItemPath = path.resolve(dirPath, subItem)
      if (isValidFolderPath(subItemPath)) {
        folderChildren.push(await makeFolderStat(subItemPath))
      } else if (isValidMarkdownFilePath(subItemPath)) {
        fileChildren.push(makeMarkdownFileStat(subItemPath))
      }
    }
    return {
      name: folderName,
      path: dirPath,
      absolutePath: dirPath.split(path.sep),
      type: 'folder',
      isMd: false,
      children: folderChildren.concat(fileChildren),
      // 样式有关字段
      offset: -1,
      curChild: -1
    }
  } else {
    return undefined
  }
}

/**
 * 给榕图的文件夹信息
 * @param {string} dirPath
 * @returns {object?} 文件夹信息对象
 */
async function makeFolderStatInGraph (dirPath) {
  const folderName = path.basename(dirPath)
  if (isValidFolderPath(dirPath)) {
    // 文件数组
    const subFileOrFolder = await fs.promises.readdir(dirPath)
    const fileChildren = []
    for (const subItem of subFileOrFolder) {
      const subItemPath = path.resolve(dirPath, subItem)
      if (isValidMarkdownFilePath(subItemPath)) {
        fileChildren.push(subItemPath)
      }
    }
    return {
      name: folderName,
      path: dirPath,
      children: [{
        children: fileChildren,
        handle: '转变为tag'
      }]
    }
  } else {
    return {
      name: folderName,
      path: dirPath,
      children: []
    }
  }
}

module.exports = {
  makeFileStat,
  makeFolderStat,
  makeMarkdownFileStat,
  makeFolderStatInGraph
}
