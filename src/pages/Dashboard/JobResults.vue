<template>
  <div class="">
    <div class="mt-3 bg-white rounded-[20px] px-5 py-[20px]">
      <div>
        <p>{{ $t('dashboard.job.title') }}</p>
      </div>
      <div class="flex gap-4 mt-2">
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
        <n-select v-model:value="value1" :options="defaultOptionSelect" />
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
  import { useMessage } from 'naive-ui'
  import { useCommonStore } from '@/stores/commonStore'
  import { storeToRefs } from 'pinia'
  import { Search } from '@vicons/ionicons5'
  import { defaultOptionSelect } from '@/constants/common'
  const commonStore = useCommonStore()
  const {} = storeToRefs(commonStore)
  const value1 = ref()

  const message = useMessage()
  const showModal = ref(false)
  const showModalRef = ref(false)
  const onPositiveClick = () => {
    message.success('Submit')
    showModalRef.value = false
  }
  const onNegativeClick = () => {
    message.success('Cancel')
    showModalRef.value = false
  }
</script>
