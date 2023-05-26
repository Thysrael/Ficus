<template>
  <div class="flex flex-wrap place-content-center py-2 mx-4"
       style="height: calc(100% + 200px); width: 1000px">
    <div id="ficGraph"/>
  </div>
</template>

<script>
import bus from 'vue3-eventbus'
import ForceGraph from 'force-graph'

export default {
  name: 'FicGraph',
  mounted () {
    /* eslint-disable */
    let folderNodes = new Set()
    let fileNodes = new Set()
    let tagNodes = new Set()
    let rootLinks = new Set()
    let branchLinks = new Set()
    let tagLinks = new Set()
    let zoomLevel = 0
    let highlightNode = null
    let hidingNodes = new Map()
    let hidingLinks = new Map()
    const nodeRelMaximum = 45
    const tagNodeRelSize = 10
    const nodeRelLimit = 5
    const highlightNodes = new Set()
    const highlightLinks = new Set()
    const theme0 = ['#1E6091', '#34a0a4', '#99D98C', '#6BE6C1', '#EEEEEE', '#E1F1A7', '#C9ECE1', '#CCCCCC']
    const theme1 = ['#7544B2', '#F55C7A', '#F57C73', '#F6BC66', '#EEEEEE', '#E2C5EE', '#FFE5C3', '#F1A7C3']
    const theme2 = ['#F94144', '#F8961E', '#90BE6D', '#00BBF9', '#EEEEEE', '#FFD2BB', '#A9DEF9', '#FCF6BD']
    let theme = theme0

    let focusTarget = 0
    const defaultTimeout = 1800

    function hexToRGBA(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    }

    const ficGraph = ForceGraph()(document.getElementById('ficGraph'))
        .cooldownTicks(100)
        .onNodeClick(node => {
          // Focus on this node
          setTimeout(() => {
            bus.emit('curNode', node)
            highlightNodes.clear()
            highlightLinks.clear()
            if (node) {
              highlightNodes.add(node)
              node.neighbors.forEach(neighbor => highlightNodes.add(neighbor))
              node.links.forEach(link => highlightLinks.add(link))
            }
            highlightNode = node || null
            // console.log(highlightNodes)
          }, 200)
        })
        .onBackgroundClick(() => {
          highlightLinks.clear()
          highlightNodes.clear()
          highlightNode = null
        })
        .onZoom(zoom => zoomLevel = zoom.k)
        .d3AlphaDecay(0.01)
        .d3VelocityDecay(0.1)
        .nodeCanvasObjectMode(() => 'replace')
        .nodeVisibility(node => !hidingNodes.has(node.id))
        .linkColor(link => !highlightLinks.has(link) ? theme[4] : (rootLinks.has(link) ? theme[5] : tagLinks.has(link) ? theme[6] : theme[7]))
        .linkWidth(link => highlightLinks.has(link) ? 5 : (rootLinks.has(link) ? link.weight : 2))
        .linkVisibility(link => !hidingLinks.has(link.id))
        .linkDirectionalParticles(2)
        .linkDirectionalParticleWidth(link => tagLinks.has(link) ? (highlightLinks.has(link) ? 8 : 5) : 0)
        .linkCurvature(link => tagLinks.has(link) ? 0.3 : branchLinks.has(link) ? 0.2 : 0)
        .linkLineDash(link => branchLinks.has(link) ? [6, 8] : 0)
        .linkDirectionalArrowLength(link => tagLinks.has(link) ? 0 : (highlightLinks.has(link) ? 30 : link.weight * 6))
        .width(1000)
        .nodeRelSize(nodeRelMaximum)
    ficGraph.d3Force('link').distance(65)
    ficGraph.d3Force('center').strength(0.1)
    ficGraph.d3Force('charge').distanceMax(1000)

    // Dash animation
    const st = +new Date()
    const dashAnimateTime = 300;
    (function animate() {
      const t = ((+new Date() - st) % dashAnimateTime) / dashAnimateTime
      const lineDash = t < 0.5 ? [0, 16 * t, 6, 8 * (1 - t * 2)] : [12 * (t - 0.5), 8, 6 * (1 - (t - 0.5) * 2), 0]
      ficGraph.linkLineDash(link => branchLinks.has(link) && lineDash)
      requestAnimationFrame(animate);
    })() // IIFE

    bus.on('setGraphStyle', (obj) => {
      theme = obj.theme === 1 ? theme1 : obj.theme === 2 ? theme2 : theme0
    })

    bus.on('exportGraphPNG', () => {
      // exportPNG()
      const canvas = document.getElementById('ficGraph').querySelector('canvas')
      // 导出为 PNG 图片
      const dataURL = canvas.toDataURL('image/png')

      // 创建链接元素并设置下载属性
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'FicusGraph.png'
      link.click()
    })

    bus.on('getNodeAndLink', (obj) => {
      console.log('刷新！！！')
      const data = obj.nodes
      const link = obj.links
      let id2NodeIndex = new Map()
      let rootId = -1
      const standardLineWidth = link.length > 45 ? 5 : 3
      folderNodes.clear()
      fileNodes.clear()
      tagNodes.clear()
      rootLinks.clear()
      branchLinks.clear()
      tagLinks.clear()
      hidingNodes.clear()
      hidingLinks.clear()

      for (let i = 0; i < data.length; i++) {
        const key = data[i].id
        id2NodeIndex.set(key, i)
        if (data[i].depth === 1) {
          rootId = data[i].id
        }
        if (data[i].category === 0) {
          data[i].color = theme[1]
          folderNodes.add(data[i])
        } else if (data[i].category === 1) {
          data[i].color = theme[2]
          fileNodes.add(data[i])
        } else {
          data[i].color = theme[3]
          tagNodes.add(data[i])
        }
      }

      // Calculate nodes' neighbors
      for (let i = 0; i < link.length; i++) {
        const tmpWeight = (standardLineWidth - data[id2NodeIndex.get(link[i].source)].depth)
        link[i].weight = tmpWeight < 1 ? 1 : tmpWeight

        const sourceNode = data[id2NodeIndex.get(link[i].source)]
        const targetNode = data[id2NodeIndex.get(link[i].target)]
        !sourceNode.neighbors && (sourceNode.neighbors = [])
        !targetNode.neighbors && (targetNode.neighbors = [])
        sourceNode.neighbors.push(targetNode)
        targetNode.neighbors.push(sourceNode)
        !sourceNode.links && (sourceNode.links = [])
        !targetNode.links && (targetNode.links = [])
        sourceNode.links.push(link[i])
        targetNode.links.push(link[i])

        if (link[i].type === 0) {
          rootLinks.add(link[i])
        } else if (link[i].type === 1) {
          tagLinks.add(link[i])
        } else {
          branchLinks.add(link[i])
        }
      }

      // Set graph's data
      ficGraph.graphData({
        nodes: data,
        links: link
      })
      .nodeCanvasObject((node, ctx, globalScale) => {
        if (!hidingNodes.has(node.id)) {
          let label = node.name
          const type = node.category
          const level = node.depth
          const tmpSize = nodeRelMaximum / (Math.pow(1.7, level))
          let size = tmpSize < nodeRelLimit ? nodeRelLimit : tmpSize
          if (type === 1) {
            if (size > tagNodeRelSize) {
              size = size - 10 < nodeRelLimit ? nodeRelLimit : size - 10
            }
          } else if (type === 2) {
            size = tagNodeRelSize
          }

          if (node.category === 0) {
            node.color = theme[1]
          } else if (node.category === 1) {
            node.color = theme[2]
          } else {
            node.color = theme[3]
          }
          if (node.depth === 1) {
            node.color = theme[0]
          }

          if (label.length > 8) {
            label = `${label.substr(0, 8)}...`
          }

          // Draw a ring for highlight nodes
          if (highlightNodes.has(node)) {
            ctx.beginPath()
            ctx.arc(node.x, node.y, size * 1.4, 0, 2 * Math.PI, false)
            ctx.lineWidth = size * 0.25
            ctx.strokeStyle = hexToRGBA(node.color, 0.5)
            ctx.stroke()
            ctx.closePath()
          }
          // Draw node
          ctx.beginPath()
          ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false)
          ctx.fillStyle = node.color
          if (type === 0) {
            // folder
            let fontSize = size + globalScale * 0.05
            ctx.font = `${fontSize}px Sans-Serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(label, node.x, node.y + Math.round(fontSize * 2))
          } else if (type === 1) {
            // file
            let fontSize = size + globalScale * 0.03
            ctx.font = `${fontSize}px Sans-Serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(label, node.x, node.y + Math.round(fontSize * 2))
          } else {
            // tag
            let fontSize = size + globalScale * 0.04
            ctx.font = `${fontSize}px Sans-Serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(label, node.x, node.y + Math.round(fontSize * 2))
          }
          ctx.fill()
          ctx.closePath()
        }
      })
      .zoomToFit(400, 0, node => node.depth === 0)
      const magnifiedRatio = Math.pow((data.length / link.length), 6)
      const charge = -30 / magnifiedRatio
      const boundedCharge = Math.min(-60, charge)
      ficGraph.d3Force('charge').strength(boundedCharge)
      if (link.length < 30) {
        ficGraph.d3VelocityDecay(0.4)
      }

      focusTarget = 0
      focusOnNode(defaultTimeout)
    })

    const findObjectByIdUsingHashTable = (arr, id) => {
      const hashTable = {}
      // 构建哈希表
      for (const obj of arr) {
        hashTable[obj.id] = obj
      }
      // 查找指定 id 的对象
      return hashTable[id] || null
    }

    bus.on('focusById', ({ id, timeout }) => {
      if (id !== -1) {
        focusTarget = id
        focusOnNode(timeout || defaultTimeout)
      }
    })

    function focusOnNode (timeout = defaultTimeout) {
      setTimeout(() => {
        let { nodes, links } = ficGraph.graphData()
        // const id2Node = Object.fromEntries(nodes.map(node => [node.id, node]))
        const targetNode = findObjectByIdUsingHashTable(nodes, focusTarget)
        ficGraph.centerAt(targetNode.x, targetNode.y, 1000)
        // ficGraph.zoom(2, 2000)
        bus.emit('curNode', targetNode)
        highlightNodes.clear()
        highlightLinks.clear()
        if (targetNode) {
          highlightNodes.add(targetNode)
          targetNode.neighbors.forEach(neighbor => highlightNodes.add(neighbor))
          targetNode.links.forEach(link => highlightLinks.add(link))
        }
      }, timeout)
    }

    function hideNode (target) {
      setTimeout(() => {
        let { nodes, links } = ficGraph.graphData()
        // const id2Node = Object.fromEntries(nodes.map(node => [node.id, node]))
        const targetNode = findObjectByIdUsingHashTable(nodes, target)
        hidingNodes.set(targetNode.id, targetNode)
        for (let i = 0; i < links.length; i++) {
          const link = links[i]
          // console.log(link)
          if (link.target.id === target || link.source.id === target) {
            hidingLinks.set(link.id, link)
          }
        }
        console.log('HidingLinks: ' + hidingLinks.size)
      }, 200)
    }
    
    function reShowNode (target) {
      setTimeout(() => {
        if (hidingNodes.has(target)) {
          hidingNodes.delete(target)
        }
        const keysToDelete = []
        hidingLinks.forEach((value, key) => {
          if (value.target.id === target || value.source.id === target) {
            keysToDelete.push(key)
          }
        })
        keysToDelete.forEach((key) => {
          hidingLinks.delete(key)
        })
      }, 200)
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}
</style>
