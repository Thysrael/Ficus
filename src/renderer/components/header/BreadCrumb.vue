<template>
  <div class="text-gray-600 text-sm">
    <ol class="list-none p-0 inline-flex">
      <BreadCrumbItem style="margin-top: 10px"
                      :item="(items.length === 0) ? {} : items[0]"/>
    </ol>
    <div v-if="show" class="area-header-downtab"
         tabindex="0"
         @blur="lossFocus" ref="myDiv">
      <ol>
        <li v-for="(child, index) in curFocus.children" :key="index"
            @click="changeTab(child, index)"
        >{{ child.name }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'
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
  setup () {
    const show = ref(false)
    const curFocus = ref({})
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx

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
      changeTab,
      lossFocus
    }
  }
}
</script>
