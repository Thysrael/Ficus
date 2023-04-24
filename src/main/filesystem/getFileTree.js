const fs = require('fs-extra')
const path = require('path')
const linkManager = require('./linkManager')

/**
 * 函数作用: 初始化
 * @returns 处理完的对象
 */
async function initFun (dirPath, folderName) {
  // 文件数组
  const res = fs.readdirSync(dirPath)
  const temp = getFileJson(res, [], dirPath)

  return {
    name: folderName,
    children: temp,
    type: 'folder',
    path: dirPath
  }
}

/**
 * @param {A路径下的文件数组} res
 * @param {children数组} arr
 * @param {A路径} dir
 * @returns children数组
 */
function getFileJson (res, arr, dir) {
  res.map(item => {
    const itemPath = path.join(dir, item)
    const obj = newObj(itemPath, item)
    arr.push(obj)
    if (obj.type === 'folder') {
      const dirValArr = fs.readdirSync(itemPath)
      return getFileJson(dirValArr, obj.children, obj.path)
    } else {
      return null
    }
  })
  const files = []
  const folders = []
  for (const item of arr) {
    if (item.type === 'file') {
      files.push(item)
    } else {
      folders.push(item)
    }
  }
  arr.splice(0, arr.length)
  const newArr = folders.concat(files)
  for (const item of newArr) {
    arr.push(item)
  }
  return arr
}

// 处理该目录下生成的obj是否带有children
/**
 * 处理添加到children数组下的对象属性
 * @param {B路径 = A路径 + 文件名} tempDir
 * @param {文件名} item
 * @returns 返回处理好的对象
 */
function newObj (objPath, item) {
  const obj = {
    name: item,
    path: objPath,
    curChild: -1, // 直接填充-1即可
    offset: -1, // 直接填充-1即可
    absolutePath: objPath.split(path.sep)
  }
  if (fs.statSync(objPath).isFile()) {
    obj.type = 'file'
    obj.isMd = (path.extname(objPath) === '.md')
    if (obj.isMd) {
      linkManager.addValidFilePath(objPath)
    }
  } else {
    // 路径为文件夹
    obj.type = 'folder'
    obj.children = []
  }
  return obj
}

exports.getTree = async (folderPath, folderName) => {
  const dirPath = path.resolve(folderPath)
  const fileJson = await initFun(dirPath, folderName)
  return fileJson
}
