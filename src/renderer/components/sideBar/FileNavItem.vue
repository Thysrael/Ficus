<template>
  <li
      @contextmenu.stop.prevent="handleRightClick($event)"
      v-contextmenu:contextmenu
      @dragenter.stop="dragenter($event)"
      @dragover.stop="dragover($event)"
      @dragstart.stop="dragstart()"
      draggable="true">
    <div
        :style="isSelected ? `display: flex;color: #42b983` : `display: flex;color: #2563eb`"
        @click.exact="toggle(1)"
        @click.ctrl="toggle(2)"
    >
      <svg v-if="item.type === 'folder'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           fill="none" version="1.1" width="15" height="15" viewBox="0 0 15 15">
        <defs>
          <clipPath id="master_svg0_10_271">
            <rect x="0" y="0" width="15" height="15" rx="0"/>
          </clipPath>
        </defs>
        <g clip-path="url(#master_svg0_10_271)">
          <g>
            <path d="M7.5,10L3.75,6.25L11.25,6.25L7.5,10Z" fill="#474747" fill-opacity="1"/>
          </g>
        </g>
      </svg>
      <svg style="margin-top: 5px" v-if="item.type === 'folder'" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="10" height="10"
           viewBox="0 0 10 10">
        <defs>
          <clipPath id="master_svg0_10_103">
            <rect x="0" y="0" width="10" height="10" rx="0"/>
          </clipPath>
        </defs>
        <g style="mix-blend-mode:passthrough" clip-path="url(#master_svg0_10_103)">
          <g style="mix-blend-mode:passthrough">
            <path
                d="M1.6666641235351562,1.6666650617675782C1.5561541235351561,1.6666650617675782,1.4501741235351562,1.710565061767578,1.3720351235351562,1.788703061767578C1.2938971235351562,1.866842061767578,1.2499971235351564,1.972822061767578,1.2499971235351564,2.083332061767578C1.2499971235351564,2.083332061767578,1.2499971235351564,7.916662061767578,1.2499971235351564,7.916662061767578C1.2499971235351564,8.027162061767578,1.2938971235351562,8.133162061767578,1.3720351235351562,8.211292061767578C1.4501741235351562,8.289412061767578,1.5561541235351561,8.333332061767578,1.6666641235351562,8.333332061767578C1.6666641235351562,8.333332061767578,8.333334123535156,8.333332061767578,8.333334123535156,8.333332061767578C8.443834123535156,8.333332061767578,8.549834123535156,8.289412061767578,8.627954123535156,8.211292061767578C8.706084123535156,8.133162061767578,8.749994123535156,8.027162061767578,8.749994123535156,7.916662061767578C8.749994123535156,7.916662061767578,8.749994123535156,3.333332061767578,8.749994123535156,3.333332061767578C8.749994123535156,3.222822061767578,8.706084123535156,3.1168420617675783,8.627954123535156,3.038702061767578C8.549834123535156,2.960562061767578,8.443834123535156,2.9166620617675783,8.333334123535156,2.9166620617675783C8.333334123535156,2.9166620617675783,4.583334123535156,2.9166620617675783,4.583334123535156,2.9166620617675783C4.4440141235351565,2.9166620617675783,4.313924123535156,2.8470420617675782,4.236644123535156,2.731122061767578C4.236644123535156,2.731122061767578,3.527004123535156,1.6666650617675782,3.527004123535156,1.6666650617675782C3.527004123535156,1.6666650617675782,1.6666641235351562,1.6666650617675782,1.6666641235351562,1.6666650617675782C1.6666641235351562,1.6666650617675782,1.6666641235351562,1.6666650617675782,1.6666641235351562,1.6666650617675782ZM0.7827811235351563,1.1994490617675782C1.0172021235351563,0.9650280617675782,1.3351431235351563,0.8333320617675781,1.6666641235351562,0.8333320617675781C1.6666641235351562,0.8333320617675781,3.7499941235351564,0.8333320617675781,3.7499941235351564,0.8333320617675781C3.889314123535156,0.8333320617675781,4.019404123535156,0.9029574617675782,4.096684123535156,1.0188740617675782C4.096684123535156,1.0188740617675782,4.806334123535156,2.083332061767578,4.806334123535156,2.083332061767578C4.806334123535156,2.083332061767578,8.333334123535156,2.083332061767578,8.333334123535156,2.083332061767578C8.664874123535157,2.083332061767578,8.982794123535156,2.215032061767578,9.217204123535156,2.449452061767578C9.451624123535156,2.683872061767578,9.583334123535156,3.0018120617675783,9.583334123535156,3.333332061767578C9.583334123535156,3.333332061767578,9.583334123535156,7.916662061767578,9.583334123535156,7.916662061767578C9.583334123535156,8.248212061767578,9.451624123535156,8.566122061767578,9.217204123535156,8.800542061767578C8.982794123535156,9.034962061767578,8.664874123535157,9.166662061767578,8.333334123535156,9.166662061767578C8.333334123535156,9.166662061767578,1.6666641235351562,9.166662061767578,1.6666641235351562,9.166662061767578C1.3351431235351563,9.166662061767578,1.0172021235351563,9.034962061767578,0.7827811235351563,8.800542061767578C0.5483601235351563,8.566122061767578,0.41666412353515625,8.248212061767578,0.41666412353515625,7.916662061767578C0.41666412353515625,7.916662061767578,0.41666412353515625,2.083332061767578,0.41666412353515625,2.083332061767578C0.41666412353515625,1.7518110617675782,0.5483601235351563,1.4338700617675781,0.7827811235351563,1.1994490617675782C0.7827811235351563,1.1994490617675782,0.7827811235351563,1.1994490617675782,0.7827811235351563,1.1994490617675782Z"
                fill-rule="evenodd" fill="#474747" fill-opacity="1"/>
          </g>
        </g>
      </svg>
      <svg style="margin-top: 5px" v-if="item.type === 'file'" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="10" height="10"
           viewBox="0 0 10 10">
        <defs>
          <clipPath id="master_svg0_93_1979">
            <rect x="0" y="0" width="10" height="10" rx="0"/>
          </clipPath>
        </defs>
        <g clip-path="url(#master_svg0_93_1979)">
          <g>
            <path
                d="M7.916663969116211,9.166665876464844L2.083333969116211,9.166665876464844C1.392977969116211,9.166665876464844,0.8333339691162109,8.607025876464844,0.8333339691162109,7.916665876464844L0.8333339691162109,1.2500028764648436C0.8333339691162109,1.0198838764648437,1.0198819691162109,0.8333358764648438,1.2500009691162108,0.8333358764648438L7.083333969116211,0.8333358764648438C7.313453969116211,0.8333358764648438,7.500003969116211,1.0198838764648437,7.500003969116211,1.2500028764648436L7.500003969116211,6.250005876464844L9.166663969116211,6.250005876464844L9.166663969116211,7.916665876464844C9.166663969116211,8.607025876464844,8.607023969116211,9.166665876464844,7.916663969116211,9.166665876464844ZM7.500003969116211,7.083335876464844L7.500003969116211,7.916665876464844C7.500003969116211,8.146785876464843,7.686553969116211,8.333335876464844,7.916663969116211,8.333335876464844C8.14678396911621,8.333335876464844,8.333333969116211,8.146785876464843,8.333333969116211,7.916665876464844L8.333333969116211,7.083335876464844L7.500003969116211,7.083335876464844ZM2.500003969116211,2.916665876464844L2.500003969116211,3.7500058764648436L5.833333969116211,3.7500058764648436L5.833333969116211,2.916665876464844L2.500003969116211,2.916665876464844ZM2.500003969116211,4.583335876464844L2.500003969116211,5.416665876464844L5.833333969116211,5.416665876464844L5.833333969116211,4.583335876464844L2.500003969116211,4.583335876464844ZM2.500003969116211,6.250005876464844L2.500003969116211,7.083335876464844L4.583333969116211,7.083335876464844L4.583333969116211,6.250005876464844L2.500003969116211,6.250005876464844Z"
                fill="#727B85" fill-opacity="1"/>
          </g>
        </g>
      </svg>
      <div style="max-width: 100px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
        {{ item.name }}
      </div>
    </div>
    <div>
      <v-contextmenu ref="contextmenu">
        <v-contextmenu-item @click="handleNew('file')">新建文件</v-contextmenu-item>
        <v-contextmenu-item @click="handleNew('folder')">新建文件夹</v-contextmenu-item>
        <v-contextmenu-item>剪切</v-contextmenu-item>
        <v-contextmenu-item>复制</v-contextmenu-item>
        <v-contextmenu-item>在新窗口打开</v-contextmenu-item>
        <v-contextmenu-item>在新标签页打开</v-contextmenu-item>
        <v-contextmenu-item>Ficus视图</v-contextmenu-item>
        <v-contextmenu-item>重命名</v-contextmenu-item>
        <v-contextmenu-item v-if="item.type==='file'">在当前位置引用</v-contextmenu-item>
        <v-contextmenu-item>删除</v-contextmenu-item>
      </v-contextmenu>
    </div>
    <ul v-if="hasChildren && expanded" class="pl-4">
      <FileNavItem
          :selected="selected"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          @click="getCurChild(item, index)"
      />
    </ul>
  </li>
</template>

<script>
import { computed, getCurrentInstance, ref, watch } from 'vue'
import bus from 'vue3-eventbus'
import { directive, Contextmenu, ContextmenuItem } from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'
import { useStore } from 'vuex'

export default {
  name: 'FileNavItem',
  directives: {
    contextmenu: directive
  },
  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem
  },
  props: {
    selected: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const expanded = ref(false) // 控制是否显示孩子节点
    const curItem = ref(props.item)
    const selectedList = ref(props.selected)
    const store = useStore()
    const TabXY = ref({ x: -1, y: -1 })
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx

    console.log(proxy, _this)

    watch(() => store.state.xy, (newValue, oldValue) => {
      const temp = TabXY.value.x + '+' + TabXY.value.y
      if (store.getters.getXY !== temp) {
        _this.$refs.contextmenu.hide()
      }
    })

    // 创建一个计算属性，用于判断当前项是否有子节点
    const hasChildren = computed(() => {
      return props.item.children && props.item.children.length
    })

    // 考虑将isSelected加入data字段中提升计算效率
    const isSelected = computed(() => {
      // console.log('selected is ', selectedList.value)
      for (let i = 0; i < selectedList.value.length; i++) {
        if (props.item.path === selectedList.value[i].path) {
          return true
        }
      }
      return false
    })

    // 创建一个方法，用于切换节点的展开状态
    function toggle (index) {
      if (index === 1) {
        curItem.value.curChild = -1
        if (hasChildren.value) {
          expanded.value = !expanded.value
        }
        if (props.item.type === 'file') {
          bus.emit('openNewTab', props.item)
        }
        // 单击会新建一个列表
        bus.emit('newSelected', props.item)
      } else if (index === 2) {
        // isFocused.value = !isFocused.value
        // ctrl + 单击 不会新建列表，会往里添加，如果里面已经有则是删除
        let index = -1
        for (let i = 0; i < selectedList.value.length; i++) {
          if (props.item.path === selectedList.value[i].path) {
            index = i
            break
          }
        }
        if (index !== -1) {
          selectedList.value.splice(index, 1)
        } else {
          selectedList.value.push(props.item)
        }
      }
    }

    function getCurChild (item, index) {
      item.curChild = index
    }

    function dragstart (index) {
      // 源对象
      bus.emit('getSource', props.item)
    }

    function dragenter (e) {
      e.preventDefault()
      // 避免源对象触发自身的dragenter事件
    }

    function dragover (e) {
      e.preventDefault()
      bus.emit('toDst', props.item)
    }

    function handleRightClick (e) {
      // 右键一个对象，如果对象已经在selectedList中，则不改变，如果不在，则新建一个selected
      TabXY.value = { x: e.clientX, y: e.clientY }
      store.dispatch('updateXY', TabXY.value)
    }

    function handleNew (type) {
      bus.emit('showDialog', { type, father: props.item })
    }

    return {
      dragstart,
      dragenter,
      dragover,
      expanded,
      hasChildren,
      isSelected,
      curItem,
      toggle,
      getCurChild,
      handleRightClick,
      handleNew
    }
  }
}
</script>

<style scoped>

</style>
