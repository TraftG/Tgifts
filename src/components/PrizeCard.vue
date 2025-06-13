<template>
    <div
      :class="['flex-shrink-0 w-28 h-24 rounded-xl text-white flex flex-col items-center justify-center shadow-lg', bgClass]"
      style="min-width: 112px"
    >
    
      <div class="mb-1">
        <img v-if="prize.img" :src="prize.img" alt="" class="w-12 h-12 object-contain mx-auto" />
        <span v-else class="text-2xl">{{ prize.img }}</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-xs">
          <img src="../assets/starsw.png" alt="" class="w-3 h-3" />
        </span>
        <span class="text-sm font-bold">{{ prize.value }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    prize: Object,
    bgClass: String
  });
  </script>
  