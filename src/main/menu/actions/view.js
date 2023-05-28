import COMMANDS from '../../../common/commands'
const textMode = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const sourceCodeMode = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const ficusMode = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const toggleDevTools = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const typewriterMode = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
export const loadViewCommands = commandManager => {
  commandManager.add(COMMANDS.VIEW_TEXT_MODE, textMode)
  commandManager.add(COMMANDS.VIEW_SOURCE_CODE_MODE, sourceCodeMode)
  commandManager.add(COMMANDS.VIEW_FICUS_MODE, ficusMode)
  commandManager.add(COMMANDS.VIEW_TOGGLE_DEV_TOOLS, toggleDevTools)
  commandManager.add(COMMANDS.VIEW_TYPEWRITER_MODE, typewriterMode)
}
