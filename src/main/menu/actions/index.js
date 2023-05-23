import { loadFileCommands } from './file'

import { loadParagraphCommands } from '@/main/menu/actions/paragraph'
import { loadEditCommands } from '@/main/menu/actions/edit'
import { loadHelpCommands } from '@/main/menu/actions/help'
import { loadViewCommands } from '@/main/menu/actions/view'
import { loadFormatCommands } from '@/main/menu/actions/format'

export const loadMenuCommands = commandManager => {
  loadFileCommands(commandManager)
  loadEditCommands(commandManager)
  loadFormatCommands(commandManager)
  loadHelpCommands(commandManager)
  loadParagraphCommands(commandManager)
  loadViewCommands(commandManager)
}
