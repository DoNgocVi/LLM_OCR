<template>
  <div
    class="mx-a w-[375px] px-[25px] border-1 border-grey_dark border-solid rounded-lg box-border mt-[30px] shadow-lg"
  >
    <h1 class="m-1 text-xl font-bold mt-5 text-center text-dark_medium">{{ $t('common.login') }}</h1>
    <div class="mt-5">
      <n-form label-placement="left" label-width="auto" require-mark-placement="right-hanging">
        <div class="mb-4">
          <n-form-item
            :validation-status="validationStatus('email')"
            :feedback="errors.email"
            :show-feedback="!!errors.email"
          >
            <n-input
              v-model:value="form.email"
              type="text"
              :placeholder="$t('placeholder.enter_email')"
              class="rounded-lg h-[44px] flex items-center"
            />
          </n-form-item>
        </div>
        <div class="mb-4">
          <n-form-item
            :validation-status="validationStatus('password')"
            :feedback="errors.password"
            :show-feedback="!!errors.password"
            :maxlength="8"
          >
            <n-input
              v-model:value="form.password"
              type="password"
              placeholder="パスワード"
              show-password-on="click"
              class="rounded-lg h-[44px] flex items-center"
            >
              <template #password-visible-icon>
                <n-icon :size="20" :component="EyeOutline" />
              </template>
              <template #password-invisible-icon>
                <n-icon :size="20" :component="EyeOffOutline" />
              </template>
            </n-input>
          </n-form-item>
        </div>
        <div class="w-full">
          <n-button class="w-full rounded-lg h-[44px] color-white" color="#4F4F4F" @click="validateForm">
            {{ $t('common.login') }}
          </n-button>
        </div>
        <div class="text-center mt-4 mb-10">
          <a href="">
            <span class="underline text-center font-normal text-xs">{{ $t('common.forgot_password') }}</span>
          </a>
        </div>
      </n-form>
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
  import type { MessageRenderMessage } from 'naive-ui'
  import { NAlert, useMessage } from 'naive-ui'
  import { useVuelidate } from '@vuelidate/core'
  import { minLength, required, email, helpers } from '@vuelidate/validators'
  import { EyeOutline, EyeOffOutline } from '@vicons/ionicons5'

  const message = useMessage()
  // const formRef = ref<FormInst | null>(null)
  const form = reactive({
    email: '',
    password: ''
  })

  const errors = reactive<{ email: string | undefined; password: string | undefined }>({
    email: undefined,
    password: undefined
  })

  const renderMessage: MessageRenderMessage = (props) => {
    const { type } = props
    return h(
      NAlert,
      {
        closable: true,
        onClose: props.onClose,
        type: type === 'loading' ? 'default' : type,
        showIcon: false,
        style: {
          boxShadow: 'var(--n-box-shadow)',
          maxWidth: 'calc(100vw - 32px)',
          minWidth: '600px',
          width: '480px',
          textAlign: 'center',
          backgroundColor: '#ED584F'
        }
      },
      {
        default: () =>
          h(
            'div',
            {
              class: 'text-white'
            },
            {
              default: () => props.content
            }
          )
      }
    )
  }

  const rules = computed(() => {
    return {
      email: {
        required: helpers.withMessage('Email là bắt buộc', required),
        email: helpers.withMessage('Email không hợp lệ', email)
      },
      password: {
        required: helpers.withMessage('Pasword là bắt buộc', required),
        minLength: helpers.withMessage(
          ({ $pending, $invalid, $params, $model }) =>
            `This field has a value of '${$model}' but must have a min length of ${$params.min} so it is ${$invalid ? 'invalid' : 'valid'}`,
          minLength(6)
        ),
        strongPassword: helpers.withMessage(
          'Password phải chứa ít nhất một chữ cái, một số và một ký tự đặc biệt',
          (value: string) =>
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(value)
        )
      }
    }
  })

  const v$ = useVuelidate(rules, form)

  const validateForm = async () => {
    const result = await v$.value.$validate() // Validate all form
    if (result) {
      // Handle call api
      return
    }
    message.error('入力に誤りがあります。もう一度入力してください', {
      render: renderMessage,
      duration: 2000
    })
    setTimeout(() => {
      const closeButton = document.querySelectorAll('.n-base-close') as NodeListOf<HTMLElement>
      if (closeButton.length) {
        closeButton.forEach((element: HTMLElement) => {
          element.style.color = '#fff'
        })
      }
    }, 0)
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

  // const handelChangeLanguage = (value: string) => {
  //   locale.value = value
  //   localStorage.setItem('language', value)
  //   // console.log(value)
  // }
</script>
<style lang="scss"></style>
