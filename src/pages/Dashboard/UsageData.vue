<template>
  <div class="flex items-center gap-4">
    <CustomDatePicker v-model:timestamp="startDate" :disableAfter="startDateDisable" :isStartDate="true" />
    <span>〜</span>
    <CustomDatePicker v-model:timestamp="endDate" :disableBefore="endDateDisable" />
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
          <CustomSelect
            v-model:value="valueOption"
            :options="dataUsageOption"
            class="w-full"
            @update:value="updateChart"
          />
        </div>
      </div>
    </div>
    <div class="chart-vue">
      <v-chart class="chart" :option="option" autoresize />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { EChartsOption } from 'echarts'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart } from 'echarts/charts'
  import { TooltipComponent, GridComponent, MarkLineComponent } from 'echarts/components'
  import VChart, { THEME_KEY } from 'vue-echarts'
  import { ref, provide, onMounted } from 'vue'
  import { dataUsageOption } from '@/constants/common'
  import { max } from 'lodash'
  import mockDataJson from '../../mocks/UsageDataMock.json'

  use([CanvasRenderer, BarChart, MarkLineComponent, TooltipComponent, GridComponent])
  provide(THEME_KEY, 'light')
  type UsageDataType = {
    [key: string]: {
      label: string[]
      data: (number | null)[]
    }
  }

  const mockData = mockDataJson as UsageDataType

  const startDate = ref<number>(Date.now())
  const endDate = ref<number>(startDate.value + 86400000)
  const startDateDisable = ref<number>()
  const endDateDisable = ref<number>()
  const total = ref<number>(400)
  const valueOption = ref<string>('day')
  const data = ref<number[]>([120, 200, 150, 80, 70, 110, 130])
  const maxChartHeight = max(data.value) as number

  const series: EChartsOption['series'] = [
    {
      data: [],
      type: 'bar',
      barWidth: '16px',
      itemStyle: {
        borderRadius: [15, 15, 4, 4],
        color: {
          type: 'linear',
          x: 0,
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

  const option = ref<EChartsOption>({
    xAxis: {
      type: 'category',
      axisLabel: {
        rotate: 40,
        color: '#858D9D',
        fontSize: 12,
        formatter: (value, index) => {
          if (
            Array.isArray(option.value.series) &&
            Array.isArray(option.value.series[0].data) &&
            option.value.series[0].data[index].value === null
          ) {
            return `{bold|${value}}`
          }
          return value
        },
        rich: {
          bold: {
            fontWeight: 'bold',
            color: '#5B5B5B'
          }
        }
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'transparent'
        }
      },
      data: []
    },
    yAxis: {
      type: 'value',
      max: maxChartHeight,
      axisLabel: {
        color: '#858D9D',
        fontSize: 12
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#858D9D',
          width: 1
        }
      }
    },
    tooltip: { trigger: 'item' },
    series: series
  })

  const updateChart = (type: string) => {
    console.log(type, 'type')
    // TODO: Call api get usage data
    const fakeData = mockData[type]
    ;(option.value.xAxis as { data: string[] }).data = fakeData.label

    const seriesData = fakeData.data
    if (Array.isArray(option.value.series)) {
      option.value.series[0].data = seriesData.map(renderChartItem)
    }
    const positionMarkLine = seriesData
      .map((item, index) => {
        if (item === null) {
          return index
        }
      })
      .filter((item) => item !== undefined) as Number[]
    if (Array.isArray(option.value.series) && Array.isArray(option.value.series[0].data)) {
      option.value.series[0].markLine = renderMarkLine(positionMarkLine)
      setBarWidth(option.value.series[0].data.length)
    }
  }

  const setBarWidth = (count: number) => {
    if (!Array.isArray(option.value.series)) return
    if (count >= 20) {
      ;(option.value.series[0] as { barWidth: string }).barWidth = '16px'
    } else if (count >= 10) {
      ;(option.value.series[0] as { barWidth: string }).barWidth = '30px'
    } else {
      ;(option.value.series[0] as { barWidth: string }).barWidth = '40px'
    }
  }

  const renderChartItem = (value: number | null) => {
    return {
      value: value == null ? null : value,
      tooltip: {
        formatter: () => {
          return `
            <div class="flex items-center gap-2 font-sans">
              <div class="w-[12px] h-[12px] rounded-full bg-gradient-to-t from-[#22CAAD] to-[#2BB2FE]"></div>
              <p>利用枚数</p>
              <span>:</span>
              <strong>${value}</strong><br/>
            </div>
          `
        },
        backgroundColor: '#5b5b5b',
        borderColor: '#5b5b5b',
        borderWidth: 1,
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      }
    }
  }

  const renderMarkLine = (position: Number[]) => {
    if (position.length === 0) {
      return {
        silent: true,
        symbol: ['none', 'none'],
        label: { show: false },
        data: [],
        lineStyle: {
          color: '#858D9D'
        },
        tooltip: { show: false }
      }
    } else {
      return {
        silent: true,
        symbol: ['none', 'none'],
        label: { show: false },
        data: position.map((item) => {
          return { xAxis: item }
        }),
        lineStyle: {
          color: '#858D9D'
        },
        tooltip: { show: false }
      }
    }
  }
  watch(
    [startDate, endDate],
    ([newStartDate, newEndDate]) => {
      startDateDisable.value = newEndDate
      endDateDisable.value = newStartDate
    },
    { immediate: true }
  )
  onMounted(() => {
    updateChart('day')
  })
</script>

<style scoped lang="scss">
  .chart-vue {
    height: 550px;
    margin: 0 -50px;
    overflow: hidden;
    .chart {
      height: 100%;
    }
  }
  :deep(.n-date-picker) {
    .n-input__state-border,
    .n-input__border {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
</style>
