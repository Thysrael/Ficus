<template>
<!--    <div class="items-center mb-8">-->
<!--      &lt;!&ndash; 在具体实现方面，可以通过一个 v-for 维护 &ndash;&gt;-->
<!--      &lt;!&ndash; 点击删除标签按钮时需要将其从标签组中删去，注意绑定事件 &ndash;&gt;-->
<!--      <span class="bg-SwissCoffee-500 text-gray-700 text-xs font-normal mr-2 my-1 px-3 py-1 rounded-full inline-flex items-center">-->
<!--          <svg class="w-3 h-3 mr-1" fill="#5e5e5e" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M416 127.1h-58.23l9.789-58.74c2.906-17.44-8.875-33.92-26.3-36.83c-17.53-2.875-33.92 8.891-36.83 26.3L292.9 127.1H197.8l9.789-58.74c2.906-17.44-8.875-33.92-26.3-36.83c-17.53-2.875-33.92 8.891-36.83 26.3L132.9 127.1H64c-17.67 0-32 14.33-32 32C32 177.7 46.33 191.1 64 191.1h58.23l-21.33 128H32c-17.67 0-32 14.33-32 32c0 17.67 14.33 31.1 32 31.1h58.23l-9.789 58.74c-2.906 17.44 8.875 33.92 26.3 36.83C108.5 479.9 110.3 480 112 480c15.36 0 28.92-11.09 31.53-26.73l11.54-69.27h95.12l-9.789 58.74c-2.906 17.44 8.875 33.92 26.3 36.83C268.5 479.9 270.3 480 272 480c15.36 0 28.92-11.09 31.53-26.73l11.54-69.27H384c17.67 0 32-14.33 32-31.1c0-17.67-14.33-32-32-32h-58.23l21.33-128H416c17.67 0 32-14.32 32-31.1C448 142.3 433.7 127.1 416 127.1zM260.9 319.1H165.8L187.1 191.1h95.12L260.9 319.1z"/></svg>-->
<!--          Tag-->
<!--          <button type="button" class="inline-flex transition items-center p-1 ml-2 text-sm text-blueGray-300 bg-transparent rounded-md hover:bg-gray-200 hover:text-blueGray-800" aria-label="Remove">-->
<!--            <svg aria-hidden="true" class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>-->
<!--          </button>-->
<!--        </span>-->

<!--      &lt;!&ndash; 点击叶子按钮时需要将输入框内容添加到标签组中，注意绑定事件 &ndash;&gt;-->
<!--      <span class="items-center inline-flex">-->
<!--        <input-->
<!--            type="text"-->
<!--            class="block text-gray-700 text-xs font-normal mr-2 my-2 px-3 py-1 inline-flex items-center hover:shadow-sm transition duration placeholder-gray focus:ring-0"-->
<!--            id="newTag"-->
<!--            placeholder="输入新标签..."-->
<!--        />-->
<!--          <button type="button" class="inline-flex transition items-center text-sm text-blueGray-300 bg-transparent rounded-md hover:text-blueGray-800" aria-label="Remove">-->
<!--            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <g> <path fill="none" d="M0 0H24V24H0z"/> <path d="M21 3v2c0 9.627-5.373 14-12 14H7.098c.212-3.012 1.15-4.835 3.598-7.001 1.204-1.065 1.102-1.68.509-1.327-4.084 2.43-6.112 5.714-6.202 10.958L5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0z"/> </g> </svg>-->
<!--          </button>-->
<!--        </span>-->
<!--    </div>-->

  <div>
    <TextUI :content="content" style="width: 100%;height: 100%;position: relative"></TextUI>
    <div class="littleInformation">
      <div class="information">
        <text class="myText">
          1156词
        </text>
        <button style="margin-left: 30px">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="8" height="8" viewBox="0 0 8 8"><defs><clipPath id="master_svg0_93_2064"><rect x="0" y="0" width="8" height="8" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_93_2064)"><g><g><path d="M4,0C6.20914,0,8,1.79086,8,4C8,6.20914,6.20914,8,4,8C1.79086,8,0,6.20914,0,4C0,1.79086,1.79086,0,4,0ZM4.93249,2.94645C4.81361,2.82328,4.64988,2.78001,4.47738,2.78205C4.24727,2.78479,4.00155,2.86815,3.82579,2.95003C3.4052,3.14596,3.08248,3.49292,2.8137,3.86383C2.7653,3.9306,2.74004,4.00944,2.8252,4.0709C2.89781,4.12332,2.9501,4.07642,2.9939,4.02966L2.99678,4.02658C3.00012,4.02299,3.00341,4.01941,3.00665,4.01589C3.0558,3.96268,3.1033,3.90756,3.15079,3.8524L3.16267,3.83861L3.17455,3.82483C3.31717,3.65947,3.46228,3.49648,3.65431,3.38589C3.76848,3.32015,3.85074,3.42169,3.83311,3.53574C3.82255,3.60413,3.78659,3.66855,3.76145,3.73467C3.67211,3.96952,3.58146,4.20387,3.49119,4.43837C3.39227,4.69545,3.29367,4.95264,3.19775,5.21086L3.18941,5.23328L3.18109,5.25567C3.09646,5.48334,3.01309,5.70931,2.95795,5.94691C2.91388,6.13687,2.85457,6.36735,2.93979,6.55398C2.98888,6.66148,3.093,6.73536,3.20882,6.75217C3.36679,6.7751,3.5376,6.77773,3.69217,6.74255C3.77223,6.72436,3.851,6.7006,3.92787,6.6717C4.1639,6.58296,4.37882,6.44609,4.57238,6.28522C4.7693,6.12112,4.94287,5.927,5.10115,5.72567C5.15203,5.66096,5.21367,5.58941,5.231,5.50652C5.24728,5.42878,5.17789,5.31776,5.08797,5.36288C5.04049,5.38671,5.00494,5.44566,4.97035,5.48484C4.92693,5.534,4.88266,5.58244,4.8379,5.63034C4.74837,5.72612,4.6566,5.81977,4.56443,5.91297C4.50801,5.97002,4.43789,6.01823,4.36584,6.05365C4.27588,6.09786,4.20423,6.04883,4.21397,5.94922C4.2229,5.85774,4.24528,5.76528,4.27666,5.67869C4.40294,5.33005,4.53162,4.9823,4.6593,4.63417C4.73912,4.41661,4.81854,4.19891,4.8968,3.98077C4.96994,3.7769,5.03227,3.57467,5.05861,3.35868C5.07676,3.20989,5.03819,3.05599,4.93249,2.94645ZM5.19799,1.27354C4.8174,1.12546,4.36369,1.37817,4.28726,1.78086C4.23205,2.07163,4.34283,2.32765,4.57059,2.43567C5.01128,2.64467,5.53844,2.31086,5.53846,1.82282C5.53848,1.552,5.41925,1.35963,5.19798,1.27354L5.19799,1.27354Z" fill-rule="evenodd" fill="#000000" fill-opacity="1"/></g></g></g></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextUI from '@/renderer/components/richTextEditor'
import { ref } from 'vue'
import bus from 'vue3-eventbus'

export default {
  name: 'TextArea',
  components: { TextUI },
  setup () {
    const content = ref('')
    bus.on('setEditorContent', (obj) => {
      console.log(obj)
      content.value = obj
    })
    return {
      content
    }
  }
}
</script>

<style scoped>

.littleInformation {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 20px;
  opacity: 1;
  background: #FFFFFF;
}

.information {
  position: absolute;
  left: 40px;
  top: 0px;
  width: 50px;
  height: 20px;
  opacity: 1;

}

.myText {
  position: absolute;
  left: 0px;
  top: 6px;
  width: 39.4px;
  height: 20px;
  opacity: 1;

  font-family: Source Han Sans CN;
  font-size: 8px;
  font-weight: normal;
  line-height: 15px;
  letter-spacing: 0em;

  color: #3D3D3D;

}
</style>
