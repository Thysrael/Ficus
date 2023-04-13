<template>
  <div>
    {{ name }}
  </div>
</template>

<script>

import { computed } from 'vue'

export default {
  name: 'TabItem',
  props: {
    item: {
      type: Object,
      require: true
    }
  },
  setup (props) {
    const name = computed(() => {
      const index = props.item.absolutePath.length + props.item.offset
      let res = props.item.absolutePath[index]
      for (let i = index + 1; i <= props.item.absolutePath.length - 1; i++) {
        res += '\\' + props.item.absolutePath[i]
      }
      console.log(res)
      return res
    })
    return {
      name
    }
  }
}
</script>

<style scoped>

</style>
