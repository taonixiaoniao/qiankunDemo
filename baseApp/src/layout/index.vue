<template>
  <a-layout>
    <a-layout-header class="header">
      <slot name="header" />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <slot name="content" />
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <slot name="footer" />
    </a-layout-footer>
  </a-layout>
</template>
<script setup>
import { ref, reactive, defineProps } from 'vue'

defineProps({
  
})

function selectedKeysFn() {
  const selectedKeys1 = ref(['2'])
  const selectedKeys2 = ref(['1'])
  const openKeys = ref(['sub1'])
  const handleSelectMenu = () => { }
  return { selectedKeys1, selectedKeys2, openKeys, handleSelectMenu }
}
const { selectedKeys1, selectedKeys2, openKeys, handleSelectMenu } = selectedKeysFn()

</script>
<style scoped>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>