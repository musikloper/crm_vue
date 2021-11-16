<!-- =========================================================================================
    File Name: PieChart.vue
    Description: pie chart 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - chartOptions: 차트 옵션들
    ----------------------------------------------------------------------------------------
    chartOptions format: 
    {
      height: 숫자,  --- 차트의 전체 높이 
      width: 숫자, --- 차트의 전체 넓이 
      series: [], --- 차트 data
      options: {
        labels: []  --- 차트 카테고리명
      }
    }
========================================================================================== -->

<template>
  <div id="PieChart">
    <template v-if="chartDataExist">
      <vue-apex-charts
        type="pie"
        :height="height"
        :width="width"
        :series="pieChartOptions.series"
        :options="pieChartOptions.options"
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
    this.setChartData()
  }, 
  watch: {
    chartOptions() {
      this.setChartData()
    }
  },
  methods: {
    setChartData() {
      this.height = this.chartOptions.height
      this.width = this.chartOptions.width
      this.pieChartOptions.series = this.chartOptions.series
      this.pieChartOptions.options = this.chartOptions.options
    }
  },
  data() {
    return {
      height: 0,
      width: 0,
      pieChartOptions: {
        series: [],
        options: {}
      }
    }
  },
}
</script>