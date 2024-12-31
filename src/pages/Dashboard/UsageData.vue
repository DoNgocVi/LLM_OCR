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
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart } from 'echarts/charts'
  import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
  import VChart, { THEME_KEY } from 'vue-echarts'
  import { ref, provide, onMounted } from 'vue'
  import { dataUsageOption } from '@/constants/common'
  import { max } from 'lodash'

  use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent])
  provide(THEME_KEY, 'light')

  interface SeriesItem {
    data: number[]
    type: string
    barWidth: string
    itemStyle: {
      borderRadius: number[]
      color: {
        type: string
        y: number
        x2: number
        y2: number
        colorStops: { offset: number; color: string }[]
        formatter?: (value: string, index: number) => string
      }
    }
  }

  interface ChartOption {
    xAxis: {
      type: string
      axisLabel: {
        rotate: number
        color: string
        fontSize: number
      }
      axisLine: {
        show: boolean
      }
      data: string[]
    }
    yAxis: {
      type: string
      max: number
      axisLabel: {
        color: string
        fontSize: number
      }
      splitLine: {
        lineStyle: {
          type: string
          color: string
          width: number
        }
      }
    }
    tooltip: {
      trigger: string
      axisPointer: {
        type: string
      }
      formatter: (params: { value: number }[]) => string
      backgroundColor: string
      borderColor: string
      borderWidth: number
      textStyle: {
        color: string
        fontSize: number
      }
    }
    series: SeriesItem[]
  }

  const data = ref<number[]>([120, 200, 150, 80, 70, 110, 130])
  const maxChartHeight = max(data.value) as number

  const series: SeriesItem[] = [
    {
      data: [],
      type: 'bar',
      barWidth: '16px',
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
  const option = ref<ChartOption>({
    xAxis: {
      type: 'category',
      axisLabel: {
        rotate: 45,
        color: '#858D9D',
        fontSize: 12,
        formatter: (value, index) => {
          if (option.value.series[0].data[index].value === null) {
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
          color: '#ccc'
        }
      },
      splitLine: {
        // Thêm cấu hình đường lưới dọc
        show: false, // Hiển thị đường lưới dọc
        lineStyle: {
          type: 'dashed', // Loại nét (liền hoặc đứt)
          color: '#ccc', // Màu sắc
          width: 1 // Độ dày
        }
      },
      data: []
    },
    yAxis: {
      type: 'value',
      max: maxChartHeight + 50,
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: (params: { value: number }[]) => {
        const data = params[0]
        return `
        <div class="flex items-center gap-2 font-sans">
          <div class="w-[12px] h-[12px] rounded-full bg-gradient-to-t from-[#22CAAD] to-[#2BB2FE]"></div>
          <p>利用枚数</p>
          <span>:</span>
          <strong>${data.value}</strong><br/>
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
    },
    series: series
  })

  const startDate = ref<number>(Date.now())
  const endDate = ref<number>(Date.now() + 86400000)
  const startDateDisable = ref<boolean>(false)
  const endDateDisable = ref<boolean>(false)
  const total = ref<number>(400)
  const valueOption = ref<string>('day')

  const updateChart = (type: string) => {
    if (type === 'day') {
      // const date = new Date(startDate.value)
      // const getDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
      option.value.xAxis.data = [
        '2024年1',
        '1日',
        '2日',
        '3日',
        '4日',
        '5日',
        '6日',
        '7日',
        '8日',
        '9日',
        '10日',
        '11日',
        '12日',
        '13日',
        '14日',
        '15日',
        '16日',
        '17日',
        '18日',
        '19日',
        '20日',
        '21日',
        '22日',
        '23日',
        '24日',
        '25日',
        '26日',
        '27日',
        '28日',
        '29日',
        '30日',
        '31日',
        '2024年2',
        '1日'
      ]
      const seriesData = [
        0, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200,
        150, 80, 70, 110, 130, 120, 200, 150, 0, 100
      ]
      option.value.series[0].data = seriesData.map((value, index) => {
        return {
          value: value == 0 ? null : value, // Đặt giá trị bằng maxValue cho cột đặc biệt
          itemStyle:
            value == 0
              ? {
                  borderType: 'dashed',
                  borderWidth: 0.7,
                  borderColor: '#000',
                  color: 'transparent'
                }
              : null,
          tooltip: value == 0 ? null : undefined // Loại bỏ tooltip cho cột đặc biệt
        }
      })
    } else if (type === 'week') {
      ;(option.value.xAxis.data = ['1週', '2週', '3週', '4週']), (option.value.series[0].data = [120, 200, 150, 80])
    } else {
      option.value.xAxis.data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      option.value.series[0].data = [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70]
    }
    setBarWidth(option.value.series[0].data.length)
  }

  const setBarWidth = (count: number) => {
    if (count >= 20) {
      option.value.series[0].barWidth = '16px'
    } else if (count >= 10) {
      option.value.series[0].barWidth = '30px'
    } else {
      option.value.series[0].barWidth = '40px'
    }
  }

  onMounted(() => {
    updateChart(valueOption.value)
  })
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
