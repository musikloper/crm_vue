<!-- =========================================================================================
    File Name: LineChart.vue
    Description: line chart 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - chartOptions: 차트 옵션들
    ----------------------------------------------------------------------------------------
    chartOptions format: 
    {
      height: 숫자,  --- 차트의 전체 높이 
      series: [
        {
          name: '', --- 각 차트 라인의 데이터 이름
          data: []  --- 각 차트 라인의 데이터
        }
      ],
      options: {
        xaxis: {
          categories: [] --- x축 카테고리명
        },
        chart: {
          zoom: { enabled: true/false } --- zoom 기능 사용여부
        },
        grid: {
          row: {
            color: [],  --- 차트 뒷배경 grid 색깔 (2개 이상도 설정가능) [예] ['#f3f3f3', 'transparent'] : 한줄은 회색계통, 한줄은 투명
            opacity: 숫자  --- 차트 뒷배경 grid 투명도 [예] 1: 불투명 / 0.5: 50% 투명하게 등
          }
        }
      }
    }
========================================================================================== -->

<template>
  <div id="LineChart">
    <template v-if="chartDataExist">
      <vue-apex-charts
        type="line"
        :height="height"
        :series="lineChartOptions.series"
        :options="lineChartOptions.options"
      >
      </vue-apex-charts>
    </template>
  </div>
</template>

<script>
import chartDataExist from '@/mixins/chartStatusMixin.js' // (computed)
export default {
  props: {
    chartOptions: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [chartDataExist],
  created() {
    this.setChartData(this.chartOptions)
  },
  watch: {
    chartOptions(chartOptions) {
      this.setChartData(chartOptions)
    },
  },
  methods: {
    setChartData(chartOptions) {
      this.height = chartOptions.height
      this.lineChartOptions.series = chartOptions.series
      this.lineChartOptions.options = chartOptions.options
    },
  },
  data() {
    return {
      height: 0, // props
      lineChartOptions: {
        series: [], // props
        options: {} // props
      }
    }
  },
}
</script>