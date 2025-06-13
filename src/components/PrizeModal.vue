<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-sm w-full relative">
        <!-- Изображение приза -->
        <img v-if="prize.img" :src="prize.img" alt="Приз" class="w-32 h-32 mx-auto mb-4 object-contain" />
        <span v-else class="text-5xl mb-4">{{ prize.emoji }}</span>
  
        <h2 class="text-3xl font-bold mb-2">Вы выиграли подарок!</h2>
        <p class="text-xl text-blue-400 font-semibold mb-4 flex items-center justify-center gap-1">{{ prize.name }} </p>
  
        <p v-if="isDemoMode" class="text-sm text-gray-400 mb-6">
          Демо-режим нужен для тестирования шансов выпадения подарков.
        </p>
  
        <div class="flex flex-col gap-3">
          <button 
            v-if="isDemoMode"
            @click="$emit('toggleDemoMode')"
            class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors"
          >
            Отключить демо-режим
          </button>
          <button 
            @click="$emit('close')"
            class="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg font-bold transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  defineProps({
    prize: { type: Object, required: true },
    isDemoMode: { type: Boolean, default: false }
  });
  
  defineEmits(['close', 'toggleDemoMode']);
  </script>
  
  <style scoped>
  /* Дополнительные стили, если потребуются */
  </style> 