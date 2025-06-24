import { createRouter, createWebHistory } from 'vue-router'
import InventoryPage from '../views/InventoryPage.vue'
import RouletteWheel from '../components/RouletteWheel.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: RouletteWheel
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