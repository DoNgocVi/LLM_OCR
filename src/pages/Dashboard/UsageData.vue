<template>
  <div class="flex items-center gap-4">
    <CustomDatePicker v-model:timestamp="startDate" :dateDisable="startDateDisable" :isStartDate="true" />
    <span>〜</span>
    <CustomDatePicker v-model:timestamp="endDate" :dateDisable="endDateDisable" :isStartDate="true" />
  </div>
  <div class="w-[220px] mt-6 font-bold text-base bg-white rounded-[20px] p-[10px]">
    <p>利用枚数</p>
    <p class="text-end mt-2">
      <span class="text-[32px] leading-[48px] mr-2">{{ total }}</span>
      <span>枚</span>
    </p>
  </div>
  <div class="bg-white mt-5 rounded-[20px]">
    <div class="flex justify-between px-4 pt-5 pb-4">
      <div class="flex gap-4">
        <p class="font-bold text-black">日別　利用状況グラフ</p>
        <p class="text-grey">（2024年1月1日〜2024年12月31日）</p>
      </div>
      <div class="flex justify-end flex-1 items-center gap-3">
        <div class="flex items-center gap-1 text-sx text-gray_light">
          <div class="w-[12px] h-[12px] rounded-full bg-gradient-to-t from-[#22CAAD] to-[#2BB2FE]"></div>
          <p>利用枚数</p>
        </div>
        <div class="max-w-[151px] w-full">
          <CustomSelect v-model:value="valueOption" :options="dataUsageOption" class="w-full" />
        </div>
      </div>
    </div>
    <div class="chart-vue">
      <v-chart class="chart" :option="option" autoresize />
    </div>
  </div>
</template>

<script setup>
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart } from 'echarts/charts'
  import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
  import VChart, { THEME_KEY } from 'vue-echarts'
  import { ref, provide } from 'vue'
  import { dataUsageOption } from '@/constants/common'
  import { max } from 'lodash'
  use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent])
  provide(THEME_KEY, 'light')
  const data = ref([120, 200, 150, 80, 70, 110, 130])
  const maxChartHeight = max(data.value)
  const series = [
    {
      data: data.value,
      type: 'bar',
      barWidth: '40px',
      itemStyle: {
        borderRadius: [15, 15, 4, 4],
        color: {
          type: 'linear',
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#22CAAD' },
            { offset: 1, color: '#2BB2FE' }
          ]
        }
      }
    }
  ]
  const option = ref({
    xAxis: {
      type: 'category',
      axisLabel: {
        rotate: 45,
        color: '#858D9D',
        fontSize: 12
      },
      axisLine: {
        show: false
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#858D9D',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#ccc',
          width: 1
        }
      }
    },
    series: series
  })
  const startDate = ref()
  const endDate = ref()
  const startDateDisable = ref(false)
  const endDateDisable = ref(false)
  const total = ref(400)
  const valueOption = ref('day')
</script>

<style scoped lang="scss">
  .chart {
    height: 500px;
  }
  :deep(.n-date-picker) {
    .n-input__state-border,
    .n-input__border {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  @media (min-width: 900px) {
    .custom-bg {
      @apply bg-yellow-500 text-white;
    }
  }
</style>
