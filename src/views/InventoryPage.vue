<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { WebApp } from '../telegram/telegram'
import Card from '../components/Card.vue'

const userImg = ref('https://via.placeholder.com/150')
const username = ref('Triyengle')
const userId = ref<number>(6750739892)
const imagePath = ref('')

onMounted(async () => {
    const user = WebApp.initDataUnsafe.user

    if (user) {
        userImg.value = user.photo_url || 'https://via.placeholder.com/150'
        userId.value = user.id || 6750739892
    } else {
        console.warn('User data not available in initDataUnsafe')
    }
})
</script>


<template>
    <div class="w-full flex flex-col items-center p-4 safe-top safe-bottom ">
      <!-- Заголовок с эффектом "приподнятости" -->
      <div class="flex items-center gap-4 rounded-full bg-white/20 px-10 py-2 -translate-y-19 z-19"
           style="display: inline-flex;">
        <span class="text-sm font-bold text-muted-foreground select-none">Инвентарь</span>
      </div>
      
      <!-- Контейнер с карточками сдвинут вверх -->
      <div class="w-full h-[80vh] overflow-y-auto -mt-15">
        <Card :userId="userId" />
      </div>
    </div>
  </template>