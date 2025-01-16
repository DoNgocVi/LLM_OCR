<template>
  <div class="text-black">
    <n-form
      novalidate
      label-placement="left"
      label-width="156px"
      label-align="left"
      require-mark-placement="right-hanging"
    >
      <div class="mt-3 bg-white rounded-[20px] px-6 py-8">
        <div class="w-full flex justify-between items-end">
          <p class="text-base">{{ $t('dashboard.job.register_job') }}</p>
          <div class="max-w-[464px] w-full flex gap-6">
            <CustomButton type="default" content="キャンセル" @click="backToList" />
            <CustomButton type="secondary" content="作成" :loading="loading" @click="validateForm" />
          </div>
        </div>
        <div class="mt-6">
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
        </div>
      </div>
      <div class="mt-3 bg-white rounded-[20px] px-6 py-8">
        <p class="text-base leading-[24px]">ファイルアップロード</p>
        <div class="mt-4 flex gap-4 items-start flex-wrap">
          <div class="py-8 px-6 bg-[#F5F5F5] rounded-[20px]">
            <div class="flex items-center gap-2 rounded-[4px] whitespace-nowrap">
              <n-form-item
                :validation-status="validationStatus('files')"
                :feedback="errors.files"
                :show-feedback="!!errors.files"
                :theme-overrides="{
                  feedbackTextColorError: '#ED584F'
                }"
              >
                <n-upload
                  class="custom-upload"
                  directory-dnd
                  :multiple="true"
                  :show-file-list="false"
                  :accept="ALLOWED_FORMATS"
                  :theme-overrides="{
                    draggerBorder: '1px dashed #d1d1d1',
                    draggerBorderHover: '1px dashed #d1d1d1',
                    draggerColor: '#F5F5F5'
                  }"
                  @before-upload="validateFile"
                  @change="handleUploadFile"
                  @dragover="handleDragEnter"
                  @dragleave="handleDragLeave"
                >
                  <n-upload-dragger :class="{ dragging: isDragging }">
                    <div class="flex flex-wrap items-center justify-center gap-2">
                      <CustomButton class="max-w-[226px]" type="primary" content="" size="default">
                        <template #icon>
                          <n-icon size="14" class="pr-3">
                            <DownloadIcon />
                          </n-icon>
                        </template>
                        ファイルをアップロード
                      </CustomButton>
                      <n-text style="font-size: 16px">またはここにファイルをドロップ</n-text>
                    </div>
                  </n-upload-dragger>
                </n-upload>
              </n-form-item>
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
            <div v-if="form.files.length">
              <ul class="list-none">
                <li
                  v-for="(file, index) in form.files"
                  :key="index"
                  class="pt-3 pb-1 border-b-1 border-b-solid border-b-grey_light px-2 flex justify-between items-center gap-2"
                >
                  <p class="flex-1">
                    {{ index + 1 }} &nbsp;&nbsp
                    {{ file.name }}
                    {{ `(${convertFileSizeInKB(file?.file?.size ?? 0)} KB)` }}
                  </p>
                  <div
                    class="min-w-5 h-5 rounded-full bg-grey_light hover:bg-gray_dark pos-relative cursor-pointer transition-all"
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
    </n-form>
  </div>
</template>
<script lang="ts" setup>
  import { useMessage, type UploadFileInfo } from 'naive-ui'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { ref, reactive } from 'vue'
  import { helpers, requiredIf } from '@vuelidate/validators'
  import useVuelidate from '@vuelidate/core'
  import { optionDocumentType } from '@/constants/dashboard'
  import type { FormRegisterJobType, JobType, Status } from '@/types/dashboard'
  import DownloadIcon from '@/assets/images/icons/DownloadIcon.vue'
  import { ALLOWED_FORMATS, DEFAULT_DURATION_TOAST, MAX_SIZE } from '@/constants/common'
  import { remove } from 'lodash'
  import { Close } from '@vicons/ionicons5'
  import { useJobApi } from '@/composables/useJobApi'
  import { useCommonStore } from '@/stores/commonStore'
  import { storeToRefs } from 'pinia'
  import { renderMessage } from '@/composables/auth'
  const message = useMessage()

  const commonStore = useCommonStore()
  const { dashboardTitle } = storeToRefs(commonStore)
  const { t } = useI18n()
  const router = useRouter()
  const { createJobApi } = useJobApi()
  type ErrorField = Omit<FormRegisterJobType, 'id' | 'files'> & {
    files: string
  }
  const loading = ref(false)
  const isEditUser = ref(false)
  const isDragging = ref(false)

  const handleDragEnter = () => {
    isDragging.value = true
  }

  const handleDragLeave = () => {
    isDragging.value = false
  }

  const form = reactive<FormRegisterJobType>({
    name: '',
    documentType: 'invoice',
    files: []
  })

  const errors = reactive<ErrorField>({
    name: '',
    documentType: '',
    files: ''
  })
  const rules = computed(() => ({
    name: {
      required: helpers.withMessage(
        t('validate.require'),
        requiredIf(() => form.name.length === 0)
      ),
      noWhitespaceOnly: helpers.withMessage(
        t('validate.invalid_format'),
        (value: string) => !!value && value.trim().length > 0
      )
    },
    files: {
      required: helpers.withMessage(
        t('validate.msg_required_file'),
        requiredIf(() => form.files.length === 0)
      )
    }
  }))

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
        // remove
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const dataPayload: JobType = {
          id: Date.now(),
          jobName: form.name,
          status: status,
          owner: '江戸川コナン',
          createDate: Date.now(),
          updateDate: '',
          result: Math.floor(Math.random() * 1) === 0 && status !== 'loadingError' && status !== 'timeoutError'
        }
        await createJobApi(dataPayload)
        message.success(t('dashboard.job.message_register_job_success'), {
          render: renderMessage,
          duration: DEFAULT_DURATION_TOAST
        })
        loading.value = false
        backToList()
        return
      }
    }
  }

  const validationStatus = (field: keyof ErrorField) => {
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
    remove(form.files, (file) => {
      return file.id === id
    })
  }

  const handleUploadFile = ({ file }: { file: UploadFileInfo }) => {
    form.files = [...form.files, file]
  }

  watch(errors, () => {
    console.log('errors', errors)
  })
  onMounted(() => {
    dashboardTitle.value = t('dashboard.job.register_job_title')
  })
</script>
<style lang="scss" scoped>
  :deep(.n-upload-dragger) {
    padding: 8px 16px;
  }
  .custom-upload .n-upload-dragger.dragging {
    border: 1px dashed #1175ba !important; /* Màu viền khi kéo file vào */
  }
</style>
