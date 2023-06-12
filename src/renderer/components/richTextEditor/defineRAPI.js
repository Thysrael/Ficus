import bus from 'vue3-eventbus'

export default function defineRAPI (vditor, searchData) {
  const config = {
    typewriterMode: false
  }
  /** 设置编辑器内容 **/
  bus.on('setEditorContent', ({ content }) => {
    vditor.setValue(content)
    // 同时返回新文本的内容、长度以及行数
    bus.emit('saveChange', {
      content,
      wordCnt: content.length,
      lineCnt: content.split('\n').length - 1
    })
  })

  /** 修改编辑模式 **/
  bus.on('changeEditMode', ({ mode }) => {
    if (mode === 0) {
      vditor.changeEditMode('wysiwyg')
    } else if (mode === 1) {
      vditor.changeEditMode('sv')
    } else {
      vditor.changeEditMode('ir')
    }
    // 如果用户正在搜索，则实时返回最新的搜索结果
    if (vditor.vditor.search.isSearching) {
      const res = vditor.vditor.search.getSearchCounter()
      searchData.current = res.current
      searchData.total = res.total
    }
  })

  /** 修改内容主题 **/
  bus.on('changeContentTheme', ({ theme }) => {
    if (theme === 'classic' || theme === 'modern') {
      vditor.setContentTheme(theme)
    } else {
      console.log('no match theme!')
    }
  })

  /** 将用户选中的文本复制进剪切板 **/
  bus.on('copySelectedText', async ({ type }) => {
    const content = vditor.getSelection(type)
    try {
      await navigator.clipboard.writeText(content)
    } catch (e) {
      console.log('复制失败')
    }
  })

  /** 剪切用户选中的文本 **/
  bus.on('cutSelectedText', async () => {
    let content = ''
    if (vditor.vditor.currentMode === 'wysiwyg') {
      content = vditor.getSelection('md')
    } else if (vditor.vditor.currentMode === 'sv') {
      content = vditor.getSelection('text')
    }
    try {
      await navigator.clipboard.writeText(content)
      vditor.deleteValue()
    } catch (e) {
      console.log('剪切失败')
    }
  })

  /** 粘贴剪切板内容 **/
  bus.on('pasteSelectedText', async ({ type }) => {
    try {
      let content = await window.electronAPI.handlePaste()
      if (type === 'plain') {
        content = content.replace(/(<([^>]+)>)/gi, '')
      }
      document.execCommand('insertText', false, content)
    } catch (e) {
      console.log('粘贴失败')
      console.log(e)
    }
  })

  /** 删除所选的文本 **/
  bus.on('deleteSelectedText', () => {
    console.log('删除！')
    vditor.deleteValue()
  })

  /** 在光标处插入文本 **/
  bus.on('insertText', ({ content }) => {
    vditor.insertValue(content)
  })

  /** 增加block **/
  bus.on('addBlock', ({ type }) => {
    vditor.addBlock(type)
  })

  /** 增加format **/
  bus.on('addFormat', ({ type }) => {
    vditor.addFormat(type)
  })

  /** 导出html **/
  bus.on('exportHTML', () => {
    vditor.exportHTML()
  })

  /** 导出pdf **/
  bus.on('exportPDF', () => {
    const html = vditor.exportHTML(false)
    window.electronAPI.exportPDF(html)
  })

  /** 跳转到对应的标题位置 **/
  bus.on('scrollToHeading', ({ info }) => {
    vditor.scrollToHeading(info)
  })

  /** 清除样式 **/
  bus.on('removeFormat', () => {
    vditor.removeFormat()
  })

  /** 改变打字机模式 **/
  bus.on('toggleTypewriterMode', () => {
    config.typewriterMode = !config.typewriterMode
    vditor.setTypewriterMode(config.typewriterMode)
    bus.emit('changeShowTypewriterMode', config.typewriterMode)
  })

  /** 修改代码块主题 */
  bus.on('setCodeTheme', ({ codeTheme }) => {
    vditor.setCodeTheme(codeTheme)
  })

  /** 切换Latex引擎 */
  bus.on('setLatexEngine', ({ engine }) => {
    if (engine === 'KaTex' || engine === 'MathJax') {
      vditor.setLatexEngine(engine)
    } else {
      console.log('切换失败')
    }
  })

  /** 设置代码块行号的显示和隐藏 */
  bus.on('setCodeBlockLineNumber', ({ enable }) => {
    vditor.setCodeBlockLineNumber(enable)
  })

  /** 设置sv模式下自动加空格 */
  bus.on('setAutoSpace', ({ enable }) => {
    vditor.setAutoSpace(enable)
  })

  /** 设置自动矫正术语 */
  bus.on('setAutoFixTermTypo', ({ enable }) => {
    vditor.setAutoFixTermTypo(enable)
  })

  /** 设置悬浮工具框的功能 */
  bus.on('setPopoverToolbar', (options) => {
    vditor.setPopoverToolbar(options)
  })

  /** SV模式下是否隐藏preview区域 */
  bus.on('setSVPreview', ({ enable }) => {
    if (enable) {
      vditor.setPreviewMode('both')
    } else {
      vditor.setPreviewMode('editor')
    }
  })

  /** 设置TextUI的可编辑性 */
  bus.on('setEditable', ({ enable }) => {
    vditor.setEditable(enable)
  })
}
