import COMMANDS from '../../../common/commands'

const helpAbout = async (win, id) => {
  win.webContents.send('ficus::keyboard-event', { id })
}

export const loadHelpCommands = commandManager => {
  commandManager.add(COMMANDS.HELP_ABOUT, helpAbout)
}
