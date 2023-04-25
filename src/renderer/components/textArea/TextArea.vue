<template>
  <div class="items-center content-center"
       :class="showPage === 0 ? `bg-SwissCoffee-500` : ``">
    <WelcomePage style="width: 100%; height: 100%; position: relative; overflow: auto" v-show="showPage === 0"></WelcomePage>
    <TextUI style="width: 100%; height: 100%; position: relative; overflow: auto" v-show="showPage === 1"></TextUI>
    <FicTree v-show="showPage === 2" style="width: 100%; height: 100%; position: relative; overflow: auto" />
    <FicGraph v-show="showPage === 3" style="width: 100%; height: 100%; position: relative; overflow: auto"></FicGraph>
    <div class="littleInformation items-center content-center px-3 mr-3">
      <div class="information flex flex-wrap items-center content-center">
        <div class="myText items-center content-center">
          {{ wordCnt }} 词
        </div>
        <div class="ml-8 infoBtn" >
          <button @click="showInfoWin = !showInfoWin"
                  id="btnRef">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="12" height="12" viewBox="0 0 8 8"><defs><clipPath id="master_svg0_93_2064"><rect x="0" y="0" width="8" height="8" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_93_2064)"><g><g><path d="M4,0C6.20914,0,8,1.79086,8,4C8,6.20914,6.20914,8,4,8C1.79086,8,0,6.20914,0,4C0,1.79086,1.79086,0,4,0ZM4.93249,2.94645C4.81361,2.82328,4.64988,2.78001,4.47738,2.78205C4.24727,2.78479,4.00155,2.86815,3.82579,2.95003C3.4052,3.14596,3.08248,3.49292,2.8137,3.86383C2.7653,3.9306,2.74004,4.00944,2.8252,4.0709C2.89781,4.12332,2.9501,4.07642,2.9939,4.02966L2.99678,4.02658C3.00012,4.02299,3.00341,4.01941,3.00665,4.01589C3.0558,3.96268,3.1033,3.90756,3.15079,3.8524L3.16267,3.83861L3.17455,3.82483C3.31717,3.65947,3.46228,3.49648,3.65431,3.38589C3.76848,3.32015,3.85074,3.42169,3.83311,3.53574C3.82255,3.60413,3.78659,3.66855,3.76145,3.73467C3.67211,3.96952,3.58146,4.20387,3.49119,4.43837C3.39227,4.69545,3.29367,4.95264,3.19775,5.21086L3.18941,5.23328L3.18109,5.25567C3.09646,5.48334,3.01309,5.70931,2.95795,5.94691C2.91388,6.13687,2.85457,6.36735,2.93979,6.55398C2.98888,6.66148,3.093,6.73536,3.20882,6.75217C3.36679,6.7751,3.5376,6.77773,3.69217,6.74255C3.77223,6.72436,3.851,6.7006,3.92787,6.6717C4.1639,6.58296,4.37882,6.44609,4.57238,6.28522C4.7693,6.12112,4.94287,5.927,5.10115,5.72567C5.15203,5.66096,5.21367,5.58941,5.231,5.50652C5.24728,5.42878,5.17789,5.31776,5.08797,5.36288C5.04049,5.38671,5.00494,5.44566,4.97035,5.48484C4.92693,5.534,4.88266,5.58244,4.8379,5.63034C4.74837,5.72612,4.6566,5.81977,4.56443,5.91297C4.50801,5.97002,4.43789,6.01823,4.36584,6.05365C4.27588,6.09786,4.20423,6.04883,4.21397,5.94922C4.2229,5.85774,4.24528,5.76528,4.27666,5.67869C4.40294,5.33005,4.53162,4.9823,4.6593,4.63417C4.73912,4.41661,4.81854,4.19891,4.8968,3.98077C4.96994,3.7769,5.03227,3.57467,5.05861,3.35868C5.07676,3.20989,5.03819,3.05599,4.93249,2.94645ZM5.19799,1.27354C4.8174,1.12546,4.36369,1.37817,4.28726,1.78086C4.23205,2.07163,4.34283,2.32765,4.57059,2.43567C5.01128,2.64467,5.53844,2.31086,5.53846,1.82282C5.53848,1.552,5.41925,1.35963,5.19798,1.27354L5.19799,1.27354Z" fill-rule="evenodd" fill="#000000" fill-opacity="1"/></g></g></g></svg>
          </button>
        </div>
      </div>
    </div>
    <div class="allInformation"
         v-if="showInfoWin"
         id="popoverRef">
      字数统计信息
      <hr style="border: none;border-top: 2px solid #ccc;height: 1px;">
      {{ time }} 分钟<br>
      {{ lineCnt }} 行<br>
      {{ wordCnt }} 字符<br>
    </div>
  </div>
</template>

<script>
import FicTree from '@/renderer/components/mindEditor/FicTree.vue'
import TextUI from '@/renderer/components/richTextEditor'
import { computed, ref } from 'vue'
import bus from 'vue3-eventbus'
import FicGraph from '@/renderer/components/mindEditor/FicGraph'
import WelcomePage from '@/renderer/components/textArea/WelcomePage.vue'

export default {
  name: 'TextArea',
  components: { WelcomePage, FicGraph, FicTree, TextUI },
  setup () {
    const showInfoWin = ref(false)
    const showPage = ref(0) // 0表示默认显示欢迎界面，1表示textUI，2表示ficus视图
    const wordCnt = ref(0)
    const lineCnt = ref(0)
    const time = computed(() => {
      return Math.floor(wordCnt.value / 300)
    })

    bus.on('chooseToShowPage', (num) => {
      showPage.value = num
    })

    bus.on('getInfoOfFile', (obj) => {
      wordCnt.value = obj.wordCnt
      lineCnt.value = obj.lineCnt
    })

    bus.on('exportPNG', () => {
      if (showPage.value === 2) {
        // 树视图
        bus.emit('exportTreePNG')
      } else if (showPage.value === 3) {
        // 图视图
        bus.emit('exportGraphPNG')
      } else {
        bus.emit('showMyAlert', { message: '当前不在树视图或图试图，不能导出PNG' })
      }
    })

    return {
      showInfoWin,
      showPage,
      wordCnt,
      lineCnt,
      time
    }
  }
}
</script>

<style scoped>

.allInformation {
  position: fixed;
  bottom: 130px;
  right: 20px;
  width: 80px;
  height: 20px;
  opacity: 1;
  background: #FFFFFF;
  text-align: right;
  font-size: 12px;
  font-family: "Noto Sans SC";
}

.littleInformation {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 70px;
  height: 20px;
  opacity: 1;
}

.information {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 50px;
  height: 20px;
  opacity: 1;
}

.myText {
  position: absolute;
  opacity: 1;
  font-family: "Noto Sans SC";
  font-size: 12px;
  font-weight: normal;
  line-height: 15px;
  letter-spacing: 0em;
  color: #3D3D3D;
}

.infoBtn:hover path {
  fill: #42b983;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
  -webkit-transition:left .3s, fill .3s;
}
</style>
