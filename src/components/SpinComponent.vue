<template>
    <div class="min-h-screen p-4 flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <div class="flex gap-4">
          <span class="badge mt-1 flex items-center gap-1 text-white rounded px-2">              
            <img src="../assets/starsw.png" alt="" class="w-5 h-5" />

            {{ diamonds }}
        </span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-muted-foreground">Демо режим</span>
          <button @click="demoMode = !demoMode" :class="['w-12 h-6 p-0 transition-all rounded-xl', demoMode ? 'bg-blue-500' : 'bg-gray-300']">
            <div :class="['w-4 h-4 bg-white rounded-full transition-transform', demoMode ? 'translate-x-6' : 'translate-x-1']" />
          </button>
        </div>
      </div>
  
      <RouletteWheel
        :prizes="prizes"
        :spinToIndex="spinToIndex"
        :spinning="isSpinning"
        ref="wheel"
      />
  
      <button
        @click="spinRoulette"
        :disabled="isSpinning || (!demoMode && diamonds < 25)"
        class="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 rounded-xl hover:to-blue-700 disabled:opacity-50"
      >
        <template v-if="isSpinning">
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Вращение...
          </div>
        </template>
        <template v-else>
          <div class="flex flex-col items-center">
            <span>Мне повезёт!</span>
            <span v-if="!demoMode" class="mt-1 flex items-center gap-1 text-white rounded px-2">
              <img src="../assets/starsw.png" alt="" class="w-5 h-5" />
              25
            </span>
          </div>
        </template>
      </button>
  
      <div class="mt-8">
  <h3 class="text-xl font-bold mb-4 text-center">Вы можете выиграть...</h3>
  <div class="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <PrizeCard
      v-for="prize in prizes"
      :key="prize.id"
      :prize="prize"
      :bgClass="getRarityGradient(prize.rarity)"
    />
  </div>
</div>

    <PrizeModal 
      v-if="showPrizeModal"
      :prize="modalPrize"
      :isDemoMode="demoMode"
      @close="showPrizeModal = false"
      @toggleDemoMode="toggleDemoModeFromModal"
    />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import RouletteWheel from './RouletteWheel.vue';
  import PrizeCard from './PrizeCard.vue';
  import PrizeModal from './PrizeModal.vue';
  
  const diamonds = ref(125);
  const isSpinning = ref(false);
  const demoMode = ref(false);
  const spinToIndex = ref(null);
  const wheel = ref(null);
  const showPrizeModal = ref(false);
  const modalPrize = ref(null);
  
  const prizes = [
    { id: 1, img: new URL('../assets/cup.png', import.meta.url).href, name: 'Кубок', value: 100, rarity: 'legendary', probability: 0.8 },
    { id: 2, img: new URL('../assets/rose.png', import.meta.url).href, name: 'Роза', value: 25, rarity: 'rare', probability: 25 },
    { id: 3, img: new URL('../assets/beer.png', import.meta.url).href, name: 'Шампанское', value: 50, rarity: 'epic', probability: 1.21 },
    { id: 4, img: new URL('../assets/heart.png', import.meta.url).href, name: 'Сердце', value: 15, rarity: 'rare', probability: 21.37 },
    { id: 5, img: new URL('../assets/bear.png', import.meta.url).href, name: 'Мишка', value: 15, rarity: 'common', probability: 25.81 },
    { id: 6, img: new URL('../assets/diamond.png', import.meta.url).href, name: 'Алмаз', value: 75, rarity: 'epic', probability: 5 },
    { id: 7, img: new URL('../assets/gift.png', import.meta.url).href, name: 'Подарок', value: 35, rarity: 'rare', probability: 20.81 },
  ];
  
  function getRarityGradient(rarity) {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-400';
      case 'epic': return 'bg-purple-500';
      case 'rare': return 'bg-pink-400';
      default: return 'bg-gray-400';
    }
  }
  
  function weightedRandomPrize() {
    const random = Math.random() * 100;
    let cumulative = 0;
    for (const prize of prizes) {
      cumulative += prize.probability;
      if (random <= cumulative) return prize;
    }
    return prizes[0];
  }
  
  function toggleDemoModeFromModal() {
    demoMode.value = !demoMode.value;
    showPrizeModal.value = false;
  }

  function spinRoulette() {
    if (isSpinning.value) return;
    const cost = demoMode.value ? 0 : 25;
    if (!demoMode.value && diamonds.value < cost) {
      alert('Недостаточно алмазов! Нужно 25.');
      return;
    }
    isSpinning.value = true;
    if (!demoMode.value) diamonds.value -= cost;
  
    const selectedPrize = weightedRandomPrize();
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id);
    spinToIndex.value = prizeIndex;
  
    setTimeout(() => {
      isSpinning.value = false;
      if (!demoMode.value) diamonds.value += selectedPrize.value;
      modalPrize.value = selectedPrize;
      showPrizeModal.value = true;
      spinToIndex.value = null;
    }, 3000);
  }
  </script>
  
  <style scoped>
  .badge {
    @apply text-lg px-4 py-2  font-bold ;
  }
  </style>