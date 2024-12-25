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
        <p class="font-bold text-[20px] mt-3">{{ $t('dashboard.user_management.modal_title') }}</p>
        <div
          class="pos-absolute -top-[70px] -right-[38px] rounded-full bg-[#D1D1D1] hover:bg-gray_dark w-[32px] h-[32px] flex items-center justify-center cursor-pointer transition-all"
          @click="
            () => {
              $emit('update:show', false)
            }
          "
        >
          <n-icon size="18" :component="Close"></n-icon>
        </div>
      </div>
    </template>
    <template #default>
      <div class="flex gap-4 items-center">
        <n-switch v-model:value="autoSetPassword" size="small" />
        <p>{{ $t('dashboard.user_management.modal_label_checkbox') }}</p>
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
                >
                  <n-input
                    v-model:value="props.password"
                    type="password"
                    class="rounded-lg h-[36px] flex items-center text-black max-w-[680px] w-full"
                    :validation-status="props.error ? 'error' : ''"
                    :feedback="props.error"
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
                </n-form-item>
              </n-form>
            </div>
            <div v-else key="password" class="h-[36px] mt-[6pz]">
              <div v-if="showPassword" class="flex gap-4">
                <div class="max-w-[120px] min-w-[100px]">{{ props.password }}</div>
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
                <div class="-mt-1 max-w-[120px] min-w-[100px]">
                  <span v-for="i in 6" class="text-grey_dark px-[2px] text-lg">●</span>
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
            @update:show="handleUpdateShow"
          >
            <template #trigger>
              <p :class="`text-primary cursor-pointer inline-block`">
                {{ $t('dashboard.user_management.copy_password') }}
              </p>
            </template>
            <span>{{ $t('dashboard.user_management.msg_tooltip') }}</span>
          </n-tooltip>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center mt-1 gap-6 font-sans">
        <CustomButton
          type="primary"
          content="キャンセル"
          :theme-overrides="{
            border: '1px solid #D1D1D1',
            borderHover: '1px solid #D1D1D1',
            borderFocus: '1px solid #D1D1D1',
            borderPressed: '1px solid #D1D1D1'
          }"
          @click="handleCloseModal"
        />
        <CustomButton
          type="secondary"
          content="再設定"
          :loading="false"
          @click="
            () => {
              $emit('update:show', false)
            }
          "
        />
      </div>
    </template>
  </n-modal>
</template>
<script setup lang="ts">
  import Eye from '@/assets/images/icons/Eye.vue'
  import EyeOff from '@/assets/images/icons/EyeOff.vue'
  import { Close } from '@vicons/ionicons5'
  import { generatePassword } from '@/composables/auth'
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:show', 'update:password'])

  const autoSetPassword = ref<boolean>(false)
  const showPassword = ref<boolean>(true)
  const showModalRegister = computed(() => {
    return props.show
  })

  watch(autoSetPassword, (value: boolean) => {
    console.log(props.error, 'props.error')
    if (value) {
      emit('update:password', '')
      const newPassword = generatePassword()
      console.log(newPassword)
      emit('update:password', newPassword)
    }
  })
  const handleCloseModal = () => {
    //delete password
    emit('update:password', '')
    //close modal
    emit('update:show', false)
  }
  const handleUpdateShow = (show: boolean) => {
    console.log(show, 'show')
  }
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
