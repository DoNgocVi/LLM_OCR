<template>
  <div class="h-screen flex flex-col bg-main">
    <div v class="flex flex-1">
      <div class="h-full">
        <MenuBar ref="childRef" @setTitle="handleSetTitle" />
      </div>
      <div class="flex-1 px-8">
        <Header @setTitle="handleSetTitleFromHeader" />
        <p class="title font-bold text-2xl color-black">{{ headerName }}</p>
        <div v-if="isShowResetPassword">
          <MyAccount />
        </div>
        <div v-else class="mt-6">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Header from './Header.vue'
  import MyAccount from '@/pages/Dashboard/MyAccount.vue'
  const headerName = ref<string>('ジョブ結果')
  const childRef = ref()
  const isShowResetPassword = ref(false)

  const handleSetTitle = (title: string) => {
    isShowResetPassword.value = false
    headerName.value = title
  }
  const handleSetTitleFromHeader = (title: string) => {
    console.log(title)
    isShowResetPassword.value = true
    headerName.value = title
    childRef.value.handleUpdateValue(null, { key: null })
  }
</script>
