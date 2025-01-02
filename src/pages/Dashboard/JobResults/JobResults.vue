<template>
  <div class="">
    <div class="mt-3 bg-white rounded-[20px] px-6 py-6">
      <div class="flex items-center">
        <n-icon size="13" color="#858D9D">
          <FilterIcon />
        </n-icon>
        <p>{{ $t('dashboard.job.title') }}</p>
      </div>
      <n-form label-placement="left">
        <div class="flex gap-4 mt-2 flex-wrap">
          <div class="max-w-[280px] w-full">
            <n-input
              placeholder="キーワード検索"
              class="w-full"
              :theme-overrides="{
                iconColor: '#858D9D',
                borderRadius: '8px'
              }"
            >
              <template #prefix>
                <n-icon :component="Search" />
              </template>
            </n-input>
          </div>
          <n-form-item label="ステータス" :show-feedback="false">
            <n-select v-model:value="value1" class="w-[180px]" :options="defaultOptionSelect" />
          </n-form-item>
          <n-form-item label="作成日時" :show-feedback="false">
            <div class="flex items-center gap-2 min-w-[226px]">
              <div class="flex">
                <CustomDatePicker v-model:timestamp="startDate.date" :disable-after="startDateDisable" />
                <n-time-picker
                  default-formatted-value="11:00"
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
                        borderRadius: '8px'
                      },
                      Scrollbar: {
                        borderRadius: '20px'
                      }
                    }
                  }"
                  @confirm="() => {}"
                />
              </div>
              <p>〜</p>
              <div class="flex">
                <CustomDatePicker v-model:timestamp="endDate.date" :disable-before="endDateDisable" />
                <n-time-picker
                  default-formatted-value="11:00"
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
                        borderRadius: '8px'
                      },
                      Scrollbar: {
                        borderRadius: '20px'
                      }
                    }
                  }"
                  @confirm="() => {}"
                />
              </div>
            </div>
          </n-form-item>
          <n-form-item label="更新日時" :show-feedback="false">
            <div class="flex items-center gap-2 min-w-[226px]">
              <div class="flex">
                <CustomDatePicker v-model:timestamp="startDate.date" :disable-after="startDateDisable" />
                <n-time-picker
                  default-formatted-value="11:00"
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
                        borderRadius: '8px'
                      },
                      Scrollbar: {
                        borderRadius: '20px'
                      }
                    }
                  }"
                  @confirm="() => {}"
                />
              </div>
              <p>〜</p>
              <div class="flex">
                <CustomDatePicker v-model:timestamp="endDate.date" :disable-before="endDateDisable" />
                <n-time-picker
                  default-formatted-value="11:00"
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
                        borderRadius: '8px'
                      },
                      Scrollbar: {
                        borderRadius: '20px'
                      }
                    }
                  }"
                  @confirm="() => {}"
                />
              </div>
            </div>
          </n-form-item>
          <p>
            <a class="text-blue mt-1 inline-block ml-4" href="">条件をクリア</a>
          </p>
        </div>
      </n-form>
    </div>
    <div class="mt-3 bg-white rounded-[20px] px-6 py-6">
      <p>ジョブ結果一覧</p>
      <div class="flex mt-6 justify-between">
        <div flex gap-3 class="items-center">
          <div class="w-[105px]">
            <CustomSelect v-model:value="pageSize" :options="pageOptions" @update:value="onUpdatePageSize" />
          </div>
          <div>{{ `${(currentPage - 1) * +pageSize + 1} - ${currentPage * +pageSize} / ${itemCount}` }}</div>
        </div>
        <div class="flex-1 flex items-center justify-end gap-6">
          <CustomButton
            class="max-w-220px"
            type="delete"
            :loading="loading"
            :disabled="isDisabledBtnDelete"
            @click="deleteMultipleJob"
          >
            <template #icon>
              <n-icon size="10" class="pr-3">
                <AddIcon />
              </n-icon>
            </template>
            {{ $t('dashboard.job.btn_delete') }}
          </CustomButton>
          <CustomButton
            class="max-w-220px"
            type="primary"
            :disabled="isDisabledBtnDownload"
            :loading="loading"
            :themeOverrides="{
              border: '1px solid #D1D1D1',
              borderHover: '1px solid #D1D1D1',
              borderFocus: '1px solid #D1D1D1',
              borderPressed: '1px solid #D1D1D1'
            }"
            @click="downloadMultipleJob"
          >
            <template #icon>
              <n-icon size="14" class="pr-3">
                <DownloadIcon />
              </n-icon>
            </template>
            {{ $t('dashboard.job.btn_download') }}
          </CustomButton>
          <CustomButton class="max-w-220px" type="secondary" :loading="loading" @click="$router.push('register-job')">
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
          :pagination="pagination"
          :bordered="false"
          :on-update:page="handlePageChange"
          :loading="isLoading"
          :themeOverrides="{
            borderRadius: '10px',
            thTextColor: '#4A4C56',
            peers: {
              Pagination: {
                itemColorActive: '#5B5B5B',
                itemColorActiveHover: '#2A2A2A',
                itemTextColor: '#4F4F4F',
                itemTextColorHover: '#4F4F4F',
                itemTextColorActive: '#FFF',
                itemBorder: '1px solid #D1D1D1',
                itemBorderHover: '1px solid #D1D1D1',
                itemBorderActive: '1px solid #5B5B5B',
                itemSizeMedium: '32px'
              }
            }
          }"
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
  import { DataTableRowKey, PaginationInfo, useMessage, useModal } from 'naive-ui'
  import { useCommonStore } from '@/stores/commonStore'
  import { storeToRefs } from 'pinia'
  import { Search } from '@vicons/ionicons5'
  import { DEFAULT_PAGE_SIZE, defaultOptionSelect } from '@/constants/common'
  import CustomDatePicker from '@/components/CustomDatePicker.vue'
  import FilterIcon from '@/assets/images/icons/FilterIcon.vue'
  import { pageOptions } from '@/constants/dashboard'
  import CustomButton from '@/components/CustomButton.vue'
  import { useJobManagementStore } from '@/stores/listJobStore'
  import { ListJobType } from '@/types/dashboard'
  import { showModalDeleteRow, showModalDownloadCSV } from '@/composables/common'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { createColumnsJob } from '@/composables/dashboard'
  import AddIcon from '@/assets/images/icons/AddIcon.vue'
  import DownloadIcon from '@/assets/images/icons/DownloadIcon.vue'

  const router = useRouter()
  const modal = useModal()
  const { t } = useI18n()
  const jobManagementStore = useJobManagementStore()
  const { setListJob, deleteJob } = jobManagementStore
  const commonStore = useCommonStore()
  const { loadingDelete, loadingDownload } = storeToRefs(commonStore)
  const { listJob } = storeToRefs(jobManagementStore)
  const value1 = ref()
  const pageSize = ref<string>(DEFAULT_PAGE_SIZE)
  const currentPage = ref<number>(1)
  const loading = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const itemCount = ref<number>(0)
  const checkedRowKeysRef = ref<DataTableRowKey[]>([])
  const isDisabledBtnDownload = ref<boolean>(true)
  const isDisabledBtnDelete = ref<boolean>(true)
  const message = useMessage()
  const showModal = ref(false)
  const showModalRef = ref(false)
  const startDateDisable = ref<number>()
  const endDateDisable = ref<number>()
  const startDate = reactive<{ date: number; time: string }>({
    date: Date.now(),
    time: '11:11'
  })
  const endDate = reactive<{ date: number; time: string }>({
    date: Date.now() + 86400000,
    time: '11:11'
  })

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
            console.log(row.id, typeDownload, 'row')
            loadingDownload.value = true
            // Simulate the API call as a Promise
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve(true)
              }, 2000)
            })
            loadingDownload.value = false
          }
        })
      },
      deleteRow(row: ListJobType) {
        showModalDeleteRow(modal, {
          title: t('common.msg_delete'),
          content: t('common.content_msg_delete'),
          type: 'error',
          // loading: loadingDelete,
          onDelete: async () => {
            loadingDelete.value = true
            // Simulate the API call as a Promise
            await new Promise((resolve) => {
              setTimeout(() => {
                deleteJob([row.id])
                resolve(true)
              }, 2000)
            })
            loadingDelete.value = false
          }
        })
      }
    })
  )

  const tableData = ref<[]>([])
  const rowKey = (row: ListJobType) => row.id
  const handleCheck = (rowKeys: DataTableRowKey[]) => {
    const isDisable = !(rowKeys.length > 0)
    isDisabledBtnDelete.value = isDisable
    isDisabledBtnDownload.value = isDisable
    checkedRowKeysRef.value = rowKeys
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
        console.log(checkedRowKeysRef.value, typeDownload, 'download multiple')
        loadingDownload.value = true
        // Simulate the API call as a Promise
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
          }, 2000)
        })
        loadingDownload.value = false
      }
    })
  }

  const deleteMultipleJob = () => {
    showModalDeleteRow(modal, {
      title: t('common.msg_delete'),
      content: t('common.content_msg_delete'),
      type: 'error',
      onDelete: async () => {
        loadingDelete.value = true
        // Simulate the API call as a Promise
        await new Promise((resolve) => {
          setTimeout(() => {
            deleteJob(checkedRowKeysRef.value as number[])
            resolve(true)
          }, 2000)
        })
        loadingDelete.value = false
      }
    })
  }
  watch(
    () => startDate.date,
    (value) => {
      endDateDisable.value = value
    },
    { immediate: true, deep: true }
  )
  watch(
    () => endDate.date,
    (value) => {
      startDateDisable.value = value
    },
    { immediate: true, deep: true }
  )

  function createData() {
    const statuses = ['created', 'updated', 'readingCompleted', 'loadingError', 'timeoutError']
    return Array.from({ length: 100 }).map((_, index) => ({
      id: index,
      jobName: `Job-${index}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      owner: '江戸川コナン',
      createDate: '2024/12/05 12:50',
      updateDate: '2024/12/12 16:50',
      result: Math.floor(Math.random() * 10) === 0
    })) as ListJobType[]
  }

  onMounted(() => {
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 500)
    //TODO: call api
    // Mock data
    if (tableData.value.length) return
    const data = createData()
    itemCount.value = data.length
    setListJob(data)
  })
</script>
<style lang="scss" scoped>
  :deep(.n-data-table__pagination) {
    justify-content: center;
    margin-top: 30px;
  }
  :deep(.n-data-table-th__title) {
    flex: none !important;
  }
  :deep(.n-data-table-base-table-body) {
    border: 1px solid #d1d1d1;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  :deep(.n-pagination-item:not(.n-pagination-item--clickable)) {
    border: none !important;
  }
</style>
