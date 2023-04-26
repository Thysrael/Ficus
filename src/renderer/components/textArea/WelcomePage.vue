<template>
  <section class="text-gray-500 body-font place-content-center ">
    <div class="container px-5 py-16 mx-auto">
      <div class="flex place-content-center">
        <div>
          <img alt="logo" src="../../assets/ficus_logo2.png"
               style="-webkit-app-region: no-drag; width: 200px; height: 200px"/>
        </div>
      </div>
      <div class="text-center mb-20">
        <h1 class="sm:text-3xl text-2xl justify-self-center text-center title-font text-gray-600 mb-4">欢迎来到 Ficus </h1>
        <p class="leading-relaxed xl:w-6/12 lg:w-9/12 mx-auto" style="font-family: 'Noto Serif SC'; font-style: italic">Branch out your mind with Ficus. </p>
      </div>
      <div class="flex flex-wrap mx-4 my-2">
        <div class="p-2 sm:w-6/12 w-full">
          <div class="bg-gray-200 rounded flex p-4 h-full items-center">
            <div>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="flex-shrink-0 mr-4" viewBox="0 0 24 24" width="20" height="20">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
            </div>
            <span class="title-font justify-self-center">像榕树一样组织知识</span>
          </div>
        </div>
        <div class="p-2 sm:w-6/12 w-full">
          <div class="bg-gray-200 rounded flex p-4 h-full items-center">
            <div>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="flex-shrink-0 mr-4" viewBox="0 0 24 24" width="20" height="20">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
            </div>
            <span class="title-font justify-self-center">所见即所得</span>
          </div>
        </div>
        <div class="p-2 sm:w-6/12 w-full">
          <div class="bg-gray-200 rounded flex p-4 h-full items-center">
            <div>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="flex-shrink-0 mr-4" viewBox="0 0 24 24" width="20" height="20">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
            </div>
            <span class="title-font justify-self-center">联合结构化编辑</span>
          </div>
        </div>
        <div class="p-2 sm:w-6/12 w-full">
          <div class="bg-gray-200 rounded flex p-4 h-full items-center">
            <div>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="flex-shrink-0 mr-4" viewBox="0 0 24 24" width="20" height="20">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
            </div>
            <span class="title-font justify-self-center">榕荫般清凉的写作体验</span>
          </div>
        </div>
      </div>
      <button class="flex mx-auto mt-8 text-white bg-emerald-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-400 rounded text-sm font-semibold transition-all"
              @click="handleOpenDir">
        打开文件夹
      </button>
    </div>
  </section>
</template>

<script>
import bus from 'vue3-eventbus'

export default {
  name: 'WelcomePage',
  setup () {
    async function handleOpenDir () {
      const obj = await window.electronAPI.newFicusVault()
      if (obj.error === 0) {
        const root = obj.relation
        const openDir = [{
          name: root.root.folderName,
          path: root.root.path,
          children: root.root.tree,
          curChild: -1,
          absolutePath: [root.root.folderName],
          offset: -1,
          type: 'folder'
        }]
        bus.emit('openDir', openDir[0])
      }
    }

    return {
      handleOpenDir
    }
  }
}
</script>

<style scoped>

</style>
