<template>
  <div class="w-full flex flex-col items-center justify-center p-4">
    <div class="flex items-center gap-3 rounded-full bg-white/20 px-4 py-2 -translate-y-14"
      style="display: inline-flex;">
      <span class="text-sm text-muted-foreground select-none">Демо режим</span>
      <button @click="demoMode = !demoMode" :class="[
        'w-12 h-6 p-0 transition-all rounded-xl',
        demoMode ? 'bg-green-500' : 'bg-gray-300'
      ]">
        <div :class="[
          'w-4 h-4 bg-white rounded-full transition-transform',
          demoMode ? 'translate-x-6' : 'translate-x-1'
        ]" />
      </button>
    </div>


    <div class="overflow-hidden w-full max-w-[600px] h-32 relative">
      <div class="flex transition-all duration-[4000ms]" :style="{ transform: `translateX(-${currentOffset}px)` }"
        ref="stripRef">
        <div v-for="(gift, index) in giftStrip" :key="index" class="w-[100px] h-full flex items-center justify-center">
          <GiftItem :gift="gift" />
        </div>
      </div>

      <!-- Верхний треугольник -->
      <div
        class="absolute bottom-0 left-1/2 transform -translate-x-1/3 z-10 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white">
      </div>

      <!-- Нижний треугольник -->
      <div
        class="absolute top-0 left-1/2 transform -translate-x-1/3 z-10 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white">
      </div>
    </div>


    <div class="flex items-center gap-3 rounded-full justify-center bg-white/5 px-4 py-2 mt-25 -translate-y-14"
      style="display: inline-flex;">
      <button @click="handleSpin" :disabled="spinning"
        class="justify-center gap-1 flex items-center font-bold text-sm text-white">

        {{ spinning ? 'Крутится...' : `Открыть за 25` }}
        <img src="../assets/starsw.png" alt="" class="w-5 h-5" />
      </button>
    </div>



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
const demoMode = ref(false);

// fetch подарков с бэка
onMounted(async () => {
  const response = await fetch('https://tgifts.space/get_spin_gifts') // Подставь правильный URL
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
