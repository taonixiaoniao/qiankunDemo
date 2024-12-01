import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import qiankun from 'vite-plugin-qiankun'

// const { name } = require('./package')

// https://vite.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    qiankun('microapp1', {
      useDevMode: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
})
