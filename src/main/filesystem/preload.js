const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minWindow: () => ipcRenderer.invoke('window-min'),
  maxWindow: () => ipcRenderer.invoke('window-max'),
  closeWindow: () => ipcRenderer.invoke('window-close'),
  newFicusVault: () => ipcRenderer.invoke('newProject'),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
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

  deleteFile: (filePath) => ipcRenderer.invoke('deleteFile', filePath),
  deleteFolder: (folderPath) => ipcRenderer.invoke('deleteFolder', folderPath),
<<<<<<< HEAD
  renameFileOrFolder: (newPath, oldPath) => ipcRenderer.invoke('renameFileOrFolder', newPath, oldPath),
=======
  renameFileOrFolder: (newPath, oldPath, projPath) => ipcRenderer.invoke('renameFileOrFolder', newPath, oldPath, projPath),
>>>>>>> 0e27950b1d4ca22da36f389472dc7f08a225f0f9
  linkToFile: (filePath) => ipcRenderer.invoke('linkToFile', filePath),
  sendTags: (projPath) => ipcRenderer.invoke('sendTags', projPath),
  refresh: (projPath) => ipcRenderer.invoke('refresh', projPath),
  getLinksAndTags: (file, projPath) => ipcRenderer.invoke('getLinksAndTags', file, projPath)
})
