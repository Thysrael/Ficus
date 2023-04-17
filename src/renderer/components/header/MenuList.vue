<template>
  <div class="text-gray-600 text-sm" style="display: flex;margin-left: 100px;margin-top:20px"
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
      />
    </ul>
    <ul v-if="secondShow">
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in secondItems"
          :key="index"
          @mouseenter="mouseIn(2, index)"
          @click="show(2, index)"
      />
    </ul>
    <ul v-if="thirdShow">
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in thirdItems"
          :key="index"
          @mouseenter="mouseIn(3, index)"
          @click="show(3, index)"
      />
    </ul>
  </div>
</template>

<script>
import { getCurrentInstance, ref, watch } from 'vue'
import bus from 'vue3-eventbus'
import MenuItem from '@/renderer/components/header/MenuItem'

export default {
  name: 'MenuList',
  components: { MenuItem },
  setup () {
    const items = [{
      name: '文件',
      children: [{
        name: '新建文件'
      }, {
        name: '新建窗口'
      }, {
        name: '新建项目'
      }, {
        name: '打开本地文件'
      }, {
        name: '打开工作区'
      }, {
        name: '打开最近文件'
      }, {
        name: '选择编码重新打开'
      }, {
        name: '保存'
      }, {
        name: '另存为'
      }, {
        name: '保存全部打开的文件'
      }, {
        name: '关闭当前标签页'
      }, {
        name: '关闭当前窗口'
      }, {
        name: '重命名'
      }, {
        name: '导出文件'
      }, {
        name: '打印文件'
      }, {
        name: '打开控制台'
      }, {
        name: '退出程序'
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
      }, {
        name: '搜索'
      }]
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
      }, {
        name: '下划线'
      }, {
        name: '斜体'
      }, {
        name: '删除线'
      }, {
        name: '行内代码'
      }, {
        name: '代码块'
      }, {
        name: '行内数学公式'
      }, {
        name: '数学公式块'
      }, {
        name: '高亮'
      }, {
        name: '上标'
      }, {
        name: '下标'
      }, {
        name: '注释'
      }, {
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
        name: '进入 Ficus 视图'
      }, {
        name: '源代码模式'
      }, {
        name: '文本编辑模式'
      }, {
        name: '主题偏好',
        children: [{
          name: '经典主题'
        }, {
          name: '暗黑主题'
        }]
      }]
    }]

    const secondItems = ref([{}])
    const secondShow = ref(false)
    const thirdItems = ref([{}])
    const thirdShow = ref(false)
    const openDir = ref([])
    const menu = ref(false)
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx

    console.log(proxy, _this)

    watch(menu, (newValue, oldValue) => {
      console.log(`menu changed from ${oldValue} to ${newValue}`)
      if (newValue) {
        _this.$nextTick(() => {
          _this.$refs.myMenu.focus()
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
        const obj = contain(file, arr[i].children)
        if (obj.has) {
          return obj
        }
      }
      return {
        has: false,
        res: file
      }
    }

    // 新建项目
    async function newMyProject () {
      const root = await window.electronAPI.newFicusVault('newTest')
      console.log(root.root)
      openDir.value = [{
        name: root.root.foldername,
        path: root.root.path,
        children: root.root.tree,
        curChild: -1,
        content: '',
        absolutePath: [root.root.foldername],
        offset: -1
      }]
      bus.emit('openDir', openDir.value[0])
    }

    // 打开文件，可以一次打开多个
    async function openMyFile () {
      const files = await window.electronAPI.openFile()
      console.log(files)
      for (let i = 0; i < files.length; i++) {
        // 特殊场景：打开文件夹，再次从本地打开文件夹中已有的文件
        // 策略：如果在文件夹中已经打开，则使用文件夹内的对象，否则使用files[i]
        // 必要性：确保前端对每一个文件只维护一个缓存，避免内容更新复杂
        const obj = contain(files[i], openDir.value)
        bus.emit('openNewTab', obj.res)
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
          case '新建项目':
            await newMyProject()
            break
          case '打开本地文件':
            await openMyFile()
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
          case '图片':
            bus.emit('addFormat', { type: 'img-link' })
            break
          case '文件引用':
            bus.emit('addFormat', { type: 'file-link' })
            break
        }
      }
    }

    function closeMenu () {
      menu.value = false
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
