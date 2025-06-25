<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="app text-text min-h-screen safe-top safe-bottom">
    <Navbar />
    <div class="flex flex-col items-center w-full px-4 py-8">
      <RouletteWheel/>
    </div>
  </div>
</template>