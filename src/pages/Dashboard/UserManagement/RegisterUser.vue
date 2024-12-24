<template>
  <div>
    <p class="text-base">{{ $t('dashboard.user_management.title') }}</p>
    <div class="w-full flex justify-end">
      <div class="max-w-[464px] w-full flex gap-6">
        <CustomButton type="default" content="キャンセル" @click="backToList" />
        <CustomButton type="secondary" content="保存" :loading="loading" @click="handelSubmit" />
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
          <n-form-item label="名前" :feedback="errors.name" :show-feedback="!!errors.name">
            <n-input
              v-model:value="form.name"
              :placeholder="$t('placeholder.enter_name')"
              class="rounded-lg h-[36px] flex items-center text-black max-w-[680px] w-full"
              :theme-overrides="{
                borderError: '1px solid #ED584F'
              }"
            />
          </n-form-item>
          <n-form-item label="メールアドレス" :feedback="errors.email" :show-feedback="!!errors.email">
            <n-input
              v-model:value="form.email"
              :input-props="{ type: 'email', name: 'email' }"
              :placeholder="$t('placeholder.enter_email')"
              class="rounded-lg h-[36px] flex items-center text-black max-w-[680px] w-full"
              :theme-overrides="{
                borderError: '1px solid #ED584F'
              }"
            />
          </n-form-item>
          <n-form-item label="権限">
            <CustomSelect v-model:value="form.role" class="max-w-[180px] w-full" :options="roleOption" />
          </n-form-item>
          <n-form-item label="パスワード">
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
  <ModalSetPassword v-model:show="isModalVisible" v-model:password="form.password" />
</template>
<script lang="ts" setup>
  import { roleOption } from '@/constants/dashboard'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import ModalSetPassword from './ModalSetPassword.vue'

  const { t } = useI18n()
  const router = useRouter()
  const loading = ref(false)
  const isModalVisible = ref(false)
  const form = reactive({
    name: '',
    email: '',
    role: 'admin',
    password: ''
  })
  const errors = reactive({
    name: '',
    email: '',
    role: '',
    password: ''
  })
  const handelSubmit = () => {
    console.log('submit')
  }
  const backToList = () => {
    router.push('list-user')
  }
</script>
