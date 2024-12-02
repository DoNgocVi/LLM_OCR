<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div style="color: black">
      <MainLogo class="w-[200px]" />
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import MainLogo from '@/assets/images/main-logo.vue'
</script>
