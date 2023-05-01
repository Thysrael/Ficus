const { app, dialog } = require('electron')
const path = require('path')
const { getProject } = require('./getFileTree')
const { default: accessor } = require('../accessor')

exports.refresh = async (projPath) => {
  const tree = await getProject(projPath)
  return tree.children
}

/**
 *  新建项目
 * @returns 项目相关json
 */
exports.initFromFolder = async () => {
  return await dialog.showOpenDialog({
    buttonLabel: '选择',
    defaultPath: app.getPath('desktop'),
    properties: ['createDirectory', 'openDirectory']
  }).then(async (result) => {
    if (result.canceled === true) {
      return { relation: {}, error: -2 }
    }
    console.log(result.filePaths[0])
    accessor.menu.addRecentlyUsedDocument(result.filePaths[0])

    const folderName = path.basename(result.filePaths[0])
    const tree = await getProject(result.filePaths[0])
    const projectStat = {
      version: 1,
      root: {
        path: result.filePaths[0],
        tree: tree.children,
        folderName
      }
    }
    return { relation: projectStat, error: 0 }
  })
}
