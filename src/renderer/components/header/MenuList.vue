<template>
  <div class="text-gray-600 text-sm" style="display: flex; margin-top:20px; outline:none;"
       v-if="menu"
       tabindex="0"
       @blur="closeMenu"
       ref="myMenu"
  >
    <ul>
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in items"
          :key="index"
          @mouseenter="mouseIn(1, index)"
          @click="show(1, index)"
          class="hover:bg-gray-200 bg-white shadow-md"
      />
    </ul>
    <ul v-if="secondShow" :style="`margin-top: ${secondOffset}px`">
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in secondItems"
          :key="index"
          @mouseenter="mouseIn(2, index)"
          @click="show(2, index)"
          class="hover:bg-gray-200 bg-white shadow-md"
      />
    </ul>
    <ul v-if="thirdShow" :style="`margin-top: ${secondOffset + thirdOffset}px`">
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in thirdItems"
          :key="index"
          @mouseenter="mouseIn(3, index)"
          @click="show(3, index)"
          class="hover:bg-gray-200 bg-white shadow-md"
      />
    </ul>
  </div>
</template>

<script>
import { getCurrentInstance, ref, watch } from 'vue'
import bus from 'vue3-eventbus'
import MenuItem from '@/renderer/components/header/MenuItem'
import store from '@/renderer/store'

export default {
  name: 'MenuList',
  components: { MenuItem },
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  setup (props) {
    const items = [{
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
        selected: false,
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

    const modeArray = items[4].children

    const secondItems = ref([{}])
    const secondShow = ref(false)
    const secondOffset = ref(0)
    const thirdOffset = ref(0)
    const thirdItems = ref([{}])
    const thirdShow = ref(false)
    const menu = ref(false)
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance()
    const _this = proxy
    let range = ''

    watch(menu, (newValue, oldValue) => {
      if (newValue) {
        _this.$nextTick(() => {
          if (window.getSelection().rangeCount >= 1) {
            range = window.getSelection().getRangeAt(0).cloneRange()
          }
          if (_this.$refs.myMenu !== null) {
            _this.$refs.myMenu.focus()
          }
        })
      }
    })

    // 鼠标移入事件监听
    function mouseIn (layer, index) {
      const op = (layer === 1) ? items[index] : (layer === 2) ? secondItems.value[index] : thirdItems.value[index]

      if (op.children && op.children.length) {
        if (layer === 1) {
          secondItems.value = op.children
          secondShow.value = true
          secondOffset.value = index * 23
          thirdShow.value = false
          thirdOffset.value = 0
        } else {
          thirdItems.value = op.children
          thirdShow.value = true
          thirdOffset.value = index * 23
        }
      } else {
        if (layer === 1) {
          secondShow.value = false
          thirdShow.value = false
          secondOffset.value = 0
          thirdOffset.value = 0
        } else if (layer === 2) {
          thirdShow.value = false
          thirdOffset.value = 0
        }
      }
    }

    function findFatherByPath (index, paths, father) {
      if (index === paths.length - 1) {
        return father
      }
      for (let i = 0; i < father.children.length; i++) {
        if (father.children[i].name === paths[index]) {
          return findFatherByPath(index + 1, paths, father.children[i])
        }
      }
    }

    // 新建文件
    async function newFile () {
      let path = ''
      if (props.data.length !== 0) {
        path = props.data[0].path
      }
      const obj = await window.electronAPI.newFileFromDialog(path)
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].in) {
          let j = 0
          for (; j < obj[i].file.absolutePath.length; j++) {
            if (obj[i].file.absolutePath[j] === props.data[0].name) {
              break
            }
          }
          const father = findFatherByPath(j + 1, obj[i].file.absolutePath, props.data[0])
          father.children.push(obj[i].file)
          father.curChild = father.children.length - 1
        }
        bus.emit('openNewTab', obj[i].file)
      }
    }

    // 菜单栏核心逻辑分发函数
    async function show (layer, index) {
      // 导航
      mouseIn(layer, index)

      // 功能
      const op = (layer === 1) ? items[index] : (layer === 2) ? secondItems.value[index] : thirdItems.value[index]

      if (!(op.children && op.children.length)) {
        closeMenu() // 点击叶节点关闭菜单
        // 根据index找相应的函数执行
        const mode = store.getters.getMode
        switch (op.name) {
          case '新建文件':
            await newFile()
            break
          case '打开文件夹':
            bus.emit('cmd::execute', 'file.open-folder')
            break
          case '打开文件':
            bus.emit('cmd::execute', 'file.open-file')
            break
          case '退出':
            await window.electronAPI.closeWindow()
            break
          case '保存当前标签页':
            bus.emit('writeBackForMenu')
            break
          case '关闭当前标签页':
            bus.emit('closeCurTab')
            break
          case '重命名当前文件':
            bus.emit('renameCurTabForMenu')
            break
          case '撤销':
            bus.emit('undoCurTab')
            break
          case '重做':
            bus.emit('redoCurTab')
            break
          case '剪切':
            bus.emit('cmd::execute', 'edit.cut')
            break
          case '复制为纯文本':
            bus.emit('cmd::execute', 'edit.copy')
            break
          case '复制为 Markdown Text':
            bus.emit('cmd::execute', 'edit.copy-as-markdown')
            break
          case '复制为 HTML 代码':
            bus.emit('cmd::execute', 'copy-as-markdown')
            break
          case '粘贴':
            bus.emit('cmd::execute', 'edit.paste')
            break
          case '粘贴为纯文本':
            bus.emit('cmd::execute', 'edit.paste-as-plaintext')
            break
          case '删除':
            bus.emit('deleteSelectedText')
            break
          case '一级标题':
            bus.emit('cmd::execute', 'paragraph.heading-1')
            break
          case '二级标题':
            bus.emit('cmd::execute', 'paragraph.heading-2')
            break
          case '三级标题':
            bus.emit('cmd::execute', 'paragraph.heading-3')
            break
          case '四级标题':
            bus.emit('cmd::execute', 'paragraph.heading-4')
            break
          case '五级标题':
            bus.emit('cmd::execute', 'paragraph.heading-5')
            break
          case '六级标题':
            bus.emit('cmd::execute', 'paragraph.heading-6')
            break
          case '表格':
            bus.emit('cmd::execute', 'paragraph.table')
            break
          case '数学公式块':
            bus.emit('cmd::execute', 'paragraph.math-formula')
            break
          case '代码块':
            bus.emit('cmd::execute', 'paragraph.code-fence')
            break
          case '引用':
            bus.emit('cmd::execute', 'paragraph.quote-block')
            break
          case '有序列表':
            bus.emit('cmd::execute', 'paragraph.order-list')
            break
          case '无序列表':
            bus.emit('cmd::execute', 'paragraph.bullet-list')
            break
          case '任务清单':
            bus.emit('cmd::execute', 'paragraph.task-list')
            break
          case '水平线':
            bus.emit('cmd::execute', 'paragraph.horizontal-line')
            break
          case '加粗':
            bus.emit('cmd::execute', 'format.strong')
            break
          case '斜体':
            bus.emit('cmd::execute', 'format.emphasis')
            break
          case '删除线':
            bus.emit('cmd::execute', 'format.strike')
            break
          case '行内代码':
            bus.emit('cmd::execute', 'format.inline-code')
            break
          case '行内数学公式':
            bus.emit('cmd::execute', 'format.inline-math')
            break
          case '高亮':
            bus.emit('cmd::execute', 'format.highlight')
            break
          case '超链接':
            bus.emit('cmd::execute', 'format.hyperlink')
            break
          case '图像':
            bus.emit('cmd::execute', 'format.image')
            break
          case '引用文件':
            bus.emit('addFormat', { type: 'file-link' })
            break
          case '清除样式':
            bus.emit('cmd::execute', 'format.clear-format')
            break
          case '开发者工具':
            bus.emit('cmd::execute', 'window.open-dev-tool')
            if (op.selected) {
              window.electronAPI.closeDev()
            } else {
              window.electronAPI.openDev()
            }
            op.selected = !op.selected
            break
          case '打字机模式':
            op.selected = !op.selected
            bus.emit('setTypewriterMode', { enable: op.selected })
            break
          case '导出HTML文件':
            if (mode === 0 || mode === 1) {
              bus.emit('exportHTML')
            } else {
              bus.emit('showMyAlert', { message: '当前不在文本模式或源码模式，不能导出HTML' })
            }
            break
          case '导出PDF文件':
            if (mode === 0 || mode === 1) {
              bus.emit('exportPDF')
            } else {
              bus.emit('showMyAlert', { message: '当前不在文本模式或源码模式，不能导出PDF' })
            }
            break
          case '导出PNG':
            // 只支持树模式和图模式
            if (mode === 2) {
              bus.emit('exportTreePNG')
            } else if (mode === 3) {
              bus.emit('exportGraphPNG')
            } else {
              bus.emit('showMyAlert', { message: '当前不在树视图或图视图，不能导出PNG' })
            }
            break
          case '文本模式':
            bus.emit('changeModeChoose', 0)
            break
          case '源码模式':
            bus.emit('changeModeChoose', 1)
            break
          case 'Ficus模式':
            bus.emit('changeModeChoose', 2)
            break
          case '关于':
            await window.electronAPI.aboutUs()
            break
          case '文档':
            await window.electronAPI.aboutUs()
            break
        }
      }
    }

    /**
     * 模式显示
     * @param obj {{mode: int}}
     */

    bus.on('changeShowMode', (mode) => {
      for (let i = 0; i <= 2; i++) {
        modeArray[i].selected = (i === mode)
      }
    })

    function closeMenu () {
      menu.value = false
      secondOffset.value = 0
      thirdOffset.value = 0
      secondShow.value = false
      thirdShow.value = false
      const selection = window.getSelection()
      selection.removeAllRanges()
      if (range instanceof Range) {
        selection.addRange(range)
      }
    }

    bus.on('showMenu', () => {
      menu.value = true
    })

    return {
      items,
      secondItems,
      thirdItems,
      secondShow,
      secondOffset,
      thirdShow,
      thirdOffset,
      menu,
      closeMenu,
      show,
      mouseIn
    }
  }
}
</script>

<style scoped>

</style>
