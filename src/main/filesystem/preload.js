const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  newFicusVault: () => ipcRenderer.invoke('newProject'),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  saveFile: (path, content) => ipcRenderer.invoke('save_file', path, content),
  saveToAnotherFile: (content) => ipcRenderer.invoke('saveToTarget', content),

  minWindow: () => ipcRenderer.invoke('window-min'),
  maxWindow: () => ipcRenderer.invoke('window-max'),
  closeWindow: () => ipcRenderer.invoke('window-close'),
  addTag: (filePath, tagName, isNewTag, folderPath) => ipcRenderer.invoke('addTagToFile', filePath, tagName, isNewTag, folderPath),
  findTags: (tagName, folderPath) => ipcRenderer.invoke('find_tags', tagName, folderPath),
  deleteTag: (filePath, tagName, folderPath) => ipcRenderer.invoke('delete_tag', filePath, tagName, folderPath),

  newFileFromDialog: (projPath) => ipcRenderer.invoke('newFileFromDialog', projPath),
  newFileFromSidebar: (filePath, fileName) => ipcRenderer.invoke('newFileFromSidebar', filePath, fileName),
  newFolderFromDialog: (projPath) => ipcRenderer.invoke('newFolderFromDialog', projPath),
  newFolderFromSidebar: (folderPath, folderName) => ipcRenderer.invoke('newFolderFromSidebar', folderPath, folderName)
})
