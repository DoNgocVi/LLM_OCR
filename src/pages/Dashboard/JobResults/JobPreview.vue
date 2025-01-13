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
        <p class="text-black text-2xl font-bold leading-[36px]">読み取り結果</p>
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
          <span>{{ jobName }}</span>
        </p>
        <p>
          <span>ジョブ名：</span>
          <span>{{ documentType }}</span>
        </p>
      </div>
    </div>
  </header>
  <section class="preview-container bg-main flex gap-[24px] h-full pos-relative">
    <div class="top-6 left-6 z-10 flex items-center gap-[14px] pos-absolute">
      <div
        class="py-[6px] px-[14px] bg-dark_medium hover:bg-[#2A2A2A] flex flex-col items-center cursor-pointer rounded-[8px] transition-all"
        @click="() => handleScale('scale-up')"
      >
        <n-icon :component="ZoomOutIcon"></n-icon>
        <span class="text-white mt-1 text-[10px]">拡大</span>
      </div>
      <div
        class="py-[6px] px-[14px] bg-dark_medium hover:bg-[#2A2A2A] flex flex-col items-center cursor-pointer rounded-[8px] transition-all"
        @click="() => handleScale('scale-down')"
      >
        <n-icon :component="ZoomInIcon"></n-icon>
        <span class="text-white mt-1 text-[10px]">縮小</span>
      </div>
      <div
        class="py-[6px] px-[14px] bg-dark_medium hover:bg-[#2A2A2A] flex flex-col items-center cursor-pointer rounded-[8px] transition-all"
        @click="rotate"
      >
        <n-icon :component="RotateIcon"></n-icon>
        <span class="text-white mt-1 text-[10px]">回転</span>
      </div>
      <div
        class="py-[6px] px-[8px] bg-dark_medium hover:bg-[#2A2A2A] flex flex-col items-center cursor-pointer rounded-[8px] transition-all"
        @click="fitToScreen"
      >
        <n-icon :component="ScaleFullScreenIcon"></n-icon>
        <span class="text-white mt-1 text-[10px]">最適サイズ</span>
      </div>
    </div>
    <div ref="pdfContainer" class="container flex-1 flex-basis-2/5 overflow-auto pos-relative">
      <div v-if="isFilePdf" id="wrapper-pdf" ref="wrapper" class="mx-a">
        <div ref="box" class="box">
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
      </div>
      <div v-else-if="fileSource" class="image-wrapper h-full w-full">
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
            </zoompinch>
          </div>
        </div>
      </div>
      <div v-if="loadingFile" class="loader pos-absolute mt-[200px]"></div>
    </div>
    <div class="detail-job col-span-3 flex flex-col flex-1 flex-basis-3/5">
      <p class="text-[#5B5B5B] text-2xl font-bold leading-[36px]">読み取り項目</p>
      <div class="bg-white p-6 flex-1 mt-3 rounded-[20px] overflow-auto">
        <n-data-table
          :columns="columns"
          :data="detailJob"
          :bordered="false"
          :loading="loadingTable"
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
    </div>
  </section>
</template>
<script lang="ts" setup>
  import '@tato30/vue-pdf/style.css'
  import 'zoompinch/style.css'
  import type { detailJobType } from '@/types/dashboard'
  import type { LoadedEventPayload } from '@tato30/vue-pdf/dist/types'
  import { Zoompinch } from 'zoompinch'
  import { VuePDF, usePDF } from '@tato30/vue-pdf'
  import { createColumnsPreviewJob } from '@/composables/dashboard'
  import { useJobManagementStore } from '@/stores/listJobStore'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { showModalDownloadCSV, showModalInfo } from '@/composables/common'
  import { useModal } from 'naive-ui'
  import { useI18n } from 'vue-i18n'
  import { useJobApi } from '@/composables/useJobApi'
  import { ZoomOutIcon, ZoomInIcon, RotateIcon, ScaleFullScreenIcon, CaretIcon } from '@/assets/images/icons'
  import { getJobDetail } from '@/composables/useJobApi'
  import { useRoute } from 'vue-router'

  const modal = useModal()
  const router = useRouter()
  const route = useRoute()
  const jobManagementStore = useJobManagementStore()
  const { t } = useI18n()
  const { listDetailJob } = storeToRefs(jobManagementStore)
  const { saveDetailJobApi, downloadCsvApi } = useJobApi()

  const page = ref(1)
  const fileSource = ref('')
  const jobName = ref<string>('')
  const documentType = ref<string>('')
  const { pdf, pages } = usePDF(fileSource)

  const pdfContainer = ref<HTMLElement>()
  const wrapper = ref(null)
  const box = ref(null)

  const vuePDFRef = ref()
  const scale = ref(1)
  const scaleFit = ref(1)
  const currentRotation = ref(0)
  const isFitParent = ref(true)
  const currentFile = ref()
  const listFile = ref<{ label: string; value: number }[]>([])
  const detailJob = ref<detailJobType[]>([])
  const isFilePdf = ref<boolean>(true)
  const loadingTable = ref<boolean>(false)
  const loadingFile = ref<boolean>(false)

  const mouseEvents = ref(true)
  const touchEvents = ref(true)
  const wheelEvents = ref(true)
  const gestureEvents = ref(true)
  const rotation = ref(true)
  const bounds = ref(false)
  const zoompinchRef = ref<InstanceType<typeof Zoompinch>>()

  const offset = reactive({ top: 10, right: 10, bottom: 10, left: 10 })
  const transform = ref({ x: 0, y: 0, scale: 1, rotate: 0 })

  const columns = ref(createColumnsPreviewJob())

  const originalWidth = ref<number>(552)
  const originalHeight = ref<number>(780)

  const scaler = async (factor: number) => {
    const newWidth = originalWidth.value * factor
    const newHeight = originalHeight.value * factor

    const $wrap = wrapper.value as unknown as HTMLElement
    $wrap.style.width = `${newWidth}px`
    $wrap.style.height = `${newHeight}px`

    if (factor > 1) {
      $wrap.style.left = '0'
      $wrap.style.top = '0'
      $wrap.style.transform = 'translate(0, 0)'
      $wrap.style.position = ''
      await nextTick()
      setScroll()
    } else {
      $wrap.style.left = '50%'
      $wrap.style.top = '50%'
      $wrap.style.transform = 'translate(-50%, -50%)'
      $wrap.style.position = 'absolute'
    }
  }

  const setScroll = () => {
    const $container = pdfContainer.value as unknown as HTMLElement
    const $wrap = wrapper.value as unknown as HTMLElement

    const horizontal = ($wrap.offsetWidth - $container.offsetWidth) / 2
    const vertical = ($wrap.offsetHeight - $container.offsetHeight) / 2

    $container.scrollTo({
      top: vertical,
      left: horizontal
    })
  }

  const fitToScreen = () => {
    if (isFilePdf.value) {
      scale.value = scaleFit.value - 0.01
      if (scale.value !== scaleFit.value) {
        scale.value = scaleFit.value
        scaler(scale.value + (1 - scaleFit.value))
      }
    } else {
      fitImage()
    }
  }

  const onLoaded = (value: LoadedEventPayload) => {
    loadingFile.value = false
    if (currentRotation.value !== 0) return
    scale.value = value.scale
    const isPageLetter = value.height / value.width > 1.4
    if (isPageLetter && pdfContainer.value?.offsetHeight) {
    } else if (pdfContainer.value?.offsetHeight) {
    }
    if (isFitParent.value) {
      scaleFit.value = value.scale
    }
  }

  const changeFile = (value: number) => {
    currentRotation.value = 0
    isFitParent.value = true
    page.value = 1
    const data = listDetailJob.value.find((item) => {
      return value === item.id
    })
    data?.type === 'pdf' ? (isFilePdf.value = true) : (isFilePdf.value = false)
    detailJob.value = data?.data as unknown as detailJobType[]
    fileSource.value = data?.url as string
    setTimeout(() => {
      calculateWidthWrapper()
    })
  }

  const backToListJob = () => {
    showModalInfo(modal, {
      title: t('dashboard.job.title_back_list'),
      content: t('dashboard.job.msg_confirm_back'),
      textSubmit: t('common.move'),
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
        // Simulate the API call as a Promise
        await saveDetailJobApi({
          data: detailJob.value,
          id: currentFile.value
        })
        router.push({
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
        const id = 'id1'
        // Simulate the API call as a Promise
        await downloadCsvApi(typeDownload, id)
      }
    })
  }

  function fitImage() {
    transform.value = { x: 0, y: 0, scale: 1, rotate: 0 }
  }

  const handleScale = (type: string) => {
    const wrapperPdf = document.getElementById('wrapper-pdf')
    if (wrapperPdf) {
      wrapperPdf.style.width = ''
    }
    if (type === 'scale-up') {
      if (isFilePdf.value) {
        isFitParent.value = false
        scale.value = scale.value < 2 ? scale.value + 0.1 : scale.value
        scaler(scale.value + (1 - scaleFit.value))
      } else {
        transform.value.scale = transform.value.scale + 0.2
      }
    } else {
      if (isFilePdf.value) {
        isFitParent.value = false
        scale.value = scale.value > 0.1 ? scale.value - 0.1 : scale.value
        scaler(scale.value + (1 - scaleFit.value))
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

  const calculateWidthWrapper = () => {
    const maxWidthPdf = pdfContainer.value ? `${pdfContainer.value.offsetHeight / 1.4 - 40}` : '0'
    originalWidth.value = +maxWidthPdf
    originalHeight.value = pdfContainer.value ? pdfContainer.value.offsetHeight : 0
    const $wrap = wrapper.value as unknown as HTMLElement
    if ($wrap) {
      $wrap.style.width = `${maxWidthPdf}px`
      $wrap.style.height = `${originalHeight.value}px`
    }
  }

  const init = async () => {
    loadingFile.value = true
    loadingTable.value = true
    const jobId = route.query.id
    if (!listDetailJob.value.length) {
      const data = await getJobDetail(String(jobId))
      if (data) {
        jobName.value = data.jobName
        documentType.value = data.documentType
      }
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
    loadingTable.value = false
  }

  watch(fileSource, () => {
    isFitParent.value = true
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
    calculateWidthWrapper()
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
    padding-right: 24px;
    padding-top: 24px;
  }
  :deep(.n-data-table) {
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
  }
  .detail-job {
    height: calc(100vh - 158px);
  }
  .custom-icon:hover {
    color: #ff5e3a;
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
  :deep(.n-date-picker .n-input__input-el) {
    height: 36px;
  }
  /* HTML: <div class="loader"></div> */
  .loader {
    width: 40px;
    padding: 4px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #3799dc;
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
  }
  @keyframes l3 {
    to {
      transform: rotate(1turn);
    }
  }
  :deep(.centered-textarea .n-input__textarea) {
    // text-align: center;
    line-height: 1.5;
  }
</style>
