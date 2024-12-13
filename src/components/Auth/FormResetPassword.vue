<template>
  <div class="flex flex-col gap-4">
    <n-form-item
      :validation-status="validationStatus('password')"
      :feedback="errors.password"
      :show-feedback="!!errors.password"
    >
      <n-input
        v-model:value="form.password"
        type="password"
        placeholder="パスワード"
        show-password-on="click"
        class="rounded-lg h-[44px] flex items-center"
        :theme-overrides="{
          borderError: '1px solid #ED584F'
        }"
      >
        <template #password-visible-icon>
          <n-icon :size="20" :component="Eye" />
        </template>
        <template #password-invisible-icon>
          <n-icon :size="20" :component="EyeOff" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item
      :validation-status="validationStatus('confirmPassword')"
      :feedback="errors.confirmPassword"
      :show-feedback="!!errors.confirmPassword"
    >
      <n-input
        v-model:value="form.confirmPassword"
        type="password"
        placeholder="パスワードを入力（確認のため、同じパスワードを入力）"
        show-password-on="click"
        class="rounded-lg h-[44px] flex items-center"
        :theme-overrides="{
          borderError: '1px solid #ED584F'
        }"
      >
        <template #password-visible-icon>
          <n-icon :size="20" :component="Eye" />
        </template>
        <template #password-invisible-icon>
          <n-icon :size="20" :component="EyeOff" />
        </template>
      </n-input>
    </n-form-item>
  </div>
  <div class="flex items-center mt-8" :class="$attrs.class">
    <CustomButton
      type="secondary"
      :content="$t('common.setting')"
      :loading="loading"
      size="small"
      @click="validateForm"
    />
  </div>
</template>
<script setup lang="ts">
  import { useMessage } from 'naive-ui'
  import { useVuelidate } from '@vuelidate/core'
  import { required, helpers, sameAs } from '@vuelidate/validators'
  import { renderMessage } from '@/composables/auth'
  import { useI18n } from 'vue-i18n'
  import { defaultDurationToast } from '@/constants/common'
  import Eye from '@/assets/images/icons/Eye.vue'
  import EyeOff from '@/assets/images/icons/EyeOff.vue'

  const props = defineProps({
    msgToastError: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['onResetPassword'])
  const { t } = useI18n()
  const isSuccess = ref(false)
  const message = useMessage()
  const form = reactive({
    password: '',
    confirmPassword: ''
  })
  const loading = ref<boolean>(false)

  const errors = reactive<{ password: string | undefined; confirmPassword: string | undefined }>({
    password: undefined,
    confirmPassword: undefined
  })

  const rules = computed(() => {
    return {
      password: {
        required: helpers.withMessage(t('validate.new_password_require'), required),
        strongPassword: helpers.withMessage(t('validate.strong_password'), (value: string) =>
          /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value)
        )
      },
      confirmPassword: {
        required: helpers.withMessage(t('validate.password_confirm_require'), required),
        sameAs: helpers.withMessage(t('validate.same_password'), sameAs(form.password))
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
        loading.value = false
        isSuccess.value = true
        emit('onResetPassword', true)
      }, 1500)
      return
    }
    if (!!props.msgToastError) {
      message.error(props.msgToastError, {
        render: renderMessage,
        duration: defaultDurationToast
      })
    }
    setTimeout(() => {
      const closeButton = document.querySelectorAll('.n-base-close') as NodeListOf<HTMLElement>
      if (closeButton.length) {
        closeButton.forEach((element: HTMLElement) => {
          element.style.color = '#fff'
        })
      }
    })
  }

  // Helper to determine Naive UI feedback style
  const validationStatus = (field: 'password' | 'confirmPassword') => {
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

<style scoped lang="scss">
  :deep(.n-input__input-el) {
    caret-color: black !important;
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
