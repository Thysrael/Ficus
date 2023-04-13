<template>
  <div style="position: relative; width: 1152px; height: 700px; opacity: 1; background: #FFFFFF;">
    <MyHeader :data="data"> </MyHeader>
    <SideBar :data="data"> </SideBar>
    <TextArea> </TextArea>
  </div>
</template>

<script>
import MyHeader from '@/renderer/components/header/MyHeader'
import SideBar from '@/renderer/components/sideBar/SideBar'
import TextArea from '@/renderer/components/textArea/TextArea'
import { ref } from 'vue'

export default {
  name: 'App',
  components: { TextArea, SideBar, MyHeader },
  setup () {
    const data = ref([{
      path: 'app2',
      curChild: -1,
      absolutePath: ['app2'],
      offset: -1,
      children: [{
        path: 'src',
        curChild: -1,
        absolutePath: ['app2', 'src'],
        offset: -1,
        children: [{
          path: 'components',
          curChild: -1,
          absolutePath: ['app2', 'src', 'components'],
          offset: -1,
          children: [{
            path: 'FileNav.vue',
            curChild: -1,
            absolutePath: ['app2', 'src', 'components', 'FileNav.vue'],
            offset: -1
          }, {
            path: 'FileNavItem.vue',
            curChild: -1,
            absolutePath: ['app2', 'src', 'components', 'FileNavItem.vue'],
            offset: -1
          }]
        }, {
          path: 'assets',
          curChild: -1,
          absolutePath: ['app2', 'src', 'assets'],
          offset: -1,
          children: [{
            path: 'logo.png',
            curChild: -1,
            absolutePath: ['app2', 'src', 'assets', 'logo.png'],
            offset: -1
          }, {
            path: 'tailwind.css',
            curChild: -1,
            absolutePath: ['app2', 'src', 'assets', 'tailwind.css'],
            offset: -1
          }, {
            path: 'FileNav.vue',
            curChild: -1,
            absolutePath: ['app2', 'src', 'assets', 'FileNav.vue'],
            offset: -1
          }]
        }, {
          path: 'FileNav.vue',
          curChild: -1,
          absolutePath: ['app2', 'src', 'FileNav.vue'],
          offset: -1
        }]
      }]
    }])

    return {
      data
    }
  }
}
</script>

<style>
<<<<<<< HEAD
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
=======
>>>>>>> 6a1d857 (feat: test build-speed)
</style>
