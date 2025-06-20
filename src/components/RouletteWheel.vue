<template>
  <div class="w-full flex flex-col items-center justify-center p-4">
    <div class="overflow-hidden w-full max-w-[600px] h-32 relative">
      <div class="flex transition-all duration-[4000ms]" :style="{ transform: `translateX(-${currentOffset}px)` }"
        ref="stripRef">
        <GiftItem v-for="(gift, index) in giftStrip" :key="index" :gift="gift" />
      </div>
      <div class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-[2px] bg-red-500 z-10"></div>
    </div>

    <button class="mt-6 px-4 py-2 bg-blue-600 text-white rounded" @click="handleSpin" :disabled="spinning">
      {{ spinning ? 'Крутится...' : 'Крутить рулетку' }}
    </button>

    <div v-if="selectedGift" class="mt-4 text-white text-xl">
      🎉 Выпал: {{ selectedGift.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GiftItem from './GiftItem.vue'
import { useRoulette } from './useRoullete'

const giftList = ref<any[]>([])

// fetch подарков с бэка
onMounted(async () => {
  const response = await fetch('http://localhost:8001/get_spin_gifts') // Подставь правильный URL
  const data = await response.json()
  giftList.value = data
  giftStrip.value = [...data, ...data, ...data] // Повторяем, чтобы лента была длиннее
})

const giftStrip = ref<any[]>([])
const stripRef = ref<HTMLElement | null>(null)
const currentOffset = ref(0)

const { spin, selectedGift, spinning } = useRoulette(giftList.value)

const handleSpin = async () => {
  // Визуальная прокрутка (рандомно)
  const giftWidth = 100 // ширина одного gift блока
  const rounds = 5
  const index = Math.floor(Math.random() * giftStrip.value.length)
  currentOffset.value = (giftWidth * index) - 200 // сдвигаем так, чтобы результат оказался под индикатором

  await spin()
}
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
}
</style>
