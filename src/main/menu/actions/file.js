import COMMANDS from '../../../common/commands'

const openFile = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}

const openFolder = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}

const newFile = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}

const save = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const renameFile = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const exportAsHTML = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const exportAsPDF = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const exportAsPNG = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const closeTab = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
export const loadFileCommands = commandManager => {
  commandManager.add(COMMANDS.FILE_OPEN_FILE, openFile)
  commandManager.add(COMMANDS.FILE_OPEN_FOLDER, openFolder)
  commandManager.add(COMMANDS.FILE_NEW_FILE, newFile)
  commandManager.add(COMMANDS.FILE_SAVE, save)
  commandManager.add(COMMANDS.FILE_RENAME_FILE, renameFile)
  commandManager.add(COMMANDS.FILE_EXPORT_AS_HTML, exportAsHTML)
  commandManager.add(COMMANDS.FILE_EXPORT_AS_PDF, exportAsPDF)
  commandManager.add(COMMANDS.FILE_EXPORT_AS_PNG, exportAsPNG)
  commandManager.add(COMMANDS.FILE_CLOSE_TAB, closeTab)
}
