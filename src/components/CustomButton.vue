<template>
  <n-button
    :class="['w-full rounded-lg font-bold flex-1', sizeClass]"
    :theme-overrides="{
      ...styleButton,
      ...props.themeOverrides
    }"
    :loading="props.loading"
    :disabled="props.disabled"
    :icon-placement="iconPlacement"
  >
    <div v-if="$slots.icon">
      <slot name="icon" />
      <slot name="default"></slot>
    </div>
    <template v-else>
      <template v-if="props.icon">
        <i :class="`icon-${props.icon}`" class="mr-2"></i>
      </template>
      <span :class="['font-bold', props.size === 'pagination' ? 'text-xs' : 'text-sm']">{{ props.content }}</span>
    </template>
  </n-button>
</template>
<script setup lang="ts">
  import { generateThemeOverrides } from '@/composables/common'
  import { ExtractThemeOverrides, Theme } from 'naive-ui/es/_mixins/use-theme'
  //   import type { TypeButton } from '@/types/index.ts'
  const props = defineProps({
    type: {
      type: String as PropType<keyof typeof buttonStyles>,
      default: 'default'
    },
    content: {
      type: String
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
    icon: String,
    iconPlacement: {
      type: String as PropType<'left' | 'right'>,
      default: 'left'
    },
    themeOverrides: {
      type: Object as PropType<ExtractThemeOverrides<Theme<'Button'>>>,
      default: () => ({})
    }
  })
  const sizeClass = computed(() => {
    switch (props.size) {
      case 'small':
        return 'h-[52px] text-sm'
      case 'large':
        return 'h-[56px] text-lg'
      case 'pagination':
        return '!w-[48px] h-[32px]'
      default:
        return 'h-[42px] text-sm'
    }
  })
  const buttonStyles = {
    default: {
      ...generateThemeOverrides({
        color: '#F5F5F5',
        textColor: '#4F4F4F',
        border: '1px solid #D1D1D1',
        waveOpacity: '0'
      }),
      color: '#fff'
    },
    secondary: {
      ...generateThemeOverrides({
        color: '#1175BA',
        textColor: '#fff',
        border: 'none'
      }),
      color: '#3799DC',
      waveOpacity: '0',
      colorDisabled: '#ACACAC',
      textColorDisabled: '#FFF',
      borderDisabled: 'none '
    },
    primary: {
      fontWeight: 'bold',
      ...generateThemeOverrides({
        color: '#F5F5F5',
        textColor: '#3799DC',
        border: '1px solid #3799DC'
      }),
      waveOpacity: '0',
      color: '#FFF'
    },
    error: {
      fontWeight: 'bold',
      ...generateThemeOverrides({
        color: '#D8392F',
        textColor: '#fff',
        border: 'none'
      }),
      waveOpacity: '0',
      color: '#ED584F'
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
