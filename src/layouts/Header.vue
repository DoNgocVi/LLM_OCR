<template>
  <div class="header h-[50px] px-10 bg-emerald-6 flex justify-between items-center">
    <div class="flex items-center justify-center gap-2">
      <n-icon size="24" color="white" class="cursor-pointer">
        <QuestionCircle16Regular />
      </n-icon>
      <n-icon size="22" color="white" class="cursor-pointer">
        <Settings32Regular />
      </n-icon>
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-badge :value="2" :offset="[4, -3]">
          <n-icon size="24" color="white" class="cursor-pointer">
            <PersonCircleOutline />
          </n-icon>
        </n-badge>
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { QuestionCircle16Regular, Settings32Regular } from '@vicons/fluent'
  import { PersonCircleOutline } from '@vicons/ionicons5'
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
