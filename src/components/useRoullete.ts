// composables/useRoulette.ts
import { ref } from 'vue'
import { WebApp } from '../telegram/telegram'

const userId = WebApp.initDataUnsafe.user?.id || 6750739892

export function useRoulette(gifts: any[]) {
  const spinning = ref(false)
  const selectedGift = ref<any | null>(null)

  const spin = async () => {
    if (spinning.value) return

    spinning.value = true
    selectedGift.value = null

    // Имитация запроса к бэку
      const response = await fetch(`http://tgifts.space/spin?user_id=${userId}`) // или твой URL
    const data = await response.json()
    const resultId = data.id

    // Находим подарок по ID
    selectedGift.value = gifts.find(gift => gift.id === resultId)

    // Добавляем задержку перед остановкой рулетки
    await new Promise(resolve => setTimeout(resolve, 4000))

    spinning.value = false
  }

  return {
    spin,
    spinning,
    selectedGift
  }
}
