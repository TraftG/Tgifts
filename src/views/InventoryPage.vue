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
        username.value = user.username || 'Triyengle'
        userId.value = user.id || 6750739892
    } else {
        console.warn('User data not available in initDataUnsafe')
    }
})
</script>


<template>
    <div class="flex flex-col items-center mt-6">
        <img :src="userImg" alt="User Photo"
            class="w-32 h-32 rounded-full object-cover border border-gray-300 shadow-md" />
        <div class="text-xl font-semibold mt-4 text-center">{{ username }}</div>
    </div>

    <div>
        <Card />
    </div>
</template>
