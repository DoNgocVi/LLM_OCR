<template>
  <div class="bg-white rounded-[20px] px-6 py-[26px] text-dark_medium">
    <div v-if="!isEdit" class="w-[220px] ml-a">
      <CustomButton type="primary" content="編集" @click="isEdit = true" />
    </div>
    <div v-else class="w-full flex justify-end">
      <div class="max-w-[464px] w-full flex gap-6">
        <CustomButton type="default" content="キャンセル" @click="isEdit = false" />
        <CustomButton type="secondary" content="保存" :loading="loading" @click="handelSubmit" />
      </div>
    </div>
    <div>
      <div class="company-info">
        <div
          v-for="(field, index) in fields"
          :key="index"
          class="info-row border-b-1 border-b-solid border-b-grey_light"
        >
          <div class="max-w-[300px] w-full font-bold pl-2">{{ field.label }}</div>
          <div class="info-value">
            <template v-if="field.editable && isEdit">
              <n-input
                v-model:value="field.value"
                type="text"
                size="medium"
                placeholder="Basic Input"
                :theme-overrides="{
                  borderRadius: '8px',
                  heightMedium: '36px'
                }"
              />
              <div v-if="field.error" class="error-message">{{ field.error }}</div>
            </template>
            <template v-else>
              {{ field.value }}
            </template>
          </div>
        </div>
        <!-- <button @click="toggleEdit">{{ isEdit ? 'Lưu' : 'Chỉnh sửa' }}</button> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { renderMessage } from '@/composables/auth'
  import { defaultDurationToast } from '@/constants/common'
  import { useMessage } from 'naive-ui'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const message = useMessage()
  const isEdit = ref(false)
  const loading = ref(false)
  const valueSelect = ref<string>('7day') // get value from api
  const currentValueSelect = ref<string>('7day')

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

  const fields = ref<{ label: string; value: string; editable: boolean; error?: string }[]>([
    { label: '企業名', value: '株式会社ITSO', editable: true, error: '' },
    { label: '企業ID', value: 'xxxxxxxxxxx', editable: false },
    { label: 'ご契約中のプラン', value: 'Basic', editable: false },
    { label: '郵便番号', value: '〒105-0001', editable: true, error: '' },
    { label: '住所', value: '東京都港区虎ノ門3丁目...', editable: true, error: '' },
    { label: '電話番号', value: '03-4500-2002', editable: true, error: '' },
    { label: 'ご連絡先メールアドレス', value: 'test@example.com', editable: true, error: '' },
    { label: 'ご連絡先担当者名', value: '江戸川コナン', editable: true, error: '' }
  ])

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
  .info-row {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    min-height: 60px;
  }
  .info-value {
    flex: 1;
  }
  .input-error {
    border: 1px solid red;
  }
  .error-message {
    color: red;
    font-size: 12px;
  }
  button {
    margin-top: 20px;
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
</style>
