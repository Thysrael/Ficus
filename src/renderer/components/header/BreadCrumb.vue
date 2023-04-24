<template>
  <div class="text-gray-600 text-sm items-center content-center" :style= "`max-width: ${windowWidth};overflow-x:auto;`">
    <ol class="list-none p-0 inline-flex" v-if="enable">
      <BreadCrumbItem :item="(items.length === 0) ? {} : items[0]"/>
    </ol>
    <div v-if="!enable" style="width: 50px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
         class="items-center content-center">
      {{ curName }}
    </div>
    <div v-if="show" style="position:relative" class="mt-20 shadow-sm"
         tabindex="0"
         @blur="lossFocus" ref="myDiv">
      <ol class="area-header-downtab shadow-sm">
        <li v-for="(child, index) in curFocus.children" :key="index"
            @click="changeTab(child, index)"
            class="breadCrumbChild px-3"
        >
          {{ child.name }}
        </li>
      </ol>
    </div>
  </div>

</template>

<script>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import bus from 'vue3-eventbus'
import BreadCrumbItem from '@/renderer/components/header/BreadCrumbItem'

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
    const show = ref(false)
    const curFocus = ref({})
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx
    const curName = ref()
    const enable = computed(() => {
      return props.items.length !== 0 && props.items[0].curChild >= -1
    })

    // const windowWidth = '10px'
    const windowWidth = ref((window.innerWidth / 2 - 170) + 'px')

    onMounted(() => {
      window.addEventListener('resize', () => {
        console.log('old ', windowWidth.value)
        windowWidth.value = (window.innerWidth / 2 - 170) + 'px'
        console.log('new', windowWidth.value)
      })
    })

    console.log(proxy, _this)

    bus.on('wantShow', (obj) => {
      if (obj.children && obj.children.length) {
        curFocus.value = obj
        show.value = true
        _this.$nextTick(() => {
          _this.$refs.myDiv.focus()
        })
      } else {
        show.value = false
      }
    }
    )

    bus.on('changeName', (name) => {
      curName.value = name
    })

    function changeTab (child, index) {
      console.log('Crumb changeTab ', child, index)
      bus.emit('changeTab', {
        item: curFocus.value,
        child,
        index
      }
      )
      show.value = false
    }

    function lossFocus () {
      show.value = false
    }

    return {
      show,
      curFocus,
      curName,
      enable,
      windowWidth,
      changeTab,
      lossFocus
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
}

.breadCrumbChild:active {
  background-color: #3b4044;
  color: #AAAAAA;
  border-radius: 8px;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}
</style>
