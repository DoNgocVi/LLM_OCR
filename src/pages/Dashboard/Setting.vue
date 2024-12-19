<template>
  <div class="bg-white rounded-[10px] px-6 py-[26px] text-dark_medium">
    <div v-if="!isEdit" class="w-[220px] ml-a">
      <CustomButton type="primary" content="編集" @click="isEdit = true" />
    </div>
    <div v-else class="w-full flex justify-end">
      <div class="max-w-[464px] w-full flex gap-6">
        <CustomButton type="default" content="キャンセル" @click="isEdit = false" />
        <CustomButton
          type="secondary"
          content="保存"
          :loading="loading"
          :disabled="valueSelect === currentValueSelect"
          @click="handelSubmit"
        />
      </div>
    </div>

    <p>{{ $t('dashboard.setting.title') }}</p>
    <div class="mt-8 pb-[14px] border-b-1 border-b-solid border-grey_light px-2 flex items-center gap-[120px]">
      <p class="font-bold">{{ $t('dashboard.setting.label') }}</p>
      <div class="w-[200px]">
        <n-select
          v-model:show="show"
          :value="valueSelect"
          placeholder="Please select a song"
          :class="{
            'no-click': !isEdit
          }"
          :options="timeOptions"
          :theme-overrides="{
            peers: {
              InternalSelection: {
                borderRadius: '8px',
                border: isEdit ? '1px solid #D1D1D1' : 'none',
                borderHover: isEdit ? '1px solid #D1D1D1' : 'none',
                borderFocus: isEdit ? '1px solid #D1D1D1' : 'none',
                borderActive: isEdit ? '1px solid #D1D1D1' : 'none',
                boxShadowActive: isEdit ? '0 0 4px rgba(0, 0, 0, 0.25)' : 'none',
                boxShadowFocus: isEdit ? '0 0 4px rgba(0, 0, 0, 0.25)' : 'none'
              },
              InternalSelectMenu: {
                optionTextColorActive: '#4F4F4F',
                optionCheckColor: '#858D9D',
                borderRadius: '0px'
              }
            }
          }"
          @update:value="handleSelect"
        >
          <template #arrow>
            <transition name="slide-left">
              <template v-if="isEdit">
                <CaretUpOutline v-if="show" />
                <CaretDownOutline v-else />
              </template>
            </transition>
          </template>
        </n-select>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { renderMessage } from '@/composables/auth'
  import { defaultDurationToast } from '@/constants/common'
  import { timeOptions } from '@/constants/dashboard'
  import { CaretDownOutline, CaretUpOutline } from '@vicons/ionicons5'
  import { useMessage } from 'naive-ui'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const message = useMessage()
  const isEdit = ref(false)
  const show = ref(false)
  const loading = ref(false)
  const valueSelect = ref<string>('7day') // get value from api
  const currentValueSelect = ref<string>('7day')
  const handleSelect = (value: string) => {
    valueSelect.value = value
  }

  const handelSubmit = () => {
    loading.value = true
    setTimeout(() => {
      message.success(t('dashboard.setting.msg_success'), {
        render: renderMessage,
        duration: defaultDurationToast
      })
      currentValueSelect.value = valueSelect.value
      isEdit.value = false
      loading.value = false
    }, 1000)
  }
  onUnmounted(() => {
    isEdit.value = false
  })
</script>
<style lang="scss" scoped>
  :deep(.v-binder-follower-content) {
    border: 1px solid green;
  }
  .no-click {
    pointer-events: none;
  }
</style>
msg_success
