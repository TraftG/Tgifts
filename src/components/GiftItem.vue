<template>
    <div class="gift-item w-40 h-25 flex flex-col items-center justify-center rounded-xl bg-white/2 backdrop-blur-sm">
        <img :src="gift.img" class="w-16 h-16 object-contain" />
        <div class="font-bold flex items-center justify-center gap-1 mt-2">
            <p class="text-xs text-white">{{ gift.value }}</p>
            <img src="../assets/starsw.png" alt="" class="w-4 h-4" />
        </div>
    </div>
</template>


<script setup lang="ts">
defineProps<{
    gift: {
        img: string
        value: string
    }
}>()
</script>

<style scoped></style>
