<template>
  <div id="microApp">
    <h1>microApp</h1>
  </div>
</template>
<script setup>
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { registerMicroApps, start } from 'qiankun'
import { ref, computed, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { joinUrl } from '@/lib/utils/util'

const menuStore = useMenuStore()

const router = useRouter()

function qiankunStartFn() {
  const activeMenu = menuStore.activeMenu
  if (!activeMenu.entry) return
  const microApp = {
    name: activeMenu.name,
    entry: activeMenu.entry,
    container: '#microApp',
    activeRule: `${joinUrl(['/microApp', activeMenu.menuPath])}`,
  }
  // console.log('activeMenu', activeMenu, microApp)
  registerMicroApps([microApp], {
    beforeLoad: [
      app => {
        console.log('before load', app)
      }
    ],
    beforeMount: [
      app => {
        console.log('before mount', app)
      }
    ],
    afterUnmount: [
      app => {
        console.log('before unmount', app)
      }
    ]
  })
  // 启动 qiankun
  start()
}
onMounted(() => {
  qiankunStartFn()
})

</script>
<style scoped></style>