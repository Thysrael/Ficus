<template>
  <MyHeader :data="data"></MyHeader>
  <div style="display:flex;height: 400px">
    <SideBar :data="data"></SideBar>
    <TextArea></TextArea>
  </div>
</template>

<script>

import { ref } from 'vue'
import MyHeader from '@/renderer/components/header/MyHeader'
import SideBar from '@/renderer/components/sideBar/SideBar'
import TextArea from '@/renderer/components/textArea/TextArea'
import bus from 'vue3-eventbus'

export default {
  name: 'App',
  components: { SideBar, MyHeader, TextArea },
  setup () {
    const data = ref([{
      name: 'app2',
      curChild: -1,
      path: 'app2',
      absolutePath: ['app2'],
      offset: -1,
      content: '# 1',
      children: [{
        name: 'src',
        curChild: -1,
        path: 'app2\\src',
        absolutePath: ['app2', 'src'],
        offset: -1,
        content: '- 2',
        children: [{
          name: 'components',
          curChild: -1,
          path: 'app2\\src\\components',
          absolutePath: ['app2', 'src', 'components'],
          offset: -1,
          content: '3',
          children: [{
            name: 'FileNav.vue',
            curChild: -1,
            path: 'app2\\src\\components\\FileNav.vue',
            absolutePath: ['app2', 'src', 'components', 'FileNav.vue'],
            offset: -1,
            content: '4',
            children: []
          }, {
            name: 'FileNavItem.vue',
            curChild: -1,
            path: 'app2\\src\\components\\FileNavItem.vue',
            absolutePath: ['app2', 'src', 'components', 'FileNavItem.vue'],
            offset: -1,
            content: '5',
            children: []
          }]
        }, {
          name: 'assets',
          curChild: -1,
          path: 'app2\\src\\assets',
          absolutePath: ['app2', 'src', 'assets'],
          offset: -1,
          content: '6',
          children: [{
            name: 'logo.png',
            curChild: -1,
            path: 'app2\\src\\assets\\logo.png',
            absolutePath: ['app2', 'src', 'assets', 'logo.png'],
            offset: -1,
            content: '7',
            children: []
          }, {
            name: 'tailwind.css',
            curChild: -1,
            path: 'app2\\src\\assets\\tailwind.css',
            absolutePath: ['app2', 'src', 'assets', 'tailwind.css'],
            offset: -1,
            content: '8',
            children: []
          }, {
            name: 'FileNav.vue',
            curChild: -1,
            path: 'app2\\src\\assets\\FileNav.vue',
            absolutePath: ['app2', 'src', 'assets', 'FileNav.vue'],
            offset: -1,
            content: '9',
            children: []
          }]
        }, {
          name: 'FileNav.vue',
          curChild: -1,
          path: 'app2\\src\\FileNav.vue',
          absolutePath: ['app2', 'src', 'FileNav.vue'],
          offset: -1,
          content: '```vue\n' +
              'setup() {\n' +
              '\tlet name = \'xxx\',\n' +
              '\tlet age = 18\n' +
              '\t\n' +
              '\n' +
              '\treturn {\n' +
              '\t\tname,\n' +
              '\t\tage,\n' +
              '\t\tsayHello\n' +
              '\t}\t\n' +
              '}\n' +
              '```',
          children: []
        }]
      }]
    }])

    bus.on('openDir', (obj) => {
      data.value = [obj]
    })
    return {
      data
    }
  }
}
</script>

<style>
#app {
  position: relative;
  height: 100%;
  opacity: 1;
  background: #FFFFFF;
}
</style>
