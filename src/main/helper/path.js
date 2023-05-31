/**
 * 判断路径类型
 */
import fs from 'fs-extra'
import minimatch from 'minimatch'
import path from 'path'
const maxFileSize = 100 * 1024
function slash (path) {
  const isExtendedLengthPath = path.startsWith('\\\\?\\')

  if (isExtendedLengthPath) {
    return path
  }

  return path.replace(/\\/g, '/')
}

/**
 * 判断某个markdown文件可以进行读取(路径存在，为md文件，且大小不超过100KB)
 * @param {string} filePath
 */
function isValidMarkdownFilePath (filePath) {
  return fs.existsSync(filePath) &&
    isMarkdownExtname(filePath) &&
    fs.statSync(filePath).isFile() &&
    fs.statSync(filePath).size <= maxFileSize
}

/**
 * 判断某个图像文件路径存在
 * @param {string} filePath
 */
function isValidImageFilePath (filePath) {
  return fs.existsSync(filePath) && isImageExtname(filePath) && fs.statSync(filePath).isFile()
}

/**
 * 判断文件路径有效(文件路径存在)
 * @param {string} filePath
 */
function isValidFilePath (filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
}

/**
 * 判断某个文件是markdown后缀
 * @param {string} filePath
 */
function isMarkdownExtname (filePath) {
  return path.extname(filePath) === '.md' || path.extname(filePath) === '.markdown'
}

function isImageExtname (filePath) {
  const ext = path.extname(filePath)
  return ['.gif', '.png', '.jpg', '.jpeg'].indexOf(ext) !== -1
}

/**
 * 判断文件夹路径有效(文件路径存在)
 * @param {string} filePath
 */
function isValidFolderPath (filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()
}

/**
 *
 * @param {string} filePath
 * @param {string} dirPath
 */
function isFileInDirectory (filePath, dirPath) {
  return filePath.startsWith(dirPath + path.sep)
}

/**
 * 判断文件夹路径是否是“叶子目录”
 * @param {string} dirPath
 * @return true | False
 */
function isLeaveDirectory (dirPath) {
  if (isValidFolderPath(dirPath)) {
    const subFileOrFolder = fs.readdirSync(dirPath)
    for (const subItem of subFileOrFolder) {
      const subItemPath = path.resolve(dirPath, subItem)
      if (isValidFolderPath(subItemPath)) {
        return false
      }
    }
    return true
  }
  return false
}

function matchPathPattern (pathname, pathPatterns) {
  if (!pathPatterns) {
    return false
  }
  for (const pattern of pathPatterns) {
    if (minimatch(slash(pathname), slash(pattern))) {
      return true
    }
  }
  return false
}

export {
  isValidMarkdownFilePath,
  isValidFilePath,
  isMarkdownExtname,
  isValidFolderPath,
  isFileInDirectory,
  isLeaveDirectory,
  matchPathPattern,
  isValidImageFilePath
}
