<template>
  <div class="text-sm items-center content-center text-sm"
       :style= "`max-width: ${windowWidth};overflow-x:auto;`"
       v-show="(mode >= 0 && mode <= 2)"
       style="user-select: none; color: #F4F4F3; font-family: 'Noto Sans SC'; font-size: 12px;">
    <div v-show="enable">
      <ul>
        <BreadCrumbItem :item="(items.length === 0) ? {} : items[0]"/>
      </ul>
    </div>
    <div v-if="!enable" style="width: 50px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
         class="items-center content-center">
      {{ curName }}
    </div>
  </div>

</template>

<script>
import { computed, onMounted, ref } from 'vue'
import bus from 'vue3-eventbus'
import BreadCrumbItem from '@/renderer/components/header/BreadCrumbItem'
import store from '@/renderer/store'

export default {
  name: 'BreadCrumb',
  components: { BreadCrumbItem },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const curName = ref()
    const mode = computed(() => {
      return store.getters.getMode
    })

    const enable = computed(() => {
      return props.items.length !== 0 && props.items[0].curChild >= -1
    })

    // const windowWidth = '10px'
    const windowWidth = ref((window.innerWidth / 2 - 170) + 'px')

    onMounted(() => {
      window.addEventListener('resize', () => {
        windowWidth.value = (window.innerWidth / 2 - 170) + 'px'
      })
    })

    bus.on('changeName', (name) => {
      curName.value = name
    })

    return {
      curName,
      enable,
      mode,
      windowWidth
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}

.breadCrumbChild:hover {
  background-color: #596067;
  color: #AAAAAA;
  border-radius: 8px;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
  user-select: none;
}

.breadCrumbChild:active {
  background-color: #3b4044;
  color: #AAAAAA;
  border-radius: 8px;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
  user-select: none;
}
</style>
