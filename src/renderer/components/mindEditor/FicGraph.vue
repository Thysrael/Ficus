<template>
  <div class="grid justify-items-center py-4 w-full h-full">
    <div style="width: 700px; height: 700px" id="ficGraph" class="justify-self-center"/>
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
            width: 60,
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
            curveness: 0.3
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

    let Solution = function(radius, x_center, y_center) {
      this.xc = x_center;
      this.yc = y_center;
      this.r = radius;
    }

    Solution.prototype.randPoint = function() {
      const u = Math.random();
      const theta = Math.random() * 2 * Math.PI;
      const r = Math.sqrt(u);
      return [this.xc + r * Math.cos(theta) * this.r, this.yc + r * Math.sin(theta) * this.r];
    }

    bus.on('exportGraphPNG', () => {
      exportPNG()
    })

    bus.on('getNodeAndLink', (obj) => {
      const data = obj.nodes
      const link = obj.links
      const chart = new Solution(700, 0, 0)
      for (let i = 0; i < data.length; i++) {
        let curData = data[i];
        let randomPosition = chart.randPoint()
        curData.symbolSize = curData.name.length * 4 > 60 ? 60 : curData.name.length * 4
        curData.x = randomPosition[0]
        curData.y = randomPosition[1]
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
