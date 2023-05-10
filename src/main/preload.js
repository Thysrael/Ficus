import { contextBridge, ipcRenderer } from 'electron'
import fs from 'fs-extra'
import path from 'path'
import { isFileInDirectory, isMarkdownExtname } from './helper/path'

contextBridge.exposeInMainWorld('electronAPI', {
  minWindow: () => ipcRenderer.send('window-min'),
  maxWindow: () => ipcRenderer.send('window-max'),
  closeWindow: () => ipcRenderer.send('window-close'),

  openDev: () => ipcRenderer.send('dev-open'),
  closeDev: () => ipcRenderer.send('dev-close'),

  newFicusVault: () => ipcRenderer.invoke('newProject'),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),

  saveFile: (path, content) => ipcRenderer.invoke('save_file', path, content),
  saveToAnotherFile: (content, projPath) => ipcRenderer.invoke('saveToTarget', content, projPath),
  exportPDF: (html) => ipcRenderer.invoke('exportPDF', html),

  newFileFromDialog: (projPath) => ipcRenderer.invoke('newFileFromDialog', projPath),
  newFileFromSidebar: (filePath, fileName) => ipcRenderer.invoke('newFileFromSidebar', filePath, fileName),

  newFolderFromSidebar: (folderPath, folderName) => ipcRenderer.invoke('newFolderFromSidebar', folderPath, folderName),

  changePath: (tarPath) => ipcRenderer.invoke('changePath', tarPath),

  deleteFile: (filePath) => ipcRenderer.invoke('deleteFile', filePath),
  deleteFolder: (folderPath) => ipcRenderer.invoke('deleteFolder', folderPath),
  renameFileOrFolder: (newPath, oldPath) => ipcRenderer.invoke('renameFileOrFolder', newPath, oldPath),
  linkToFile: (filePath, citingPath) => ipcRenderer.invoke('linkToFile', filePath, citingPath),
  paste: (userSelect, tarPath, projPath) => ipcRenderer.invoke('paste', userSelect, tarPath, projPath),

  refresh: (projPath) => ipcRenderer.invoke('refresh', projPath),
  updateTree: (updateTree) => ipcRenderer.on('refreshTree', updateTree),
  getLinksAndTags: (file) => ipcRenderer.invoke('getLinksAndTags', file),
  readFile: (filePath) => ipcRenderer.invoke('readFile', filePath),
  getPathSep: () => ipcRenderer.invoke('getPathSep'),
  getCites: (filePath) => ipcRenderer.invoke('ficus::getCites', filePath),
  getTags: (tagName) => ipcRenderer.invoke('ficus::getTags', tagName),
  findTags: (tagName, folderPath) => ipcRenderer.invoke('find_tags', tagName, folderPath),
  getLinks: () => ipcRenderer.invoke('ficus::getLinks'),
  aboutUs: () => ipcRenderer.invoke('main::about'),

  passiveRefresh: (callback) => ipcRenderer.on('ficus::passive-refresh', callback)
})

contextBridge.exposeInMainWorld('pathAPI', {
  join: path.join,
  relative: path.relative,
  existSync: fs.pathExistsSync,
  isMarkdownExtname,
  sep: () => path.sep,
  isFileInDirectory
})
