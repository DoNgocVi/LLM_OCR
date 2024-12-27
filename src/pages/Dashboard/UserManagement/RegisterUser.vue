<template>
  <div>
    <p class="text-base">{{ $t('dashboard.user_management.title_register') }}</p>
    <div class="w-full flex justify-end mt-6">
      <div class="max-w-[464px] w-full flex gap-6">
        <CustomButton type="default" content="キャンセル" @click="backToList" />
        <CustomButton type="secondary" content="保存" :loading="loading" @click="validateForm" />
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
        <div class="flex flex-col gap-4">
          <n-form-item
            label="名前"
            :validation-status="validationStatus('name')"
            :feedback="errors.name"
            :show-feedback="!!errors.name"
          >
            <n-input
              v-model:value="form.name"
              :placeholder="$t('placeholder.enter_name')"
              class="rounded-lg h-[36px] flex items-center text-black max-w-[680px] w-full"
              :theme-overrides="{
                borderError: '1px solid #ED584F'
              }"
            />
          </n-form-item>
          <n-form-item
            label="メールアドレス"
            :validation-status="validationStatus('email')"
            :feedback="errors.email"
            :show-feedback="!!errors.email"
          >
            <n-input
              v-model:value="form.email"
              :placeholder="$t('placeholder.enter_email')"
              class="rounded-lg h-[36px] flex items-center text-black max-w-[680px] w-full"
              :theme-overrides="{
                borderError: '1px solid #ED584F'
              }"
            />
          </n-form-item>
          <n-form-item>
            <template #label>
              <div class="flex items-center gap-2">
                <p class="text-black">権限</p>
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
          <n-form-item
            label="パスワード"
            :validation-status="validationStatus('password')"
            :feedback="errors.password"
            :show-feedback="false"
          >
            <CustomButton
              class="max-w-[160px]"
              type="primary"
              :content="$t('dashboard.user_management.btn_set_password')"
              @click="
                () => {
                  isModalVisible = true
                }
              "
            />
          </n-form-item>
        </div>
      </n-form>
    </div>
  </div>
  <ModalSetPassword v-model:show="isModalVisible" v-model:password="form.password" :error="errors.password" />
</template>
<script lang="ts" setup>
  import { roleOption } from '@/constants/dashboard'
  import { useRouter, useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import ModalSetPassword from './ModalSetPassword.vue'
  import { ref, reactive, onMounted } from 'vue'
  import { email, helpers, required } from '@vuelidate/validators'
  import useVuelidate from '@vuelidate/core'
  import { InformationCircleOutline } from '@vicons/ionicons5'
  import { useUserManagementStore } from '@/stores/userManagement'
  import type { FormRegisterUserType } from '@/types/dashboard'

  const userManagementStore = useUserManagementStore()
  const { t } = useI18n()
  const router = useRouter()
  const route = useRoute()

  const loading = ref(false)
  const isModalVisible = ref(false)
  const isEditUser = ref(false)

  const form = reactive<FormRegisterUserType>({
    id: '',
    name: '',
    email: '',
    role: 'admin',
    password: ''
  })

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
  }

  const rules = computed(() => {
    return {
      name: { required: helpers.withMessage(t('validate.require'), required) },
      email: {
        required: helpers.withMessage(t('validate.require'), required),
        email: helpers.withMessage(t('validate.invalid_format'), email)
      },
      password: {
        required: helpers.withMessage(t('validate.require'), required),
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
        loading.value = false
        backToList()
        return
      }
      await userManagementStore.createUser(form)
      loading.value = false
      backToList()
      return
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

  onMounted(() => {
    if (route.query.id) {
      initializeForm()
      isEditUser.value = true
    } else {
      isEditUser.value = false
    }
  })
</script>
