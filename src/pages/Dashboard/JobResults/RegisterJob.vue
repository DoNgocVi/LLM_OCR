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
          label-width="156px"
          label-align="left"
          require-mark-placement="right-hanging"
        >
          <div class="flex flex-col gap-4">
            <n-form-item
              label="ジョブ名"
              :validation-status="validationStatus('name')"
              :feedback="errors.name"
              :show-feedback="!!errors.name"
              :theme-overrides="{
                feedbackTextColorError: '#ED584F'
              }"
            >
              <n-input
                v-model:value="form.name"
                :placeholder="$t('dashboard.job.name_register')"
                class="rounded-lg h-[36px] flex items-center text- w-full"
                :theme-overrides="{
                  borderError: '1px solid #ED584F',
                  heightMedium: '36px'
                }"
              />
            </n-form-item>
            <n-form-item label="読み取り文書タイプ" :show-feedback="false">
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
      <div class="mt-4 flex gap-4 items-start flex-wrap">
        <div class="py-8 px-6 bg-[#F5F5F5] rounded-[20px]">
          <div
            class="flex items-center gap-2 border-1 border-dashed border-gray_light px-3 py-2 rounded-[4px] whitespace-nowrap"
          >
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
          <div class="text-center mt-4">
            <dl class="inline-block">
              <dd>形式：pdf /jpg /png、最大サイズ：10MB</dd>
              <dd>上記形式のZIPファイルも利用可能です。</dd>
              <dd>ZIPファイルの最大サイズは100MBです。</dd>
            </dl>
          </div>
        </div>
        <div
          class="flex-1 py-8 px-6 border-1 border-solid border-grey_light rounded-[20px] min-h-[370px] min-w-[230px]"
        >
          <p>アップロード済みファイル</p>
          <div v-if="uploadedFiles.length">
            <ul class="list-none">
              <li
                v-for="(file, index) in uploadedFiles"
                :key="index"
                class="pt-3 pb-1 border-b-1 border-b-solid border-b-grey_light px-2 flex justify-between items-center"
              >
                <p class="">
                  {{ index + 1 }} &nbsp;&nbsp
                  {{ file.name }}
                  {{ `(${convertFileSizeInKB(file?.file?.size ?? 0)} KB)` }}
                </p>
                <div
                  class="w-5 h-5 rounded-full bg-#D1D1D1 pos-relative cursor-pointer"
                  @click="
                    () => {
                      deleteFile(file.id)
                    }
                  "
                >
                  <n-icon
                    class="pos-absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    :component="Close"
                  ></n-icon>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { UploadFileInfo } from 'naive-ui'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { ref, reactive } from 'vue'
  import { helpers, requiredIf } from '@vuelidate/validators'
  import useVuelidate from '@vuelidate/core'
  import { optionDocumentType } from '@/constants/dashboard'
  import type { FormRegisterJobType, JobType, Status } from '@/types/dashboard'
  import DownloadIcon from '@/assets/images/icons/DownloadIcon.vue'
  import { ALLOWED_FORMATS, MAX_SIZE } from '@/constants/common'
  import { merge, remove } from 'lodash'
  import { Close } from '@vicons/ionicons5'
  import { useJobApi } from '@/composables/useJobApi'

  const { t } = useI18n()
  const router = useRouter()
  const { createJobApi } = useJobApi()

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
        const statuses: Status[] = ['created', 'updated', 'readingCompleted', 'loadingError', 'timeoutError']
        const dataPlayload: JobType = {
          id: Date.now(),
          jobName: form.name,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          owner: '江戸川コナン',
          createDate: Date.now(),
          updateDate: '',
          result: Math.floor(Math.random() * 2) === 0
        }
        await createJobApi(dataPlayload)
        // await jobManagementStore.createJob(payload)
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
    const isZip = file.name.endsWith('.zip')
    const maxAllowedSize = isZip ? MAX_SIZE : 10 * 1024 * 1024 // 10MB for non-zip files
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/zip']

    if (!file.file || !allowedTypes.includes(file.file.type)) {
      // window.$message.error('Định dạng không được hỗ trợ. Chỉ hỗ trợ: pdf, jpg, png, zip.')
      return false
    }

    if (file.file.size > maxAllowedSize) {
      // const sizeLimit = isZip ? '100MB' : '10MB'
      // window.$message.error(`Tệp vượt quá kích thước tối đa (${sizeLimit}).`)
      return false
    }

    return true
  }

  const convertFileSizeInKB = (size: number) => {
    return Math.floor(size / 1024) || '0'
  }

  const deleteFile = (id: string) => {
    remove(uploadedFiles.value, (file) => {
      return file.id === id
    })
  }

  const handleUploadFile = ({ file, fileList }: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
    console.log(file)
    uploadedFiles.value = merge(uploadedFiles.value, fileList)
  }
</script>
