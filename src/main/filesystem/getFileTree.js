const fs = require('fs-extra')
const path = require('path')

/**
 * 函数作用: 初始化
 * @returns 处理完的对象
 */
function initFun (dirPath) {
  const all = {
    name: 'test',
    children: [],
    type: 'folder',
    dirPath
  }
  // 文件数组
  const res = fs.readdirSync(dirPath)
  // all里的children数组
  // console.log(res)
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
    const tempDir = `${dir}/${item}`
    const obj = newObj(tempDir, item)
    arr.push(obj)
    // console.log(obj.children === undefined)
    if (obj.children !== undefined && obj.children.length === 0) {
      const dirValArr = fs.readdirSync(tempDir)
      return getFileJson(dirValArr, obj.children, obj.dirPath)
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
  const obj = {
    name: item,
    dirPath: tempDir
  }
  // 判断路径是否为文件夹
  if (!fs.statSync(tempDir).isFile()) {
    obj.children = []
    obj.type = 'folder'
  }
  return obj
}

// app.get('/getFileTree', async (req, res) => {
//     const fileJson = await initFun()
//     // 将对象转成JSON格式
//     res.send(JSON.stringify(fileJson))
// })
exports.getTree = async () => {
  const dirPath = path.resolve(__dirname, '../src/main/filesystem')
  // console.log(dirPath)
  const fileJson = await initFun(dirPath)
  // //     // 将对象转成JSON格式
  const tree = JSON.stringify(fileJson)
  console.log(tree)
}
