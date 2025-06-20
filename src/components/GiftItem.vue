<template>
    <div class="gift-item w-24 h-24 flex flex-col items-center justify-center">
        <img :src="gift.img" class="w-16 h-16 object-contain" />
        <p class="text-xs text-white">{{ gift.name }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    gift: {
        img: string
        name: string
    }
}>()
</script>

<style scoped>
.gift-item {
    background: linear-gradient(to bottom, #031936, #09489C);
    border-radius: 8px;
}
</style>
