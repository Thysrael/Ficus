<template>
  <li
      class="my-1 w-full items-center content-center pr-3"
      @click.stop="handleExpand"
  >
    <div
        style="display: flex;"
        class="pl-1 flex"
        :class="item.selected ? `selectedElement` : `nonSelectedElement`"
    >
      <div v-if="item.type === 'file'" @click.stop="handleSelect(item)">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="15" height="15" viewBox="-2.5 0 15 15"><defs><clipPath id="master_svg0_93_2922"><rect x="0" y="0" width="15" height="15" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_93_2922)"><g></g><g></g><g><g><path d="M13.04039189376831,10.861825785446166L8.35336189376831,0.5489007854461669C8.20148189376831,0.21468178544616698,7.868201893768311,-0.0004742145538330078,7.49976189376831,-0.0004742145538330078C7.13180189376831,-0.0004742145538330078,6.79851189376831,0.21468178544616698,6.6464118937683105,0.5489007854461669L1.9589075937683105,10.861625785446167C1.8271888937683105,11.151825785446167,1.8517982937683106,11.489725785446167,2.0238298937683106,11.756925785446168C2.1970328937683106,12.025525785446167,2.4937518937683105,12.187525785446168,2.8122678937683103,12.187525785446168L6.562271893768311,12.187525785446168L6.562271893768311,14.062525785446168C6.562271893768311,14.580725785446168,6.98156189376831,15.000025785446168,7.499771893768311,15.000025785446168C8.01820189376831,15.000025785446168,8.43750189376831,14.580725785446168,8.43750189376831,14.062525785446168L8.43750189376831,12.187525785446168L12.18699189376831,12.187525785446168C12.50559189376831,12.187525785446168,12.802291893768311,12.025525785446167,12.976191893768311,11.757225785446167C13.148391893768311,11.489725785446167,13.172091893768311,11.152025785446167,13.04039189376831,10.861825785446166Z" fill="#565656" fill-opacity="1"/></g></g></g></svg>
      </div>

      <div v-if="item.type !== 'file'" @click.stop="handleSelect(item)">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="20" height="20" viewBox="-2.5 -2.5 15 15"><defs><clipPath id="master_svg0_218_1030"><rect x="0" y="0" width="15" height="15" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_218_1030)"><g></g><g></g><g><g><path d="M8.75,7.8125L7.8125,7.8125L7.8125,6.85C8.88779,6.6948,9.68623,5.77393,9.6875,4.6875C9.6875,3.60625,8.81562,0.9375,7.5,0.9375C7.26557,0.942652,7.03892,1.022581,6.85313,1.165625C7.39646,2.26695,7.7222,3.46276,7.8125,4.6875C7.81177,5.48694,7.47087,6.24829,6.875,6.78125C6.97748,6.81201,7.08188,6.83602,7.1875,6.85313L7.1875,7.8125L5.3125,7.8125L5.3125,6.85C6.38779,6.6948,7.18623,5.77393,7.1875,4.6875C7.1875,3.75,6.39062,0.3125,5,0.3125C3.60937,0.3125,2.8125,3.75,2.8125,4.6875C2.81377,5.77393,3.61221,6.6948,4.6875,6.85L4.6875,7.8125L2.8125,7.8125L2.8125,6.85313C2.91812,6.83602,3.02251,6.81201,3.125,6.78125C2.52913,6.24829,2.18823,5.48694,2.1875,4.6875C2.2778,3.46276,2.60354,2.26695,3.14687,1.165625C2.96108,1.022581,2.73443,0.942652,2.5,0.9375C1.184375,0.9375,0.3125,3.60625,0.3125,4.6875C0.31377304,5.77393,1.1122100000000001,6.6948,2.1875,6.85L2.1875,7.8125L1.25,7.8125C0.732233,7.8125,0.3125,8.232230000000001,0.3125,8.75L0.3125,9.375C0.3125,9.54759,0.452411,9.6875,0.625,9.6875L9.375,9.6875C9.54759,9.6875,9.6875,9.54759,9.6875,9.375L9.6875,8.75C9.6875,8.232230000000001,9.26777,7.8125,8.75,7.8125Z" fill="#565656" fill-opacity="1"/></g></g></g></svg>
      </div>

      <div class="pl-2 overflow-hidden align-middle content-center flex flex-wrap" id="btnRef" :title="item.name">
        <div style="font-size: 12px; white-space: nowrap"
             :style="item.type !== 'file' ? `font-weight: 900` : `font-weight: 400`"
             :title="item.path">
          {{ item.name }}
        </div>
      </div>
    </div>
    <ul v-if="expanded">
      <ForestItem
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          class="mx-4"
      />
    </ul>
  </li>
</template>

<script>

import bus from 'vue3-eventbus'
import { ref } from 'vue'

export default {
  name: 'ForestItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const expanded = ref(true)

    function handleSelect (item) {
      if (props.item.selected === undefined) {
        // eslint-disable-next-line vue/no-mutating-props
        props.item.selected = false
      }
      if (item.path === props.item.path) {
        item.selected = !item.selected
        changeChild(item, item.selected)
      }
      bus.emit('sendDataToForest')
    }

    function changeChild (father, value) {
      for (let i = 0; i < father.children.length; i++) {
        father.children[i].selected = value
        changeChild(father.children[i], value)
      }
    }

    function handleExpand () {
      expanded.value = !expanded.value
    }

    return {
      handleSelect,
      handleExpand,
      expanded
    }
  }
}
</script>

<style scoped>
.selectedElement {
  padding: 4px;
  color: #3d3d3d;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-transition: .2s;
}

.selectedElement path {
  fill: #66eaae;
  -webkit-transition: .2s;
}

.selectedElement:hover {
  background-color: #e3e3e3;
  border-radius: 8px;
  -webkit-transition: .2s;
}

.nonSelectedElement {
  padding: 4px;
  color: #909090;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nonSelectedElement:hover {
  background-color: #e3e3e3;
  border-radius: 8px;
  -webkit-transition: .2s;
}

.nonSelectedElement path {
  fill: #6b6b6b;
  -webkit-transition: .2s;
}
</style>
