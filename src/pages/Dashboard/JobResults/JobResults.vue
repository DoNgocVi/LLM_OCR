<template>
  <div class="">
    <div class="bg-white rounded-[20px] px-6 py-6">
      <div class="flex items-center gap-2">
        <n-icon size="16" color="#858D9D">
          <FilterIcon />
        </n-icon>
        <p class="text-black">{{ $t('dashboard.job.title') }}</p>
      </div>
      <n-form label-placement="left" :show-feedback="false">
        <div class="flex gap-col-8 gap-row-3 mt-2 flex-wrap">
          <n-form-item class="max-w-[280px] w-full">
            <n-input
              v-model:value="formFilter.keyword"
              placeholder="キーワード検索"
              class="w-full"
              :theme-overrides="{
                iconColor: '#858D9D',
                borderRadius: '8px',
                placeholderColor: '#ACACAC',
                heightMedium: '36px'
              }"
            >
              <template #prefix>
                <n-icon :component="Search" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item label="ステータス" :show-feedback="false" style="--n-label-padding: 0 24px 0 0">
            <CustomSelect v-model:value="formFilter.status" class="w-[180px]" :options="statusOption" />
          </n-form-item>
          <n-form-item label="作成日時" :show-feedback="false" style="--n-label-padding: 0 24px 0 0">
            <div class="flex items-center gap-2 min-w-[226px]">
              <div class="flex">
                <CustomDatePicker
                  v-model:timestamp="formFilter.startDate.date"
                  class="max-w-[150px]"
                  :disable-after="startDateDisable"
                />
                <n-time-picker
                  v-model:value="formFilter.startDate.time"
                  class="custom-time-picker"
                  format="HH:mm"
                  placeholder="時間"
                  :actions="null"
                  :theme-overrides="{
                    borderRadius: '10px',
                    itemTextColorActive: '#181818',
                    itemTextColor: '#181818',
                    peers: {
                      Input: {
                        border: '1px solid #D1D1D1',
                        borderFocus: '1px solid #3799DC',
                        borderHover: '1px solid #3799DC',
                        borderRadius: '8px',
                        placeholderColor: '#ACACAC'
                      },
                      Scrollbar: {
                        borderRadius: '20px'
                      }
                    }
                  }"
                  @confirm="() => {}"
                >
                  <template #icon>
                    <n-icon :component="TimeIcon" />
                  </template>
                </n-time-picker>
              </div>
              <p>〜</p>
              <div class="flex">
                <CustomDatePicker
                  v-model:timestamp="formFilter.endDate.date"
                  class="max-w-[150px]"
                  :disable-before="endDateDisable"
                />
                <n-time-picker
                  v-model:value="formFilter.endDate.time"
                  class="custom-time-picker"
                  format="HH:mm"
                  placeholder="時間"
                  :actions="null"
                  :theme-overrides="{
                    borderRadius: '10px',
                    itemTextColorActive: '#181818',
                    itemTextColor: '#181818',
                    peers: {
                      Input: {
                        border: '1px solid #D1D1D1',
                        borderFocus: '1px solid #3799DC',
                        borderHover: '1px solid #3799DC',
                        borderRadius: '8px',
                        placeholderColor: '#ACACAC'
                      },
                      Scrollbar: {
                        borderRadius: '20px'
                      }
                    }
                  }"
                  @confirm="() => {}"
                >
                  <template #icon>
                    <n-icon :component="TimeIcon" />
                  </template>
                </n-time-picker>
              </div>
            </div>
          </n-form-item>
          <n-form-item label="更新日時" :show-feedback="false" style="--n-label-padding: 0 24px 0 0">
            <div class="flex items-center gap-2 min-w-[226px]">
              <div class="flex">
                <CustomDatePicker
                  v-model:timestamp="formFilter.startDate2.date"
                  class="max-w-[150px]"
                  :disable-after="startDateDisable2"
                />
                <n-time-picker
                  v-model:value="formFilter.startDate2.time"
                  class="custom-time-picker"
                  placeholder="時間"
                  format="HH:mm"
                  :actions="null"
                  :theme-overrides="{
                    borderRadius: '10px',
                    itemTextColorActive: '#181818',
                    itemTextColor: '#181818',
                    peers: {
                      Input: {
                        border: '1px solid #D1D1D1',
                        borderFocus: '1px solid #3799DC',
                        borderHover: '1px solid #3799DC',
                        borderRadius: '8px',
                        placeholderColor: '#ACACAC'
                      },
                      Scrollbar: {
                        borderRadius: '20px'
                      }
                    }
                  }"
                  @confirm="() => {}"
                >
                  <template #icon>
                    <n-icon :component="TimeIcon" />
                  </template>
                </n-time-picker>
              </div>
              <p>〜</p>
              <div class="flex">
                <CustomDatePicker
                  v-model:timestamp="formFilter.endDate2.date"
                  class="max-w-[150px]"
                  :disable-before="endDateDisable2"
                />
                <n-time-picker
                  v-model:value="formFilter.endDate2.time"
                  class="custom-time-picker"
                  placeholder="時間"
                  format="HH:mm"
                  :actions="null"
                  :theme-overrides="{
                    borderRadius: '10px',
                    itemTextColorActive: '#181818',
                    itemTextColor: '#181818',
                    peers: {
                      Input: {
                        border: '1px solid #D1D1D1',
                        borderFocus: '1px solid #3799DC',
                        borderHover: '1px solid #3799DC',
                        borderRadius: '8px',
                        placeholderColor: '#ACACAC'
                      },
                      Scrollbar: {
                        borderRadius: '20px'
                      }
                    }
                  }"
                  @confirm="() => {}"
                >
                  <template #icon>
                    <n-icon :component="TimeIcon" />
                  </template>
                </n-time-picker>
              </div>
            </div>
          </n-form-item>
          <button
            class="text-blue hover:text-dark_blue mt-1 inline-block bg-white border-none text-sm cursor-pointer transition-colors"
            href=""
            @click="clearConditions"
          >
            {{ t('common.clear_conditions') }}
          </button>
        </div>
      </n-form>
    </div>
    <div class="mt-3 bg-white rounded-[20px] px-6 py-6 overflow-auto">
      <p class="text-black text-base">{{ $t('dashboard.job.table_title') }}</p>
      <div class="flex gap-3 mt-3 justify-between items-start">
        <div flex gap-3 class="items-center">
          <div class="w-[105px]">
            <CustomSelect
              v-model:value="pageSize"
              :options="pageOptions"
              :disabled="!itemCount"
              @update:value="onUpdatePageSize"
            />
          </div>
          <div v-html="renderRangePage" class="text-black"></div>
        </div>
        <div class="flex-1 flex flex-wrap items-center justify-end gap-col-6 gap-row-2">
          <CustomButton
            class="max-w-220px"
            type="delete"
            :content="$t('dashboard.job.btn_delete')"
            :disabled="isDisableButtonSelect"
            @click="deleteMultipleJob"
          ></CustomButton>
          <CustomButton
            class="max-w-220px"
            type="primary"
            :disabled="isDisableButtonSelect"
            :themeOverrides="{
              border: '1px solid #D1D1D1',
              borderHover: '1px solid #D1D1D1',
              borderFocus: '1px solid #D1D1D1',
              borderPressed: '1px solid #D1D1D1'
            }"
            @click="downloadMultipleJob"
          >
            <template #icon>
              <n-icon size="14" class="pr-5">
                <DownloadIcon />
              </n-icon>
            </template>
            <span>{{ $t('dashboard.job.btn_download') }}</span>
          </CustomButton>
          <CustomButton class="max-w-220px self-start" type="secondary" @click="$router.push('register-job')">
            <template #icon>
              <n-icon size="10" class="pr-3">
                <AddIcon />
              </n-icon>
            </template>
            {{ $t('dashboard.job.add_job') }}
          </CustomButton>
        </div>
      </div>
      <div class="mt-4">
        <n-data-table
          :row-key="rowKey"
          :columns="columns"
          :data="listJob"
          :row-class-name="rowClassName"
          :pagination="pagination"
          :bordered="true"
          :on-update:page="handlePageChange"
          :loading="isLoading"
          :themeOverrides="{
            borderColor: '#D1D1D1',
            borderRadius: '10px',
            thTextColor: '#4A4C56',
            thColor: '#F0F5F8',
            thPaddingMedium: '8.3px 12px',
            tdPaddingMedium: '6.5px 8.3px',
            tdTextColor: '#181818',
            peers: {
              Pagination: {
                itemColorActive: !itemCount ? '#F5F5F5' : '#5B5B5B',
                itemColorActiveHover: !itemCount ? '#F5F5F5' : '#5B5B5B',
                itemColorHover: '#F5F5F5',
                itemTextColor: '#4F4F4F',
                itemTextColorHover: '#4F4F4F',
                itemTextColorActive: !itemCount ? '#ACACAC' : '#FFF',
                itemBorder: '1px solid #D1D1D1',
                itemBorderHover: '1px solid #D1D1D1',
                itemBorderActive: !itemCount ? '1px solid transparent' : '1px solid #5B5B5B',
                itemSizeMedium: '32px',
                itemFontSizeMedium: '12px'
              }
            }
          }"
          :resizable="true"
          @update:checked-row-keys="handleCheck"
        >
          <template #empty>
            <p class="font-bold text-sm">{{ $t('dashboard.user_management.msg_empty_data') }}</p>
          </template>
        </n-data-table>
      </div>
    </div>
  </div>

  <n-modal
    v-model:show="showModal"
    :auto-focus="false"
    transform-origin="center"
    :mask-closable="false"
    preset="dialog"
    title="Dialog"
    content="Are you sure?"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  >
    <template #header>Add record</template>
    <template #default>
      <div class="py-4">Modal content</div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
  import { c, DataTableRowKey, PaginationInfo, useMessage, useModal } from 'naive-ui'
  import { useCommonStore } from '@/stores/commonStore'
  import { storeToRefs } from 'pinia'
  import { Search } from '@vicons/ionicons5'
  import { DEFAULT_DURATION_TOAST, DEFAULT_PAGE_SIZE } from '@/constants/common'
  import CustomDatePicker from '@/components/CustomDatePicker.vue'
  import { pageOptions, statusOption } from '@/constants/dashboard'
  import CustomButton from '@/components/CustomButton.vue'
  import { useJobManagementStore } from '@/stores/listJobStore'
  import { JobType } from '@/types/dashboard'
  import { showModalInfo, showModalDownloadCSV } from '@/composables/common'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { createColumnsJob } from '@/composables/dashboard'
  import { TimeIcon, DownloadIcon, AddIcon, FilterIcon } from '@/assets/images/icons'
  import type { FormFilterJob } from '@/types/dashboard'
  import { cloneDeep, remove } from 'lodash'
  import { useJobApi } from '@/composables/useJobApi'
  import { renderMessage } from '@/composables/auth'

  const { t } = useI18n()
  const router = useRouter()
  const modal = useModal()
  const jobManagementStore = useJobManagementStore()
  const commonStore = useCommonStore()
  const { deleteJobApi, downloadCsvApi } = useJobApi()
  const { setListJob } = jobManagementStore
  const { dashboardTitle } = storeToRefs(commonStore)
  const { listJob } = storeToRefs(jobManagementStore)
  const pageSize = ref<string>(DEFAULT_PAGE_SIZE)
  const currentPage = ref<number>(1)
  const isLoading = ref<boolean>(false)
  const itemCount = ref<number>(0)
  const checkedRowKeysRef = ref<DataTableRowKey[]>([])
  const isDisableButtonSelect = ref<boolean>(true)
  const message = useMessage()
  const showModal = ref(false)
  const showModalRef = ref(false)
  const startDateDisable = ref<number | null>()
  const endDateDisable = ref<number | null>()
  const startDateDisable2 = ref<number | null>()
  const endDateDisable2 = ref<number | null>()

  const formFilterInit: FormFilterJob = {
    keyword: '',
    status: 'all',
    startDate: {
      date: null,
      time: null
    },
    endDate: {
      date: null,
      time: null
    },
    startDate2: {
      date: null,
      time: null
    },
    endDate2: {
      date: null,
      time: null
    }
  }
  const formFilter = reactive<FormFilterJob>(cloneDeep(formFilterInit))

  const pagination = ref({
    pageSize: +pageSize.value,
    onChange: (page: number) => {
      currentPage.value = page
    },
    prev: (props: PaginationInfo) => {
      return h(CustomButton, {
        type: 'default',
        size: 'pagination',
        content: '前へ',
        disabled: props.page === 1
      })
    },
    next: (props: PaginationInfo) => {
      return h(CustomButton, {
        type: 'default',
        size: 'pagination',
        content: '次へ',
        disabled: props.endIndex + 1 === props.itemCount
      })
    }
  })

  const columns = ref(
    createColumnsJob({
      download(row) {
        showModalDownloadCSV(modal, {
          title: t('dashboard.job.modal_label_download'),
          content: t('dashboard.job.modal_content_download'),
          type: 'secondary',
          onDownload: async (typeDownload: string) => {
            // Simulate the API call as a Promise
            await downloadCsvApi(typeDownload, row.id.toString())
          }
        })
      },
      deleteRow(row: JobType) {
        showModalInfo(modal, {
          title: t('dashboard.job.msg_delete_job'),
          content: t('dashboard.user_management.modal_content_msg_delete'),
          type: 'error',
          onSubmit: async () => {
            // Simulate the API call as a Promise
            await deleteJobApi([row.id])
            remove(checkedRowKeysRef.value, (id) => {
              return id == row.id
            })
            message.success(t('dashboard.job.msg_delete_success'), {
              render: renderMessage,
              duration: DEFAULT_DURATION_TOAST
            })
          }
        })
      },
      viewDetail(row: JobType) {
        router.push({
          name: 'Preview',
          query: {
            id: row.id
          }
        })
      }
    })
  )
  const renderRangePage = computed(() => {
    const size = +pageSize.value
    const totalItems = itemCount.value
    if (!totalItems) {
      return '0 / 0'
    }
    const start = (currentPage.value - 1) * size + 1
    const end = Math.min(currentPage.value * size, totalItems)
    return `${start}-${end}&nbsp;&nbsp/&nbsp;&nbsp${totalItems}`
  })
  const rowKey = (row: JobType) => row.id
  const handleCheck = (rowKeys: DataTableRowKey[]) => {
    const isDisable = !(rowKeys.length > 0)
    isDisableButtonSelect.value = isDisable
    checkedRowKeysRef.value = rowKeys
  }
  const rowClassName = (row: JobType) => {
    return checkedRowKeysRef.value.includes(row.id) ? 'selected-row' : ''
  }
  const onPositiveClick = () => {
    message.success('Submit')
    showModalRef.value = false
  }

  const onNegativeClick = () => {
    message.success('Cancel')
    showModalRef.value = false
  }

  const onUpdatePageSize = (pageSize: number) => {
    pagination.value.pageSize = pageSize
  }

  const handlePageChange = (page: number) => {
    console.log(page)
    setTimeout(() => {
      isLoading.value = false
    }, 200)
  }

  const downloadMultipleJob = () => {
    showModalDownloadCSV(modal, {
      title: t('dashboard.job.modal_label_download'),
      content: t('dashboard.job.modal_content_download'),
      type: 'secondary',
      onDownload: async (typeDownload: string) => {
        // Simulate the API call as a Promise
        const id = ['id1', 'id2']
        await downloadCsvApi(typeDownload, id)
      }
    })
  }

  const deleteMultipleJob = () => {
    showModalInfo(modal, {
      title: t('dashboard.job.msg_delete_multiple_job'),
      content: t('dashboard.user_management.modal_content_msg_delete'),
      type: 'error',
      onSubmit: async () => {
        // Simulate the API call as a Promise
        await deleteJobApi(checkedRowKeysRef.value as number[])
        checkedRowKeysRef.value = []
        message.success(t('dashboard.job.msg_delete_success'), {
          render: renderMessage,
          duration: DEFAULT_DURATION_TOAST
        })
      }
    })
  }

  const clearConditions = () => {
    const clonedFormFilterInit = cloneDeep(formFilterInit)
    Object.assign(formFilter, clonedFormFilterInit)
  }

  // function createData() {
  //   const statuses = ['created', 'updated', 'readingCompleted', 'loadingError', 'timeoutError']
  //   return Array.from({ length: 20 }).map((_, index) => ({
  //     id: index,
  //     jobName: `Job-${index}`,
  //     status: statuses[Math.floor(Math.random() * statuses.length)],
  //     owner: '江戸川コナン',
  //     createDate: '',
  //     updateDate: '',
  //     result: Math.floor(Math.random() * 10) === 0
  //   }))
  // }

  watch(
    [formFilter.startDate, formFilter.endDate, formFilter.startDate2, formFilter.endDate2],
    ([newEndDate, newStartDate, newEndDate2, newStartDate2]) => {
      endDateDisable.value = newEndDate.date
      startDateDisable.value = newStartDate.date
      endDateDisable2.value = newEndDate2.date
      startDateDisable2.value = newStartDate2.date
    },
    { immediate: true }
  )

  watch(
    () => itemCount.value,
    async () => {
      await nextTick()
      const containerTable = document.querySelector('.n-data-table-base-table-body')
      if (!itemCount.value) {
        containerTable?.classList.add('custom-border')
      } else {
        containerTable?.classList.remove('custom-border')
      }
    },
    {
      immediate: true
    }
  )

  watch(
    checkedRowKeysRef,
    (value) => {
      if (value.length === 0) isDisableButtonSelect.value = true
    },
    {
      deep: true
    }
  )

  onMounted(() => {
    dashboardTitle.value = t('dashboard.job.list_job_title')
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 500)
    //TODO: call api
    if (listJob.value.length) {
      itemCount.value = listJob.value.length
      return
    }
    // const data = createData()
    // itemCount.value = data.length
    setListJob([])
  })
</script>
<style lang="scss" scoped>
  :deep(.n-data-table) {
    .n-data-table__pagination {
      justify-content: center;
      margin-top: 16px;
    }
    .n-data-table-th__title {
      flex: none !important;
    }
    .n-data-table-base-table-body {
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
    }
    .n-pagination-item:not(.n-pagination-item--clickable) {
      border: none !important;
      padding: 0;
      border-radius: 7px;
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
    .n-data-table-th:nth-child(7),
    .n-data-table-th:nth-child(8),
    .n-data-table-th:nth-child(9) {
      .n-data-table-th__title-wrapper {
        display: block !important;
      }
    }
    .selected-row {
      position: relative;
      z-index: 100;
      margin-left: -20px;
      margin-right: -20px;
      box-shadow: 0 0 0 1px #2196f3;
    }

    .selected-row > .n-data-table-td {
      background-color: #eaf8ff;
      box-sizing: border-box;
    }
    .n-data-table-tr > .n-data-table-td:last-child {
      border-right: 1px solid transparent;
    }
    .n-data-table-tr > .n-data-table-td:first-child {
      border-left: 1px solid transparent;
    }
    .selected-row > .n-data-table-td:last-child {
      border-right-color: #3799dc;
    }
    .selected-row > .n-data-table-td:first-child {
      border-left-color: #3799dc;
    }
    .n-data-table-td.n-data-table-td--last-row {
      border-bottom: 1px solid transparent;
    }
    .selected-row > .n-data-table-td.n-data-table-td--last-row {
      border-bottom: 1px solid #3799dc;
    }
    .selected-row > .n-data-table-td.n-data-table-td--last-row:last-child {
      border-bottom-right-radius: 10px;
    }
    .selected-row > .n-data-table-td.n-data-table-td--last-row:first-child {
      border-bottom-left-radius: 10px;
    }
    .n-data-table-empty {
      padding: 20px 0;
    }
  }
  :deep(.custom-time-picker) {
    .n-input__suffix {
      display: flex;
      align-items: center;
      .n-base-icon {
        position: relative;
        left: -16px;
      }
    }
  }
  :deep(.n-date-picker .n-input__input-el) {
    height: 36px;
  }
  :deep(.n-time-picker) {
    .n-input__input-el {
      height: 36px;
    }
    .n-input-wrapper {
      width: 93px;
    }
  }
</style>
