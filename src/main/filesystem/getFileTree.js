const fs = require('fs-extra')
const path = require('path')

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
  // console.log(res)
  // all里的children数组
  // console.log(res)
  const temp = getFileJson(res, all.children, dirPath)
  // console.log(temp)
  all.children = temp
  // console.log(all)
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
    const tempDir = `${dir}/${item}`
    // console.log(tempDir)
    const obj = newObj(tempDir, item)
    arr.push(obj)
    // console.log(obj.children === undefined)
    if (obj.children !== undefined && obj.children.length === 0) {
      const dirValArr = fs.readdirSync(tempDir)
      return getFileJson(dirValArr, obj.children, obj.path)
    }
    return null
  })
  // console.log(arr)
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
  const pathSplit = tempDir.split('\\')
  const obj = {
    name: item,
    path: tempDir,
    curChild: -1, // 直接填充-1即可
    offset: -1, // 直接填充-1即可
    // children: [],
    content: '',
    absolutePath: pathSplit
  }
  // console.log(tempDir)
  if (fs.statSync(tempDir).isFile()) {
    const content = fs.readFileSync(tempDir).toString()
    obj.content = content
    obj.type = 'file'
  }
  // 判断路径是否为文件夹
  if (!fs.statSync(tempDir).isFile()) {
    obj.children = []
    obj.type = 'folder'
  }
  // console.log(obj)
  return obj
}

// app.get('/getFileTree', async (req, res) => {
//     const fileJson = await initFun()
//     // 将对象转成JSON格式
//     res.send(JSON.stringify(fileJson))
// })
exports.getTree = async (folderPath, folderName) => {
  const dirPath = path.resolve(folderPath)
  // console.log(dirPath)
  const fileJson = await initFun(dirPath, folderName)
  // //     // 将对象转成JSON格式
  // console.log(fileJson)
  // console.log(tree)
  return fileJson
}
