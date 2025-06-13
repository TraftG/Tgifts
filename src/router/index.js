import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainMenu
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 