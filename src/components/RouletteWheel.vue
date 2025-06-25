<template>
  <div class="w-full flex flex-col items-center justify-center pt-4 pb-4 safe-top safe-bottom">
    <!-- Demo Mode Toggle -->
    <div class="flex items-center gap-3 rounded-full bg-white/20 px-4 py-2 -translate-y-14"
      style="display: inline-flex;">
      <span class="text-sm text-muted-foreground select-none">Демо режим</span>
      <button @click="demoMode = !demoMode" :class="[
        'w-12 h-6 p-0 transition-all rounded-xl',
        demoMode ? 'bg-green-500' : 'bg-gray-300']">
        <div :class="[
          'w-4 h-4 bg-white rounded-full transition-transform',
          demoMode ? 'translate-x-6' : 'translate-x-1'
        ]" />
      </button>
    </div>

    <!-- Gift Wheel Container -->
    <div class="overflow-hidden w-full h-32 relative px-0 mx-0">

      <!-- Gift Strip -->
      <div class="flex" :class="{ 'spinning': spinning }" :style="{ transform: `translateX(-${currentOffset}px)` }"
        ref="stripRef">
        <div v-for="(gift, index) in giftStrip" :key="`${gift.telegram_gift_id}-${index}`"
          class="w-[100px] h-full flex items-center justify-center flex-shrink-0 px-0 mx-0">
          <GiftItem :gift="gift" />
        </div>
      </div>

      <!-- Center Indicators -->
      <div class="absolute inset-0 pointer-events-none">
        <!-- Top Arrow -->
        <div
          class="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white">
        </div>
        <!-- Bottom Arrow -->
        <div
          class="absolute bottom-7 left-1/2 transform -translate-x-1/2 z-10 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white">
        </div>

        <!-- Center Line for debugging -->

      </div>
    </div>

    <!-- Spin Button -->
    <div class="flex items-center gap-3 rounded-full justify-center bg-white/5 px-4 py-2 mt-25 -translate-y-14"
      style="display: inline-flex;">
      <button @click="handleSpin" :disabled="spinning"
        class="justify-center gap-1 flex items-center font-bold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed">
        {{ spinning ? 'Крутится...' : `Открыть за 25` }}
        <img src="../assets/starsw.png" alt="" class="w-5 h-5" />
      </button>
    </div>
    <AllGifts />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GiftItem from './GiftItem.vue'
import { WebApp } from '../telegram/telegram'
import AllGifts from './AllGifts.vue'

// States
const giftList = ref<any[]>([])
const giftStrip = ref<any[]>([])
const demoMode = ref(false)
const currentOffset = ref(0)
const spinning = ref(false)
const selectedGift = ref<any>(null)

// Constants
const ITEM_WIDTH = 100
const CONTAINER_WIDTH = 600
const CENTER_POSITION = (CONTAINER_WIDTH / 2) - 100

// User ID
const userId = WebApp.initDataUnsafe?.user?.id || '6750739892'

// Load gifts on mount
onMounted(async () => {
  try {
    const response = await fetch('https://tgifts.space/get_spin_gifts')
    giftList.value = await response.json()
    initializeStrip()
  } catch (error) {
    console.error('Ошибка загрузки подарков:', error)
    // Fallback data for testing
    giftList.value = [
      { telegram_gift_id: 1, name: 'Подарок 1' },
      { telegram_gift_id: 2, name: 'Подарок 2' },
      { telegram_gift_id: 3, name: 'Подарок 3' },
      { telegram_gift_id: 4, name: 'Подарок 4' },
      { telegram_gift_id: 5, name: 'Подарок 5' }
    ]
    initializeStrip()
  }
})

// Initialize the gift strip
const initializeStrip = () => {
  if (giftList.value.length === 0) return

  giftStrip.value = []

  // Создаем достаточное количество элементов для начальной прокрутки
  for (let i = 0; i < 50; i++) {
    const gift = giftList.value[i % giftList.value.length]
    giftStrip.value.push({ ...gift, uniqueId: `${gift.telegram_gift_id}-${i}` })
  }

  // Начальная позиция - центрируем первый элемент
  currentOffset.value = 0
}

// Spin animation using requestAnimationFrame for smooth control
const performSpinAnimation = (targetGift: any): Promise<void> => {
  return new Promise((resolve) => {
    const startOffset = currentOffset.value
    const startTime = Date.now()

    // Добавляем больше элементов для длинного спина
    const additionalItems = 30
    for (let i = 0; i < additionalItems; i++) {
      const randomGift = giftList.value[Math.floor(Math.random() * giftList.value.length)]
      giftStrip.value.push({ ...randomGift, uniqueId: `spin-${Date.now()}-${i}` })
    }

    // Размещаем целевой подарок в конце
    const targetIndex = giftStrip.value.length - Math.floor(Math.random() * 5) - 1
    giftStrip.value[targetIndex] = { ...targetGift, uniqueId: `target-${Date.now()}` }

    // Рассчитываем финальную позицию - центрируем целевой элемент
    const finalOffset = (targetIndex * ITEM_WIDTH) - CENTER_POSITION + (ITEM_WIDTH / 2)

    // Параметры анимации
    const duration = 4000 // 4 секунды
    const distance = finalOffset - startOffset

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function - быстрый старт, медленное завершение
      const easeOut = 1 - Math.pow(1 - progress, 3)

      currentOffset.value = startOffset + (distance * easeOut)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Анимация завершена
        selectedGift.value = targetGift
        spinning.value = false
        resolve()
      }
    }

    requestAnimationFrame(animate)
  })
}

// Handle payment request
const sendSpinRequest = async (): Promise<any> => {
  const startTime = Date.now()
  const MAX_WAIT = 30000
  const POLLING_INTERVAL = 3000

  while (Date.now() - startTime < MAX_WAIT) {
    try {
      const response = await fetch(`https://tgifts.space/spin?user_id=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200) {
        return await response.json()
      } else if (response.status === 402) {
        await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL))
      } else {
        throw new Error(`Неожиданный статус: ${response.status}`)
      }
    } catch (error) {
      console.error('Ошибка запроса:', error)
      throw error
    }
  }

  throw new Error('Время ожидания оплаты истекло. Попробуйте ещё раз.')
}

// Main spin handler
const handleSpin = async () => {
  if (spinning.value || giftList.value.length === 0) return

  try {
    spinning.value = true
    selectedGift.value = null

    let targetGift

    if (demoMode.value) {
      // Demo mode: select random gift
      targetGift = giftList.value[Math.floor(Math.random() * giftList.value.length)]
      await performSpinAnimation(targetGift)
    } else {
      // Real mode: handle payment
      const paymentResponse = await fetch('https://tgifts.space/payment')
      const paymentResult = await paymentResponse.json()

      if (!paymentResult.payment_link) {
        throw new Error('Не удалось получить ссылку на оплату')
      }

      WebApp.openInvoice(paymentResult.payment_link)
      // window.open(paymentResult.payment_link, '_blank')
      // Wait for payment confirmation and get gift
      targetGift = await sendSpinRequest()
      await performSpinAnimation(targetGift)
    }

  } catch (error) {
    console.error('Ошибка:', error)
    spinning.value = false
    alert('Произошла ошибка. Попробуйте ещё раз.')
  }
}
</script>

<style scoped>
/* Smooth transform transitions */
.flex {
  will-change: transform;
  transition: none;
}

.flex.spinning {
  transition: none;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Performance optimizations */
.flex {
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>