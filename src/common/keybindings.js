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
  ['view.text-mode', '文本模式'],
  ['file.new-file', '新建文件'],
  ['file.save', '保存当前文件'],
  ['file.save-as', '另存为'],
  ['file.rename-file', '重命名当前文件'],
  ['file.close-tab', '关闭当前标签页'],
  ['file.export-as-html', '导出HTML文件'],
  ['file.export-as-pdf', '导出PDF文件'],
  ['file.export-as-png', '导出PNG'],
  ['file.quit', '退出'],
  ['edit.undo', '撤销'],
  ['edit.redo', '重做'],
  ['edit.cut', '剪切'],
  ['edit.copy-as-markdown', '复制为Markdown'],
  ['edit.copy-as-html', '复制为HTML代码'],
  ['edit.paste-as-plaintext', '粘贴为纯文本'],
  ['edit.find', '文档内搜索替换'],
  ['edit.delete', '删除'],
  ['format.strong', '加粗'],
  ['format.emphasis', '斜体'],
  ['format.strike', '删除线'],
  ['format.inline-code', '行内代码'],
  ['format.inline-math', '行内数学公式'],
  ['format.highlight', '高亮'],
  ['format.filelink', '引用文件'],
  ['format.hyperlink', '超链接'],
  ['format.image', '图像'],
  ['format.clear-format', '清除样式'],
  ['paragraph.heading-1', '一级标题'],
  ['paragraph.heading-2', '二级标题'],
  ['paragraph.heading-3', '三级标题'],
  ['paragraph.heading-4', '四级标题'],
  ['paragraph.heading-5', '五级标题'],
  ['paragraph.heading-6', '六级标题'],
  ['paragraph.table', '插入表格'],
  ['paragraph.math-formula', '数学公式块'],
  ['paragraph.code-fence', '代码块'],
  ['paragraph.quote-block', '引用'],
  ['paragraph.order-list', '有序列表'],
  ['paragraph.bullet-list', '无序列表'],
  ['paragraph.task-list', '任务清单'],
  ['paragraph.horizontal-line', '水平线'],
  ['view.source-code-mode', '源码模式'],
  ['view.ficus-mode', '榕树模式'],
  ['view.toggle-dev-tools', '开发者工具'],
  ['view.typewriter-mode', '打字机模式']
])
