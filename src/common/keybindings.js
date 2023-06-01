export const simplifyAccelerator = accelerator => {
  return accelerator
    .replace(/Command|Ctrl/g, '⌘')
    .replace(/Option|Alt/g, '⌥')
    .replace(/Shift/g, '⇧')
}

export const viditorFormatAccelerator = accelerator => {
  return accelerator
    .replace(/Command|Ctrl/g, '⌘')
    .replace(/Option|Alt/g, '⌥')
    .replace(/Shift/g, '⇧')
    .replace(/[+]/g, '')
    .replace(/⌘⇧/g, '⇧⌘')
    .replace(/⌘⌥/g, '⌥⌘')
}

export const modifiableKeybindingsMap = new Map([
  ['file.open-file', '打开文件'],
  ['file.open-folder', '打开文件夹'],
  ['view.text-mode', '文本模式']
])
