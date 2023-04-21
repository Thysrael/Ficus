<template>
  <div style="width: 100%; height: 700px; position: relative; overflow: auto">
    <FicTree/>
  </div>
</template>

<script>
import FicTree from '@/renderer/components/mindEditor/FicTree.vue'

export default {
  name: 'TextArea',
  components: { FicTree }
}
</script>

<style scoped>

.allInformation {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 100px;
  height: 20px;
  opacity: 1;
  background: #FFFFFF;
  text-align: right;
  font-size: 10px;
}

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
  right: 0px;
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
