<template>
  <div class="pl-2" style="font-family: 'Noto Sans SC'">
    <div style="font-size: 13px" class="my-2">
      节点详情信息
    </div>
    <div style="font-size: 12px; margin-top: 15px;">
      <b>文件名</b>: 敬请期待.md
    </div>
    <hr style="border: none;border-top: 2px solid #ccc;height: 1px;margin: 20px 0;">
    <button class="optionBtn" @click="handleProcess">
      焦点前进
    </button>
    <button class="optionBtn" @click="handleProcess">
      焦点后退
    </button>
    <button class="optionBtn" @click="handleProcess">
      转换为Ficus根
    </button>
    <button class="optionBtn" @click="handleProcess">
      提交图修改
    </button>
    <button class="optionBtn" @click="quitGraph">
      退出榕图
    </button>
  </div>
</template>

<script>
import bus from 'vue3-eventbus'

export default {
  name: 'GraphBar',
  setup () {
    function handleProcess () {
      bus.emit('showMyAlert', { message: '敬请期待！' })
    }

    function quitGraph () {
      bus.emit('quitFromGraph')
    }

    return {
      handleProcess,
      quitGraph
    }
  }
}
</script>

<style scoped>
.optionBtn {
  margin-left: 10px;
  margin-top: 10px;
  width: 130px;
  height: 25px;
  border-radius: 3px;
  opacity: 1;
  background-color: #5dcc9a;
  font-size: 12px;
  font-family: "Noto Sans SC";
  font-weight: lighter;
  color: #FFFFFF
}

.optionBtn:hover {
  background-color: #19734b;
  -webkit-transition: .2s;
  -webkit-transition:left .2s, background-color .2s;
}

.optionBtn:active {
  background-color: #3D3D3D;
}
</style>
