<template>
  <div class="app text-text min-h-screen safe-top safe-bottom ">
    <Navbar />
    <router-view class="pt-20 pb-16" /> <!-- Добавляем отступы для контента -->
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>