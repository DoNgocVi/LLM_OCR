<template>
  <n-date-picker
    v-model:value="timestamp"
    type="date"
    :actions="null"
    :input-readonly="true"
    :is-date-disabled="dateDisabled"
    :format="customFormat"
    :theme-overrides="themeOverrides"
    @update:value="selectDate"
  >
    <template #next-month>
      <n-icon size="20" class="hover:text-gray">
        <CaretUpOutline class="transform-rotate-90" />
      </n-icon>
    </template>
    <template #prev-month>
      <n-icon size="20" class="hover:text-gray">
        <CaretUpOutline class="-transform-rotate-90" />
      </n-icon>
    </template>
    <template #date-icon>
      <n-icon size="14" class="mt-[2px]">
        <Calendar />
      </n-icon>
    </template>
  </n-date-picker>
</template>
<script lang="ts" setup>
  import Calendar from '@/assets/images/icons/Calendar.vue'
  import { CaretUpOutline } from '@vicons/ionicons5'
  import { merge } from 'lodash'
  const props = defineProps({
    timestamp: {
      type: Number
    },
    dateDisable: {
      type: [Number, Boolean]
    },
    isStartDate: {
      type: Boolean
    },
    customFormat: {
      type: String,
      default: 'yyyy/MM/dd'
    },
    themeOverrides: {
      type: Object,
      default: {}
    }
  })
  const emit = defineEmits(['update:timestamp'])

  const themeOverrides = ref(
    merge(
      {
        panelBorderRadius: '10px',
        itemColorActive: '#5B5B5B',
        peers: {
          Input: {
            border: '1px solid #D1D1D1',
            borderFocus: '1px solid #3799DC',
            borderHover: '1px solid #3799DC',
            borderRadius: '8px'
          }
        }
      },
      props.themeOverrides
    )
  )

  const timestamp = ref<number>(props.timestamp as number)
  const selectDate = (value: number) => {
    console.log(value)
    emit('update:timestamp', value)
  }
  const dateDisabled = (ts: number) => {
    if (props.dateDisable && typeof props.dateDisable === 'number') {
      return props.isStartDate ? ts >= props.dateDisable : ts <= props.dateDisable
    } else {
      return false
    }
  }
</script>
