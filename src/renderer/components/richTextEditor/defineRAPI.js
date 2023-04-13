import bus from 'vue3-eventbus'

export default function defineRAPI (vditor) {
  /** 设置编辑器内容 **/
  bus.on('setEditorContent', ({ content }) => {
    vditor.setValue(content)
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
      vditor.setTheme('classic', 'classic', 'github', '/css/content-theme')
    } else if (theme === 'modern') {
      vditor.setTheme('classic', 'modern', 'github', '/css/content-theme')
    } else {
      console.log('no match theme!')
    }
  })

  /** 将用户选中的文本复制进剪切板 **/
  bus.on('copySelectedText', () => {
    const content = vditor.getSelection()

    const textarea = document.createElement('textarea')
    textarea.value = content
    textarea.style.display = 'none'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  })

  /** 在光标处插入文本 **/
  bus.on('insertText', ({ content }) => {
    vditor.insertValue(content)
  })
}
