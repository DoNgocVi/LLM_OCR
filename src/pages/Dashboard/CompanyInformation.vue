<template>
  <div class="bg-white rounded-[20px] px-6 py-[26px] text-dark_medium">
    <div>
      <div v-if="!isEdit" class="w-[220px] ml-a">
        <CustomButton type="primary" content="編集" @click="isEdit = true" />
      </div>
      <div v-else class="w-full flex justify-end">
        <div class="max-w-[464px] w-full flex gap-6">
          <CustomButton type="default" content="キャンセル" @click="handleExitForm" />
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

    <div class="mt-6">
      <div v-if="isFormInvalid" class="text-red bg-[#FEECEE] box-border py-3 px-6 mb-3 rounded-[4px]">
        <p class="">{{ $t('dashboard.job.msg_error1') }}</p>
        <p class="mt-2">{{ $t('dashboard.job.msg_error2') }}</p>
      </div>
      <div class="company-info">
        <n-form novalidate label-placement="left" label-width="auto" require-mark-placement="right-hanging">
          <div
            v-for="(field, index) in fields"
            :key="index"
            class="md:flex items-center min-h[60px] border-b-1 border-b-solid border-b-grey_light"
          >
            <div class="basis-[300px] w-full font-bold pl-2 shrink-1 mb-1 md:mb-0">{{ field.label }}</div>
            <div class="shrink-2 grow-1">
              <template v-if="field.editable && isEdit">
                <n-form-item
                  :validation-status="validationStatus(field.key)"
                  :class="{
                    'mt-3 mb-3': errors[field.key],
                    [field.width ? field.width : 'max-w-[676px]']: field?.width
                  }"
                  :feedback="errors[field.key]"
                  :show-feedback="!!errors[field.key]"
                >
                  <n-input
                    v-model:value="form[`${field.key}`]"
                    class="mb-2 md:mb-0"
                    type="text"
                    size="medium"
                    :placeholder="field.placeholder"
                    :theme-overrides="{
                      borderRadius: '8px',
                      heightMedium: '36px',
                      borderError: '1px solid #ED584F'
                    }"
                    @change="
                      (value: string) => {
                        changeCodeNumber(field.key, value)
                      }
                    "
                  />
                </n-form-item>
              </template>
              <template v-else>
                {{ form[`${field.key}`] }}
              </template>
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
  import { required, email, helpers, maxLength, requiredIf } from '@vuelidate/validators'
  import isEqual from 'lodash/isEqual'
  import { formatPhoneNumber } from '@/composables/common'
  import type { FormCompanyType } from '@/types/dashboard'
  import { useUserManagementStore } from '@/stores/userManagement'
  import { storeToRefs } from 'pinia'
  import mockData from '../../mocks/dataCompany.json'
  import { cloneDeep } from 'lodash'

  const userManagementStore = useUserManagementStore()
  const { t } = useI18n()
  const message = useMessage()
  const isEdit = ref<boolean>(false)
  const loading = ref<boolean>(false)
  const valueSelect = ref<string>('1month') // get value from api
  const currentValueSelect = ref<string>('1month')
  const isFormInvalid = ref<boolean>(false)
  const isFormChanged = ref<boolean>(false)
  const initialFormState = ref({})
  const { form } = storeToRefs(userManagementStore)
  const { setFormData } = userManagementStore
  const fields = ref<
    {
      label: string
      editable: boolean
      error?: string
      key: keyof FormCompanyType
      placeholder?: string
      width?: string
    }[]
  >([
    { label: '企業名', key: 'company', editable: true, error: '', placeholder: '企業名を入力' },
    { label: '企業ID', key: 'id', editable: false },
    { label: 'ご契約中のプラン', key: 'planSubscribed', editable: false },
    {
      label: '郵便番号',
      key: 'postCode',
      editable: true,
      error: '',
      placeholder: '郵便番号を入力',
      width: 'max-w-[180px]'
    },
    { label: '住所', key: 'address', editable: true, error: '', placeholder: '住所を入力' },
    {
      label: '電話番号',
      key: 'phoneNumber',
      editable: true,
      error: '',
      placeholder: t('placeholder.enter_phone'),
      width: 'max-w-[350px]'
    },
    {
      label: 'ご連絡先メールアドレス',
      key: 'emailAddress',
      editable: true,
      error: '',
      placeholder: 'メールアドレスを入力'
    },
    { label: 'ご連絡先担当者名', key: 'personName', editable: true, error: '', placeholder: '担当者名を入力' }
  ])

  const errors = reactive<Partial<Record<keyof FormCompanyType, string | undefined>>>({
    company: undefined,
    postCode: undefined,
    address: undefined,
    phoneNumber: undefined,
    emailAddress: undefined,
    personName: undefined
  })

  const noWhitespaceOnly = helpers.withMessage(
    t('validate.invalid_format'),
    (value: string) => !!value && value.trim().length > 0
  )

  const rules = computed(() => {
    return {
      company: {
        required: helpers.withMessage(
          t('validate.require'),
          requiredIf(() => form.value.company.length === 0)
        ),
        noWhitespaceOnly,
        maxLength: helpers.withMessage(t('validate.max_length_255'), maxLength(255))
      },
      postCode: {
        required: helpers.withMessage(t('validate.require'), required),
        validPhoneNumber: helpers.withMessage(t('validate.invalid_format'), (value: string) =>
          /^\+?([0-9]{3})\)?[-. ]?([0-9]{4})$/.test(value)
        )
      },
      address: {
        required: helpers.withMessage(
          t('validate.require'),
          requiredIf(() => form.value.address.length === 0)
        ),
        noWhitespaceOnly,
        maxLength: helpers.withMessage(t('validate.max_length_255'), maxLength(255))
      },
      phoneNumber: {
        required: helpers.withMessage(t('validate.require'), required),
        validPhoneNumber: helpers.withMessage(t('validate.invalid_format'), (value: string) =>
          /^\+?([0-9]{2,3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value)
        )
      },
      emailAddress: {
        required: helpers.withMessage(t('validate.require'), required),
        email: helpers.withMessage(t('validate.invalid_format'), email)
      },
      personName: {
        required: helpers.withMessage(
          t('validate.require'),
          requiredIf(() => form.value.personName.length === 0)
        ),
        noWhitespaceOnly,
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
        initialFormState.value = cloneDeep(form.value)
      }, 1000)
    }
  }

  const handleExitForm = () => {
    isEdit.value = false
    isFormInvalid.value = false
    // @ts-ignore
    form.value = cloneDeep(initialFormState.value)
  }

  const validationStatus = (field: keyof FormCompanyType) => {
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

  const changeCodeNumber = (key: keyof FormCompanyType, value: string) => {
    const allowedKeys = ['phoneNumber', 'postCode']
    if (!allowedKeys.includes(key)) return
    const result = formatPhoneNumber(value, key === 'postCode')
    if (result) {
      form.value[key] = result
    } else if (form.value[key].trim().length) {
      v$.value[key].$touch()
    }
  }

  watch(
    () => form,
    (newForm) => {
      isFormChanged.value = !isEqual(newForm.value, initialFormState.value)
    },
    { deep: true }
  )
  onMounted(() => {
    //TODO: api get information company with axios
    const data = mockData
    setFormData(data)
    initialFormState.value = cloneDeep(form.value)
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
