<!-- =========================================================================================
    File Name: datePicker.vue
    Description: date picker 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - startDate: 시작 기간
      - endDate: 종료 기간
      - hideStart: 시작기간 picker 숨기기
      - hideEnd: 종료기간 picker 숨기기
      - withLabel: label 유무 (label이 필요할 경우에만, "withLabel: true" 넣어주면 됨)
      - withTime: '시간선택' 유무 (시간선택이 필요할 경우에만, "withTime: true" 넣어주면 됨)
    
    Action:
      - setPeriod: 시작기간 & 종료기간 바뀔때마다 사용하는 곳에서 value 업데이트 하는 함수
========================================================================================== -->

<template>
  <div id="datePicker">
    <div v-if="!hideStart" class="date-section" :class="{ withLabel }">
        <label v-if="withLabel" for="startDate">{{ $t('CommonEng.startDate') }}</label>
        <datepicker 
          :type='datePickerType'
          id="startDate" 
          v-model="start" 
          @change="setDate" 
        />
    </div>
    <div v-if="!hideEnd" class="date-section" :class="{ withLabel }">
        <div class="date-divider">
            <span>~</span>
        </div>
        <label v-if="withLabel" for='endDate'>{{ $t('CommonEng.endDate') }}</label>
        <datepicker 
          :type='datePickerType'
          id="endDate" 
          v-model="end" 
          @change="setDate"
          :disabled-date='(date) => date < start'
        />
    </div> 
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    hideStart: {
      type: Boolean,
      default: false
    },
    hideEnd: {
      type: Boolean,
      defualt: false
    },
    withLabel: {
      type: Boolean,
      default: false
    },
    withTime: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      start: null,
      end: null,
    }
  },
  computed: {
    datePickerType() {
      return this.withTime ? "datetime" : "date"
    }
  },
  watch: {
    startDate(newVal) {
      if(this.startDate) {
        this.start = newVal
      }
    },
    endDate(newVal) {
      if(this.endDate) {
        this.end = newVal
      }
    }
  },
  mounted() {  
    this.start = this.startDate
    this.end = this.endDate
  },
  methods: {
    setDate() {
      this.$emit('setPeriod', this.start, this.end)
    }
  },
}
</script>

<style lang='scss'>
#datePicker {
  display: flex;
  justify-content:  start;
  align-items: center;

  .date-section {
    position: relative;

    .mx-datepicker {
      width: 100%;
    }
    
    .mx-input {
      width: 100%;
      font-family: AppleSDGothicNeo;
      font-weight: 600;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.87);
      padding: 10px 15px;
    }

    /* label이 있을경우 */
    label {
      position: absolute;
      top: 0;
      left: 10px;
      z-index: 1;
      color: #767676;
    }
    &.withLabel .mx-input{
      padding: 30px 15px 10px 15px;
    }
  }

  .date-divider {
    padding: 5px;
  }
}

</style>