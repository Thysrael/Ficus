import COMMANDS from '../../../common/commands'

const undo = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const redo = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const cut = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const copy = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const copyAsMarkdown = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const paste = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const pasteAsPlaintext = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const copyAsHTML = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const Delete = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
export const loadEditCommands = commandManager => {
  commandManager.add(COMMANDS.EDIT_UNDO, undo)
  commandManager.add(COMMANDS.EDIT_REDO, redo)
  commandManager.add(COMMANDS.EDIT_CUT, cut)
  commandManager.add(COMMANDS.EDIT_COPY, copy)
  commandManager.add(COMMANDS.EDIT_COPY_AS_MARKDOWN, copyAsMarkdown)
  commandManager.add(COMMANDS.EDIT_PASTE, paste)
  commandManager.add(COMMANDS.EDIT_PASTE_AS_PLAINTEXT, pasteAsPlaintext)
  commandManager.add(COMMANDS.EDIT_COPY_AS_HTML, copyAsHTML)
  commandManager.add(COMMANDS.EDIT_DELETE, Delete)
}
