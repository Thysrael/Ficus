const path = require('path')
const fs = require('fs-extra')
const { dialog } = require('electron')

function copyDir (srcDir, desDir) {
  // eslint-disable-next-line n/handle-callback-err
  fs.readdir(srcDir, { withFileTypes: true }, (err, files) => {
    for (const file of files) {
      // 判断是否为文件夹
      if (file.isDirectory()) {
        const dirS = path.resolve(srcDir, file.name)
        const dirD = path.resolve(desDir, file.name)
        // 判断是否存在dirD文件夹
        if (!fs.existsSync(dirD)) {
          fs.mkdir(dirD, (err) => {
            if (err) console.log(err)
          })
        }
        copyDir(dirS, dirD)
      } else {
        const srcFile = path.resolve(srcDir, file.name)
        const desFile = path.resolve(desDir, file.name)
        fs.copyFileSync(srcFile, desFile)
      }
    }
  })
}
exports.pasteDir = (srcDir, desDir) => {
  copyDir(srcDir, desDir)
}
exports.pasteFile = async (srcDir, desDir) => {
  // 如果该路径下不存在同名文件则复制该文件
  if (!fs.existsSync(desDir)) {
    fs.promises.copyFile(srcDir, desDir)
  } else {
    await dialog.showMessageBox({
      type: 'error', // 图标类型
      title: '错误', // 信息提示框标题
      message: `当前目录下已有同名文件:${desDir}`, // 信息提示框内容
      buttons: ['跳过', '覆盖'], // 下方显示的按钮
      cancelId: 2// 点击x号关闭返回值
    }).then((index) => {
      if (index.response === 1) {
        fs.copyFileSync(srcDir, desDir)
      } else {
        // console.log('skip')
      }
    })
  }
}

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
  console.log('deprecated')
}
