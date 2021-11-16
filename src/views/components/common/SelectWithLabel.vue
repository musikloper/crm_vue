<!-- =========================================================================================
    File Name: SelectWithLabel.vue
    Description: label이 select박스 안 상단에 위치하는 select 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - label: label 명
      - options: options 배열 ===> ########### 반드시 아래의 포맷을 지켜서 props로 넘겨줄 것!  ###########
      - initialValue: '수정'일 경우, 기존 값
    
    Action:
      - onChange: 옵션 선택시 사용한 곳에서 value 업데이트 하는 함수
    ----------------------------------------------------------------------------------------
    options format:
      [
        { id: 0, text: 'oo을/를 선택하세요' },
        { id: (1부터~) , text: (옵션에 들어갈 text) }
      ]
========================================================================================== -->

<template>
  <div id="SelectWithLabel">
    <label>{{ label }}</label>
    <select v-model="selectValue" @change="changeHandler($event)">
      <option 
        v-for="option in options" 
        :key="option.id" 
        :value="option.id" 
        :text="option.text" 
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'label',
      required: true
    },
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    initialValue: {
      type: [Number, String],
      default: 0
    }
  },
  created() {
    if(this.initialValue) {
      this.selectValue = this.initialValue
    }
  },
  data() {
    return {
      selectValue: 0,
    }
  },
  methods: {
    changeHandler(e) {
      this.$emit('onChange', e.target.value)
    }
  }
}
</script>

<style lang='scss' scoped>
#SelectWithLabel {

  width: 100%;
  position: relative;

  label {
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
    position: absolute;
    top: 5px;
    left: 15px;
  }
  select {
    display: block;
    width: 100%;
    padding: 27px 10px 10px 10px;
    font-weight: 600;
  }

}
</style>