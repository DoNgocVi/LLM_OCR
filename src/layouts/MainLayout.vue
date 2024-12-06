<template>
  <div class='h-screen'>
    <div class='header h-[50px] px-10 bg-emerald-6 flex justify-between items-center'>
      <div class='text-xl font-bold text-white'>
        Logo
      </div>
      <div class='flex items-center justify-center gap-2'>
        <n-icon size="22" color="white" class='cursor-pointer'>
          <QuestionCircle16Regular />
        </n-icon>
        <n-icon size="20" color="white" class='cursor-pointer'>
          <Settings32Regular />
        </n-icon>
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
          <n-icon size="22" color="white" class='cursor-pointer'>
            <PersonCircle20Regular />
          </n-icon>
        </n-dropdown>
      </div>
    </div>
    <div class='flex'>
      <div>

      </div>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/routes';
import { QuestionCircle16Regular, Settings32Regular, PersonCircle20Regular } from '@vicons/fluent'
const options = ref([
  {
    label: 'Marina Bay Sands',
    key: 'Marina Bay Sands',
    disabled: true
  },
  {
    label: 'Brown\'s Hotel, London',
    key: 'Brown\'s Hotel, London'
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
  console.log(value);

}
</script>
