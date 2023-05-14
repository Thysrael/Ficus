<template>
  <div class="h-full"
       style="margin: 0; padding: 0; width: 800px"
       id="mindMapContainer">
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

    // 监听data变化
    bus.on('sendToFicTree', (obj) => {
      // getData(obj).then(drawFicTree)
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
              children: [
                {
                  data: {
                    text: '三级节点'
                  },
                  children: []
                }
              ]
            }
          ]
        },
        mousewheelAction: 'zoom',
        mousewheelMoveStep: 100,
        initRootNodePosition: ['left', 'center']
      })

      ficTree.render()

      ficTree.on('node_active', (node, nodeList) => {
        activeNodes.value = nodeList
      })
    })

    return {
      data,
      ficTree
    }
  }
})
</script>
