<template>
  <div class="w-[725px] bg-white px-6 py-8 rounded-[20px] box-border mt-[60px]">
    <div>
      <p class="text-black text-base">新しいパスワードを設定してください。</p>
      <div class="mt-6">
        <n-form label-placement="left" label-width="auto" require-mark-placement="right-hanging">
          <FormResetPassword class="w-[310px] mx-a" @onResetPassword="handleResetPassword" />
        </n-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // import { useI18n } from 'vue-i18n'
  import FormResetPassword from '@/components/Auth/FormResetPassword.vue'
  import { useMessage } from 'naive-ui'
  import { renderMessage } from '@/composables/auth'
  import { defaultDurationToast } from '@/constants/common'
  // const { t } = useI18n()
  const message = useMessage()
  const handleResetPassword = (isSuccess: boolean) => {
    if (isSuccess) {
      message.success('1231231', {
        render: renderMessage,
        duration: defaultDurationToast
      })

      setTimeout(() => {
        const closeButton = document.querySelectorAll('.n-base-close') as NodeListOf<HTMLElement>
        if (closeButton.length) {
          closeButton.forEach((element: HTMLElement) => {
            element.style.color = '#fff'
          })
        }
      })
    }
  }
</script>
<style lang="scss" scoped></style>
