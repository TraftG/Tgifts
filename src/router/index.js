import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import InventoryPage from '../views/InventoryPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainMenu
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: InventoryPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 