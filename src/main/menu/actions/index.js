import { loadFileCommands } from './file'
<<<<<<< HEAD
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
=======

export const loadMenuCommands = commandManager => {
  loadFileCommands(commandManager)
>>>>>>> a17492ca407605ce23b4a6e4f178a9b99b54cfb3
}
