<!-- =========================================================================================
    File Name: NumberInput.vue
    Description: vueSax vs-input-number 사용 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - min: 최소 숫자 범위
      - max: 최대 숫자 범위
      - default: 디폴트 숫자 / '수정'일 경우, 기존 값을 의미!
      - step: 플러스 or 마이너스 버튼 클릭 시, 더해지거나 빼질 수의 기준 단위
    
    Action:
      - updateValue: 사용하는 곳에서 input의 value 값 업데이트 하는 함수
========================================================================================== -->

<template>
  <div id="NumberInput">
    <vs-input-number 
        v-model="value" 
        :step='step'
        :min="min" 
        :max="max" 
        @input="updateHandler"
    />
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: [Number, String],
      default: 0,
      required: true
    },
    max: {
      type: [Number, String],
      default: 10,
      required: true
    },
    default: {
      type: [Number, String],
      default: 0,
    },
    step: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      value: 0
    }
  },
  created() {
    if(this.default) {
      this.value = this.default
    }
  },
  methods: {
    updateHandler(number) {
      this.$emit('updateValue', number)
    }
  }
}
</script>

<style lang='scss'>

  #NumberInput {
    margin-top: 5px;
    
    .vs-input-number {
      border: 1px solid #ccc;
      background-color: #fff;
      justify-content: space-between;
      width: 130px;
      padding: 0 10px;
      margin: 0 !important;
    }

    .vs-input-number-primary button {
      background: transparent;
      margin: 0;
      padding: 10px;
      width: 100%;
      height: 100%;

      &:disabled {
        background-color: red;
      }
    }

    .vs-input-number button i {
      font-size: 16px;
      color: grey;
    }
  }
</style>