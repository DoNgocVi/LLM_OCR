<template>
  <div class="px-6 py-5">
    <p class="title font-bold text-xl color-primary">湯ックを</p>
    <div class="flex justify-between mt-3">
      <div class="flex gap-3">
        <n-button @click="showModal = true">長りま</n-button>
        <n-button>再更けさ</n-button>
      </div>
      <div class="flex gap-3">
        <n-button disabled>民際ぜ</n-button>
        <n-button disabled>オハナ佳通</n-button>
        <n-button>ルほち</n-button>
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
  <div>
    {{ count }}
  </div>
  <n-button @click="commonStore.increment">Increment</n-button>
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
  const commonStore = useCommonStore()
  const { count } = storeToRefs(commonStore)
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
    const infoPage = {
      page
    }
    console.log(infoPage)
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
