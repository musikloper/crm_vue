<!-- =========================================================================================
    File Name: BarChart.vue
    Description: bar chart 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - chartOptions: 차트 옵션들
    ----------------------------------------------------------------------------------------
    chartOptions format: 
    {
      height: 숫자,  --- 차트의 전체 높이 
      series: [
        {
          name: '', --- 각 차트바 그룹의 데이터 이름
          data: []  --- 각 차트바 그룹의 데이터
        }
      ],
      options: {
        xaxis: {
          categories: [] --- x축 카테고리명
        },
        plotOptions: {
          bar: {
            horizontal: true/false, --- bar의 방향 선택 (true: 가로 / false: 세로)
            columnWidth: '숫자%'  --- 각 bar의 넓이
          }
        },
        dataLabels: {
          enabled: true/false --- 각 bar 위에 데이터 값 보여줄지 여부 선택 (true: 보여줌 / false: 숨김)
        },
        fill: {
          opacity: 숫자 --- bar의 채움 투명도 [예] 1: 불투명 / 0.5: 50% 투명하게 등
        }
      }
    }
========================================================================================== -->

<template>
  <div id="BarChart">
    <template v-if="chartDataExist">
      <vue-apex-charts 
        type="bar" 
        :height="height" 
        :series="barChartOptions.series"
        :options="barChartOptions.options" 
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
      this.barChartOptions.series = this.chartOptions.series
      this.barChartOptions.options = this.chartOptions.options
    }
  },
  data() {
    return {
      height: 0, // props
      barChartOptions: {
        series: [], // props
        options: {} // props
      }
    }
  },
}
</script>