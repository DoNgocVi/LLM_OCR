<template>
  <n-modal
    v-model:show="showModalRegister"
    :auto-focus="false"
    transform-origin="center"
    :mask-closable="false"
    preset="card"
    positive-text="Confirm"
    negative-text="Cancel"
    :closable="false"
    :style="{
      maxWidth: '700px',
      borderRadius: '10px',
      padding: '0px 12px'
    }"
  >
    <template #header>
      <div class="pos-relative font-sans">
        <p class="font-bold text-[20px] mt-3">
          {{
            props.userId
              ? $t('dashboard.user_management.modal_title_reset')
              : $t('dashboard.user_management.modal_title_register')
          }}
        </p>
        <div
          class="pos-absolute -top-[70px] -right-[38px] rounded-full bg-[#D1D1D1] hover:bg-gray_dark w-[32px] h-[32px] flex items-center justify-center cursor-pointer transition-all"
          @click="handleCloseModal"
        >
          <n-icon size="18" :component="Close"></n-icon>
        </div>
      </div>
    </template>
    <template #default>
      <div class="flex gap-4 items-center">
        <n-switch v-model:value="autoSetPassword" size="small"></n-switch>
        <p class="cursor-pointer" @click="autoSetPassword = !autoSetPassword">
          {{ $t('dashboard.user_management.modal_label_checkbox') }}
        </p>
      </div>
      <div class="mt-6">
        <div
          :class="{
            'max-h-[36px]': !props.error
          }"
          class="relative transition-container"
        >
          <transition name="fade-slide">
            <div v-if="!autoSetPassword" key="input">
              <n-form novalidate label-placement="left" label-width="auto" require-mark-placement="right-hanging">
                <n-form-item
                  :validation-status="props.error ? 'error' : 'success'"
                  :feedback="props.error"
                  :show-feedback="!!props.error"
                  :theme-overrides="{
                    feedbackTextColorError: '#ED584F'
                  }"
                >
                  <n-input
                    v-model:value="props.password"
                    type="password"
                    class="rounded-lg h-[36px] flex items-center text-black max-w-[680px] w-full"
                    :validation-status="props.error ? 'error' : ''"
                    :show-feedback="props.error"
                    :theme-overrides="{
                      borderError: '1px solid #ED584F'
                    }"
                    :placeholder="$t('placeholder.enter_password')"
                    show-password-on="click"
                    @update:value="(value) => emit('update:password', value)"
                  >
                    <template #password-visible-icon>
                      <n-icon :size="24" :component="Eye" />
                    </template>
                    <template #password-invisible-icon>
                      <n-icon :size="24" :component="EyeOff" />
                    </template>
                  </n-input>
                  <template #feedback>
                    <div class="leading-[24px]" v-html="props.error"></div>
                  </template>
                </n-form-item>
              </n-form>
            </div>
            <div v-else key="password" class="h-[36px] mt-[6pz]">
              <div v-if="showPassword" class="flex gap-4">
                <div class="min-w-[125px] text-black">{{ props.password }}</div>
                <n-icon
                  class="text-gray_light cursor-pointer"
                  :size="24"
                  :component="Eye"
                  @click="
                    () => {
                      showPassword = false
                    }
                  "
                />
              </div>
              <div v-else class="flex items-center gap-4">
                <div class="-mt-1 min-w-[125px]">
                  <span v-for="i in 6" :key="i" class="text-grey_dark px-[2px] text-lg">●</span>
                </div>
                <n-icon
                  class="text-gray_light cursor-pointer"
                  :size="24"
                  :component="EyeOff"
                  @click="
                    () => {
                      showPassword = true
                    }
                  "
                />
              </div>
            </div>
          </transition>
        </div>
        <div class="mt-3">
          <n-tooltip
            placement="bottom-start"
            trigger="click"
            arrow-class="pos-relative top-[6px] !left-[26px]"
            :theme-overrides="{
              color: '#5B5B5B',
              borderRadius: '8px'
            }"
          >
            <template #trigger>
              <p :class="`text-primary hover:text-dark_blue cursor-pointer inline-block`" @click="copyPassword">
                {{ $t('dashboard.user_management.copy_password') }}
              </p>
            </template>
            <span>{{ $t('dashboard.user_management.msg_tooltip') }}</span>
          </n-tooltip>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center justify-end my-1 gap-6 font-sans">
        <CustomButton type="default" class="max-w-[118px]" content="キャンセル" @click="handleCloseModal" />
        <CustomButton
          type="secondary"
          class="max-w-[118px]"
          :content="props.userId ? t('dashboard.user_management.btn_reset') : t('common.setting')"
          :loading="loading"
          @click="setPassword"
        />
      </div>
    </template>
  </n-modal>
</template>
<script setup lang="ts">
  import Eye from '@/assets/images/icons/Eye.vue'
  import EyeOff from '@/assets/images/icons/EyeOff.vue'
  import { Close } from '@vicons/ionicons5'
  import { generatePassword, renderMessage } from '@/composables/auth'
  import { useMessage } from 'naive-ui'
  import { DEFAULT_DURATION_TOAST } from '@/constants/common'
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      default: ''
    },
    userId: {
      type: String
    },
    error: {
      type: String,
      default: ''
    }
  })
  const { t } = useI18n()
  const message = useMessage()

  const emit = defineEmits(['update:show', 'update:password', 'onRegisterPassword'])

  const autoSetPassword = ref<boolean>(false)
  const showPassword = ref<boolean>(false)
  const loading = ref<boolean>(false)
  const isValidPassword = ref<boolean>(false)
  const currentValuePasswordValid = ref<string>('')

  const showModalRegister = computed(() => {
    return props.show
  })

  const handleCloseModal = () => {
    autoSetPassword.value = false
    showPassword.value === false
    //delete password
    setTimeout(() => {
      if (isValidPassword.value) {
        emit('update:password', currentValuePasswordValid.value)
      } else {
        emit('update:password', '')
      }
      emit('update:show', false)
    })
  }
  const setPassword = async () => {
    await emit('onRegisterPassword')
    if (props.error) {
      isValidPassword.value = false
      return
    }
    loading.value = true
    isValidPassword.value = true
    await new Promise((resolve) => {
      setTimeout(() => {
        loading.value = false
        if (props.userId) {
          message.success(t('dashboard.user_management.msg_reset_password_success'), {
            render: renderMessage,
            duration: DEFAULT_DURATION_TOAST
          })
        }

        resolve(true)
      }, 200)
    })
    currentValuePasswordValid.value = props.password
    emit('update:show', false)
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(props.password)
  }

  watch(autoSetPassword, (value: boolean) => {
    if (value) {
      emit('update:password', '')
      const newPassword = generatePassword()
      emit('update:password', newPassword)
    } else {
      emit('update:password', '')
    }
  })
  onMounted(async () => {
    await nextTick()
    if (props.password) {
      currentValuePasswordValid.value = props.password
      isValidPassword.value = true
    }
  })
</script>
<style scope lang="scss">
  .transition-container {
    min-height: 40px;
  }

  .fade-slide-enter-active {
    transition: all 0.3s ease;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }

  .fade-slide-enter-to,
  .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>
