import { isOsx } from '@/main/config'
import app from './app'
import file from './file'
import edit from './edit'
import paragraph from './paragraph'
import format from './format'
import view from './view'
import help from './help'
import { simplifyAccelerator } from '@/common/keybindings'

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

const isValidMenuItemLabel = (label) => {
  return label && label !== 'Ficus'
}

export function toRawMenuTemplates (menuTemplates) {
  const rawMenu = []
  for (const item of menuTemplates) {
    const { label, id, accelerator, submenu, meta } = item
    if (isValidMenuItemLabel(label)) {
      const rawItem = {
        label,
        id,
        meta,
        accelerator: accelerator ? simplifyAccelerator(accelerator) : undefined,
        submenu: submenu ? toRawMenuTemplates(submenu) : undefined
      }
      rawMenu.push(rawItem)
    }
  }
  return rawMenu
}
