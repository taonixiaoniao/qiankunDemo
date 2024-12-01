import './public-path'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper'
import App from './App.vue'
import router from './router'

let app

function render(container) {
  app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount(container ? container.querySelector('#app') : '#app')
}

const initQianKun = () => {
  renderWithQiankun({
    mount(props) {
      const { container } = props
      render(container)
    },
    bootstrap() { },
    unmount() {
      app.unmount()
    }
  })
}

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render()
