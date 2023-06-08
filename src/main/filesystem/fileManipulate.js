import { app, dialog, clipboard } from 'electron'
import fs from 'fs-extra'
import { makeFolderStat, makeMarkdownFileStat } from './statistic'
import path from 'path'
import { isValidMarkdownFilePath, isValidFolderPath, isValidFilePath, isMarkdownExtname } from '../helper/path'
import crypto from 'crypto'

/**
 * 用于 showOpenDialog
 * 指定应用程序应该能够打开那些类型的文件
 */
const markdownFilters = [
  { name: 'Markdown Files', extensions: ['md', 'markdown'] }
]

/**
 * 跳转到引用(cite)
 * @param {string} filePath
 * @param {string} citingPath
 * @returns
 */
export const linkToFile = async (filePath, citingPath) => {
  const targetPath = path.resolve(filePath, '..', citingPath)
  return makeMarkdownFileStat(targetPath)
}

/**
 * 删除文件
 * @param {string} filePath
 */
export const deleteFile = async (filePath) => {
  await fs.unlink(filePath)
}

/**
 * 重命名文件或文件夹
 * @param {string} newPath
 * @param {string} oldPath
 */
export const renameFileOrFolder = async (newPath, oldPath) => {
  await fs.rename(oldPath, newPath)
}

/**
 * 删除文件夹
 * @param {string} folderPath
 */
export const deleteFolder = async (folderPath) => {
  await fs.remove(folderPath)
}

/**
 * 新建指定路径下的指定文件
 * @param {string} folderPath
 * @param {string} fileName
 */
export const newFileFromSidebar = (folderPath, fileName) => {
  const filePath = path.resolve(folderPath, fileName)
  fs.createFileSync(filePath)
}

/**
 * 新建文件夹
 * @param {string} folderPath
 * @param {string} folderName
 */
export const newFolder = async (folderPath, folderName) => {
  const basePath = path.join(folderPath, folderName)
  fs.mkdir(basePath, { recursive: true }, err => {
    if (err) console.log(`mkdir path: ${basePath} err`)
  })
}

/**
 * 打开一个或多个md文件
 * @returns {[object]}
 */
export const getFileFromUser = async () => {
  return await dialog.showOpenDialog({
    buttonLabel: '选择',
    defaultPath: app.getPath('desktop'),
    properties: ['multiSelections', 'createDirectory', 'openFile'],
    filters: markdownFilters
  }).then((result) => {
    if (result.canceled === true) {
      return []
    }
    const filePaths = result.filePaths
    const fileObjs = []
    for (const filePath of filePaths) {
      const mdFileStat = makeMarkdownFileStat(filePath)
      if (mdFileStat) {
        fileObjs.push(mdFileStat)
      }
    }
    return fileObjs
  })
}

async function readMarkdownFile (filePath) {
  if (isValidMarkdownFilePath(filePath)) {
    return (await fs.promises.readFile(filePath)).toString()
  } else {
    return undefined
  }
}

// 读取文件内容:
export const readFile = async (filePath) => {
  if (isValidMarkdownFilePath(filePath)) {
    return { error: 0, content: await readMarkdownFile(filePath) }
  } else {
    dialog.showMessageBox({
      type: 'error', // 图标类型
      title: '错误', // 信息提示框标题
      message: '不合法的Markdown文件路径或者文件大小>100kb', // 信息提示框内容
      buttons: ['确定'] // 下方显示的按钮
    })
    return { error: -1, content: '' }
  }
}

// 保存文件：
export const saveFile = async (filePath, fileContent) => {
  if (!fs.existsSync(filePath)) { // 文件路径不存在
    const { response } = await dialog.showMessageBox({
      type: 'error', // 图标类型
      title: '错误', // 信息提示框标题
      message: `当前文件:${filePath}不存在，无法保存，是否要创建新文件保存工作区修改`, // 信息提示框内容
      buttons: ['是', '否'], // 下方显示的按钮
      cancelId: 2// 点击x号关闭返回值
    })
    if (response === 0) {
      await fs.writeFile(filePath, fileContent)
    }
  } else { // 文件路径存在
    await fs.writeFile(filePath, fileContent)
  }
}

// 文件另存为：
export const saveToTarget = async (fileContent) => {
  const result = await dialog.showSaveDialog({
    buttonLabel: '保存',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles', 'createDirectory'],
    filters: markdownFilters
  })
  if (result.canceled === true) {
    return []
  } else {
    await fs.writeFile(result.filePath, fileContent)
  }
}

/**
 * 导出为PDF
 * @param {*} fileContent
 */
export const saveToPDFTarget = async (fileContent) => {
  const result = await dialog.showSaveDialog({
    buttonLabel: '保存',
    defaultPath: app.getPath('desktop'),
    properties: ['showHiddenFiles', 'createDirectory'],
    filters: [
      { name: 'PDF Files', extensions: ['pdf'] }
    ]
  })
  await fs.writeFile(result.filePath, fileContent)
}

/**
 * 移动一个文件或文件夹
 * @param {string} srcPath 原文件/文件夹路径
 * @param {string} destDir 目标文件夹
 */
export const move = async (srcPath, destDir) => {
  try {
    const fname = path.basename(srcPath)
    const targetPath = makeValidFilePath(path.resolve(destDir, fname))
    await fs.move(srcPath, targetPath)
    return targetPath
  } catch (e) {
    console.log(e)
  }
}

/**
 *
 * @param {string} srcPath 原文件/文件夹路径
 * @param {string} destDir 目标文件夹
 * @param {string} projPath
 * @returns
 */
export const paste = async (srcPath, destDir) => {
  if (isValidFolderPath(srcPath)) {
    const destPath = makeValidFilePath(path.resolve(destDir, path.basename(srcPath)))
    await fs.copy(srcPath, destPath)
  } else if (isValidFilePath(srcPath)) {
    const destPath = makeValidFilePath(path.resolve(destDir, path.basename(srcPath)))
    await fs.copyFile(srcPath, destPath)
  }
}

export const refresh = async (pathname, ignored) => {
  const { children } = await makeFolderStat(pathname, ignored)
  return children
}

function normalizeMarkdownFilePath (filePath) {
  if (!isMarkdownExtname(filePath)) {
    return filePath + '.md'
  }
  return filePath
}

/**
 * Ensure that a directory exist.
 *
 * @param {string} dirPath The directory path.
 */
export const ensureDirSync = dirPath => {
  try {
    fs.ensureDirSync(dirPath)
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e
    }
  }
}

/**
 * 获得一个不存在的文件路径
 * @param {string} filePath
 * @returns
 */
export function makeValidFilePath (filePath) {
  let newPath = normalizeMarkdownFilePath(filePath)
  if (!fs.existsSync(newPath)) {
    return newPath
  }
  const { dir, name, ext } = path.parse(filePath)
  newPath = normalizeMarkdownFilePath(`${dir}${path.sep}${name}-copy${ext}`)
  if (!fs.existsSync(newPath)) {
    return newPath
  }

  let id = 2
  while (id <= 100000) {
    newPath = normalizeMarkdownFilePath(`${dir}${path.sep}${name}-copy-${id}${ext}`)
    if (!fs.existsSync(newPath)) {
      return newPath
    }
    id += 1
  }
  return 'ficus-error.md'
}

export const makePathCompletion = async (folderPath, basePath) => {
  if (folderPath.startsWith('ficus://')) {
    folderPath = folderPath.slice('ficus://'.length)
  }
  folderPath += '|'
  let fileName = path.basename(folderPath)
  fileName = fileName.substring(0, fileName.length - 1)
  const dirName = path.dirname(folderPath)
  const absDir = path.resolve(basePath, dirName)
  const dirInfo = await fs.promises.readdir(absDir)
  const result = []
  for (const subItem of dirInfo) {
    if (subItem.startsWith(fileName)) {
      result.push(path.join(dirName, subItem))
    }
  }
  return result
}

async function hashSaveImg (folderPath, fileContent) {
  const hashedSum = crypto.createHash('sha256')
  hashedSum.update(fileContent)
  const fileName = hashedSum.digest('hex') + '.png'
  const filePath = path.resolve(folderPath, fileName)
  fs.writeFile(filePath, fileContent)
  return fileName
}

async function handleSingleImg (imgPath, basePath, imgPreference) {
  const fileName = path.basename(imgPath)
  if (imgPreference === 0) {
    return '![' + fileName.replace(' ', '%20') + '](' + imgPath.replace(' ', '%20') + ')'
  } else {
    await fs.copy(imgPath, path.resolve(basePath, fileName))
    return '![' + fileName.replace(' ', '%20') + '](./' + fileName.replace(' ', '%20') + ')'
  }
}

export const pasteHandling = async (mdFilePath, isOsx, imgPreference) => {
  const textContent = clipboard.readText()
  if (textContent !== '') {
    return textContent
  }
  const picContent = clipboard.readImage()
  if (!picContent.isEmpty()) {
    // 数据已经在剪切板中的图片，如屏幕截图
    // 此时不可配置，只可直接将图片复制到文件同级处
    // 返回 hash 后的文件名
    const fileName = await hashSaveImg(mdFilePath, picContent.toPNG())
    return '![picture](./' + fileName + ')'
  }
  // 数据不在剪切板中，以路径形式存在于剪切板
  // 根据配置决定拷贝或者直接返回
  let resultStr = ''
  if (isOsx) {
    if (clipboard.has('NSFilenamesPboardType')) {
      const tagContent = clipboard.read('NSFilenamesPboardType').match(/<string>.*<\/string>/g)
      const formatFilePathStr = tagContent ? tagContent.map(item => item.replace(/<string>|<\/string>/g, '')) : []
      for (const filePath of formatFilePathStr) {
        resultStr += await handleSingleImg(filePath, mdFilePath, imgPreference) + '\n'
      }
    } else {
      const filePath = clipboard.read('public.file-url').replace('file://', '')
      resultStr += await handleSingleImg(filePath, mdFilePath, imgPreference)
    }
  } else {
    if (clipboard.has('CF_HDROP')) {
      // 似乎很难触发这种情况
      const rawFilePathStr = clipboard.readBuffer('CF_HDROP').toString('ucs2') || ''
      const formatFilePathStr = [...rawFilePathStr]
        .filter((_, index) => rawFilePathStr.charCodeAt(index) !== 0)
        .join('')
        .replace(/\\/g, '\\')
      for (const filePath of formatFilePathStr) {
        resultStr += await handleSingleImg(filePath, mdFilePath, imgPreference) + '\n'
      }
    } else {
      const filePath = clipboard.readBuffer('FileNameW').toString('ucs2').replace(RegExp(String.fromCharCode(0), 'g'), '')
      resultStr += await handleSingleImg(filePath, mdFilePath, imgPreference)
    }
  }
  if (resultStr === '') {
    return '** error copy **'
  } else {
    return resultStr
  }
}
