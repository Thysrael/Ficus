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
