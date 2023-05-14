<template>
  <div class="flex flex-wrap place-content-center py-2 mx-4"
       style="height: calc(100% + 200px); width: calc(100% + 200px)">
    <div class="flex flex-wrap relative" id="ficGraph"/>
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
    const nodeRelMaximum = 45
    const tagNodeRelSize = 10
    const nodeRelLimit = 1

    const ficGraph = ForceGraph()(document.getElementById('ficGraph'))
        .cooldownTicks(100)
        .onNodeRightClick(node => {
          // Center/zoom on node
          ficGraph.centerAt(node.x, node.y, 1000)
          if (node.category === 1) {
            ficGraph.zoom(3, 2000)
          } else {
            ficGraph.zoom(2, 2000)
          }
        })
        .onZoom(zoom => zoomLevel = zoom.k)
        .d3AlphaDecay(0.01)
        .d3VelocityDecay(0.08)
        .nodeCanvasObjectMode(() => "after")
        .linkColor(link => rootLinks.has(link) ? '#d7d7bf' : tagLinks.has(link) ? '#c9ece1' : '#cccccc')
        .linkWidth(link => rootLinks.has(link) ? link.weight : 2)
        .linkDirectionalParticles(2)
        .linkDirectionalParticleWidth(link => tagLinks.has(link) ? 5 : 0)
        .linkCurvature(link => tagLinks.has(link) ? 0.3 : 0)
        .linkDirectionalArrowRelPos(0.9)
        .linkDirectionalArrowLength(link => tagLinks.has(link) ? 0 : link.weight * 5)
    ficGraph.d3Force('link').distance(40)
    ficGraph.d3Force('center').strength(0.4)
    ficGraph.d3Force('charge').distanceMax(300)

    bus.on('exportGraphPNG', () => {
      // exportPNG()
    })

    bus.on('getNodeAndLink', (obj) => {
      const data = obj.nodes
      const link = obj.links
      let id2Node = new Map()
      const standardLineWidth = link.length > 45 ? 5 : 3
      folderNodes.clear()
      fileNodes.clear()
      tagNodes.clear()
      rootLinks.clear()
      branchLinks.clear()
      tagLinks.clear()
      for (let i = 0; i < data.length; i++) {
        const key = data[i].id
        id2Node.set(key, data[i])
        if (data[i].category === 0) {
          data[i].color = '#92d56f'
          folderNodes.add(data[i])
        } else if (data[i].category === 1) {
          data[i].color = '#627691'
          fileNodes.add(data[i])
        } else {
          data[i].color = '#6be6c1'
          tagNodes.add(data[i])
        }
        if (data[i].depth === 1) {
          data[i].color = '#727272'
        }
      }
      for (let i = 0; i < link.length; i++) {
        const tmpWeight = (standardLineWidth - id2Node.get(link[i].source).depth)
        link[i].weight = tmpWeight < 1 ? 1 : tmpWeight
        if (link[i].type === 0) {
          rootLinks.add(link[i])
        } else if (link[i].type === 1) {
          tagLinks.add(link[i])
        } else {
          branchLinks.add(link[i])
        }
      }

      ficGraph.graphData({
        nodes: data,
        links: link
      })
      .nodeCanvasObject((node, ctx, globalScale) => {
        let label = node.name
        const type = node.category
        const level = node.depth
        const tmpSize = nodeRelMaximum / (Math.pow(1.7, level))
        let size = tmpSize < nodeRelLimit ? nodeRelLimit : tmpSize

        if (label.length > 8) {
          label = `${label.substr(0, 8)}...`
        }
        ctx.beginPath()
        if (type === 0) {
          // folder
          let fontSize = size + globalScale * 0.04
          ctx.font = `${fontSize}px Sans-Serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          if (level <= 3) {
            ctx.fillText(label, node.x, node.y + Math.round(fontSize * 2))
          } else {
            ctx.fillText(label, node.x, node.y + Math.round(fontSize * 3))
          }
        } else if (type === 1) {
          // file
          if (size > tagNodeRelSize) {
            size = size - 10 < nodeRelLimit ? nodeRelLimit : size - 10
          }
          if (zoomLevel >= 3) {
            let fontSize = size + globalScale * 0.02
            ctx.font = `${fontSize}px Sans-Serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            if (level <= 3) {
              ctx.fillText(label, node.x, node.y + Math.round(fontSize * 2))
            } else {
              ctx.fillText(label, node.x, node.y + Math.round(fontSize * 3))
            }
          }
        } else {
          // tag
          size = tagNodeRelSize
          let fontSize = size + globalScale * 0.02
          ctx.font = `${fontSize}px Sans-Serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(label, node.x, node.y + Math.round(fontSize * 2))
        }
        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false)
        ctx.fill()
      })
      .zoomToFit(400, 0, node => node.depth === 0)
      const magnifiedRatio = Math.pow((data.length / link.length), 5)
      const charge = -20 / magnifiedRatio
      const boundedCharge = Math.min(-30, charge)
      ficGraph.d3Force('charge').strength(boundedCharge)
    })
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}
</style>
