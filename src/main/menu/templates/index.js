import { isOsx } from '@/main/config'
import app from './app'
import file from './file'
import edit from './edit'
import paragraph from './paragraph'
import format from './format'
import view from './view'
import help from './help'

export function getMenuTemplates (keybindings) {
  return [
    ...(isOsx ? [app(keybindings)] : []),
    file(keybindings),
    edit(keybindings),
    paragraph(keybindings),
    format(keybindings),
    view(keybindings),
    help(keybindings)
  ]
}

export function toRawMenuTemplates (menuTemplates) {
  const rawMenu = []
  for (const item of menuTemplates) {
    const { label, accelerator, submenu } = item
    if (label && label !== 'Ficus') {
      const rawItem = { label, accelerator }
      if (submenu) {
        rawItem.submenu = toRawMenuTemplates(submenu)
      }
      rawMenu.push(rawItem)
    }
  }
  return rawMenu
}
