export const items = [{
  name: '文件',
  children: [{
    name: '新建文件',
    keyBoard: 'Ctrl+N'
  },
  // {
  //   name: '新建窗口'
  // },
  {
    name: '打开文件',
    keyBoard: 'Ctrl+O'
  }, {
    name: '打开文件夹'
  },
  //   {
  //   name: '打开最近文件'
  // },
  // {
  //   name: '选择编码重新打开'
  // },
  {
    name: '保存当前标签页',
    keyBoard: 'Ctrl+S'
  },
  // {
  //   name: '另存为'
  // },
  // {
  //   name: '保存全部打开的文件'
  // },
  {
    name: '关闭当前标签页',
    keyBoard: 'Ctrl+W'
  }, {
    name: '重命名当前文件'
  }, {
    name: '导出文件',
    children: [{
      name: '导出HTML文件'
    }, {
      name: '导出PDF文件'
    }, {
      name: '导出PNG'
    }
    // {
    //   name: '导出SVG'
    // }
    ]
  }, {
    name: '退出',
    keyBoard: 'Ctrl+Q'
  }]
}, {
  name: '编辑',
  children: [{
    name: '撤销',
    keyBoard: 'Ctrl+Z'
  }, {
    name: '重做',
    keyBoard: 'Ctrl+Shift+Z'
  }, {
    name: '剪切',
    keyBoard: 'Ctrl+X'
  }, {
    name: '复制为纯文本',
    keyBoard: 'Ctrl+C'
  }, {
    name: '复制为Markdown'
  }, {
    name: '复制为HTML代码'
  }, {
    name: '粘贴',
    keyBoard: 'Ctrl+V'
  }, {
    name: '粘贴为纯文本',
    keyBoard: 'Ctrl+Shift+V'
  },
  //   {
  //   name: '选择'
  // },
  // {
  //   name: '搜索'
  // },
  {
    name: '删除'
  }
    // {
    //   name: '排版优化'
    // }
  ]
}, {
  name: '段落',
  children: [{
    name: '一级标题',
    keyBoard: 'Ctrl+1'
  }, {
    name: '二级标题',
    keyBoard: 'Ctrl+2'
  }, {
    name: '三级标题',
    keyBoard: 'Ctrl+3'
  }, {
    name: '四级标题',
    keyBoard: 'Ctrl+4'
  }, {
    name: '五级标题',
    keyBoard: 'Ctrl+5'
  }, {
    name: '六级标题',
    keyBoard: 'Ctrl+6'
  }, {
    name: '插入表格',
    keyBoard: 'Ctrl+T'
  }, {
    name: '数学公式块',
    keyBoard: 'Ctrl+Shift+M'
  }, {
    name: '代码块',
    keyBoard: 'Ctrl+Shift+K'
  }, {
    name: '引用',
    keyBoard: 'Ctrl+Shift+Q'
  }, {
    name: '有序列表',
    keyBoard: 'Ctrl+Shift+['
  }, {
    name: '无序列表',
    keyBoard: 'Ctrl+Shift+]'
  }, {
    name: '任务清单',
    keyBoard: 'Ctrl+Shift+X'
  }, {
    name: '水平线'
  }]
}, {
  name: '格式',
  children: [{
    name: '加粗',
    keyBoard: 'Ctrl+B'
  },
  //   {
  //   name: '下划线'
  // },
  {
    name: '斜体',
    keyBoard: 'Ctrl+I'
  }, {
    name: '删除线',
    keyBoard: 'Alt+Shift+5'
  }, {
    name: '行内代码',
    keyBoard: 'Ctrl+Shift+`'
  }, {
    name: '行内数学公式',
    keyBoard: 'Ctrl+M'
  }, {
    name: '高亮'
  },
  //   {
  //   name: '上标'
  // }, {
  //   name: '下标'
  // },
  // {
  //   name: '注释'
  // },
  {
    name: '引用文件'
  }, {
    name: '超链接',
    keyBoard: 'Ctrl+K'
  }, {
    name: '图像',
    keyBoard: 'Ctrl+Shift+I'
  }, {
    name: '清除样式',
    keyBoard: 'Ctrl+\\'
  }]
}, {
  name: '视图和布局',
  children: [{
    name: '文本模式',
    selected: false
  }, {
    name: '源码模式',
    selected: false
  }, {
    name: 'Ficus模式',
    selected: false
  },
  //   {
  //   name: '主题偏好',
  //   children: [{
  //     name: '经典主题'
  //   }, {
  //     name: '暗黑主题'
  //   }]
  // },
  {
    name: '开发者工具',
    keyBoard: 'Shift+F12'
  }, {
    name: '打字机模式',
    selected: false,
    keyBoard: 'F9'
  }]
}, {
  name: '帮助',
  children: [
  //     {
  //   name: '欢迎'
  // },
    {
      name: '文档'
    }, {
      name: '关于'
    }]
}]
