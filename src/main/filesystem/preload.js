const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minWindow: () => ipcRenderer.invoke('window-min'),
  maxWindow: () => ipcRenderer.invoke('window-max'),
  closeWindow: () => ipcRenderer.invoke('window-close'),
  openDev: () => ipcRenderer.invoke('dev-open'),
  closeDev: () => ipcRenderer.invoke('dev-close'),
  newFicusVault: () => ipcRenderer.invoke('newProject'),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  // openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  saveFile: (path, content) => ipcRenderer.invoke('save_file', path, content),
  saveToAnotherFile: (content, projPath) => ipcRenderer.invoke('saveToTarget', content, projPath),
  exportPDF: (html) => ipcRenderer.invoke('exportPDF', html),
  addTag: (filePath, tagName, isNewTag, folderPath) => ipcRenderer.invoke('addTagToFile', filePath, tagName, isNewTag, folderPath),
  findTags: (tagName, folderPath) => ipcRenderer.invoke('find_tags', tagName, folderPath),
  deleteTag: (filePath, tagName, folderPath) => ipcRenderer.invoke('delete_tag', filePath, tagName, folderPath),

  newFileFromDialog: (projPath) => ipcRenderer.invoke('newFileFromDialog', projPath),
  newFileFromSidebar: (filePath, fileName) => ipcRenderer.invoke('newFileFromSidebar', filePath, fileName),
  newFolderFromDialog: (projPath) => ipcRenderer.invoke('newFolderFromDialog', projPath),
  newFolderFromSidebar: (folderPath, folderName) => ipcRenderer.invoke('newFolderFromSidebar', folderPath, folderName),

  changePath: (tarPath) => ipcRenderer.invoke('changePath', tarPath),

  deleteFile: (filePath) => ipcRenderer.invoke('deleteFile', filePath),
  deleteFolder: (folderPath) => ipcRenderer.invoke('deleteFolder', folderPath),
  renameFileOrFolder: (newPath, oldPath) => ipcRenderer.invoke('renameFileOrFolder', newPath, oldPath),
  linkToFile: (filePath, citingPath) => ipcRenderer.invoke('linkToFile', filePath, citingPath),
  sendTags: (projPath) => ipcRenderer.invoke('sendTags', projPath),
  refresh: (projPath) => ipcRenderer.invoke('refresh', projPath),
  updateTree: (updateTree) => ipcRenderer.on('refreshTree', updateTree),
  getLinksAndTags: (file) => ipcRenderer.invoke('getLinksAndTags', file),
  readFile: (filePath) => ipcRenderer.invoke('readFile', filePath),
  getPathSep: () => ipcRenderer.invoke('getPathSep'),
  paste: (userSelect, tarPath, projPath) => ipcRenderer.invoke('paste', userSelect, tarPath, projPath),
  getCites: (filePath) => ipcRenderer.invoke('ficus::getCites', filePath),
  getTags: (tagName) => ipcRenderer.invoke('ficus::getTags', tagName),
  getLinks: () => ipcRenderer.invoke('ficus::getLinks')
})
