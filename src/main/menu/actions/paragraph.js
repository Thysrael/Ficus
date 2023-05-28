import COMMANDS from '../../../common/commands'

const heading1 = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const heading2 = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const heading3 = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const heading4 = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const heading5 = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const heading6 = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const table = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const mathFormula = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const codeFence = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const quoteBlock = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const orderList = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const bulletList = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const taskList = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
const horizontalLine = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}
export const loadParagraphCommands = commandManager => {
  commandManager.add(COMMANDS.PARAGRAPH_HEADING_1, heading1)
  commandManager.add(COMMANDS.PARAGRAPH_HEADING_2, heading2)
  commandManager.add(COMMANDS.PARAGRAPH_HEADING_3, heading3)
  commandManager.add(COMMANDS.PARAGRAPH_HEADING_4, heading4)
  commandManager.add(COMMANDS.PARAGRAPH_HEADING_5, heading5)
  commandManager.add(COMMANDS.PARAGRAPH_HEADING_6, heading6)
  commandManager.add(COMMANDS.PARAGRAPH_TABLE, table)
  commandManager.add(COMMANDS.PARAGRAPH_MATH_FORMULA, mathFormula)
  commandManager.add(COMMANDS.PARAGRAPH_CODE_FENCE, codeFence)
  commandManager.add(COMMANDS.PARAGRAPH_QUOTE_BLOCK, quoteBlock)
  commandManager.add(COMMANDS.PARAGRAPH_ORDERED_LIST, orderList)
  commandManager.add(COMMANDS.PARAGRAPH_BULLET_LIST, bulletList)
  commandManager.add(COMMANDS.PARAGRAPH_TASK_LIST, taskList)
  commandManager.add(COMMANDS.PARAGRAPH_HORIZONTAL_LINE, horizontalLine)
}
