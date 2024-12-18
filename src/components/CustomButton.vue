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
        return 'h-[44px] text-base'
    }
  })
  const buttonStyles = {
    default: {
      border: '1px solid #D1D1D1',
      borderHover: '1px solid #D1D1D1',
      borderFocus: '1px solid #D1D1D1',
      textColor: '#4F4F4F',
      textColorFocus: '#4F4F4F',
      textColorHover: '#4F4F4F',
      textColorPressed: '#4F4F4F',
      colorFocus: '#F5F5F5',
      colorHover: '#F5F5F5',
      colorPressed: '#F5F5F5'
    },
    secondary: {
      color: '#3799DC',
      border: 'none',
      borderHover: 'none',
      borderFocus: 'none',
      colorFocus: '#1175BA',
      colorHover: '#1175BA',
      colorPressed: '#1175BA',
      fontWeight: 'bold',
      textColor: '#fff',
      textColorFocus: '#fff',
      textColorHover: '#fff',
      textColorPressed: '#fff'
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
