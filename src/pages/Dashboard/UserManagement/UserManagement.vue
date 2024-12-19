<template>
  <div>
    <p class="text-base">{{ $t('dashboard.user_management.title') }}</p>
    <div class="flex mt-6 justify-between">
      <div flex gap-3 class="items-center">
        <div class="w-[105px]">
          <CustomSelect v-model:value="pageSize" :options="pageOptions" @update:value="onUpdatePageSize" />
        </div>
        <div>{{ `${(currentPage - 1) * +pageSize + 1} - ${currentPage * +pageSize} / ${itemCount}` }}</div>
        <!-- <div>1-5 / 5</div> -->
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
        :max-height="'calc(100vh - 390px)'"
        :themeOverrides="{
          borderRadius: '10px'
        }"
      >
        <template #empty>
          <p class="font-bold text-sm">{{ $t('dashboard.user_management.msg_empty_data') }}</p>
        </template>
      </n-data-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import AddIcon from '@/assets/images/icons/AddIcon.vue'
  import PencilIcon from '@/assets/images/icons/PencilIcon.vue'
  import TrashIcon from '@/assets/images/icons/TrashIcon.vue'
  import CustomButton from '@/components/CustomButton.vue'
  import { useRouter } from 'vue-router'
  // import { renderMessage } from '@/composables/auth'
  // import { defaultDurationToast } from '@/constants/common'
  import { pageOptions } from '@/constants/dashboard'
  import { PaginationInfo } from 'naive-ui'
  import { DataTableColumns, NButton, useMessage } from 'naive-ui'
  import { useI18n } from 'vue-i18n'
  import { DEFAULT_PAGE_SIZE } from '@/constants/common'

  type User = {
    name: number
    email: string
    role: number
  }

  const router = useRouter()
  const { t } = useI18n()
  const message = useMessage()
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
    // const infoPage = {
    //   page
    // }
    console.log(page, 'page')
    setTimeout(() => {
      isLoading.value = false
    }, 200)
  }

  function createData() {
    return Array.from({ length: 100 }).map((_, index) => ({
      name: index,
      email: `example${index}@email.com`,
      role: (Math.random() * 40) | 0,
      address: `New York name. ${index} Lake Park`
    }))
  }

  const createColumns = ({ play }: { play: (row: User) => void }): DataTableColumns<User> => {
    return [
      {
        title: '名前 ',
        key: 'name'
      },
      {
        title: 'メールアドレス ',
        key: 'email'
      },
      {
        title: '権限',
        key: 'role',
        sorter: (row1: User, row2: User) => {
          return row1.role - row2.role
        }
      },
      {
        title: '編集',
        key: 'actions',
        render(row) {
          return h(
            NButton,
            {
              size: 'small',
              themeOverrides: {
                color: 'transparent',
                waveOpacity: '0',
                border: 'none',
                borderFocus: 'none',
                borderHover: 'none',
                borderPressed: 'none'
              },
              class: 'btn-dropdown',
              onClick: () => play(row)
            },
            {
              icon: () =>
                h(PencilIcon, {
                  style: { color: '#fff', fontSize: '24px', marginTop: '1px' }
                })
            }
          )
        }
      },
      {
        title: '削除',
        key: 'actions2',
        render(row) {
          return h(
            NButton,
            {
              size: 'small',
              themeOverrides: {
                color: 'transparent',
                waveOpacity: '0',
                border: 'none',
                borderFocus: 'none',
                borderHover: 'none',
                borderPressed: 'none'
              },
              class: 'btn-dropdown',
              onClick: () => play(row)
            },
            {
              icon: () =>
                h(TrashIcon, {
                  style: { color: '#fff', fontSize: '24px', marginTop: '1px' }
                })
            }
          )
        }
      }
    ]
  }

  const onUpdatePageSize = (pageSize: number) => {
    pagination.value.pageSize = pageSize
  }

  const columns = ref(
    createColumns({
      play(row: User) {
        message.info(`Play ${row.email}`)
      }
    })
  )
</script>
<style lang="scss" scoped>
  :deep(.n-data-table-wrapper) {
    border: 1px solid #d1d1d1;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  :deep(.n-data-table__pagination) {
    justify-content: center;
    margin-top: 30px;
  }
  :deep(.n-data-table-th__title) {
    flex: none !important;
  }
</style>
