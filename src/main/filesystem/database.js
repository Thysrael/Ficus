const { app, dialog } = require('electron')
const fs = require('fs-extra')
const path = require('path')
const { getTree } = require('./getFileTree')
const { getAerialInFile } = require('@/common/parseLinks')

// 获得：
exports.getLinksAndTags = async (file) => {
  const obj = JSON.parse(file)
  console.log('后端拿到', obj)
  if (obj === undefined || obj.isMd === false) {
    return { aerials: [], tags: [] }
  }
  const res = []
  const doc = obj.content
  const filePath = path.resolve(obj.path, '..' + path.sep)
  console.log('调用前：', doc)
  const info = getAerialInFile(doc)
  console.log('调用后：', info)
  for (const item of info.aerials) {
    if (!path.isAbsolute(item.path)) {
      const abPath = path.join(filePath, item.path)
      res.push({ name: item.name, path: abPath })
    } else {
      res.push({ name: item.name, path: item.path })
    }
  }
  return { aerials: res, tags: info.tags }
}

exports.refresh = async (projPath) => {
  const pathSplit = projPath.split(path.sep)
  const folderName = pathSplit[pathSplit.length - 1]
  // console.log(result.filePaths[0])
  const tree = await getTree(projPath, folderName)
  return tree.children
}

exports.sendTags = async (projPath) => {
  const basePath = path.join(projPath, '.ficus')
  const tagsJSONFilePath = path.join(basePath, 'tags.json')
  const rawData = fs.readFileSync(tagsJSONFilePath)
  const tags = JSON.parse(rawData)
  return tags
}

exports.deleteTag = (tagName, folderPath, filePath) => {
  const basePath = path.join(folderPath, '.ficus')
  const tagsJSONFilePath = path.join(basePath, 'tags.json')
  const rawData = fs.readFileSync(tagsJSONFilePath)
  const tags = JSON.parse(rawData)
  const tag2Files = tags.tag2Files
  const file2Tags = tags.file2Tags
  for (const file of file2Tags) {
    if (file.path.replace(/[\r\n]/g, '') === filePath) {
      const arr = file.fileTags.filter(item => item !== tagName)
      file.fileTags = arr
    }
  }
  let cnt = 0
  for (const tag of tag2Files) {
    if (tag.tagName.replace(/[\r\n]/g, '') === tagName) {
      const newAttach = tag.attach.filter(item => item.replace(/[\r\n]/g, '') !== filePath)
      console.log(newAttach.length)
      if (newAttach.length === 0) {
        tag2Files.splice(cnt, 1)
      } else {
        tag.attach = newAttach
      }
      break
    }
    cnt = cnt + 1
  }
  const newTags = { tag2Files, file2Tags }
  fs.writeFile(tagsJSONFilePath, JSON.stringify(newTags), (error) => {
    // 创建失败
    if (error) {
      console.log(`Fail: ${error}`)
    }
    // 创建成功
  })
}

// 根据用户输入的tag模糊匹配所有前缀相同的tag， 后端返回的对 [tag] 进行模糊匹配的结果 + 一个以 [tag] 为名称的新标签（如果模糊匹配结果中不包含名称 === [tag] 的标签）
exports.findTags = (tagName, folderPath) => {
  const res = []
  const basePath = path.join(folderPath, '.ficus')
  // const relationJSONFilePath = path.join(basePath, 'relation.json')
  const tagsJSONFilePath = path.join(basePath, 'tags.json')
  const rawData = fs.readFileSync(tagsJSONFilePath)
  const data = JSON.parse(rawData)
  const tags = data.tag2Files
  const len = tagName.length
  const lowTagName = tagName.toLowerCase()
  let hasTag = false
  console.log(tagName)
  for (const tag of tags) {
    const pureTag = tag.tagName.replace(/[\r\n]/g, '')
    console.log(pureTag)
    if (pureTag === tagName) {
      hasTag = true
    } else {
      const lowTag = pureTag.toLowerCase()
      if (lowTag.length >= len && lowTag.substring(0, len) === lowTagName) {
        res.push(pureTag)
      }
    }
  }
  if (hasTag) {
    res.push(tagName)
  }
  return res
}

// 新建项目：
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
