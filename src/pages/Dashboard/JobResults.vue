<template>
  <div class="">
    <div class="mt-3 bg-white rounded-[20px] px-3 py-2">
      <p>フィルター</p>
      <div class="flex gap-4">
        <n-input placeholder="キーワード検索" class="rounded-[10px]">
          <template #prefix>
            <n-icon :component="SearchOutline" />
          </template>
        </n-input>
        <n-select v-model:value="value1" :options="defaultOptionSelect" />
      </div>
    </div>
    <div class="mt-4">
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
        :on-update:page="handlePageChange"
        :loading="isLoading"
      />
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
  import { DataTableColumns, NButton, useMessage } from 'naive-ui'
  import { useCommonStore } from '@/stores/commonStore'
  import { storeToRefs } from 'pinia'
  import { SearchOutline } from '@vicons/ionicons5'
  import { defaultOptionSelect } from '@/constants/common'
  const commonStore = useCommonStore()
  const {} = storeToRefs(commonStore)
  const value1 = ref()
  type Song = {
    no: number
    title: string
    length: string
  }
  const message = useMessage()
  const pagination = ref({
    pageSize: 10
  })
  const isLoading = ref(false)
  const data = ref(createData())
  const showModal = ref(false)
  const showModalRef = ref(false)

  function createData() {
    return Array.from({ length: 100 }).map((_, index) => ({
      no: index,
      title: `John Brown ${index}`,
      length: (Math.random() * 40) | 0,
      address: `New York No. ${index} Lake Park`
    }))
  }

  const createColumns = ({ play }: { play: (row: Song) => void }): DataTableColumns<Song> => {
    return [
      {
        title: 'No',
        key: 'no'
      },
      {
        title: 'Title',
        key: 'title'
      },
      {
        title: 'Length',
        key: 'length'
      },
      {
        title: 'Action',
        key: 'actions',
        render(row) {
          return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => play(row)
            },
            { default: () => 'Play' }
          )
        }
      }
    ]
  }
  const columns = ref(
    createColumns({
      play(row: Song) {
        message.info(`Play ${row.title}`)
      }
    })
  )
  const handlePageChange = (page: number) => {
    // const infoPage = {
    //   page
    // }
    console.log(page, 'page')
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 200)
  }
  const onPositiveClick = () => {
    message.success('Submit')
    showModalRef.value = false
  }
  const onNegativeClick = () => {
    message.success('Cancel')
    showModalRef.value = false
  }
</script>
