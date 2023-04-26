<template>
  <div class="grid justify-items-center py-4 w-full h-full">
    <div style="width: 800px; height: 700px" id="ficGraph" class="justify-self-center"/>
  </div>
</template>

<script>
import ficus from './assets/ficus.json'
import bus from 'vue3-eventbus'
import * as echarts from './assets/echarts.min'
export default {
  name: 'FicGraph',
  mounted () {
    /* eslint-disable */
    echarts.registerTheme('ficus', ficus);
    const myChart = echarts.init(document.getElementById('ficGraph'), 'ficus');
    const option = {
      tooltip: {},
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true
          },
          dataView: {
            show: true
          }
        }
      },
      legend: [{
        data: ['文件夹', '文件', '标签'],
        left: 'left'
      }],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          roam: true,
          data: [],
          links: [],
          label: {
            position: 'bottom',
            distance: 4,
            formatter: '{b}',
            show: true,
            width: 120,
            overflow: 'truncate',
            ellipsis: '...'
          },
          force: {
            edgeLength: 5,
            repulsion: 20,
            gravity: 0.2
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3,
            width: 2
          },
          draggable: true,
          emphasis: {
            focus: 'adjacency',
          }
        }
      ]
    };
    option && myChart.setOption(option);

    myChart.on('click', function (params) {
      if (params.componentType === 'series') {
        if (params.seriesType === 'graph') {
          if (params.dataType === 'node') {
            console.log(params.data);
          }
        }
      }
    });

    function generatePointsInCircle(n, r) {
      const points = [];
      const radiusSquared = r * r;
      for (let i = 0; i < n; i++) {
        let x, y;
        do {
          x = (Math.random() - 0.5) * r * 2;
          y = (Math.random() - 0.5) * r * 2;
        } while (x * x + y * y > radiusSquared);
        points.push({
          x: x,
          y: y
        });
      }
      return points;
    }

    function exportPNG () {
      const img = myChart.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff'
      })
      // eslint-disable-next-line prefer-const
      let lnk = document.createElement('a'), e
      lnk.download = 'ficus.png'
      lnk.href = img
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
        );
        lnk.dispatchEvent(e)
      }
    }

    bus.on('exportGraphPNG', () => {
      exportPNG()
    })

    bus.on('getNodeAndLink', (obj) => {
      const data = obj.nodes
      const link = obj.links
      const positions = generatePointsInCircle(data.length, 1000)
      for (let i = 0; i < data.length; i++) {
        let curData = data[i];
        curData.symbolSize = curData.name.length * 4 > 30 ? 30 : curData.name.length * 4
        curData.x = positions[i].x
        curData.y = positions[i].y
      }
      myChart.setOption({
        series: [{
          type: 'graph',
          data: data,
          links: link,
          categories: [{
            name: '文件夹',
          }, {
            name: '文件',
          }, {
            name: '标签'
          }]
        }]
      })
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
