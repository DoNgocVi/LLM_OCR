<template>
  <div class="h-screen bg-main overflow-hidden">
    <div class="flex items-start h-full">
      <div class="max-h-[100vh] h-full">
        <MenuBar ref="childRef" @setTitle="handleSetTitle" />
      </div>
      <div class="flex-1 px-8 h-full overflow-auto">
        <Header @setTitle="handleSetTitleFromHeader" />
        <p class="title font-bold text-2xl color-black">{{ dashboardTitle }}</p>
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
  import { useCommonStore } from '@/stores/commonStore'
  import { storeToRefs } from 'pinia'

  const commonStore = useCommonStore()
  const { dashboardTitle } = storeToRefs(commonStore)
  const childRef = ref()
  const isShowResetPassword = ref(false)

  const handleSetTitle = (title: string) => {
    isShowResetPassword.value = false
    dashboardTitle.value = title
  }
  const handleSetTitleFromHeader = (title: string) => {
    isShowResetPassword.value = true
    dashboardTitle.value = title
    childRef.value.handleUpdateValue(null, { key: null })
  }
</script>
