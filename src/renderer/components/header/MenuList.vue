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
    const items = ref([])

    window.menuAPI.setAppMenu((e, menuItems) => {
      items.value = menuItems
    })

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
      const op = (layer === 1) ? items.value[index] : (layer === 2) ? secondItems.value[index] : thirdItems.value[index]

      if (op.submenu && op.submenu.length) {
        if (layer === 1) {
          secondItems.value = op.submenu
          secondShow.value = true
          secondOffset.value = index * 23
          thirdShow.value = false
          thirdOffset.value = 0
        } else {
          thirdItems.value = op.submenu
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

    // 新建文件
    async function newFile () {
      let path = ''
      if (props.data.length !== 0) {
        path = props.data[0].path
      }
      const obj = await window.electronAPI.newFileFromDialog(path)
      for (let i = 0; i < obj.length; i++) {
        bus.emit('openNewTab', obj[i].file)
      }
    }

    // 菜单栏核心逻辑分发函数
    async function show (layer, index) {
      // 导航
      mouseIn(layer, index)

      // 功能
      const op = (layer === 1) ? items[index] : (layer === 2) ? secondItems.value[index] : thirdItems.value[index]

      if (!(op.submenu && op.submenu.length)) {
        // 根据index找相应的函数执行
        const mode = store.getters.getMode
        switch (op.label) {
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
            bus.emit('cmd::execute', 'view.toggle-dev-tools')
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
        closeMenu() // 点击叶节点关闭菜单
      }
    }

    /**
     * 模式显示
     * @param obj {{mode: int}}
     */

    bus.on('changeShowMode', (mode) => {
      const modeArray = items.value[4].submenu
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
