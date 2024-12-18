<template>
  <div class="header h-[50px] px-10 flex justify-end">
    <div class="flex items-center justify-center gap-6">
      <span class="text-sm color-dark_medium">株式会社ITSO</span>
      <div class="flex items-center gap-2">
        <n-icon size="24" color="#aaaaaa" class="cursor-pointer">
          <PersonCircle />
        </n-icon>
        <n-dropdown
          class="w-[232px]"
          :options="accountOption"
          :theme-overrides="{
            borderRadius: '8px'
          }"
          @select="handleSelect"
        >
          <n-button class="flex items-center gap-2 btn-dropdown pl-1 pr-[6px]" :theme-overrides="buttonTheme">
            {{ userName }}
            <n-icon>
              <CaretDownOutline style="color: #858d9d; margin-left: 6px; margin-top: 1px" />
            </n-icon>
          </n-button>
        </n-dropdown>
      </div>
    </div>
  </div>
  <n-modal
    v-model:show="showModalLogout"
    :auto-focus="false"
    transform-origin="center"
    :mask-closable="false"
    preset="card"
    positive-text="Confirm"
    negative-text="Cancel"
    :closable="false"
    :style="{
      maxWidth: '330px',
      borderRadius: '10px',
      padding: '0px 12px'
    }"
  >
    <template #header>
      <div class="pos-relative">
        <p class="text-center font-bold text-[20px] mt-3">ログアウトしますか？</p>
        <div
          class="pos-absolute -top-[70px] -right-[38px] rounded-full bg-[#D1D1D1] w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
          @click="showModalLogout = false"
        >
          <n-icon size="20" :component="Close"></n-icon>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center mt-1 gap-6">
        <CustomButton type="default" content="キャンセル" @click="showModalLogout = false" />
        <CustomButton type="secondary" content="ログアウト" @click="handleLogout" />
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
  import { CaretDownOutline, PersonCircle, Close } from '@vicons/ionicons5'
  import { NIcon } from 'naive-ui'
  import { accountOption } from '@/constants/common'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import CustomButton from '@components/CustomButton.vue'

  const buttonTheme = {
    color: 'transparent',
    colorHover: '#F5F5F5',
    border: 'none',
    borderHover: 'none',
    borderFocus: 'none',
    borderPressed: 'none',
    textColor: '#181818',
    textColorHover: '#181818',
    textColorFocus: '#181818',
    textColorPressed: '#181818',
    waveOpacity: '0'
  }
  const { t } = useI18n()
  const router = useRouter()
  const emit = defineEmits(['setTitle'])
  const showModalLogout = ref<boolean>(false)
  const userName = ref<string>('ゲスト')
  const handleSelect = (value: string) => {
    if (value === 'my-account') {
      emit('setTitle', t('title.user_setting'))
      router.push(value)
    } else {
      showModalLogout.value = true
    }
  }
  const handleLogout = () => {
    // Todo: handle call api logout
  }
</script>
<style lang="scss" scoped></style>
