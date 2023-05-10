/**
 * subPath是fatherPath的同一路径或文件夹下路径
 * @param {string} fatherPath
 * @param {string} subPath
 * @returns
 */
export function isSubPath (fatherPath, subPath) {
  return fatherPath === subPath || window.pathAPI.isFileInDirectory(subPath, fatherPath)
}

/**
 * 将 oldPath 命名为 newPath 后filePath的路径
 * @param {string} oldPath
 * @param {string} newPath
 * @param {string} filePath
 * @returns
 */
export function getRenamePath (oldPath, newPath, filePath) {
  if (isSubPath(oldPath, filePath)) {
    return window.pathAPI.join(newPath, window.pathAPI.relative(oldPath, filePath))
  } else {
    return filePath
  }
}

/**
 * md文件自动添加.md后缀
 * @param {string} fileName
 * @returns
 */
export function namifyMarkdownFile (fileName) {
  if (!window.pathAPI.isMarkdownExtname(fileName)) {
    return fileName.trim() + '.md'
  }
  return fileName.trim()
}
