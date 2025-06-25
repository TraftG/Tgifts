<template>
  <div class="grid grid-cols-3 gap-4 p-4 max-w-[500px] mx-auto sm:gap-3 sm:p-3 pb-20"> <!-- Добавлен pb-20 для отступа снизу -->
    
    <div v-for="(gift, index) in inventory" :key="index"
         class="w-full aspect-[3/4] rounded-2xl flex flex-col items-center justify-center p-2 bg-white/5 backdrop-blur-sm">
      <img v-if="gift.image_path" :src="gift.image_path" alt="Gift Image"
           class="max-w-full max-h-[60%] object-contain" @error="handleImageError(gift.image_path)" />
      <div class="mt-2 text-white text-center">
        <div class="font-bold flex items-center justify-center gap-1">
          {{ gift.star }}
          <img src="../assets/starsw.png" alt="" class="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { WebApp } from '../telegram/telegram'

const props = defineProps<{ userId: number }>()
const username = ref('Triyengle')
const inventory = ref<any[]>([])

const handleImageError = (imagePath: string) => {
  console.warn('Ошибка загрузки изображения:', imagePath)
}

onMounted(async () => {
  try {
    const res = await fetch(`https://tgifts.space/user_inventory?user_id=${props.userId}`)
    const data = await res.json()
    if (Array.isArray(data.gifts)) {
      inventory.value = data.gifts
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
})
</script>
