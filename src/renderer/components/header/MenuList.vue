<template>
  <div class="text-gray-600 text-sm" style="display: flex;margin-top:20px"
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
    <ul v-if="secondShow">
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in secondItems"
          :key="index"
          @mouseenter="mouseIn(2, index)"
          @click="show(2, index)"
          class="hover:bg-gray-200 bg-white shadow-md"
      />
    </ul>
    <ul v-if="thirdShow">
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
import { getCurrentInstance, ref, watch, onMounted } from 'vue'
import bus from 'vue3-eventbus'
import MenuItem from '@/renderer/components/header/MenuItem'
import Mousetrap from 'mousetrap'
import keyBoardMap from '@/renderer/utils/keyboardbinding/keyBoardMap'

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
        name: '新建文件'
      },
      // {
      //   name: '新建窗口'
      // },
      {
        name: '打开文件'
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
        name: '保存'
      }, {
        name: '另存为'
      },
      // {
      //   name: '保存全部打开的文件'
      // },
      {
        name: '关闭当前标签页'
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
        }, {
          name: '导出SVG'
        }]
      }, {
        name: '退出'
      }]
    }, {
      name: '编辑',
      children: [{
        name: '撤销'
      }, {
        name: '重做'
      }, {
        name: '剪切'
      }, {
        name: '复制为纯文本'
      }, {
        name: '复制为 Markdown Text'
      }, {
        name: '复制为 HTML 代码'
      }, {
        name: '粘贴'
      }, {
        name: '粘贴为纯文本'
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
        name: '一级标题'
      }, {
        name: '二级标题'
      }, {
        name: '三级标题'
      }, {
        name: '四级标题'
      }, {
        name: '五级标题'
      }, {
        name: '六级标题'
      }, {
        name: '表格'
      }, {
        name: '数学公式块'
      }, {
        name: '代码块'
      }, {
        name: '引用'
      }, {
        name: '有序列表'
      }, {
        name: '无序列表'
      }, {
        name: '任务清单'
      }, {
        name: '水平线'
      }]
    }, {
      name: '格式',
      children: [{
        name: '加粗'
      },
      //   {
      //   name: '下划线'
      // },
      {
        name: '斜体'
      }, {
        name: '删除线'
      }, {
        name: '行内代码'
      }, {
        name: '行内数学公式'
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
        name: '超链接'
      }, {
        name: '图像'
      }, {
        name: '清楚样式'
      }]
    }, {
      name: '视图和布局',
      children: [{
        name: 'Ficus模式'
      }, {
        name: '源码模式'
      }, {
        name: '文本模式'
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
        name: '开发者工具'
      }, {
        name: '打字机模式'
      }]
    }, {
      name: '帮助',
      children: [{
        name: '欢迎'
      }, {
        name: '文档'
      }, {
        name: '关于'
      }]
    }]

    const secondItems = ref([{}])
    const secondShow = ref(false)
    const thirdItems = ref([{}])
    const thirdShow = ref(false)
    const menu = ref(false)
    let isTypeWriteMode = false
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx
    let range = ''

    onMounted(() => {
      Mousetrap.reset()
      Mousetrap.bind(keyBoardMap.get('edit.undo'), function () {
        bus.emit('undoCurTab')
      })
      Mousetrap.bind(keyBoardMap.get('edit.redo'), function () {
        bus.emit('redoCurTab')
      })
    })

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
          thirdShow.value = false
        } else {
          thirdItems.value = op.children
          thirdShow.value = true
        }
      } else {
        if (layer === 1) {
          secondShow.value = false
          thirdShow.value = false
        } else if (layer === 2) {
          thirdShow.value = false
        }
      }
    }

    // 如果在文件夹中已经打开，则返回文件夹内的对象，否则返回files[i]
    function contain (file, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].path === file.path) {
          return {
            has: true,
            res: arr[i]
          }
        }
        if (arr[i].type === 'folder') {
          const obj = contain(file, arr[i].children)
          if (obj.has) {
            return obj
          }
        }
      }
      return {
        has: false,
        res: file
      }
    }

    // 新建项目
    async function newMyProject () {
      const obj = await window.electronAPI.newFicusVault()
      if (obj.error === 0) {
        const root = obj.relation
        const openDir = [{
          name: root.root.folderName,
          path: root.root.path,
          children: root.root.tree,
          curChild: -1,
          absolutePath: [root.root.folderName],
          offset: -1,
          type: 'folder'
        }]
        bus.emit('openDir', openDir[0])
      }
    }

    // 打开文件，可以一次打开多个
    async function openMyFile () {
      const files = await window.electronAPI.openFile()
      for (let i = 0; i < files.length; i++) {
        // 特殊场景：打开文件夹，再次从本地打开文件夹中已有的文件
        // 策略：如果在文件夹中已经打开，则使用文件夹内的对象，否则使用files[i]
        // 必要性：确保前端对每一个文件只维护一个缓存，保证rename的同步
        const obj = contain(files[i], props.data)
        bus.emit('openNewTab', obj.res)
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
        switch (op.name) {
          case '新建文件':
            await newFile()
            break
          case '打开文件夹':
            await newMyProject()
            break
          case '打开文件':
            await openMyFile()
            break
          case '退出':
            await window.electronAPI.closeWindow()
            break
          case '保存':
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
          case '复制为纯文本':
            bus.emit('copySelectedText', { type: 'text' })
            break
          case '复制为 Markdown Text':
            bus.emit('copySelectedText', { type: 'md' })
            break
          case '复制为 HTML 代码':
            bus.emit('copySelectedText', { type: 'html' })
            break
          case '粘贴':
            navigator.clipboard.readText().then(text => {
              bus.emit('insertText', { content: text })
            })
            break
          case '一级标题':
            bus.emit('addBlock', { type: 'heading-1' })
            break
          case '二级标题':
            bus.emit('addBlock', { type: 'heading-2' })
            break
          case '三级标题':
            bus.emit('addBlock', { type: 'heading-3' })
            break
          case '四级标题':
            bus.emit('addBlock', { type: 'heading-4' })
            break
          case '五级标题':
            bus.emit('addBlock', { type: 'heading-5' })
            break
          case '六级标题':
            bus.emit('addBlock', { type: 'heading-6' })
            break
          case '表格':
            bus.emit('addBlock', { type: 'table' })
            break
          case '数学公式块':
            bus.emit('addBlock', { type: 'math-block' })
            break
          case '代码块':
            bus.emit('addBlock', { type: 'code-block' })
            break
          case '引用':
            bus.emit('addBlock', { type: 'quote' })
            break
          case '有序列表':
            bus.emit('addBlock', { type: 'ordered-list' })
            break
          case '无序列表':
            bus.emit('addBlock', { type: 'unordered-list' })
            break
          case '任务清单':
            bus.emit('addBlock', { type: 'task-list' })
            break
          case '水平线':
            bus.emit('addBlock', { type: 'horizontal-line' })
            break
          case '加粗':
            bus.emit('addFormat', { type: 'bold' })
            break
          case '斜体':
            bus.emit('addFormat', { type: 'italic' })
            break
          case '删除线':
            bus.emit('addFormat', { type: 'strike' })
            break
          case '行内代码':
            bus.emit('addFormat', { type: 'inline-code' })
            break
          case '行内数学公式':
            bus.emit('addFormat', { type: 'inline-math' })
            break
          case '高亮':
            bus.emit('addFormat', { type: 'highlight' })
            break
          case '超链接':
            bus.emit('addFormat', { type: 'link' })
            break
          case '图像':
            bus.emit('addFormat', { type: 'img-link' })
            break
          case '引用文件':
            bus.emit('addFormat', { type: 'file-link' })
            break
          case '清楚样式':
            bus.emit('removeFormat')
            break
          case '打字机模式':
            isTypeWriteMode = !isTypeWriteMode
            bus.emit('setTypewriterMode', { enable: isTypeWriteMode })
            break
          case '导出HTML文件':
            bus.emit('exportHTML')
            break
          case '导出PDF文件':
            bus.emit('exportPDF')
            break
          case 'Ficus模式':
            bus.emit('changeMode', 2)
            break
          case '文本模式':
            bus.emit('changeMode', 0)
            break
          case '源码模式':
            bus.emit('changeMode', 1)
            break
          case '欢迎':
            bus.emit('changeMode', -1)
            break
        }
      }
    }

    function closeMenu () {
      menu.value = false
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
      thirdShow,
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
