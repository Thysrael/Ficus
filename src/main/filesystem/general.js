const os = require('os')
const { getTree } = require('./getFileTree')
const path = require('path')
const fs = require('fs-extra')

function deleteDir (url) {
  let files = []

  if (fs.existsSync(url)) { // 判断给定的路径是否存在
    files = fs.readdirSync(url) // 返回文件和子目录的数组
    files.forEach(function (file, index) {
      const curPath = path.join(url, file)

      if (fs.statSync(curPath).isDirectory()) { // 同步读取文件夹文件，如果是文件夹，则函数回调
        deleteDir(curPath)
      } else {
        fs.unlinkSync(curPath) // 是指定文件，则删除
      }
    })

    fs.rmdirSync(url) // 清除文件夹
  } else {
    console.log('给定的路径不存在！')
  }
}

exports.clearDir = (folderPath) => {
  deleteDir(folderPath)
}

exports.changeRelation = async (projPath) => {
  console.log(projPath)
  let pathSplit = ''
  if (os.platform().toString() === 'win32') {
    pathSplit = projPath.split('\\')
  } else if (os.platform().toString() === 'linux' || os.platform().toString() === 'darwin') {
    pathSplit = projPath.split('/')
  }
  const folderName = pathSplit[pathSplit.length - 1]
  const tree = await getTree(projPath, folderName)
  const basePath = path.join(projPath, '.ficus')
  const relationJSONPath = path.join(basePath, 'relation.json')
  const rawData = fs.readFileSync(relationJSONPath)
  const relationObj = JSON.parse(rawData)
  relationObj.root.tree = tree.children.filter(item => item.name !== '.ficus')
  fs.writeFile(relationJSONPath, JSON.stringify(relationObj), (error) => {
    // 创建失败
    if (error) {
      console.log(`Fail: ${error}`)
    }
    // 创建成功
  })
}
