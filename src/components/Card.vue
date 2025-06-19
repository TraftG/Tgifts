<template>
  <div class="grid-container">
    <div v-for="(gift, index) in inventory" :key="index" class="gift-item"
      style="background: linear-gradient(to bottom, #031936, #09489C);">
      <img v-if="gift.image_path" :src="gift.image_path" alt="Gift Image" class="gift-image"
        @error="handleImageError(gift.image_path)" />
      <div class="gift-info">
        <div class="font-bold flex items-center justify-center gap-1">
          {{ gift.star }} <img src="../assets/starsw.png" alt="" class="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { WebApp } from '../telegram/telegram'

const username = ref('Triyengle')
const userId = ref<number>(6750739892)
const inventory = ref<any[]>([])

const handleImageError = (imagePath: string) => {
  console.warn('Ошибка загрузки изображения:', imagePath)
}

onMounted(async () => {
  const user = WebApp.initDataUnsafe?.user
  if (user) {
    userId.value = user.id
    username.value = user.username || 'Triyengle'
  }

  try {
    const res = await fetch(`http://localhost:8001/inventory_check?user_id=${userId.value}`)
    const data = await res.json()

    if (data.inventory && data.inventory.length > 0) {
      inventory.value = data.inventory
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
})
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
  width: 100%;
  max-width: 500px;
  /* Можно настроить под ваш дизайн */
  margin: 0 auto;
}

.gift-item {
  width: 100%;
  aspect-ratio: 3/4;
  /* Соотношение ширины к высоте 3:4 */
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
}

.gift-image {
  max-width: 100%;
  max-height: 60%;
  object-fit: contain;
}

.gift-info {
  margin-top: 8px;
  color: white;
  text-align: center;
}

@media (max-width: 500px) {
  .grid-container {
    gap: 12px;
    padding: 12px;
  }
}
</style>