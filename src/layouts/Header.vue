<template>
  <div class="header h-[50px] px-10 flex justify-end">
    <div class="flex items-center justify-center gap-6">
      <span class="text-sm">株式会社ITSO</span>
      <div class="flex items-center gap-2">
        <n-icon size="24" color="#aaaaaa" class="cursor-pointer">
          <PersonCircle />
        </n-icon>
        <span>江戸川⁨⁩コナン</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PersonCircle } from '@vicons/ionicons5'
  const options = ref([
    {
      label: 'Marina Bay Sands',
      key: 'Marina Bay Sands',
      disabled: true
    },
    {
      label: "Brown's Hotel, London",
      key: "Brown's Hotel, London"
    },
    {
      label: 'Atlantis Bahamas, Nassau',
      key: 'Atlantis Bahamas, Nassau'
    },
    {
      label: 'Logout',
      key: 'logout'
    }
  ])
  const handleSelect = (value: string) => {
    console.log(value)
  }
</script>
