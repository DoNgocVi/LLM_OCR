<template>
  <div class="">
    <div class="mt-3 bg-white rounded-[20px] px-5 py-[20px]">
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
          <n-form-item label="ステータス">
            <n-select v-model:value="value1" class="w-[180px]" :options="defaultOptionSelect" />
          </n-form-item>
          <n-form-item label="作成日時">
            <div class="flex items-center gap-2 min-w-[226px]">
              <div class="flex">
                <CustomDatePicker
                  v-model:timestamp="startDate.date"
                  :dateDisable="startDateDisable"
                  :isStartDate="true"
                />
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
                <CustomDatePicker v-model:timestamp="endDate.date" :dateDisable="endDateDisable" />
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
          <n-form-item label="更新日時">
            <div class="flex items-center gap-2 min-w-[226px]">
              <div class="flex">
                <CustomDatePicker
                  v-model:timestamp="startDate.date"
                  :dateDisable="startDateDisable"
                  :isStartDate="true"
                />
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
                <CustomDatePicker v-model:timestamp="endDate.date" :dateDisable="endDateDisable" />
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
  import CustomDatePicker from '@/components/CustomDatePicker.vue'
  import FilterIcon from '@/assets/images/icons/FilterIcon.vue'

  const commonStore = useCommonStore()
  const {} = storeToRefs(commonStore)
  const value1 = ref()

  const message = useMessage()
  const showModal = ref(false)
  const showModalRef = ref(false)
  const startDate = reactive<{ date: number; time: string }>({
    date: Date.now(),
    time: '11:11'
  })
  const endDate = reactive<{ date: number; time: string }>({
    date: Date.now() + 86400000,
    time: '11:11'
  })
  const startDateDisable = ref<number | boolean>()
  const endDateDisable = ref<number | boolean>()

  const onPositiveClick = () => {
    message.success('Submit')
    showModalRef.value = false
  }
  const onNegativeClick = () => {
    message.success('Cancel')
    showModalRef.value = false
  }
  watch(
    () => startDate.date,
    (value) => {
      console.log(value, 'value')
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
</script>
<style scope lang="scss"></style>
