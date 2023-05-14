<template>
  <div class="flex flex-wrap block place-content-center align-middle content-center px-8"
       style="margin: 0; padding: 0; width: 100%; height: 100%">
    <div id="mindMapContainer"
         style="margin: 0; padding: 0; width: 800px; height: 100%">
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, shallowRef } from 'vue'
import MindMap from 'simple-mind-map/dist/simpleMindMap.umd.min'
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
    let ficTree = null

    onMounted(() => {
      console.log('test')
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
            },
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
      })
    })

    // 监听data变化
    bus.on('sendToFicTree', (obj) => {
      // getData(obj).then(drawFicTree)
      // console.log(ficTree)
      ficTree.setData({
        data: {
          text: '根节点'
        },
        children: [
          {
            data: {
              text: '二级节点'
            },
            children: []
          },
          {
            data: {
              text: Math.random().toString()
            },
            children: []
          }
        ]
      })

      ficTree.render()
    })

    // bus.emit('saveChangeMindUI', msg[0])

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

    function drawFicTree () {
      // ficTree.setData(data)
      // ficTree.view.reset()
    }

    async function getData (obj) {
      // data.value = obj
    }

    bus.on('exportTreePNG', () => {
      exportImg('png')
    })

    return {
      data,
      ficTree
    }
  }
})
</script>
