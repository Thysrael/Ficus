const fs = require('fs-extra')
const path = require('path')
const os = require('os')

/**
 * 函数作用: 初始化
 * @returns 处理完的对象
 */
function initFun (dirPath, folderName) {
  const all = {
    name: folderName,
    children: [],
    type: 'folder',
    path: dirPath
  }
  // 文件数组
  const res = fs.readdirSync(dirPath)
  const temp = getFileJson(res, all.children, dirPath)
  all.children = temp
  return all
}

/**
 * @param {A路径下的文件数组} res
 * @param {children数组} arr
 * @param {A路径} dir
 * @returns children数组
 */
function getFileJson (res, arr, dir) {
  res.map(item => {
    let tempDir = `${dir}/${item}`
    if (os.platform().toString() === 'win32') {
      tempDir = `${dir}\\${item}`
    }
    const obj = newObj(tempDir, item)
    arr.push(obj)
    if (obj.children !== undefined && obj.children.length === 0) {
      const dirValArr = fs.readdirSync(tempDir)
      return getFileJson(dirValArr, obj.children, obj.path)
    }
    return null
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
function newObj (tempDir, item) {
  const pathSplit = tempDir.split(path.sep)
  const obj = {
    name: item,
    path: tempDir,
    curChild: -1, // 直接填充-1即可
    offset: -1, // 直接填充-1即可
    absolutePath: pathSplit
  }
  // console.log(tempDir)
  if (fs.statSync(tempDir).isFile()) {
    obj.type = 'file'
    const index = tempDir.lastIndexOf('.')
    const ext = tempDir.substring(index + 1)
    const isMd = (ext === 'md')
    obj.isMd = isMd
  }
  // 判断路径是否为文件夹
  if (!fs.statSync(tempDir).isFile()) {
    obj.children = []
    obj.type = 'folder'
  }
  // console.log(obj)
  return obj
}

exports.getTree = async (folderPath, folderName) => {
  const dirPath = path.resolve(folderPath)
  // console.log(dirPath)
  const fileJson = await initFun(dirPath, folderName)
  return fileJson
}
