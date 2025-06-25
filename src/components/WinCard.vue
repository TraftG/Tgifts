<template>
    <div class="grid grid-cols-3 gap-4 p-4 max-w-[500px] mx-auto sm:gap-3 sm:p-3 pb-20">
        <div v-for="(gift, index) in inventory" :key="index"
            class="w-full aspect-[3/4] rounded-2xl flex flex-col items-center justify-center p-2 bg-white/5 backdrop-blur-sm">
            <img v-if="gift.img" :src="gift.img" alt="Gift Image" class="max-w-full max-h-[60%] object-contain"
                @error="handleImageError(gift.img)" />
            <div class="mt-2 text-white text-center">
                <div class="font-bold text-sm">{{ gift.name }}</div>
                <div class="text-xs text-gray-300">💎 {{ gift.value }}</div>
                <div class="text-xs capitalize" :class="rarityColor(gift.rarity)">
                    {{ gift.rarity }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const inventory = ref<any[]>([])

const handleImageError = (imagePath: string) => {
    console.warn('Ошибка загрузки изображения:', imagePath)
}

const rarityColor = (rarity: string) => {
    switch (rarity) {
        case 'rare':
            return 'text-purple-400'
        case 'common':
            return 'text-gray-400'
        case 'legendary':
            return 'text-yellow-400'
        default:
            return 'text-white'
    }
}

onMounted(async () => {
    try {
        const res = await fetch(`https://tgifts.space/get_spin_gifts`)
        const data = await res.json()
        if (Array.isArray(data)) {
            inventory.value = data
        }
    } catch (error) {
        console.error('Fetch error:', error)
    }
})
</script>
