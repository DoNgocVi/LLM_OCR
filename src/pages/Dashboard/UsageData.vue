<template>
  <div class="flex items-center gap-4">
    <CustomDatePicker
      v-model:timestamp="startDate"
      size="large"
      :disableAfter="startDateDisable"
      :isStartDate="true"
      :customFormat="'yyyy年MM月dd日'"
      @update:value="(date: number) => changeDate(date, 'start')"
    />
    <span>〜</span>
    <CustomDatePicker
      v-model:timestamp="endDate"
      size="large"
      :disableBefore="endDateDisable"
      :customFormat="'yyyy年MM月dd日'"
      @update:value="(date: number) => changeDate(date, 'end')"
    />
  </div>
  <div class="w-[220px] mt-6 font-bold text-base bg-white rounded-[20px] py-[12px] px-[16px]">
    <p>利用枚数</p>
    <p class="text-end mt-2">
      <span class="text-[32px] leading-[48px] mr-2">{{ total }}</span>
      <span>枚</span>
    </p>
  </div>
  <div ref="containerChartRef" class="bg-white mt-5 rounded-[20px] overflow-hidden">
    <div class="flex justify-between px-6 pt-6 pb-4">
      <div class="flex gap-4 items-center">
        <p class="font-bold text-black text-base">日別　利用状況グラフ</p>
        <p class="text-grey font-500 text-sm">{{ `(${startDateString}〜${endDateString})` }}</p>
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
  import { TooltipComponent, GridComponent, MarkLineComponent, DataZoomComponent } from 'echarts/components'
  import VChart, { THEME_KEY } from 'vue-echarts'
  import { ref, provide, onMounted } from 'vue'
  import { dataUsageOption } from '@/constants/common'
  import { max } from 'lodash'
  import mockDataJson from '../../mocks/UsageDataMock.json'

  use([CanvasRenderer, BarChart, MarkLineComponent, TooltipComponent, GridComponent, DataZoomComponent])
  provide(THEME_KEY, 'light')
  type UsageDataType = {
    [key: string]: {
      label: string[]
      data: (number | null)[]
    }
  }

  const mockData = mockDataJson as UsageDataType

  const startDateString = ref<string>()
  const endDateString = ref<string>()

  const startDate = ref<number>()
  const endDate = ref<number>()
  const startDateDisable = ref<number>()
  const endDateDisable = ref<number>()
  const total = ref<number>(400)
  const valueOption = ref<string>('day')
  const data = ref<number[]>([120, 200, 150, 80, 70, 110, 130])
  const maxChartHeight = max(data.value) as number
  const containerChartRef = ref<HTMLElement | null>(null)

  const series: EChartsOption['series'] = [
    {
      data: [],
      type: 'bar',
      barWidth: '16px',
      barGap: '30px',
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
        padding: [40, 0, 0, 0],
        fontSize: 12,
        formatter: (value) => {
          if (/^(?=.*年)(?=.*月).{6,}$/.test(value) && valueOption.value !== 'month') {
            return `{bold|${value.replace(/年/, '年\n')}}`
          }
          return value
        },
        rich: {
          bold: {
            fontWeight: 'bold',
            color: '#5B5B5B',
            align: 'center',
            lineHeight: 18,
            padding: -10
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
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        minSpan: 20,
        start: 0,
        end: 100,
        handleStyle: {
          color: 'rgba(0, 0, 0, 0.1)',
          borderRadius: 20,
          opacity: 0
        },
        brushSelect: false,
        height: 8,
        borderColor: 'transparent',
        fillerColor: 'rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(200, 200, 200, 0.2)',
        showDataShadow: false,
        showDetail: false,
        bottom: 8,
        show: true
      }
    ],
    tooltip: {
      trigger: 'item',
      position: function (pt, s) {
        console.log(s)
        console.log(pt)
        return [pt[0], '3%']
      }
    },
    series: series
  })

  const updateChart = (type: string) => {
    let barWidth
    let valueMax
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
      barWidth = setBarWidth(option.value.series[0].data.length)
      valueMax = Math.max(...option.value.series[0].data.map((item) => item.value))
      //@ts-ignore
      option.value.yAxis.max = bufferHeightChart(valueMax)
    }
    if (containerChartRef.value && Array.isArray(option.value.series) && Array.isArray(option.value.series[0].data)) {
      const screenWidth = containerChartRef.value.offsetWidth
      const dataLength = option.value.series[0].data.length
      const visibleBars = barWidth ? Math.floor(screenWidth / barWidth) : 0
      const end = Math.min((visibleBars / dataLength) * 40, 100)

      if (Array.isArray(option.value.dataZoom)) {
        const dataZoom = option.value.dataZoom[0]
        dataZoom.end = end || 10
        //@ts-ignore
        if (end === 100) dataZoom.show = false
      }
    }
  }

  const setBarWidth = (count: number) => {
    if (!Array.isArray(option.value.series)) return
    if (count >= 20) {
      ;(option.value.series[0] as { barWidth: string }).barWidth = '16px'
      return 16
    } else if (count >= 10) {
      ;(option.value.series[0] as { barWidth: string }).barWidth = '30px'
      return 30
    } else {
      ;(option.value.series[0] as { barWidth: string }).barWidth = '40px'
      return 40
    }
  }

  const bufferHeightChart = (value: number) => {
    const num = (value + 1) / 5
    const length = Math.floor(Math.log10(num)) // Tính số chữ số - 1
    const scale = Math.pow(10, length) // 10^(số chữ số - 1)
    console.log(scale)
    const result = Math.ceil(num / scale) * scale //
    console.log(result * 5)
    return result * 5
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

  function convertTimestampToDate(timestamp: number) {
    const dateObject = new Date(timestamp)
    const year = dateObject.getFullYear()
    const month = String(dateObject.getMonth() + 1).padStart(2, '0')
    const day = String(dateObject.getDate()).padStart(2, '0')
    return `${year}年${month}月${day}日`
  }

  const changeDate = (date: number, type: string) => {
    if (type === 'start') {
      startDateString.value = convertTimestampToDate(date)
      updateChart(valueOption.value)
    } else {
      endDateString.value = convertTimestampToDate(date)
      updateChart(valueOption.value)
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
  watch(valueOption, (value: string) => {
    switch (value) {
      case 'day':
        total.value = 400
        break
      case 'week':
        total.value = 1000
        break
      case 'day':
        total.value = 4600
        break
      default:
        break
    }
  })
  onMounted(() => {
    const dataLoginDate = localStorage.getItem('loginDate')
    const loginDateObject = new Date(Number(dataLoginDate))
    const y = loginDateObject.getFullYear()
    const m = loginDateObject.getMonth()
    // first day of month
    var firstDay = new Date(y, m, 1)
    //set date range
    startDate.value = firstDay.getTime()
    endDate.value = Number(dataLoginDate) || Date.now()
    // update date string
    startDateString.value = convertTimestampToDate(startDate.value)
    endDateString.value = convertTimestampToDate(endDate.value)
    // default type format
    updateChart('day')
  })
</script>

<style scoped lang="scss">
  .chart-vue {
    height: 550px;
    margin: 0 -50px;
    margin-top: -20px;
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
