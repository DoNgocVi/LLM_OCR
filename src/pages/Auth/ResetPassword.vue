<template>
  <div v-if="isSuccess">
    <h1 class="m-1 text-xl font-bold text-center text-black mt-[60px]">{{ $t('common.title_forgot_success') }}</h1>
    <div class="flex items-center gap-6 mt-[60px]">
      <n-button class="w-full rounded-lg h-[44px] color-white flex-1" color="#3799DC" @click="goBackLogin">
        {{ $t('common.go_back_login2') }}
      </n-button>
    </div>
  </div>
  <div v-else>
    <h1 class="text-xl font-bold text-center text-black mt-[60px]">{{ $t('common.title_forgot') }}</h1>
    <div
      class="mx-a w-[725px] px-6 py-8 border-1 border-grey_dark border-solid rounded-lg box-border shadow-lg mt-[60px]"
    >
      <div>
        <p class="text-black text-base text-center">新しいパスワードを設定してください。</p>
        <div class="mt-8">
          <n-form label-placement="left" label-width="auto" require-mark-placement="right-hanging">
            <FormResetPassword class="w-full mx-a" msgToastError="入力に誤りがあります。もう一度入力してください" />
          </n-form>
        </div>
      </div>
      <p class="text-center mt-8">
        <span
          class="text-center text-sm color-primary cursor-pointer hover:color-dark_blue transition-all"
          @click="goBackLogin"
        >
          {{ $t('common.go_back_login') }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'
  import FormResetPassword from '@/components/Auth/FormResetPassword.vue'

  const router = useRouter()
  const route = useRoute()
  const isSuccess = ref(false)

  const goBackLogin = () => {
    router.push('login')
  }

  onMounted(() => {
    console.log('mounted', route.query.id)
  })
</script>
<style lang="scss" scoped></style>
