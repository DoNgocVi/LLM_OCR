<template>
  <div class="text-black">
    <div class="mt-3 bg-white rounded-[20px] px-6 py-6">
      <div class="w-full flex justify-between mt-6 items-end">
        <p class="text-base">{{ $t('dashboard.job.register_job') }}</p>
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
            <n-upload
              class="max-w-[230px]"
              :multiple="true"
              :show-file-list="false"
              :accept="ALLOWED_FORMATS"
              @before-upload="validateFile"
              @change="handleUploadFile"
            >
              <CustomButton type="primary" content="" size="default">
                <template #icon>
                  <n-icon size="14" class="pr-3">
                    <DownloadIcon />
                  </n-icon>
                </template>
                ファイルをアップロード
              </CustomButton>
            </n-upload>

            <p class="">またはここにファイルをドロップ</p>
          </div>
          <p class="mt-4">形式：pdf /jpg /png、最大サイズ：10MB上記形式のZIPファイルも利用可能です。</p>
          <p>ZIPファイルの最大サイズは100MBです。</p>
        </div>
        <div class="flex-1 px-6 py-8 border-1 border-solid border-grey_light rounded-[20px]">
          <p>アップロード済みファイル</p>
          <div>
            <ul class="list-none">
              <li v-for="(file, index) in uploadedFiles" :key="index">
                <p class="pt-3 pb-1 border-b-1 border-b-solid border-b-grey_light px-2">
                  {{ index + 1 }} &nbsp;&nbsp
                  {{ file.name }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { UploadFileInfo, UploadOnChange } from 'naive-ui'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { ref, reactive } from 'vue'
  import { helpers, requiredIf } from '@vuelidate/validators'
  import useVuelidate from '@vuelidate/core'
  import { optionDocumentType } from '@/constants/dashboard'
  import { useJobManagementStore } from '@/stores/listJobStore'
  import type { FormRegisterJobType } from '@/types/dashboard'
  import DownloadIcon from '@/assets/images/icons/DownloadIcon.vue'
  import { ALLOWED_FORMATS, MAX_SIZE } from '@/constants/common'
  import { merge } from 'lodash'

  const { t } = useI18n()
  const router = useRouter()
  const jobManagementStore = useJobManagementStore()

  const loading = ref(false)
  const isEditUser = ref(false)
  const uploadedFiles = ref<UploadFileInfo[]>([])

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
      name: {
        required: helpers.withMessage(
          t('validate.require'),
          requiredIf(() => form.name.length === 0)
        ),
        noWhitespaceOnly: helpers.withMessage(
          t('validate.invalid_format'),
          (value: string) => !!value && value.trim().length > 0
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
        // await jobManagementStore.editUser(form)
        loading.value = false
        backToList()
      } else {
        const payload = {
          ...form
        }
        await jobManagementStore.createJob(payload)
        loading.value = false
        backToList()
        return
      }
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

  const validateFile = ({ file }: { file: UploadFileInfo }) => {
    console.log(file)
    const isZip = file.name.endsWith('.zip')
    const maxAllowedSize = isZip ? MAX_SIZE : 10 * 1024 * 1024 // 10MB for non-zip files
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/zip']

    if (!file.file || !allowedTypes.includes(file.file.type)) {
      // window.$message.error('Định dạng không được hỗ trợ. Chỉ hỗ trợ: pdf, jpg, png, zip.')
      return false
    }

    if (file.file.size > maxAllowedSize) {
      const sizeLimit = isZip ? '100MB' : '10MB'
      // window.$message.error(`Tệp vượt quá kích thước tối đa (${sizeLimit}).`)
      return false
    }

    return true
  }
  const handleUploadFile = ({ file, fileList }: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
    uploadedFiles.value = merge(uploadedFiles.value, fileList)
    console.log('Danh sách tệp đã tải lên:', uploadedFiles.value)
  }
</script>
