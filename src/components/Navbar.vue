<script setup lang="ts">
import { ref, computed } from 'vue'
import { Archive, Gift, Sparkles, User } from 'lucide-vue-next'
import InventoryPage from '../views/InventoryPage.vue'
import CasesPage from '../components/RouletteWheel.vue'
import ImprovePage from '../views/UpgradePage.vue'
import ProfilePage from '../views/ProfilePage.vue'

interface NavItem {
  id: string
  label: string
  icon: any
  component: any
}

const activeItem = ref('cases')


const navItems: NavItem[] = [

  {
    id: 'cases',
    label: 'Кейсы',
    icon: Gift,
    component: CasesPage
  },
  {
    id: 'inventory',
    label: 'Инвентарь',
    icon: Archive,
    component: InventoryPage
  },
  {
    id: 'improve',
    label: 'Улучшить',
    icon: Sparkles,
    component: ImprovePage
  },
  {
    id: 'profile',
    label: 'Профиль',
    icon: User,
    component: ProfilePage
  }
]

const handleItemClick = (itemId: string) => {
  activeItem.value = itemId
}

const currentPage = computed(() => {
  return navItems.find(item => item.id === activeItem.value)?.component
})
</script>

<template>
  <div class="min-h-screen flex justify-center p-4 bg-transparent">
    <div class="w-full max-w-sm relative">
      <div class="pb-24">
        <component :is="currentPage" />
      </div>

      <nav class="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-4">
        <div class="glass-navbar rounded-xl">
          <div class="flex items-center justify-around py-4 px-3 relative">
            <button
              v-for="item in navItems"
              :key="item.id"
              @click="handleItemClick(item.id)"
              class="relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 text-white/90 transition-all duration-300 hover:text-white"
            >
              <div
                class="w-12 h-12 flex items-center justify-center mb-1"
              >
                <component
                  :is="item.icon"
                  class="w-6 h-6"
                  :class="{
                    'drop-shadow-md': activeItem === item.id
                  }"
                />
              </div>

              <span
                class="text-xs font-medium text-center"
                :class="{
                  'text-white': activeItem === item.id,
                  'text-white/70': activeItem !== item.id
                }"
              >
                {{ item.label }}
              </span>

                    <div
                v-if="activeItem === item.id"
                class="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-blue-500 rounded-full"
                ></div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>

.glass-navbar {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-radius: 9999px; /* вот тут самое главное */
}

.glass-navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border-radius: 9999px;
  pointer-events: none;
}

/* Smooth transitions */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover .glass-icon {
  transform: translateY(-2px) scale(1.05);
}

button:active .glass-icon {
  transform: translateY(0) scale(1);
}
</style>