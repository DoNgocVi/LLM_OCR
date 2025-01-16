<template>
  <p class="text-base text-grey_dark">{{ $t('dashboard.user_management.title') }}</p>
  <div class="flex mt-6 justify-between items-end">
    <div flex gap-3 class="items-center">
      <div class="w-[105px]">
        <CustomSelect
          v-model:value="pageSize"
          :disabled="!itemCount"
          :options="pageOptions"
          @update:value="onUpdatePageSize"
        />
      </div>
      <div v-html="renderRangePage" class="text-black"></div>
    </div>
    <CustomButton class="max-w-220px" type="secondary" :loading="loading" @click="handleRegisterUser">
      <template #icon>
        <n-icon size="10" class="pr-3">
          <AddIcon />
        </n-icon>
      </template>
      {{ $t('dashboard.user_management.btn_add') }}
    </CustomButton>
  </div>
  <div class="mt-6">
    <n-data-table
      :columns="columns"
      :data="listUser"
      :pagination="pagination"
      :bordered="false"
      :on-update:page="handlePageChange"
      :loading="isLoading"
      :themeOverrides="{
        thTextColor: '#4A4C56',
        thPaddingMedium: '8.3px 12px',
        tdPaddingMedium: '15.3px 12px',
        thColor: '#F0F5F8',
        borderRadius: '10px',
        borderColor: '#D1D1D1',
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
    >
      <template #empty>
        <p class="font-bold text-sm">{{ $t('dashboard.user_management.msg_empty_data') }}</p>
      </template>
    </n-data-table>
  </div>
</template>
<script lang="ts" setup>
  // import { renderMessage } from '@/composables/auth'
  // import { DEFAULT_DURATION_TOAST } from '@/constants/common'
  import type { User } from '@/types/dashboard'
  import AddIcon from '@/assets/images/icons/AddIcon.vue'
  import { useMessage } from 'naive-ui'
  import CustomButton from '@/components/CustomButton.vue'
  import { useRouter } from 'vue-router'
  import { useModal } from 'naive-ui'
  import { pageOptions } from '@/constants/dashboard'
  import { PaginationInfo } from 'naive-ui'
  import { DEFAULT_DURATION_TOAST, DEFAULT_PAGE_SIZE } from '@/constants/common'
  import { createColumnsUser } from '@/composables/dashboard'
  import { showModalInfo } from '@/composables/common'
  import { useI18n } from 'vue-i18n'
  import { useUserManagementStore } from '@/stores/userManagement'
  import { useCommonStore } from '@/stores/commonStore'
  import { storeToRefs } from 'pinia'
  import { renderMessage } from '@/composables/auth'

  // const loadingSubmit = ref<boolean>(false)
  const message = useMessage()
  const userManagementStore = useUserManagementStore()
  const commonStore = useCommonStore()
  const { loadingSubmit, dashboardTitle } = storeToRefs(commonStore)
  const { listUser } = storeToRefs(userManagementStore)
  const { setListUser, deleteUser } = userManagementStore
  const { t } = useI18n()
  const router = useRouter()
  const modal = useModal()
  const loading = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const pageSize = ref<string>(DEFAULT_PAGE_SIZE)
  const currentPage = ref<number>(1)
  const itemCount = ref<number>(0)
  const isSinglePage = ref<boolean>(false)
  const pagination = ref({
    pageSize: +pageSize.value,
    onChange: (page: number) => {
      currentPage.value = page
    },
    prev: (props: PaginationInfo) => {
      // remove when handle api
      if (props.itemCount === 0) {
        isSinglePage.value = true
      } else {
        isSinglePage.value = false
      }
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

  const handleRegisterUser = () => {
    router.push('register-user')
  }

  const handlePageChange = (page: number) => {
    console.log(page)
    setTimeout(() => {
      isLoading.value = false
    }, 200)
  }

  const onUpdatePageSize = (pageSize: number) => {
    pagination.value.pageSize = pageSize
  }

  const columns = ref(
    createColumnsUser({
      edit(row: User) {
        router.push({
          name: 'RegisterUser',
          query: {
            id: row.id,
            name: row.name,
            email: row.email,
            role: row.role
          }
        })
      },
      deleteRow(row: User) {
        showModalInfo(modal, {
          title: t('common.msg_delete'),
          content: t('dashboard.user_management.msg_delete'),
          type: 'error',
          onSubmit: async () => {
            loadingSubmit.value = true
            // Simulate the API call as a Promise
            await new Promise((resolve) => {
              setTimeout(() => {
                deleteUser(row.id)
                resolve(true)
              }, 2000)
            })
            message.success(t('dashboard.user_management.msg_delete_success'), {
              render: renderMessage,
              duration: DEFAULT_DURATION_TOAST
            })
            loadingSubmit.value = false
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
  // Todo: remove when implement api
  // function createData() {
  //   return Array.from({ length: 10 }).map((_, index) => ({
  //     id: index,
  //     name: `david-${index}`,
  //     email: `example${index}@email.com`,
  //     role: Math.floor(Math.random() * 20) % 2 === 1 ? '管理者' : 'ユーザー',
  //     address: `New York name. ${index} Lake Park`
  //   })) as User[]
  // }

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

  onMounted(() => {
    dashboardTitle.value = t('dashboard.user_management.user_management_title')
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 400)
    //TODO: call api
    // Mock data
    if (listUser.value.length) {
      itemCount.value = listUser.value.length
      return
    }
    // const data = createData()
    // itemCount.value = data.length
    setListUser([])
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
  }
</style>
