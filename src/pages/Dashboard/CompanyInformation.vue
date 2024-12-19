<template>
  <div class="bg-white rounded-[20px] px-6 py-[26px] text-dark_medium">
    <div v-if="!isEdit" class="w-[220px] ml-a">
      <CustomButton type="primary" content="編集" @click="isEdit = true" />
    </div>
    <div v-else class="w-full flex justify-end">
      <div class="max-w-[464px] w-full flex gap-6">
        <CustomButton type="default" content="キャンセル" @click="isEdit = false" />
        <CustomButton type="secondary" content="保存" :loading="loading" @click="handelSubmit" />
      </div>
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
                    placeholder="Basic Input"
                    :theme-overrides="{
                      borderRadius: '8px',
                      heightMedium: '36px',
                      borderError: '1px solid #ED584F'
                    }"
                  />
                </n-form-item>
              </template>
              <template v-else>
                {{ form[`${field.key}`].length ? form[`${field.key}`] : 'No data' }}
              </template>
            </div>
          </div>
        </n-form>
        <!-- <button @click="toggleEdit">{{ isEdit ? 'Lưu' : 'Chỉnh sửa' }}</button> -->
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
  import { required, email, helpers } from '@vuelidate/validators'

  const { t } = useI18n()
  const message = useMessage()
  const isEdit = ref(false)
  const loading = ref(false)
  const valueSelect = ref<string>('7day') // get value from api
  const currentValueSelect = ref<string>('7day')
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
  const fields = ref<
    {
      label: string
      editable: boolean
      error?: string
      key: keyof FormType
    }[]
  >([
    { label: '企業名', key: 'company', editable: true, error: '' },
    { label: '企業ID', key: 'id', editable: false },
    { label: 'ご契約中のプラン', key: 'planSubscribed', editable: false },
    { label: '郵便番号', key: 'postCode', editable: true, error: '' },
    { label: '住所', key: 'address', editable: true, error: '' },
    { label: '電話番号', key: 'phoneNumber', editable: true, error: '' },
    { label: 'ご連絡先メールアドレス', key: 'emailAddress', editable: true, error: '' },
    { label: 'ご連絡先担当者名', key: 'personName', editable: true, error: '' }
  ])
  const form = reactive<FormType>({
    company: '',
    id: '',
    planSubscribed: '',
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

  const rules = computed(() => {
    return {
      company: {
        required: helpers.withMessage(t('validate.require'), required)
      },
      postCode: {
        required: helpers.withMessage(t('validate.require'), required)
      },
      address: {
        required: helpers.withMessage(t('validate.require'), required)
      },
      phoneNumber: {
        required: helpers.withMessage(t('validate.require'), required)
      },
      emailAddress: {
        required: helpers.withMessage(t('validate.require'), required),
        email: helpers.withMessage(t('validate.invalid_email'), email)
      },
      personName: {
        required: helpers.withMessage(t('validate.require'), required)
      }
    }
  })

  const v$ = useVuelidate(rules, form)

  const handelSubmit = async () => {
    const result = await v$.value.$validate() // Validate all form
    if (result) {
      console.log(form)
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
</style>
