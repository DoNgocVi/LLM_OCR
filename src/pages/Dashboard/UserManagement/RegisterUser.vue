<template>
  <div>
    <p class="text-base">{{ $t('dashboard.user_management.title') }}</p>
    <div class="w-full flex justify-end">
      <div class="max-w-[464px] w-full flex gap-6">
        <CustomButton type="default" content="キャンセル" @click="backToList" />
        <CustomButton type="secondary" content="保存" :loading="loading" @click="handelSubmit" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const loading = ref(false)
  const handelSubmit = () => {
    console.log('submit')
  }
  const backToList = () => {}
</script>
