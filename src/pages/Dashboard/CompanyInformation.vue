<template>
  <div class="bg-white rounded-[20px] px-6 py-[26px] text-dark_medium">
    <div>
      <div v-if="!isEdit" class="w-[220px] ml-a">
        <CustomButton type="primary" content="編集" @click="isEdit = true" />
      </div>
      <div v-else class="w-full flex justify-end">
        <div class="max-w-[464px] w-full flex gap-6">
          <CustomButton type="default" content="キャンセル" @click="isEdit = false" />
          <CustomButton
            type="secondary"
            content="保存"
            :loading="loading"
            :disabled="!isFormChanged"
            @click="handelSubmit"
          />
        </div>
      </div>
    </div>
    <div v-if="isFormInvalid" class="text-red bg-[#FEECEE] box-border py-3 px-6 mb-3 rounded-[4px] mt-3">
      <p class="">{{ $t('dashboard.job.msg_error1') }}</p>
      <p class="mt-2">{{ $t('dashboard.job.msg_error2') }}</p>
    </div>
    <div>
      <div class="company-info">
        <n-form novalidate label-placement="left" label-width="auto" require-mark-placement="right-hanging">
          <div
            v-for="(field, index) in fields"
            :key="index"
            class="flex items-center min-h[60px] border-b-1 border-b-solid border-b-grey_light"
          >
            <div class="max-w-[300px] w-full font-bold pl-2">{{ field.label }}</div>
            <div class="flex-1">
              <template v-if="field.editable && isEdit">
                <n-form-item
                  :validation-status="validationStatus(field.key)"
                  :class="{
                    'mt-3': errors[field.key],
                    'mb-3': errors[field.key]
                  }"
                  :feedback="errors[field.key]"
                  :show-feedback="!!errors[field.key]"
                >
                  <n-input
                    v-model:value="form[`${field.key}`]"
                    type="text"
                    size="medium"
                    :placeholder="field.placeholder"
                    :theme-overrides="{
                      borderRadius: '8px',
                      heightMedium: '36px',
                      borderError: '1px solid #ED584F'
                    }"
                  />
                </n-form-item>
              </template>
              <template v-else>
                {{ form[`${field.key}`] }}
              </template>
              <!-- <template v-else>
                <p class="text-grey_light empty"></p>
              </template> -->
            </div>
          </div>
        </n-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { renderMessage } from '@/composables/auth'
  import { defaultDurationToast } from '@/constants/common'
  import { useMessage } from 'naive-ui'
  import { useI18n } from 'vue-i18n'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, helpers, maxLength } from '@vuelidate/validators'
  import isEqual from 'lodash/isEqual'

  type FormType = {
    company: string
    id: string
    planSubscribed: string
    postCode: string
    address: string
    phoneNumber: string
    emailAddress: string
    personName: string
  }

  const { t } = useI18n()
  const message = useMessage()
  const isEdit = ref<boolean>(false)
  const loading = ref<boolean>(false)
  const valueSelect = ref<string>('7day') // get value from api
  const currentValueSelect = ref<string>('7day')
  const isFormInvalid = ref<boolean>(false)
  const isFormChanged = ref<boolean>(false)
  const initialFormState = ref({})

  const fields = ref<
    {
      label: string
      editable: boolean
      error?: string
      key: keyof FormType
      placeholder?: string
    }[]
  >([
    { label: '企業名', key: 'company', editable: true, error: '', placeholder: '企業名を入力' },
    { label: '企業ID', key: 'id', editable: false },
    { label: 'ご契約中のプラン', key: 'planSubscribed', editable: false },
    { label: '郵便番号', key: 'postCode', editable: true, error: '', placeholder: '郵便番号を入力' },
    { label: '住所', key: 'address', editable: true, error: '', placeholder: '住所を入力' },
    { label: '電話番号', key: 'phoneNumber', editable: true, error: '', placeholder: t('placeholder.enter_phone') },
    {
      label: 'ご連絡先メールアドレス',
      key: 'emailAddress',
      editable: true,
      error: '',
      placeholder: 'メールアドレスを入力'
    },
    { label: 'ご連絡先担当者名', key: 'personName', editable: true, error: '', placeholder: '担当者名を入力' }
  ])
  const form = reactive<FormType>({
    company: '',
    id: 'xxxxxxxxxxxx',
    planSubscribed: 'Basic',
    postCode: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    personName: ''
  })
  const errors = reactive<Partial<Record<keyof FormType, string | undefined>>>({
    company: undefined,
    postCode: undefined,
    address: undefined,
    phoneNumber: undefined,
    emailAddress: undefined,
    personName: undefined
  })

  const noWhitespaceOnly = helpers.withMessage(
    t('validate.only_white_space'),
    (value: string) => !!value && value.trim().length > 0
  )

  const rules = computed(() => {
    return {
      company: {
        noWhitespaceOnly,
        required: helpers.withMessage(t('validate.require'), required),
        maxLength: helpers.withMessage(t('validate.max_length_255'), maxLength(255))
      },
      postCode: {
        noWhitespaceOnly,
        required: helpers.withMessage(t('validate.require'), required),
        maxLength: helpers.withMessage(t('validate.max_length_255'), maxLength(255))
      },
      address: {
        noWhitespaceOnly,
        required: helpers.withMessage(t('validate.require'), required),
        maxLength: helpers.withMessage(t('validate.max_length_255'), maxLength(255))
      },
      phoneNumber: {
        required: helpers.withMessage(t('validate.require'), required),
        validPhoneNumber: helpers.withMessage(t('validate.phone_number'), (value: string) =>
          /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value)
        )
      },
      emailAddress: {
        required: helpers.withMessage(t('validate.require'), required),
        email: helpers.withMessage(t('validate.invalid_email'), email)
      },
      personName: {
        noWhitespaceOnly,
        required: helpers.withMessage(t('validate.require'), required),
        maxLength: helpers.withMessage(t('validate.max_length_255'), maxLength(255))
      }
    }
  })

  const v$ = useVuelidate(rules, form)

  const handelSubmit = async () => {
    const result = await v$.value.$validate() // Validate all form
    isFormInvalid.value = !result
    if (result) {
      loading.value = true
      setTimeout(() => {
        message.success(t('dashboard.setting.msg_success'), {
          render: renderMessage,
          duration: defaultDurationToast
        })
        currentValueSelect.value = valueSelect.value
        isEdit.value = false
        loading.value = false
      }, 1000)
    }
  }
  const validationStatus = (field: keyof FormType) => {
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

  watch(
    () => form,
    (newForm) => {
      isFormChanged.value = !isEqual(newForm, initialFormState.value)
    },
    { deep: true }
  )
  onMounted(() => {
    //TODO: api get information company with axios
    // Move into function get initial information
    initialFormState.value = { ...form }
  })
  onUnmounted(() => {
    isEdit.value = false
  })
</script>
<style lang="scss" scoped>
  .no-click {
    pointer-events: none;
  }
  :deep(.n-form-item-feedback__line) {
    color: #ed584f;
  }
  .empty::before {
    content: 'Empty data';
  }
</style>
