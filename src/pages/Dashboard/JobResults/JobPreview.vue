<template>
  <header class="py-[14px] px-12 border-none border-b-1 border-b-solid border-grey_light h-[118px]">
    <div class="flex justify-between">
      <div w-220px>
        <CustomButton type="default" content="ジョブ結果一覧に戻る"></CustomButton>
      </div>
      <div class="flex gap-6">
        <CustomButton class="min-w-220px" type="primary" content="保存"></CustomButton>
        <CustomButton class="min-w-220px" type="secondary" content="ダウンロード"></CustomButton>
      </div>
    </div>
    <div class="flex mt-3">
      <div class="flex gap-12 flex-1">
        <p class="text-2xl font-bold leading-[36px]">読み取り結果</p>
        <CustomSelect class="max-w-[250px]" :options="[]"></CustomSelect>
        <div class="flex items-center justify-center gap-4">
          <button
            class="pagination-btn cursor-pointer bg-transparent outline-none border-none flex items-center"
            :disabled="currentPage === 1"
            @click="goToPreviousPage"
          >
            <n-icon :component="CaretIcon"></n-icon>
          </button>

          <span class="text-base">{{ currentPage }}/{{ totalPages }}ページ</span>

          <button
            class="pagination-btn cursor-pointer bg-transparent outline-none border-none flex items-center"
            :disabled="currentPage === totalPages"
            @click="goToNextPage"
          >
            <n-icon class="rotate-180" :component="CaretIcon"></n-icon>
          </button>
        </div>
      </div>
      <div class="flex gap-12 items-center">
        <p>
          <span>ジョブ名：</span>
          <span>{{ props.jobName }}</span>
        </p>
        <p>
          <span>ジョブ名：</span>
          <span>{{ props.documentType }}</span>
        </p>
      </div>
    </div>
  </header>
  <section class="preview-container bg-main grid grid-cols-5 gap-4 h-full">
    <!-- Bên trái (2/5) -->
    <div class="col-span-2 bg-white p-4 overflow-hidden pos-relative">
      <div pos-absolute class="top-1 left-0 z-10">asdada</div>
      <VuePdfEmbed
        annotation-layer
        text-layer
        :source="'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf'"
        :page="currentPage"
      />
    </div>

    <!-- Bên phải (3/5) -->
    <div class="col-span-3 flex flex-col">
      <p class="text-[#5B5B5B] text-2xl font-bold leading-[36px]">読み取り項目</p>
      <div class="bg-white p-6 flex-1 mt-3 rounded-[20px]">
        <!-- <n-data-table
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
            borderColor: '#D1D1D1'
          }"
        >
          <template #empty>
            <p class="font-bold text-sm">{{ $t('dashboard.user_management.msg_empty_data') }}</p>
          </template>
        </n-data-table> -->
      </div>
      <div class="flex justify-end mt-3 gap-6">
        <CustomButton class="max-w-220px" content="現在のページをロック">
          <template #icon>
            <n-icon color-gray_light class="relative -left-[2px] top-[2px]">
              <LockIcon />
            </n-icon>
          </template>
          現在のページをロック
        </CustomButton>
        <CustomButton type="tertiary" class="max-w-220px">
          <template #icon>
            <n-icon color-white class="relative -left-[2px] top-[2px]">
              <LockIcon />
            </n-icon>
            ジョブ全体をロック
          </template>
        </CustomButton>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
  import CaretIcon from '@/assets/images/icons/CaretIcon.vue'
  import LockIcon from '@/assets/images/icons/LockIcon.vue'
  import VuePdfEmbed from 'vue-pdf-embed'
  const props = defineProps({
    jobName: {
      type: String,
      default: 'テストファイルA-1',
      required: true
    },
    documentType: {
      type: String,
      default: 'テンプレートA',
      required: true
    }
  })

  const isLoading = ref(false)
  const pageCount = ref(1)
  const currentPage = ref<number>(1)
  const totalPages = ref<number>(3)
  const goToPreviousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1
    }
  }
  const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1
    }
  }
</script>
<style lang="scss" scoped>
  .pagination-btn:disabled {
    cursor: not-allowed;
  }
  .preview-container {
    height: calc(100vh - 118px);
    padding-left: 64px;
    padding-right: 24px;
    padding-top: 48px;
    padding-bottom: 12px;
  }
</style>
