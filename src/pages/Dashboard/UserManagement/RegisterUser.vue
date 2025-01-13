<template>
  <div>
    <p class="text-base">
      {{
        isEditUser ? $t('dashboard.user_management.title_edit_user') : $t('dashboard.user_management.title_register')
      }}
    </p>
    <div class="w-full flex justify-end mt-6">
      <div class="max-w-[464px] w-full flex gap-6">
        <CustomButton type="default" content="キャンセル" @click="backToList" />
        <CustomButton
          type="secondary"
          :content="isEditUser ? '保存' : '登録'"
          :loading="loading"
          @click="validateForm"
        />
      </div>
    </div>
    <div class="mt-6">
      <n-form
        novalidate
        label-placement="left"
        label-width="210px"
        label-align="left"
        require-mark-placement="right-hanging"
      >
        <div class="flex flex-col gap-6">
          <n-form-item
            label="名前"
            :validation-status="validationStatus('name')"
            :feedback="errors.name"
            :show-feedback="!!errors.name"
            :theme-overrides="{
              feedbackTextColorError: '#ED584F',
              labelFontWeight: '700'
            }"
          >
            <n-input
              v-model:value="form.name"
              :placeholder="$t('placeholder.enter_name')"
              class="rounded-lg h-[36px] flex items-center text-black max-w-[680px] w-full"
              :theme-overrides="{
                borderRadius: '8px',
                heightMedium: '36px',
                borderError: '1px solid #ED584F'
              }"
            />
          </n-form-item>
          <n-form-item
            label="メールアドレス"
            :validation-status="validationStatus('email')"
            :feedback="errors.email"
            :show-feedback="!!errors.email"
            :theme-overrides="{
              feedbackTextColorError: '#ED584F',
              labelFontWeight: '700'
            }"
          >
            <n-input
              v-model:value="form.email"
              placeholder="例：abc@sample.com"
              class="rounded-lg h-[36px] flex items-center text-black max-w-[680px] w-full"
              :theme-overrides="{
                borderRadius: '8px',
                heightMedium: '36px',
                borderError: '1px solid #ED584F'
              }"
            />
          </n-form-item>
          <n-form-item :show-feedback="false">
            <template #label>
              <div class="flex items-center gap-2">
                <p class="text-black font-bold">権限</p>
                <n-tooltip
                  class="-ml-5"
                  placement="bottom-start"
                  trigger="hover"
                  arrow-class="pos-relative top-[6px] !left-[26px]"
                  :theme-overrides="{
                    color: '#5B5B5B',
                    borderRadius: '8px'
                  }"
                >
                  <template #trigger>
                    <n-icon class="cursor-pointer" color="#858D9D" :size="18" :component="InformationCircleOutline" />
                  </template>
                  <p>ユーザーは「機能」のみの使用、</p>
                  <p>管理者は「機能」「設定」の全てを使用できます</p>
                </n-tooltip>
              </div>
            </template>
            <CustomSelect v-model:value="form.role" class="max-w-[180px] w-full" :options="roleOption" />
          </n-form-item>
          <template v-if="isEditUser">
            <n-form-item
              label="パスワード"
              :validation-status="validationStatus('password')"
              :feedback="errors.password"
              :show-feedback="false"
              :theme-overrides="{
                labelFontWeight: '700'
              }"
            >
              <CustomButton
                size="xs"
                class="max-w-[160px]"
                type="primary"
                :content="$t('dashboard.user_management.btn_reset_password')"
                @click="
                  () => {
                    isModalVisible = true
                  }
                "
              />
            </n-form-item>
          </template>
          <template v-else>
            <n-form-item
              label="パスワード"
              :validation-status="validationStatus('password')"
              :feedback="errors.password"
              :show-feedback="false"
              :theme-overrides="{
                labelFontWeight: '700'
              }"
            >
              <div class="pos-relative">
                <n-form-item
                  v-if="form.password.length === 0"
                  :validation-status="validationStatus('password')"
                  :feedback="$t('dashboard.user_management.required_set_password')"
                  :show-feedback="!!errors.password"
                  :theme-overrides="{
                    feedbackTextColorError: '#ED584F'
                  }"
                >
                  <p class="mr-3 font-bold text-sm w-[246px] text-black">
                    {{ $t('dashboard.user_management.title_set_new_password') }}
                  </p>
                </n-form-item>
                <div v-else key="password" class="w-[246px] mr-3">
                  <div v-if="showPassword" class="flex gap-4">
                    <div class="min-w-[125px] text-black">{{ form.password }}</div>
                    <n-icon
                      class="text-gray_light cursor-pointer"
                      :size="24"
                      :component="Eye"
                      @click="
                        () => {
                          showPassword = false
                        }
                      "
                    />
                  </div>
                  <div v-else class="flex items-center gap-4">
                    <div class="-mt-1 min-w-[125px]">
                      <span v-for="i in 6" :key="i" class="text-grey_dark px-[2px] text-lg">●</span>
                    </div>
                    <n-icon
                      class="text-gray_light cursor-pointer"
                      :size="24"
                      :component="EyeOff"
                      @click="
                        () => {
                          showPassword = true
                        }
                      "
                    />
                  </div>
                  <div class="mt-2">
                    <n-tooltip
                      placement="bottom-start"
                      trigger="click"
                      arrow-class="pos-relative top-[6px] !left-[26px]"
                      :theme-overrides="{
                        color: '#5B5B5B',
                        borderRadius: '8px'
                      }"
                    >
                      <template #trigger>
                        <p class="text-primary cursor-pointer inline-block mr-6" @click="copyPassword">
                          {{ $t('dashboard.user_management.copy_password') }}
                        </p>
                      </template>
                      <span>{{ $t('dashboard.user_management.msg_tooltip') }}</span>
                    </n-tooltip>
                  </div>
                </div>
              </div>
              <CustomButton
                size="xs"
                class="max-w-[160px]"
                type="primary"
                :content="$t('dashboard.user_management.btn_set_new_password')"
                @click="
                  () => {
                    isModalVisible = true
                  }
                "
              />
            </n-form-item>
          </template>
        </div>
      </n-form>
    </div>
  </div>
  <ModalSetPassword
    v-model:show="isModalVisible"
    v-model:password="form.password"
    :error="errors.password"
    :user-id="form.id"
    @onRegisterPassword="handleRegisterPassword"
  />
</template>
<script lang="ts" setup>
  import type { FormRegisterUserType } from '@/types/dashboard'
  import ModalSetPassword from './ModalSetPassword.vue'
  import useVuelidate from '@vuelidate/core'
  import { roleOption } from '@/constants/dashboard'
  import { useRouter, useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { ref, reactive, onMounted } from 'vue'
  import { email, helpers, requiredIf } from '@vuelidate/validators'
  import { InformationCircleOutline } from '@vicons/ionicons5'
  import { useUserManagementStore } from '@/stores/userManagement'
  import { useCommonStore } from '@/stores/commonStore'
  import { useMessage } from 'naive-ui'
  import { DEFAULT_DURATION_TOAST } from '@/constants/common'
  import { renderMessage } from '@/composables/auth'
  import Eye from '@/assets/images/icons/Eye.vue'
  import EyeOff from '@/assets/images/icons/EyeOff.vue'
  import { storeToRefs } from 'pinia'
  import { cloneDeep } from 'lodash'
  const message = useMessage()
  const userManagementStore = useUserManagementStore()
  const { t } = useI18n()
  const router = useRouter()
  const route = useRoute()
  const { listUser } = storeToRefs(userManagementStore)
  const loading = ref<boolean>(false)
  const isModalVisible = ref<boolean>(false)
  const isEditUser = ref<boolean>(false)
  const showPassword = ref<boolean>(false)

  const commonStore = useCommonStore()
  const { dashboardTitle } = storeToRefs(commonStore)

  const form = reactive<FormRegisterUserType>({
    id: '',
    name: '',
    email: '',
    role: 'admin',
    password: ''
  })

  let initFormEdit = reactive<FormRegisterUserType>(cloneDeep(form))

  const errors = reactive<Omit<FormRegisterUserType, 'id'>>({
    name: '',
    email: '',
    role: '',
    password: ''
  })

  const initializeForm = () => {
    form.id = (route.query.id as string) || ''
    form.name = (route.query.name as string) || ''
    form.email = (route.query.email as string) || ''
    form.role = (route.query.role as string) || 'admin'
    form.password = 'u!xH&j2t2LQX'
  }

  const noWhitespaceOnly = helpers.withMessage(
    t('validate.invalid_format'),
    (value: string) => !!value && value.trim().length > 0
  )

  const rules = computed(() => {
    return {
      name: {
        required: helpers.withMessage(
          t('validate.require'),
          requiredIf(() => form.name.length === 0)
        ),
        noWhitespaceOnly
      },
      email: {
        required: helpers.withMessage(
          t('validate.require'),
          requiredIf(() => form.email.length === 0)
        ),
        noWhitespaceOnly,
        email: helpers.withMessage(t('validate.invalid_format'), email),
        duplicateMail: helpers.withMessage(t('validate.msg_duplicate_email'), (value: string) => {
          console.log(initFormEdit.email, 'init', value, 'validate duplicate mail')
          if (initFormEdit.email === value) return true
          const result = listUser.value.some((item) => {
            return item.email === value
          })
          return !result
        })
      },
      password: {
        required: helpers.withMessage(
          t('validate.require'),
          requiredIf(() => form.password.length === 0)
        ),
        noWhitespaceOnly,
        strongPassword: helpers.withMessage(t('validate.strong_password'), (value: string) =>
          /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value)
        )
      }
    }
  })

  const v$ = useVuelidate(rules, form)
  const validateForm = async () => {
    const result = await v$.value.$validate()
    if (result) {
      loading.value = true
      if (isEditUser.value) {
        await userManagementStore.editUser(form)
        message.success(t('dashboard.user_management.msg_edit_success'), {
          render: renderMessage,
          duration: DEFAULT_DURATION_TOAST
        })
        loading.value = false
        backToList()
      } else {
        await userManagementStore.createUser(form)
        message.success(t('dashboard.user_management.msg_register_success'), {
          render: renderMessage,
          duration: DEFAULT_DURATION_TOAST
        })
        loading.value = false
        backToList()
      }
    } else {
      message.error(t('dashboard.user_management.msg_error_validate'), {
        render: renderMessage,
        duration: DEFAULT_DURATION_TOAST
      })
    }
  }

  const validationStatus = (field: keyof Omit<FormRegisterUserType, 'id'>) => {
    if (v$.value[field]?.$dirty && v$.value[field].$error) {
      errors[field] = v$.value[field].$invalid ? `${v$.value[field].$errors[0].$message}` : ''
      return 'error'
    }
    if (v$.value[field].$dirty && !v$.value[field].$error) {
      errors[field] = ''
      return 'success'
    }
    return undefined
  }
  const backToList = () => {
    router.push('list-user')
  }
  const copyPassword = () => {
    navigator.clipboard.writeText(form.password)
  }

  const handleRegisterPassword = async () => {
    await v$.value.password.$touch()
    if (!v$.value.password.$error) {
      v$.value.password.$reset()
    }
  }
  // recheck rule email
  watch(
    () => initFormEdit.email,
    (newValue) => {
      form.email = newValue
    }
  )

  onMounted(() => {
    if (route.query.id !== undefined) {
      // remove when integrating api
      initializeForm()
      initFormEdit = cloneDeep(form)
      isEditUser.value = true
    } else {
      isEditUser.value = false
    }
    dashboardTitle.value = isEditUser.value
      ? t('dashboard.user_management.edit_user_title')
      : t('dashboard.user_management.register_user_title')
  })
</script>
