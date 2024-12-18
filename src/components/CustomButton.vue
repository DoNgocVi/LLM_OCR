<template>
  <n-button
    :class="['w-full rounded-lg font-bold flex-1', sizeClass]"
    :theme-overrides="styleButton"
    :loading="props.loading"
    :disabled="props.disabled"
  >
    <slot v-if="$slots.default" />
    <template v-else>
      <template v-if="props.icon">
        <i :class="`icon-${props.icon}`" class="mr-2"></i>
      </template>
      <span class="font-bold">{{ props.content }}</span>
    </template>
  </n-button>
</template>
<script setup lang="ts">
  import { generateThemeOverrides } from '@/composables/common'

  //   import type { TypeButton } from '@/types/index.ts'
  const props = defineProps({
    type: {
      type: String as PropType<keyof typeof buttonStyles>,
      default: 'default'
    },
    content: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    icon: String
  })
  const sizeClass = computed(() => {
    switch (props.size) {
      case 'small':
        return 'h-[52px] text-sm'
      case 'large':
        return 'h-[56px] text-lg'
      default:
        return 'h-[42px] text-sm'
    }
  })
  const buttonStyles = {
    default: {
      ...generateThemeOverrides({
        color: '#F5F5F5',
        textColor: '#4F4F4F',
        border: '1px solid #D1D1D1'
      }),
      color: '#fff'
    },
    secondary: {
      ...generateThemeOverrides({
        color: '#1175BA',
        textColor: '#fff',
        border: 'none'
      }),
      color: '#3799DC'
    },
    primary: {
      fontWeight: 'bold',
      ...generateThemeOverrides({
        color: '#F5F5F5',
        textColor: '#3799DC',
        border: '1px solid #D1D1D1'
      }),
      color: '#fff'
    }
  }
  const styleButton = computed(() => buttonStyles[props.type] || buttonStyles.default)
</script>
<style lang="scss" scoped>
  :deep(.n-button:not(.n-button--disabled):focus) {
    color: green !important;
    background-color: green !important;
  }
</style>
