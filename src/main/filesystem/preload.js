const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  newFicusVault: (projName) => ipcRenderer.invoke('newProject', projName),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  saveFile: (path, content) => ipcRenderer.invoke('save_file', path, content),
  saveToAnotherFile: (content) => ipcRenderer.invoke('saveToTarget', content),
  minWindow: () => ipcRenderer.invoke('window-min'),
  maxWindow: () => ipcRenderer.invoke('window-max'),
  closeWindow: () => ipcRenderer.invoke('window-close')
})
