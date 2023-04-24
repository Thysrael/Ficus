<template>
  <div class="pl-2" style="font-family: 'Noto Sans SC'">
    <div style="font-size: 13px" class="my-2">
      节点详情信息
    </div>
    <div style="font-size: 12px; margin-top: 15px;">
      <b>文件名</b>: 中文测试.md
    </div>
    <hr style="border: none;border-top: 2px solid #ccc;height: 1px;margin: 20px 0;">
    <button class="optionBtn">
      焦点前进
    </button>
    <button class="optionBtn">
      焦点后退
    </button>
    <button class="optionBtn">
      转换为Ficus根
    </button>
    <button class="optionBtn">
      提交图修改
    </button>
  </div>
</template>

<script>
export default {
  name: 'GraphBar'
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
