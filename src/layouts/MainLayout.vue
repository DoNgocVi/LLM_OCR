<template>
  <div class="h-screen flex flex-col bg-main">
    <div class="flex flex-1">
      <div class="h-full">
        <MenuBar @setTitle="handleSetTitle" />
      </div>
      <div class="flex-1 px-4">
        <Header @setTitle="handleSetTitle" />
        <p class="title font-bold text-2xl color-black">{{ headerName }}</p>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Header from './Header.vue'
  const headerName = ref<string>('ジョブ結果')

  const handleSetTitle = (title: string) => {
    console.log(title, 'string title')
    headerName.value = title
  }
</script>
