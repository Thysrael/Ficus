import COMMANDS from '../../../common/commands'

const strong = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const emphasis = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const strike = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const inlineCode = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const inlineMath = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const highlight = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const fileLink = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const hyperlink = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const image = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const clearFormat = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
export const loadFormatCommands = commandManager => {
  commandManager.add(COMMANDS.FORMAT_STRONG, strong)
  commandManager.add(COMMANDS.FORMAT_EMPHASIS, emphasis)
  commandManager.add(COMMANDS.FORMAT_STRIKE, strike)
  commandManager.add(COMMANDS.FORMAT_INLINE_CODE, inlineCode)
  commandManager.add(COMMANDS.FORMAT_INLINE_MATH, inlineMath)
  commandManager.add(COMMANDS.FORMAT_HIGHLIGHT, highlight)
  commandManager.add(COMMANDS.FORMAT_FILELINK, fileLink)
  commandManager.add(COMMANDS.FORMAT_HYPERLINK, hyperlink)
  commandManager.add(COMMANDS.FORMAT_IMAGE, image)
  commandManager.add(COMMANDS.FORMAT_CLEAR_FORMAT, clearFormat)
}
