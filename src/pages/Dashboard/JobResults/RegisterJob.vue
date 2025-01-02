<template>
  <div>
    <div class="mt-3 bg-white rounded-[20px] px-6 py-6">
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
              label="ジョブ名"
              :validation-status="validationStatus('name')"
              :feedback="errors.name"
              :show-feedback="!!errors.name"
            >
              <n-input
                v-model:value="form.name"
                :placeholder="$t('dashboard.job.name_register')"
                class="rounded-lg h-[36px] flex items-center text- w-full"
                :theme-overrides="{
                  borderError: '1px solid #ED584F'
                }"
              />
            </n-form-item>
            <n-form-item label="読み取り文書タイプ">
              <CustomSelect
                v-model:value="form.documentType"
                class="max-w-[460px] w-full"
                :options="optionDocumentType"
              />
            </n-form-item>
          </div>
        </n-form>
      </div>
    </div>
    <div class="mt-3 bg-white rounded-[20px] px-6 py-6">
      <p class="text-base leading-[24px]">ファイルアップロード</p>
      <div class="mt-4 flex gap-4">
        <div class="py-8 px-[46px] bg-[#F5F5F5] rounded-[20px]">
          <div class="flex items-center gap-2 border-1 border-dashed border-gray_light px-3 py-2 rounded-[4px]">
            <CustomButton type="primary" content="" size="default">
              <template #icon>
                <n-icon size="14" class="pr-3">
                  <DownloadIcon />
                </n-icon>
              </template>
              ファイルをアップロード
            </CustomButton>
            <p>またはここにファイルをドロップ</p>
          </div>
          <p class="mt-4">形式：pdf /jpg /png、最大サイズ：10MB上記形式のZIPファイルも利用可能です。</p>
          <p>ZIPファイルの最大サイズは100MBです。</p>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { ref, reactive } from 'vue'
  import { helpers, required } from '@vuelidate/validators'
  import useVuelidate from '@vuelidate/core'
  import { optionDocumentType } from '@/constants/dashboard'
  import { useUserManagementStore } from '@/stores/userManagement'
  import type { FormRegisterJobType } from '@/types/dashboard'
  import DownloadIcon from '@/assets/images/icons/DownloadIcon.vue'

  const userManagementStore = useUserManagementStore()
  const { t } = useI18n()
  const router = useRouter()

  const loading = ref(false)
  const isEditUser = ref(false)

  const form = reactive<FormRegisterJobType>({
    name: '',
    documentType: 'invoice'
  })

  const errors = reactive<Omit<FormRegisterJobType, 'id'>>({
    name: '',
    documentType: ''
  })

  const rules = computed(() => {
    return {
      name: { required: helpers.withMessage(t('validate.require'), required) }
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

  const validationStatus = (field: keyof Omit<FormRegisterJobType, 'id'>) => {
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
    router.push('list-job')
  }
</script>
