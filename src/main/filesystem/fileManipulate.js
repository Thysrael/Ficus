const { app, dialog } = require('electron')
const fs = require('fs')

exports.initFromEmptyFolder = async (projName) => {
  dialog.showOpenDialog({
    buttonLabel: '选择',
    defaultPath: app.getPath('desktop'),
    properties: ['createDirectory', 'openDirectory'],
    filters: [ // filters属性允许我们指定应用程序应该能够打开那些类型的文件，并禁止不符合我们标准的任何文件。
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'images', extensions: ['jpg', 'png'] }
    ]
  }).then((result) => {
    console.log(result)
    return result
    // const basePath = path.join(result.filePaths[0], '.ficus')
    // console.log(basePath)
    // fs.mkdir(basePath, { recursive: true }, err => {
    //   if (err) console.log(`mkdir path: ${basePath} err`)
    // })
    // const relationJSONFilePath = path.join(basePath, 'relation.json')
    // const relation = {
    //   version: 1,
    //   root: {
    //     name: projName,
    //     path: result.filePaths[0],
    //     children: [],
    //     tags: [],
    //     links: []
    //   }
    // }
    // getTree()
    // fs.writeFile(relationJSONFilePath, JSON.stringify(relation), (error) => {
    //   // 创建失败
    //   if (error) {
    //     console.log(`创建失败：${error}`)
    //   }
    //   // 创建成功
    //   console.log('创建成功！')
    // })
    // const str = JSON.stringify(relation)
    // return str
  })
}
// 引入Node fs库
// 打开文件：
exports.getFileFromUser = async () => {
  dialog.showOpenDialog({
    buttonLabel: '选择',
    defaultPath: app.getPath('desktop'),
    properties: ['multiSelections', 'createDirectory', 'openFile'],
    filters: [ // filters属性允许我们指定应用程序应该能够打开那些类型的文件，并禁止不符合我们标准的任何文件。
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'images', extensions: ['jpg', 'png'] }
    ]
  }).then((result) => {
    const filePaths = result.filePaths
    const contents = []
    const fileNames = []
    for (const filePath of filePaths) {
      const content = fs.readFileSync(filePath).toString()
      // console.log(content);
      const pathSplit = filePath.split('\\')
      const fileName = pathSplit[pathSplit.length - 1]
      contents.push(content)
      fileNames.push(fileName)
    }
    const obj = { fileNames, filePaths, contents }
    const str = JSON.stringify(obj)
    console.log(str)
    return str
  })
}

// 读取文件内容:
exports.readFile = (filePath) => {
  return fs.readFileSync(filePath).toString()
}

// 保存文件：
exports.saveFile = (filePath, fileContent) => {
  fs.writeFileSync(filePath, fileContent)
}

// 文件另存为：
exports.saveToTarget = (fileContent) => {
  dialog.showSaveDialog({
    buttonLabel: '保存',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles', 'createDirectory'],
    filters: [ // filters属性允许我们指定应用程序应该能够打开那些类型的文件，并禁止不符合我们标准的任何文件。
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md', 'markdown'] },
      { name: 'images', extensions: ['jpg', 'png'] }
    ]
  }).then((result) => {
    console.log(result)
    fs.writeFileSync(result.filePath, fileContent)
  })
}
