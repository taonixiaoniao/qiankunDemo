import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Antd)

app.mount('#app')

router.beforeEach((to, from, next) => {
  if (!window.history.state.current) window.history.state.current = to.fullPath
  if (!window.history.state.back) window.history.state.back = from.fullPath
  // 手动修改history的state
  return next()
})

