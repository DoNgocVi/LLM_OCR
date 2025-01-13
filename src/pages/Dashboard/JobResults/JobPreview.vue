<template>
  <header class="py-[14px] px-12 border-none border-b-1 border-b-solid border-grey_light h-[118px]">
    <div class="flex justify-between">
      <div w-220px>
        <CustomButton type="default" content="ジョブ結果一覧に戻る" @click="backToListJob"></CustomButton>
      </div>
      <div class="flex gap-6">
        <CustomButton
          class="min-w-220px"
          type="primary"
          :content="$t('common.keep_value')"
          @click="saveJob"
        ></CustomButton>
        <CustomButton
          class="min-w-220px"
          type="secondary"
          :content="$t('common.download')"
          @click="downloadDetailJob"
        ></CustomButton>
      </div>
    </div>
    <div class="flex mt-3">
      <div class="flex gap-12 flex-1">
        <p class="text-2xl font-bold leading-[36px]">読み取り結果</p>
        <CustomSelect
          v-model:value="currentFile"
          class="max-w-[250px]"
          :options="listFile"
          @change="changeFile"
        ></CustomSelect>
        <div class="flex items-center justify-center gap-4">
          <button
            class="pagination-btn cursor-pointer bg-transparent outline-none border-none flex items-center"
            :disabled="page === 1"
            @click="page = page > 1 ? page - 1 : page"
          >
            <n-icon class="color-gray_light hover:color-grey_dark" :component="CaretIcon"></n-icon>
          </button>
          <span class="text-base">{{ page }} / {{ isFilePdf ? pages : 1 }}ページ</span>
          <button
            class="pagination-btn cursor-pointer bg-transparent outline-none border-none flex items-center"
            :disabled="page === pages || !isFilePdf"
            @click="page = page < pages ? page + 1 : page"
          >
            <n-icon class="rotate-180 color-gray_light hover:color-grey_dark" :component="CaretIcon"></n-icon>
          </button>
        </div>
      </div>
      <div class="flex gap-12 items-center">
        <p>
          <span>ジョブ名：</span>
          <span>{{ props.jobName }}</span>
        </p>
        <p>
          <span>ジョブ名：</span>
          <span>{{ props.documentType }}</span>
        </p>
      </div>
    </div>
  </header>
  <section class="preview-container bg-main flex gap-4 h-full pos-relative">
    <div ref="pdfContainer" class="bg-white overflow-auto" :style="{ width: `${minWidthContainer}px` }">
      <div pos-absolute class="top-2 left-6 z-10 flex items-center gap-[14px]">
        <div
          class="py-[6px] px-[14px] bg-dark_medium flex flex-col items-center cursor-pointer rounded-[8px]"
          @click="() => handleScale('scale-up')"
        >
          <n-icon :component="ZoomOutIcon"></n-icon>
          <span class="text-white mt-1 text-[10px]">拡大</span>
        </div>
        <div
          class="py-[6px] px-[14px] bg-dark_medium flex flex-col items-center cursor-pointer rounded-[8px]"
          @click="() => handleScale('scale-down')"
        >
          <n-icon :component="ZoomInIcon"></n-icon>
          <span class="text-white mt-1 text-[10px]">縮小</span>
        </div>
        <div
          class="py-[6px] px-[14px] bg-dark_medium flex flex-col items-center cursor-pointer rounded-[8px]"
          @click="rotate"
        >
          <n-icon :component="RotateIcon"></n-icon>
          <span class="text-white mt-1 text-[10px]">回転</span>
        </div>
        <div
          class="py-[6px] px-[8px] bg-dark_medium flex flex-col items-center cursor-pointer rounded-[8px]"
          @click="fitToScreen"
        >
          <n-icon :component="ScaleFullScreenIcon"></n-icon>
          <span class="text-white mt-1 text-[10px]">最適サイズ</span>
        </div>
      </div>
      <div v-if="isFilePdf">
        <VuePDF
          ref="vuePDFRef"
          :pdf="pdf"
          :page="page"
          :scale="scale"
          :rotation="currentRotation"
          :fit-parent="isFitParent"
          @loaded="onLoaded"
        />
      </div>
      <div v-else class="image-wrapper h-full">
        <div class="playground">
          <div class="projection-wrapper">
            <zoompinch
              ref="zoompinchRef"
              v-model:transform="transform"
              :width="1536"
              :height="2048"
              :offset="offset"
              :min-scale="0.1"
              :max-scale="10"
              :rotation="rotation"
              :bounds="bounds"
              :mouse="mouseEvents"
              :touch="touchEvents"
              :wheel="wheelEvents"
              :gesture="gestureEvents"
            >
              <template #canvas>
                <img :src="fileSource" style="width: 1536px; height: 2048px" />
              </template>
              <!-- <template #matrix="{ compose }">
                <svg xmlns="http://www.w3.org/2000/svg" @click="handleClickOnLayer">
                  <circle
                    :cx="compose(1536 / 2, 2048 / 2)[0]"
                    :cy="compose(1536 / 2, 2048 / 2)[1]"
                    r="5"
                    style="fill: #f00"
                  />
                </svg>
              </template> -->
            </zoompinch>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-job col-span-3 flex-1 flex flex-col">
      <p class="text-[#5B5B5B] text-2xl font-bold leading-[36px]">読み取り項目</p>
      <div class="bg-white p-6 flex-1 mt-3 rounded-[20px] overflow-auto">
        <n-data-table
          :columns="columns"
          :data="detailJob"
          :bordered="false"
          :loading="isLoading"
          :themeOverrides="{
            thTextColor: '#4A4C56',
            thPaddingMedium: '8.3px 12px',
            tdPaddingMedium: '10px 12px',
            thColor: '#F0F5F8',
            borderRadius: '10px',
            borderColor: '#D1D1D1'
          }"
        >
          <template #empty>
            <p class="font-bold text-sm">{{ $t('dashboard.user_management.msg_empty_data') }}</p>
          </template>
        </n-data-table>
      </div>
      <div class="flex justify-end mt-3 gap-6">
        <CustomButton class="max-w-220px" content="現在のページをロック" @click="lockCurrentPage">
          <template #icon>
            <n-icon color-gray_light class="relative -left-[2px] top-[2px]">
              <LockIcon />
            </n-icon>
          </template>
          現在のページをロック
        </CustomButton>
        <CustomButton type="tertiary" class="max-w-220px" @click="lockAllPage">
          <template #icon>
            <n-icon color-white class="relative -left-[2px] top-[2px]">
              <LockIcon />
            </n-icon>
            ジョブ全体をロック
          </template>
        </CustomButton>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
  import '@tato30/vue-pdf/style.css'
  import 'zoompinch/style.css'
  import type { LoadedEventPayload } from '@tato30/vue-pdf/dist/types'
  import { Zoompinch } from 'zoompinch'
  import { VuePDF, usePDF } from '@tato30/vue-pdf'
  import { createColumnsPreviewJob } from '@/composables/dashboard'
  import { useJobManagementStore } from '@/stores/listJobStore'
  import { storeToRefs } from 'pinia'
  import { detailJobType, FileDetailsList } from '@/types/dashboard'
  import { cloneDeep } from 'lodash'
  import { useRouter } from 'vue-router'
  import { showModalDownloadCSV, showModalInfo } from '@/composables/common'
  import { useModal } from 'naive-ui'
  import { useI18n } from 'vue-i18n'
  import { useJobApi } from '@/composables/useJobApi'
  import JobDetailMock from '../../../mocks/JobDetailMock.json'
  import { ZoomOutIcon, ZoomInIcon, RotateIcon, ScaleFullScreenIcon, CaretIcon, LockIcon } from '@/assets/images/icons'

  const { t } = useI18n()
  const modal = useModal()
  const router = useRouter()
  const jobManagementStore = useJobManagementStore()
  const { listDetailJob } = storeToRefs(jobManagementStore)
  const { setListDetailJob } = jobManagementStore
  const { saveDetailJobApi, downloadCsv } = useJobApi()

  const page = ref(1)
  const fileSource = ref('')
  const { pdf, pages } = usePDF(fileSource)

  const props = defineProps({
    jobName: {
      type: String,
      default: 'テストファイルA-1',
      required: true
    },
    documentType: {
      type: String,
      default: 'テンプレートA',
      required: true
    }
  })

  const pdfContainer = ref<HTMLElement>()
  const vuePDFRef = ref()
  const minWidthContainer = ref<number>(550)
  const scale = ref(1)
  const scaleFit = ref(1)
  const currentRotation = ref(0)
  const isLoading = ref<boolean>(false)
  const isFitParent = ref(true)
  const currentFile = ref()
  const listFile = ref<{ label: string; value: number }[]>([])
  const detailJob = ref<detailJobType[]>([])
  const isFilePdf = ref<boolean>(false)

  const mouseEvents = ref(true)
  const touchEvents = ref(true)
  const wheelEvents = ref(true)
  const gestureEvents = ref(true)
  const rotation = ref(true)
  const bounds = ref(false)
  const zoompinchRef = ref<InstanceType<typeof Zoompinch>>()

  const columns = ref(createColumnsPreviewJob())

  const fitToScreen = () => {
    if (isFilePdf.value) {
      scale.value = scaleFit.value - 0.01
    } else {
      fitImage()
    }
  }

  const onLoaded = (value: LoadedEventPayload) => {
    scale.value = value.scale
    const isPageLetter = value.height / value.width > 1.4
    if (isPageLetter && pdfContainer.value?.offsetHeight) {
      minWidthContainer.value = pdfContainer.value?.offsetHeight / 1.414
    } else if (pdfContainer.value?.offsetHeight) {
      minWidthContainer.value = pdfContainer.value?.offsetHeight / 1.3
    }
    if (isFitParent.value) {
      scaleFit.value = value.scale
    }
  }

  const changeFile = (value: number) => {
    isFitParent.value = true
    page.value = 1
    const data = listDetailJob.value.find((item) => {
      return value === item.id
    })
    data?.type === 'pdf' ? (isFilePdf.value = true) : (isFilePdf.value = false)
    detailJob.value = data?.data as unknown as detailJobType[]
    fileSource.value = data?.url as string
  }

  const lockCurrentPage = () => {
    detailJob.value.forEach((element) => {
      element.locker = true
    })
  }

  const lockAllPage = () => {
    listDetailJob.value.forEach((detail) => {
      detail.data.forEach((element) => {
        element.locker = true
      })
    })
  }

  const backToListJob = () => {
    showModalInfo(modal, {
      title: t('dashboard.job.title_back_list'),
      content: t('dashboard.job.msg_confirm_back'),
      type: 'secondary',
      width: '430px',
      onSubmit: async () => {
        router.push({
          name: 'JobResults'
        })
      }
    })
  }

  const saveJob = () => {
    showModalInfo(modal, {
      title: t('dashboard.job.title_save_job'),
      type: 'secondary',
      width: '320px',
      textSubmit: t('common.keep_value'),
      onSubmit: async () => {
        await saveDetailJobApi({
          data: detailJob.value,
          id: currentFile.value
        })
        await router.push({
          name: 'JobResults'
        })
      }
    })
  }

  const downloadDetailJob = async () => {
    showModalDownloadCSV(modal, {
      title: t('dashboard.job.modal_label_download'),
      content: t('dashboard.job.modal_content_download'),
      type: 'secondary',
      onDownload: async (typeDownload: string) => {
        // Simulate the API call as a Promise
        await downloadCsv(typeDownload)
      }
    })
  }

  const offset = reactive({ top: 10, right: 10, bottom: 10, left: 10 })
  ;(window as any).offset = offset

  const transform = ref({ x: 0, y: 0, scale: 1, rotate: 0 })
  ;(window as any).transform = transform

  // const updateTransform = (newTransform: Partial<typeof transform.value>) => {
  //   transform.value = { ...transform.value, ...newTransform }
  // }
  ;(window as any).zoompinchRef = zoompinchRef

  // function handleClickOnLayer(event: MouseEvent) {
  //   const [x, y] = zoompinchRef.value!.normalizeMatrixCoordinates(event.clientX, event.clientY)
  //   alert(`clicked at ${x}, ${y}`)
  // }

  function fitImage() {
    transform.value = { x: 0, y: 0, scale: 1, rotate: 0 }
  }

  const handleScale = (type: string) => {
    if (type === 'scale-up') {
      if (isFilePdf.value) {
        isFitParent.value = false
        scale.value = scale.value < 2 ? scale.value + 0.1 : scale.value
      } else {
        transform.value.scale = transform.value.scale + 0.2
      }
    } else {
      if (isFilePdf.value) {
        isFitParent.value = false
        scale.value = scale.value > 0.1 ? scale.value - 0.1 : scale.value
      } else {
        transform.value.scale = transform.value.scale - 0.2
      }
    }
  }

  const rotate = () => {
    if (isFilePdf.value) {
      currentRotation.value = currentRotation.value - 90
    } else {
      transform.value.rotate = transform.value.rotate - 90
    }
  }

  const init = () => {
    if (!listDetailJob.value.length) {
      setListDetailJob(cloneDeep(JobDetailMock) as FileDetailsList)
    }
    listFile.value = listDetailJob.value.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
    currentFile.value = listFile.value[0].value
    detailJob.value = listDetailJob.value[0].data as unknown as detailJobType[]
    fileSource.value = listDetailJob.value[0].url as string
    listDetailJob.value[0].type === 'pdf' ? (isFilePdf.value = true) : (isFilePdf.value = true)
  }

  watch(fileSource, () => {
    isFitParent.value = true

    setTimeout(() => {
      if (isFilePdf) {
        vuePDFRef?.value?.reload()
      }
    })
  })

  watch(bounds, (newValue) => {
    if (newValue) {
      rotation.value = false
    }
  })
  watch(rotation, (newValue) => {
    if (newValue) {
      bounds.value = false
    }
  })

  watch(
    () => zoompinchRef.value?.wrapperBounds,
    () => {
      requestAnimationFrame(() => {
        zoompinchRef.value?.applyTransform(1, [0.5, 0.5], [0.5, 0.5], false)
      })
    }
  )

  onMounted(async () => {
    setTimeout(() => fitImage())
    await nextTick()
    // TODO: handle call api
    init()
  })
</script>
<style lang="scss" scoped>
  .pagination-btn:disabled {
    cursor: not-allowed;
  }
  .preview-container {
    height: calc(100vh - 118px);
    padding-left: 64px;
    padding-right: 24px;
    padding-top: 48px;
    padding-bottom: 12px;
  }
  :deep(.n-data-table) {
    .n-data-table__pagination {
      justify-content: center;
      margin-top: 30px;
    }
    .n-data-table-th__title {
      flex: none !important;
    }
    .n-data-table-base-table-body {
      border: 1px solid #d1d1d1;
      border-radius: 10px;
      .n-data-table-thead {
        tr > th:first-child {
          padding-left: 24px;
        }
      }
      .n-data-table-tbody {
        tr > td:first-child {
          padding-left: 24px;
        }
      }
      .n-button {
        padding: 0 6px;
      }
      .n-data-table-td.n-data-table-td--last-row {
        border-bottom: none;
      }
    }
    .n-pagination-item:not(.n-pagination-item--clickable) {
      border: none !important;
      padding: 0;
      border-radius: 7px;
    }
    .n-data-table-empty {
      border-left: 1px solid #d1d1d1;
      border-right: 1px solid #d1d1d1;
      border-bottom: 1px solid #d1d1d1;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 20px 0;
    }
    .n-pagination-item {
      border-radius: 4px;
      font-weight: 600;
    }
    .n-pagination-item--disabled {
      background-color: #f5f5f5;
    }
    .n-data-table-base-table-body.custom-border {
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
      border-bottom: none;
    }
    .n-date-picker {
      .n-input__border,
      .n-input__state-border {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
    .n-data-table-th.n-data-table-th--last {
      display: flex;
      justify-content: center;
    }
  }
  .detail-job {
    height: calc(100vh - 180px);
  }
  .custom-icon:hover {
    color: #ff5e3a; /* Change icon color */
  }

  .playground {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    .projection-wrapper {
      height: 100%;
    }
    .fields-wrapper {
      width: 100%;
      gap: 10px;
    }
    .zoompinch {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
  }
</style>
