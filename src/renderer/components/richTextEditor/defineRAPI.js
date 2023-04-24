import bus from 'vue3-eventbus'

export default function defineRAPI (vditor) {
  /** 设置编辑器内容 **/
  bus.on('setEditorContent', ({ content }) => {
    vditor.setValue(content)
    // 同时返回新文本的内容、长度以及行数
    bus.emit('saveChange', {
      content: content,
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
  })

  /** 修改内容主题 **/
  bus.on('changeContentTheme', ({ theme }) => {
    if (theme === 'classic') {
      vditor.setTheme('classic', 'classic', 'github')
    } else if (theme === 'modern') {
      vditor.setTheme('classic', 'modern', 'github')
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

  /** 设置打字机模式 **/
  bus.on('setTypewriterMode', ({ enable }) => {
    vditor.setTypewriterMode(enable)
  })
}
