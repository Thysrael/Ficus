<template>
  <div class="area-header">
    <div> icon </div>
    <BreadCrumb :items="data" style="margin-left: 100px"></BreadCrumb>
    <tab-list :open-files="openFiles" style="margin-left: 100px"></tab-list>
  </div>
</template>

<script>
import { ref } from 'vue'
import bus from 'vue3-eventbus'
import TabList from '@/renderer/components/header/TabList'
import BreadCrumb from '@/renderer/components/header/BreadCrumb'

export default {
  name: 'MyHeader',
  components: { TabList, BreadCrumb },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup () {
    const openFiles = ref([]) // 存对象，浅比较（ === 引用相同），深比较（值相同）

    function contain (file) {
      for (let i = 0; i < openFiles.value.length; i++) {
        if (openFiles.value[i] === file) {
          return true
        }
      }
      return false
    }

    // 每次修改openSet（主要是增加和删除）计算特异路径
    function update () {
      // 第一步，将所有对象按名字分组
      const sameNameArrays = []
      const flag = []
      for (let i = 0; i < openFiles.value.length; i++) {
        flag.push(false)
      }

      for (let i = 0; i < openFiles.value.length; i++) {
        if (flag[i]) {
          continue
        }
        const tempArray = []
        tempArray.push(openFiles.value[i])
        for (let j = i + 1; j < openFiles.value.length; j++) {
          if (flag[j]) {
            continue
          }
          if (openFiles.value[i].path === openFiles.value[j].path) {
            tempArray.push(openFiles.value[j])
            flag[j] = true
          }
        }
        if (tempArray.length > 1) {
          flag[i] = true
          sameNameArrays.push(tempArray)
        }
      }

      // 第二步，计算所有组的偏移
      for (let i = 0; i < sameNameArrays.length; i++) {
        let offset = -2
        while (sameNameArrays[i].length + offset >= 0) {
          const nameSet = new Set()
          for (let j = 0; j < sameNameArrays[i].length; j++) {
            // 判断path的倒数第二个是否全部互异\
            const index = sameNameArrays[i][j].absolutePath.length + offset
            nameSet.add(sameNameArrays[i][j].absolutePath[index])
          }
          if (nameSet.size === sameNameArrays[i].length) {
            break
          } else {
            offset--
          }
        }
        for (let j = 0; j < sameNameArrays[i].length; j++) {
          sameNameArrays[i][j].offset = offset // 修改对象的偏移
        }
      }
    }

    bus.on('openNewTab', (obj) => {
      if (contain(obj)) {
        console.log('already open!')
      } else {
        openFiles.value.push(obj)
        update()
        // 给textUI传参
      }
      for (let i = 0; i < openFiles.value.length; i++) {
        console.log(openFiles.value[i])
      }
    })

    return { openFiles, update }
  }
}
</script>

<style scoped>

</style>
