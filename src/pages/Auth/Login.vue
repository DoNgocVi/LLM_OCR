<template>
  <div class="mx-a min-w-[350px]">
    <h1 class="m-1 text-2xl font-bold mt-5 text-center">{{ $t('common.login') }}</h1>
    <div class="mt-4 -ml-20">
      <n-form label-placement="left" label-width="auto" require-mark-placement="right-hanging">
        <div class="mb-4">
          <n-form-item
            :label="$t('common.email')"
            :validation-status="validationStatus('email')"
            :feedback="errors.email"
          >
            <n-input v-model:value="form.email" placeholder="Enter your email" type="text" />
          </n-form-item>
        </div>
        <div class="mb-4">
          <n-form-item
            :label="$t('common.password')"
            :validation-status="validationStatus('password')"
            :feedback="errors.password"
          >
            <n-input v-model:value="form.password" type="password" placeholder="Enter your password" />
          </n-form-item>
        </div>
        <div class="text-center">
          <a href="">
            <span class="underline text-center font-normal text-xs">{{ $t('common.forgot_password') }}</span>
          </a>
        </div>
        <div class="text-center mt-2">
          <span class="mr-1">{{ $t('common.create_account1') }}</span>
          <RouterLink to="/auth/register">
            <span class="underline text-center font-normal text-xs">{{ $t('common.create_account2') }}</span>
          </RouterLink>
        </div>
        <div class="flex justify-center mt-4">
          <n-button round type="success" @click="validateForm">{{ $t('common.login') }}</n-button>
        </div>
      </n-form>
      <div class="flex items-center gap-2 justify-center mt-8">
        <p>Language</p>
        <n-space class="min-w-[150px]" vertical>
          <n-select v-model:value="value" :options="optionsLanguage" @change="handelChangeLanguage" />
        </n-space>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
  import type { FormInst, FormItemRule } from 'naive-ui'
  import { useMessage } from 'naive-ui'
  import { useVuelidate } from '@vuelidate/core'
  import { minLength, required, email } from '@vuelidate/validators'
  import { useI18n } from 'vue-i18n'
  import { optionsLanguage } from '@constants/common'
  import { RouterLink } from 'vue-router'

  const { locale } = useI18n()
  const message = useMessage()
  // const formRef = ref<FormInst | null>(null)
  const value = ref(locale.value)
  const form = reactive({
    email: '',
    password: ''
  })

  const errors = reactive({
    email: '',
    password: ''
  })

  const rules = computed(() => {
    return {
      email: {
        required, // Email is required
        email // Must be a valid email address
      },
      password: {
        required, // Password is required
        minLength: minLength(8) // Password must have at least 8 characters
      }
    }
  })

  const v$ = useVuelidate(rules, form)

  const validateForm = async () => {
    const result = await v$.value.$validate() // Validate toàn bộ form
    if (result) {
      // Handle call api
    }
  }
  // Helper to determine Naive UI feedback style
  const validationStatus = (field: 'email' | 'password') => {
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

  const handelChangeLanguage = (value: string) => {
    locale.value = value
    localStorage.setItem('language', value)
    // console.log(value)
  }
</script>
