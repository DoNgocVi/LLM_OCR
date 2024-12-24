<template>
  <div class="login-wrapper mt-[60px]">
    <div v-if="!isIncorrectAccount" class="text-red bg-[#FEECEE] box-border py-3 px-6 mb-[24px] rounded-[4px]">
      <p class="text-center">メールアドレスまたはパスワードが間違っています。</p>
      <p class="mt-2">
        入力されたメールアドレスが分からない、または現在使用できない場合は、管理者にお問い合わせください。
        <br />
        パスワードをお忘れの方は、「パスワードをお忘れの方」よりパスワードの再設定を行なってください。
      </p>
    </div>
    <div class="mx-a w-[350px] px-6 py-8 border-1 border-grey_light border-solid rounded-lg box-border shadow-lg">
      <h1 class="text-xl line-height-[30px] font-bold text-center text-black">{{ $t('common.login') }}</h1>
      <div class="mt-8">
        <n-form novalidate label-placement="left" label-width="auto" require-mark-placement="right-hanging">
          <div class="flex flex-col gap-4">
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
            <n-form-item
              :validation-status="validationStatus('password')"
              :feedback="errors.password"
              :show-feedback="!!errors.password"
              :maxlength="8"
            >
              <n-input
                v-model:value="form.password"
                type="password"
                :placeholder="$t('placeholder.enter_password')"
                show-password-on="click"
                class="rounded-lg h-[46px] flex items-center"
                :theme-overrides="{
                  borderError: '1px solid #ED584F'
                }"
              >
                <template #password-visible-icon>
                  <n-icon :size="24" :component="Eye" />
                </template>
                <template #password-invisible-icon>
                  <n-icon :size="24" :component="EyeOff" />
                </template>
              </n-input>
            </n-form-item>
          </div>
          <div class="w-full mt-8">
            <CustomButton
              type="secondary"
              :content="$t('common.login')"
              :loading="loading"
              size="small"
              @click="validateForm"
            />
          </div>
          <div class="text-center mt-8">
            <RouterLink to="forgot-password">
              <span class="text-center font-normal text-sm color-primary hover:color-dark_blue transition-all">
                {{ $t('common.forgot_password') }}
              </span>
            </RouterLink>
          </div>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMessage } from 'naive-ui'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, helpers } from '@vuelidate/validators'
  import { RouterLink, useRouter } from 'vue-router'
  import { renderMessage } from '@/composables/auth'
  import { useI18n } from 'vue-i18n'
  import { defaultDurationToast } from '@/constants/common'
  import Eye from '@/assets/images/icons/Eye.vue'
  import EyeOff from '@/assets/images/icons/EyeOff.vue'

  const { t } = useI18n()
  const router = useRouter()
  const message = useMessage()
  const loading = ref<boolean>(false)
  const isIncorrectAccount = ref<boolean>(true)

  type formType = {
    email: string
    password: string
  }

  const form = reactive<formType>({
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
        required: helpers.withMessage(t('validate.require'), required),
        email: helpers.withMessage(t('validate.invalid_email'), email)
      },
      password: {
        required: helpers.withMessage(t('validate.require'), required)
      }
    }
  })

  const v$ = useVuelidate(rules, form)

  const toastErrorMessage = () => {
    message.error(t('validate.toast_reset_password'), {
      render: renderMessage,
      duration: defaultDurationToast
    })
  }

  const validateForm = async () => {
    const result = await v$.value.$validate() // Validate all form
    if (result) {
      try {
        // Handle call api
        const draftToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiJuaHMzMTA4IiwiZXhwIjoxNTU4MDYzODM3fQ449KVmOFWcpOUjnYGm'
        loading.value = true
        setTimeout(() => {
          // Todo: handle invalid account
          // isIncorrectAccount.value = false
          loading.value = false
          localStorage.setItem('token', draftToken)
          router.push('/dashboard/job-result')
          // toastErrorMessage()
        }, defaultDurationToast)
      } catch (error) {
        console.log(error)
      }

      return
    }
    toastErrorMessage()
  }

  // Helper to determine Naive UI feedback style
  const validationStatus = (field: keyof formType) => {
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
</script>
<style lang="scss" scoped>
  :deep(.n-input__input-el:-webkit-autofill) {
    -webkit-text-fill-color: black !important;
    -webkit-background-clip: text;
  }
  :deep(.n-form-item-feedback__line) {
    color: #ed584f;
  }
  :deep(.n-input__eye) {
    color: #858d9d !important;
  }
  :deep(.n-input__eye:hover) {
    color: #6b7995 !important;
  }
</style>
