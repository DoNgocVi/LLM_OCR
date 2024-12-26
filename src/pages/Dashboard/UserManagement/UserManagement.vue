<template>
  <p class="text-base">{{ $t('dashboard.user_management.title') }}</p>
  <div class="flex mt-6 justify-between">
    <div flex gap-3 class="items-center">
      <div class="w-[105px]">
        <CustomSelect v-model:value="pageSize" :options="pageOptions" @update:value="onUpdatePageSize" />
      </div>
      <div>{{ `${(currentPage - 1) * +pageSize + 1} - ${currentPage * +pageSize} / ${itemCount}` }}</div>
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
  <div class="mt-5">
    <n-data-table
      :columns="columns"
      :data="listUser"
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
    >
      <template #empty>
        <p class="font-bold text-sm">{{ $t('dashboard.user_management.msg_empty_data') }}</p>
      </template>
    </n-data-table>
  </div>
</template>
<script lang="ts" setup>
  // import { renderMessage } from '@/composables/auth'
  // import { useMessage } from 'naive-ui'
  // import { defaultDurationToast } from '@/constants/common'
  import AddIcon from '@/assets/images/icons/AddIcon.vue'
  import CustomButton from '@/components/CustomButton.vue'
  import { useRouter } from 'vue-router'
  import { useModal } from 'naive-ui'
  import { pageOptions } from '@/constants/dashboard'
  import { PaginationInfo } from 'naive-ui'
  import { DEFAULT_PAGE_SIZE } from '@/constants/common'
  import { createColumns } from '@/constants/dashboard'
  import type { User } from '@/types/dashboard'
  import { showModalDeleteRow } from '@/composables/common'
  import { useI18n } from 'vue-i18n'
  import { useUserManagementStore } from '@/stores/userManagement'
  import { storeToRefs } from 'pinia'

  // const message = useMessage()
  const userManagementStore = useUserManagementStore()
  const { t } = useI18n()
  const router = useRouter()
  const modal = useModal()
  const loading = ref<boolean>(false)
  // const loadingDelete = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const pageSize = ref<string>(DEFAULT_PAGE_SIZE)
  const currentPage = ref<number>(1)
  const itemCount = ref<number>()
  const { listUser, loadingDelete } = storeToRefs(userManagementStore)
  const { setListUser, deleteUser } = userManagementStore

  const pagination = ref({
    pageSize: +pageSize.value,
    onChange: (page: number) => {
      currentPage.value = page
    },
    prev: (props: PaginationInfo) => {
      itemCount.value = props.itemCount
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
    console.log(page, 'page')
    setTimeout(() => {
      isLoading.value = false
    }, 200)
  }

  function createData() {
    return Array.from({ length: 100 }).map((_, index) => ({
      id: index,
      name: `david-${index}`,
      email: `example${index}@email.com`,
      role: Math.floor(Math.random() * 20) % 2 === 1 ? '管理者' : 'ユーザー',
      address: `New York name. ${index} Lake Park`
    })) as User[]
  }

  const onUpdatePageSize = (pageSize: number) => {
    pagination.value.pageSize = pageSize
  }

  const columns = ref(
    createColumns({
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
        showModalDeleteRow(modal, {
          title: t('common.msg_delete'),
          content: t('common.content_msg_delete'),
          type: 'error',
          onDelete: async () => {
            loadingDelete.value = true
            // Simulate the API call as a Promise
            await new Promise((resolve) => {
              setTimeout(() => {
                deleteUser(row.id)
                resolve(true)
              }, 2000)
            })
            loadingDelete.value = false
          }
        })
      }
    })
  )

  onMounted(() => {
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 500)
    //TODO: call api
    // Mock data
    if (listUser.value.length) return
    const data = createData()
    setListUser(data)
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
