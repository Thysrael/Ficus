<template>
  <div>
    <div style="font-size: 12px">
      节点详情信息
    </div>
    <div style="font-size: 10px">
      文件名：中文测试.md
    </div>
    <hr style="border: none;border-top: 2px solid #ccc;height: 1px;margin: 20px 0;">
    <div style="font-size: 12px">
      操作节点
    </div>
    <button style="width: 60px;height: 20px;border-radius: 3px;opacity: 1;background-color: #42b983;font-size: 12px">
      焦点前进
    </button>
    <button style="margin-left: 10px; width: 60px;height: 20px;border-radius: 3px;opacity: 1;background-color: #42b983;font-size: 12px">
      焦点后退
    </button>
    <button style="width: 130px;height: 20px;border-radius: 3px;opacity: 1;background-color: #42b983;font-size: 12px">
      转换为Ficus根
    </button>
  </div>
</template>

<script>
export default {
  name: 'GraphBar'
}
</script>

<style scoped>

</style>
