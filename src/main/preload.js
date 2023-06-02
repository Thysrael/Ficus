import { contextBridge, ipcRenderer } from 'electron'
import fs from 'fs-extra'
import path from 'path'
import { isFileInDirectory, isMarkdownExtname } from './helper/path'
import { isOsx } from './config'

contextBridge.exposeInMainWorld('electronAPI', {
  minWindow: () => ipcRenderer.send('window-min'),
  maxWindow: () => ipcRenderer.send('window-max'),
  closeWindow: () => ipcRenderer.send('window-close'),

  openDev: () => ipcRenderer.send('dev-open'),
  closeDev: () => ipcRenderer.send('dev-close'),

  openFolder: () => ipcRenderer.send('open-folder'),
  openFolderByPath: (path) => ipcRenderer.send('open-folder-by-path', path),
  clearRecentlyUsedFiles: () => ipcRenderer.send('clear-recently-used-files'),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  listenFileChanged: (callback) => ipcRenderer.on('file-changed', callback),

  openFileTab: (callback) => ipcRenderer.on('open-file-tab', callback),

  saveFile: (path, content) => ipcRenderer.send('save-file', path, content),
  saveToAnotherFile: (content) => ipcRenderer.send('save-as', content),
  exportPDF: (html) => ipcRenderer.invoke('exportPDF', html),

  newFileFromDialog: () => ipcRenderer.invoke('newFileFromDialog'),
  newFileFromSidebar: (filePath, fileName) => ipcRenderer.invoke('newFileFromSidebar', filePath, fileName),
  newWindow: () => ipcRenderer.send('new-window'),

  newFolderFromSidebar: (folderPath, folderName) => ipcRenderer.send('newFolderFromSidebar', folderPath, folderName),

  changePath: (tarPath) => ipcRenderer.invoke('changePath', tarPath),

  deleteFile: (filePath) => ipcRenderer.send('deleteFile', filePath),
  deleteFolder: (folderPath) => ipcRenderer.send('deleteFolder', folderPath),
  renameFileOrFolder: (newPath, oldPath) => ipcRenderer.send('renameFileOrFolder', newPath, oldPath),
  linkToFile: (filePath, citingPath) => ipcRenderer.invoke('linkToFile', filePath, citingPath),
  paste: (userSelect, tarPath, projPath) => ipcRenderer.invoke('paste', userSelect, tarPath, projPath),
  handlePaste: () => ipcRenderer.invoke('handlePaste'),

  refresh: (projPath) => ipcRenderer.invoke('refresh', projPath),

  getLinksAndTags: (file) => ipcRenderer.invoke('getLinksAndTags', file),
  readFile: (filePath) => ipcRenderer.invoke('readFile', filePath),
  getPathSep: () => ipcRenderer.invoke('getPathSep'),
  getCites: (filePath) => ipcRenderer.invoke('ficus::getCites', filePath),
  getTags: (tagName) => ipcRenderer.invoke('ficus::getTags', tagName),
  findTags: (tagName, folderPath) => ipcRenderer.invoke('find_tags', tagName, folderPath),
  getLinks: () => ipcRenderer.invoke('ficus::getLinks'),
  tagToFolder: (tagname, dirPath, filepaths) => ipcRenderer.send('link::tag-to-folder', tagname, dirPath, filepaths),
  folderToTag: (dirPath) => ipcRenderer.send('link::folder-to-tag', dirPath),
  citeToTag: (srcFilepath, citeFilepaths) => ipcRenderer.send('link::cite-to-tag', srcFilepath, citeFilepaths),

  getTagGroups: (tagName) => ipcRenderer.invoke('link::get-tag-groups', tagName),
  getFileCiteTraverse: (filepath) => ipcRenderer.invoke('link::get-file-cite-traverse', filepath),
  getFolderStatInGraph: (dirpath) => ipcRenderer.invoke('link::get-folder-stat-in-graph', dirpath),
  getFilesByTag: (tagName) => ipcRenderer.invoke('link::get-files-by-tag', tagName),

  exportForest: (files, exportPath) => ipcRenderer.send('export-forest', files, exportPath),

  aboutUs: () => ipcRenderer.invoke('main::about'),
  autoPathCompletion: (partialPath) => ipcRenderer.invoke('autoPathCompletion', partialPath),

  passiveRefresh: (callback) => ipcRenderer.on('ficus::passive-refresh', callback),
  openInitFile: (callback) => ipcRenderer.on('ficus::open-init-file', callback),
  keyboardEvent: (callback) => ipcRenderer.on('ficus::keyboard-event', callback),
  setFilePathByMove: (callback) => ipcRenderer.on('set-file-path-by-move', callback),

  loadPreferences: (callback) => ipcRenderer.on('load-preferences', callback),
  setPreferences: (preferences) => ipcRenderer.send('set-preferences', preferences),

  globalSearch: (token) => ipcRenderer.invoke('search-token-globally', token),
  setFocusIdByName: (callback) => ipcRenderer.on('set-focus-id-by-name', callback),

  getKeybindingsMap: () => ipcRenderer.invoke('get-keybindings-map'),
  loadKeybindingsMap: (callback) => ipcRenderer.on('load-keybindings-map', callback),
  setKeybindingItem: (item) => ipcRenderer.send('set-keybinding-item', item),

  disableAllKeybindings: () => ipcRenderer.send('disable-all-keybindings'),
  enableAllKeybindings: () => ipcRenderer.send('enable-all-keybindings'),
  clearUserKeybindings: () => ipcRenderer.send('clear-user-keybindings'),

  getBuiltInDocumentsPath: () => ipcRenderer.invoke('get-built-in-documents-path'),

  isOSx: () => isOsx
})

contextBridge.exposeInMainWorld('pathAPI', {
  join: path.join,
  relative: path.relative,
  basename: path.basename,
  existSync: fs.pathExistsSync,
  isMarkdownExtname,
  sep: path.sep,
  isFileInDirectory
})

contextBridge.exposeInMainWorld('menuAPI', {
  setAppMenu: (callback) => ipcRenderer.on('set-app-menu', callback)
})
