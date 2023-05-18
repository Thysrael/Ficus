/**
 * 判断路径类型
 */
import fs, { existsSync, statSync } from 'fs-extra'
import path, { extname, sep } from 'path'
const maxFileSize = 100 * 1024

/**
 * 判断某个markdown文件可以进行读取(路径存在，为md文件，且大小不超过100KB)
 * @param {string} filePath
 */
function isValidMarkdownFilePath (filePath) {
  return existsSync(filePath) && (extname(filePath) === '.md' || extname(filePath) === '.markdown') && statSync(filePath).isFile() && statSync(filePath).size <= maxFileSize
}

/**
 * 判断文件路径有效(文件路径存在)
 * @param {string} filePath
 */
function isValidFilePath (filePath) {
  return existsSync(filePath) && statSync(filePath).isFile()
}

/**
 * 判断某个文件是markdown后缀
 * @param {string} filePath
 */
function isMarkdownExtname (filePath) {
  return extname(filePath) === '.md' || extname(filePath) === '.markdown'
}

/**
 * 判断文件夹路径有效(文件路径存在)
 * @param {string} filePath
 */
function isValidFolderPath (filePath) {
  return existsSync(filePath) && statSync(filePath).isDirectory()
}

/**
 *
 * @param {string} filePath
 * @param {string} dirPath
 */
function isFileInDirectory (filePath, dirPath) {
  return filePath.startsWith(dirPath + sep)
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

export {
  isValidMarkdownFilePath,
  isValidFilePath,
  isMarkdownExtname,
  isValidFolderPath,
  isFileInDirectory,
  isLeaveDirectory
}
