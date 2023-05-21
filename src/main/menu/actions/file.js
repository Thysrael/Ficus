import COMMANDS from '../../../common/commands'

const openFile = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', id)
}

export const loadFileCommands = commandManager => {
  commandManager.add(COMMANDS.FILE_OPEN_FILE, openFile)
}
