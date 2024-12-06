<template>
  <div class='h-screen flex flex-col font-sans'>
    <Header />
    <div class='flex flex-1'>
      <div class='h-full'>
        <MenuBar />
      </div>
      <div class='flex-1'>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
</script>
