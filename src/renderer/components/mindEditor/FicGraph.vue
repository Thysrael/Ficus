<template>
  <div style="width: 700px; height: 100%; margin-left: 50px; margin-right: 50px" id="ficGraph"></div>
</template>

<script>
import * as echarts from './assets/echarts.min'
import ficus from './assets/ficus.json'
import bus from 'vue3-eventbus'
export default {
  name: 'FicGraph',
  mounted () {
    /* eslint-disable */
    echarts.registerTheme('ficus', ficus);
    const myChart = echarts.init(document.getElementById('ficGraph'), 'ficus');
    const option = {
      tooltip: {},
      legend: [{
        data: ['文件夹', '文件', '标签']
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
          force: {
            edgeLength: 5,
            repulsion: 20,
            gravity: 0.2
          },
          draggable: true,
          emphasis: {
            focus: 'adjacency',
            label: {
              show: false
            }
          },
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

    bus.on('getNodeAndLink', (obj) => {
      const data = obj.nodes
      const link = obj.links
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

</style>