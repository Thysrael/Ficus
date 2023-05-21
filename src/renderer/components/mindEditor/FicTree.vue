<template>
  <div class="flex flex-wrap block place-content-center align-middle content-center px-8 relative w-full">
    <div id="mindMapContainer"
         class="absolute"
         style="margin: 0; padding: 0; width: 1000px; height: 100%">
    </div>
    <div class="contextMenu rounded-md shadow-lg px-4 py-2"
         v-if="menuShow"
         :style="{ left: menuLeft + 'px', top: menuTop + 'px' }">
      <template v-if="clickType === 'node'">
        <div class="contextMenuItem" @click="copy">复制</div>
        <div class="contextMenuItem" @click="cut">剪切</div>
        <div class="contextMenuItem" @click="paste">粘贴</div>
        <div class="contextMenuItem" @click="delNode">删除</div>
      </template>
      <template v-if="clickType === 'svg'">
        <!-- 点击空白区域后召出的菜单 -->
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, shallowRef } from 'vue'
import MindMap from 'simple-mind-map'
import Drag from 'simple-mind-map/src/Drag.js'
import bus from 'vue3-eventbus'

export default defineComponent({
  setup () {
    /* eslint-disable */
    const data = ref({
      data: {
        text: 'null'
      },
      children: []
    })
    const activeNodes = shallowRef([])
    // 实现右键菜单需要的位置数据
    const clickType = ref('')
    const clickNode = shallowRef(null)
    const menuLeft = ref(0)
    const menuTop = ref(0)
    const menuShow = ref(false)
    const mousedownX = ref(0)
    const mousedownY = ref(0)
    const isMousedown = ref(false)

    let ficTree = null
    let copyData = null

    onMounted(() => {
      MindMap.usePlugin(Drag)
      ficTree = new MindMap({
        el: document.getElementById('mindMapContainer'),
        data: {
          data: {
            text: '根节点'
          },
          children: [
            {
              data: {
                text: '二级节点'
              },
              children: []
            }
          ]
        },
        mousewheelAction: 'zoom',
        mousewheelMoveStep: 100,
        initRootNodePosition: ['left', 'center']
      })
      ficTree.setThemeConfig({
        lineStyle: 'curve'
      })

      ficTree.on('node_active', (node, nodeList) => {
        activeNodes.value = nodeList
      })
      ficTree.on('data_change', (data, dataList) => {
        ficTree.resize()
        // ficTree.view.reset()
        // console.log(ficTree.getData(false))
        const newData = {
          data: ficTree.getData(false)
        }
        bus.emit('saveChangeMindUI', newData)
      })

      ficTree.keyCommand.addShortcut('Control+c', copy)
      ficTree.keyCommand.addShortcut('Control+v', paste)
      ficTree.keyCommand.addShortcut('Control+x', cut)
      ficTree.keyCommand.addShortcut('Delete', delNode)
      ficTree.keyCommand.removeShortcut('Enter')
      ficTree.keyCommand.removeShortcut('Tab')

      // 实现右键菜单
      ficTree.on('node_contextmenu', (e, node) => {
        clickType.value = 'node'
        menuLeft.value = e.offsetX + 150
        menuTop.value = e.offsetY + 10
        menuShow.value = true
        clickNode.value = node
        console.log(e.offsetX)
      })

      ficTree.on('svg_mousedown', (e) => {
        // 如果不是右键点击直接返回
        if (e.which !== 3) {
          return
        }
        mousedownX.value = e.offsetX
        mousedownY.value = e.offsetY
        isMousedown.value = true
      })

      ficTree.on('mouseup', (e) => {
        if (!isMousedown.value) {
          return
        }
        isMousedown.value = false
        // 如果鼠标松开和按下的距离大于 3 ，则不认为是点击事件
        if (Math.abs(mousedownX.value - e.offsetX) > 3 ||
            Math.abs(mousedownY.value - e.offsetY) > 3) {
          hide()
          return
        }
        clickType.value = 'svg'
        menuLeft.value = e.offsetX + 150
        menuTop.value = e.offsetY + 10
        menuShow.value = true
      })

      ficTree.on('node_click', hide)
      ficTree.on('draw_click', hide)
      ficTree.on('expand_btn_click', hide)

      // 监听data变化
      bus.on('sendToFicTree', (obj) => {
        // getData(obj).then(drawFicTree)
        // console.log(test)
        // console.log(JSON.stringify(obj))
        ficTree.setData(JSON.parse(JSON.stringify(obj)))
        ficTree.render()
      })
    })

    // bus.emit('saveChangeMindUI', msg[0])

    // Tools
    const hide = () => {
      menuShow.value = false
      menuLeft.value = 0
      menuTop.value = 0
      clickType.value = ''
    }

    function copy () {
      console.log("successfully copy!")
      copyData = ficTree.renderer.copyNode()
      hide()
    }
    function cut () {
      ficTree.execCommand('CUT_NODE', _copyData => {
        copyData = _copyData
      })
      hide()
    }
    function paste () {
      ficTree.execCommand('PASTE_NODE', copyData)
      hide()
    }

    function delNode () {
      ficTree.execCommand('REMOVE_NODE')
      hide()
    }

    function exportImg (type) {
      /* eslint-disable */
      const lnk = document.createElement('a')
      let e
      lnk.download = 'FicusTree.png'
      lnk.href = ficTree.export(type, true, 'FicusTree')
      /// create a "fake" click-event to trigger the download
      if (document.createEvent) {
        e = document.createEvent('MouseEvents')
        e.initMouseEvent(
          'click',
          true,
          true,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        )
        lnk.dispatchEvent(e)
      }
    }

    bus.on('exportTreePNG', () => {
      exportImg('png')
    })

    return {
      data,
      ficTree,
      menuLeft,
      menuTop,
      menuShow,
      clickNode,
      clickType,
      copy,
      cut,
      paste,
      delNode
    }
  }
})
</script>

<style>
.contextMenu {
  position: absolute;
  z-index: 999;
  background: #fff;
}

.contextMenuItem {
  cursor: pointer;
  padding-bottom: 2px;
}

.contextMenuItem:hover {
  font-weight: 900;
  color: #42b983;
}
</style>