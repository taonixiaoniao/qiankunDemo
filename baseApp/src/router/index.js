import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '@/views/home/index.vue'
import MicroApp from '@/views/home/components/microApp.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/microApp/',
      name: 'home',
      component: Home,
      children: [
        { path: 'microApp1', name: 'micro', component: MicroApp }
      ]
    }
  ],
})

export default router
