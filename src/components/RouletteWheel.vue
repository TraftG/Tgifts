<template>
  <div class="relative overflow-hidden mb-6 w-full max-w-2xl mx-auto">
    <div class="roulette-container relative h-32 flex items-center" style="width: 90vw; max-width: 600px;">

      <!-- Верхний треугольник -->
      <div class="absolute left-1/2 top-[-8px] transform -translate-x-1/2 z-50 pointer-triangle"></div>

      <!-- Нижний треугольник (перевёрнутый) -->
      <div class="absolute left-1/2 bottom-[-8px] transform -translate-x-1/2 z-50 rotate-180 pointer-triangle"></div>

      <!-- Рулетка -->
      <div ref="rouletteRef" class="flex gap-2" style="transform: translateX(0); padding-left: 20px;">
        <PrizeCard
          v-for="(prize, index) in repeatedPrizes"
          :key="`${prize.id}-${index}`"
          :prize="prize"
          :bgClass="getRarityGradient(prize.rarity)"
        />
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, watch, nextTick, defineExpose } from 'vue';
  import PrizeCard from './PrizeCard.vue';
  
  const props = defineProps({
    prizes: Array,
    spinToIndex: Number,
    spinning: Boolean
  });
  
  const rouletteRef = ref(null);
  const repeatedPrizes = [...props.prizes, ...props.prizes, ...props.prizes];
  
  function getRarityGradient(rarity) {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-400';
      case 'epic': return 'bg-purple-500';
      case 'rare': return 'bg-pink-400';
      default: return 'bg-gray-400';
    }
  }
  
  // Экспортируем ref для управления из родителя
  defineExpose({ rouletteRef });
  
  // Слушаем spinToIndex и запускаем анимацию
  watch(() => props.spinToIndex, async (newIndex) => {
    if (newIndex === null) return;
    await nextTick();
    const itemWidth = 120;
    const containerWidth = rouletteRef.value?.offsetParent?.offsetWidth || 600;
    const center = containerWidth / 2;
    const middleSetIndex = props.prizes.length;
    const targetIndex = middleSetIndex + newIndex;
    const targetCenter = targetIndex * itemWidth + itemWidth / 2;
    const move = center - targetCenter;
    const fullRot = props.prizes.length * itemWidth * 1;
    const finalPos = move - fullRot;
  
    const el = rouletteRef.value;
    if (el) {
      el.style.transition = 'none';
      el.style.transform = 'translateX(0px)';
      void el.offsetHeight;
      el.style.transition = 'transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)';
            el.style.transform = `translateX(${finalPos}px)`;
    }
  });
  </script>

<style scoped>
.roulette-container {
  border: 2px solid rgba(59, 130, 246, 0.5);
  border-radius: 1rem;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.pointer {
  position: relative;
  width: 24px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pointer-line {
  width: 4px;
  height: 60px;
  background: linear-gradient(to bottom, #3b82f6, #60a5fa);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.roulette-container {
  border: 2px solid rgba(59, 130, 246, 0.5);
  border-radius: 1rem;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.pointer-triangle {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 16px solid #3b82f6;
  border-style: solid;
  filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5));
}

</style>