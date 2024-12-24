<template>
  <div class="header h-[50px] px-10 flex justify-end">
    <div class="flex items-center justify-center gap-6">
      <span class="text-sm color-dark_medium">株式会社ITSO</span>
      <div class="flex items-center gap-2">
        <n-icon size="24" color="#aaaaaa" class="cursor-pointer">
          <PersonCircle />
        </n-icon>
        <n-dropdown
          class="w-[232px] border-1 border-solid border-grey_light shadow-none"
          trigger="click"
          :options="accountOption"
          :theme-overrides="{
            borderRadius: '8px'
          }"
          @select="handleSelect"
          @update-show="
            () => {
              isShowDropdown = !isShowDropdown
            }
          "
        >
          <n-button class="flex items-center gap-2 pl-1 pr-[6px] btn-dropdown" :theme-overrides="buttonTheme">
            {{ userName }}
            <n-icon>
              <template v-if="isShowDropdown">
                <CaretUpOutline style="color: #858d9d; margin-left: 6px; margin-top: 1px" />
              </template>
              <template v-else>
                <CaretDownOutline style="color: #858d9d; margin-left: 6px; margin-top: 1px" />
              </template>
            </n-icon>
          </n-button>
        </n-dropdown>
      </div>
    </div>
  </div>
  <!-- Modal logout -->
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
      <div class="pos-relative font-sans">
        <p class="text-center font-bold text-[20px] mt-3">{{ $t('common.msg_logout') }}</p>
        <div
          class="pos-absolute -top-[70px] -right-[38px] rounded-full bg-[#D1D1D1] hover:bg-gray_dark w-[32px] h-[32px] flex items-center justify-center cursor-pointer transition-all"
          @click="showModalLogout = false"
        >
          <n-icon size="18" :component="Close"></n-icon>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center mt-1 gap-6 font-sans">
        <CustomButton
          type="default"
          content="キャンセル"
          @click="
            () => {
              showModalLogout = false
            }
          "
        />
        <CustomButton type="secondary" content="ログアウト" :loading="loadingLogout" @click="handleLogout" />
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
  import { CaretDownOutline, CaretUpOutline, PersonCircle, Close } from '@vicons/ionicons5'
  import { NIcon } from 'naive-ui'
  import { accountOption } from '@/constants/common'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import CustomButton from '@components/CustomButton.vue'
  import { generateThemeOverrides } from '@/composables/common'

  const buttonTheme = {
    color: 'transparent',
    colorHover: '#F5F5F5',
    border: 'none',
    textColor: '#181818',
    ...generateThemeOverrides({
      border: 'none',
      textColor: '#181818'
    }),
    waveOpacity: '0'
  }
  const { t } = useI18n()
  const router = useRouter()
  const emit = defineEmits(['setTitle'])
  const showModalLogout = ref<boolean>(false)
  const userName = ref<string>('ゲスト')
  const isShowDropdown = ref<boolean>(false)
  const loadingLogout = ref<boolean>(false)

  const handleSelect = (value: string) => {
    if (value === 'my-account') {
      emit('setTitle', t('title.user_setting'))
      // router.push(`/${value}`)
    } else {
      showModalLogout.value = true
    }
  }
  const handleLogout = () => {
    // Todo: handle call api logout
    loadingLogout.value = true
    localStorage.removeItem('token')
    setTimeout(() => {
      loadingLogout.value = false
      router.push('/auth/login')
    }, 1500)
  }
</script>
<style lang="scss" scoped></style>
