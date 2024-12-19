<template>
  <h1 class="text-xl font-bold text-center text-black mt-[60px]">{{ $t('common.title_forgot') }}</h1>
  <div
    class="mx-a w-[725px] px-6 py-8 border-1 border-grey_light border-solid rounded-lg box-border shadow-lg mt-[60px]"
  >
    <div v-if="sendEmailSuccess">
      <p class="text-black text-base line-height-[24px] text-center">
        入力されたメールアドレスに、パスワード再設定用のリンクを送信しました。
        <br />
        メールに記載されたリンクより、パスワード再設定のお手続きをお願いいたします。
      </p>
    </div>
    <div v-else>
      <p class="text-dark_medium text-center text-base">
        パスワードを再設定するには、
        <br />
        登録しているメールアドレスを入力してください。
      </p>
      <div class="mt-8">
        <n-form novalidate label-placement="left" label-width="auto" require-mark-placement="right-hanging">
          <div class="mb-8">
            <n-form-item
              :validation-status="validationStatus('email')"
              :feedback="errors.email"
              :show-feedback="!!errors.email"
            >
              <n-input
                v-model:value="form.email"
                :input-props="{ type: 'email', name: 'email' }"
                :placeholder="$t('placeholder.enter_email')"
                class="rounded-lg h-[46px] flex items-center text-black"
                :theme-overrides="{
                  borderError: '1px solid #ED584F'
                }"
              />
            </n-form-item>
          </div>

          <div class="flex items-center gap-4">
            <CustomButton
              type="default"
              :content="$t('common.cancel')"
              size="small"
              :disabled="loading"
              @click="goBackLogin"
            />
            <CustomButton
              type="secondary"
              :content="$t('common.submit')"
              size="small"
              :loading="loading"
              @click="validateForm"
            />
          </div>
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
</template>

<script setup lang="ts">
  import { useMessage } from 'naive-ui'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, helpers } from '@vuelidate/validators'
  import { useRouter } from 'vue-router'
  import { renderMessage } from '@/composables/auth'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const router = useRouter()
  const message = useMessage()
  const sendEmailSuccess = ref(false)
  const loading = ref(false)
  const form = reactive({
    email: '',
    password: ''
  })

  const errors = reactive<{ email: string | undefined; password: string | undefined }>({
    email: undefined,
    password: undefined
  })

  const rules = computed(() => {
    return {
      email: {
        required: helpers.withMessage('入力してください', required),
        email: helpers.withMessage(t('validate.invalid_email'), email)
      }
    }
  })
  const v$ = useVuelidate(rules, form)

  const validateForm = async () => {
    const result = await v$.value.$validate() // Validate all form
    if (result) {
      // Handle call api
      loading.value = true
      setTimeout(() => {
        sendEmailSuccess.value = true
        loading.value = false
      }, 2000)
      return
    }
    message.error(t('validate.toast_reset_password'), {
      render: renderMessage,
      duration: 2000
    })
  }

  // Helper to determine Naive UI feedback style
  const validationStatus = (field: 'email') => {
    if (v$.value[field].$dirty && v$.value[field].$error) {
      errors[field] = v$.value[field].$invalid ? `${v$.value[field].$errors[0].$message}` : ''
      return 'error'
    }
    if (v$.value[field].$dirty && !v$.value[field].$error) {
      errors[field] = ''
      return 'success'
    }
    return undefined
  }

  const goBackLogin = () => {
    router.push('login')
  }
</script>
<style lang="scss" scoped>
  :deep(.n-input__input-el:-webkit-autofill) {
    -webkit-text-fill-color: black !important;
    -webkit-background-clip: text;
  }
  :deep(.n-input__input-el) {
    caret-color: black !important;
  }
  :deep(.n-form-item-feedback__line) {
    color: #ed584f;
  }
</style>
