<template>
  <n-select
    v-model:show="show"
    :value="valueSelect"
    :placeholder="props.placeholder"
    :class="{
      'no-click': !props.isEdit
    }"
    :options="props.options"
    :theme-overrides="{
      peers: {
        InternalSelection: {
          borderRadius: '10px',
          border: props.isEdit ? '1px solid #D1D1D1' : 'none',
          borderHover: props.isEdit ? '1px solid #D1D1D1' : 'none',
          borderFocus: props.isEdit ? '1px solid #D1D1D1' : 'none',
          borderActive: props.isEdit ? '1px solid #D1D1D1' : 'none',
          boxShadowActive: props.isEdit ? '0 0 4px rgba(0, 0, 0, 0.25)' : 'none',
          boxShadowFocus: props.isEdit ? '0 0 4px rgba(0, 0, 0, 0.25)' : 'none'
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
        <template v-if="props.isEdit">
          <CaretUpOutline v-if="show" />
          <CaretDownOutline v-else />
        </template>
      </transition>
    </template>
  </n-select>
</template>

<script setup lang="ts">
  import { CaretUpOutline, CaretDownOutline } from '@vicons/ionicons5'
  import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
  const emit = defineEmits(['update:value'])
  const show = ref(false)
  const props = defineProps({
    options: {
      type: Array as PropType<SelectMixedOption[]>,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: String
  })
  const valueSelect = ref<string | undefined>(props.value)
  const handleSelect = (newValue: string) => {
    emit('update:value', newValue)
  }
  watch(
    () => props.value,
    (value: string | undefined) => {
      valueSelect.value = value ?? ''
    }
  )
</script>

<style scoped>
  .no-click {
    pointer-events: none;
  }
</style>
