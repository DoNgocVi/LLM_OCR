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
  <div class="mt-4">
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
      :on-update:page="handlePageChange"
      :loading="isLoading"
      :themeOverrides="{
        borderRadius: '10px',
        thTextColor: '#4A4C56'
      }"
    >
      <template #empty>
        <p class="font-bold text-sm">{{ $t('dashboard.user_management.msg_empty_data') }}</p>
      </template>
    </n-data-table>
  </div>
</template>
<script lang="ts" setup>
  import AddIcon from '@/assets/images/icons/AddIcon.vue'
  import CustomButton from '@/components/CustomButton.vue'
  import { useRouter } from 'vue-router'
  import { useModal } from 'naive-ui'
  // import { renderMessage } from '@/composables/auth'
  // import { defaultDurationToast } from '@/constants/common'
  import { pageOptions } from '@/constants/dashboard'
  import { PaginationInfo } from 'naive-ui'
  // import { useMessage } from 'naive-ui'
  import { DEFAULT_PAGE_SIZE } from '@/constants/common'
  import { createColumns } from '@/constants/dashboard'
  import type { User } from '@/types/dashboard'
  import { Close } from '@vicons/ionicons5'
  import { showModalDeleteRow } from '@/composables/common'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const router = useRouter()
  const modal = useModal()
  // const message = useMessage()
  const loading = ref<boolean>(false)
  const data = ref(createData())
  const isLoading = ref<boolean>(false)
  const pageSize = ref<string>(DEFAULT_PAGE_SIZE)
  const currentPage = ref<number>(1)
  const itemCount = ref<number>()
  const pagination = ref({
    pageSize: +pageSize.value,
    onChange: (page: number) => {
      console.log('change')
      currentPage.value = page
    },
    prev: (props: PaginationInfo) => {
      itemCount.value = props.itemCount
      return h(CustomButton, {
        type: 'default',
        content: '前へ',
        disabled: props.page === 1
      })
    },
    next: (props: PaginationInfo) => {
      return h(CustomButton, {
        type: 'default',
        content: '次へ',
        disabled: props.endIndex + 1 === props.itemCount
      })
    }
  })

  const handleRegisterUser = () => {
    router.push('register-user')
    console.log('submit')
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
    }))
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
        console.log(row, 'delete')
        showModalDeleteRow(modal, {
          title: t('common.msg_delete'),
          content: t('common.content_msg_delete'),
          type: 'error'
        })
        // data.value = data.value.filter((item) => item.id !== row.id)
        // message.info(`Delete ${row.email}`)
      }
    })
  )
  onMounted(() => {
    isLoading.value = true
    //Todo: call api
    setTimeout(() => {
      isLoading.value = false
    }, 500)
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
</style>
