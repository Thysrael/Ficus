const { app, dialog } = require('electron')
const fs = require('fs-extra')
const path = require('path')
const { getTree } = require('./getFileTree')
const { getAerialInFile } = require('@/common/parseLinks')
const linkManager = require('./linkManager')

/**
 * 获得所有项目下links内容
 * @param {*} file 
 * @returns 
 */
exports.getLinks = async () => {
  return { aerials: res, tags: info.tags }
}

exports.refresh = async (projPath) => {
  const pathSplit = projPath.split(path.sep)
  const folderName = pathSplit[pathSplit.length - 1]
  // console.log(result.filePaths[0])
  const tree = await getTree(projPath, folderName)
  return tree.children
}

/**
 * 根据用户输入的tag模糊匹配所有前缀相同的tag
 * 返回的对 [tag] 进行模糊匹配的结果 + 一个以 [tag] 为名称的新标签
 * @param {string} tagname tag名称
 * @returns {[string]}
 */
exports.findTags = (tagname) => {
  const res = linkManager.getAllTags().filter(name => name.indexOf(tagname) == 0)
  if (!res.includes(tagname)) {
    res.push(tagname)
  }
  return res
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
    const folderName = path.basename(result.filePaths[0])
    const tree = await getTree(result.filePaths[0], folderName)
    const relation = {
      version: 1,
      root: {
        path: result.filePaths[0],
        tree: tree.children,
        folderName
      }
    }
    return { relation, error: 0 }
  })
}
