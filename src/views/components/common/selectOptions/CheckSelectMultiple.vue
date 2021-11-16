<!-- =========================================================================================
    File Name: CheckSelectMultiple.vue
    Description: checkbox 버튼 '복수선택' 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - name: checkbox group 이름 
      - options: checkbox 버튼으로 생성될 옵션들
      - initialValue: '수정'일 경우, 세팅될 기존 값
    
    Action:
      - updateValue: checkbox 버튼을 선택해서 새로운 값들을 선택할때마다, 사용하는 곳에서 선택된 value 업데이트 하는 함수                   
    ----------------------------------------------------------------------------------------
    options format (key이름):
      [
        {
          id, // 각각 checkbox 옵션 id -> key와 label 연결때 사용!
          value, // 각각 checkbox 옵션 value -> 이게 저장되는 값!
          text // 각각 checkbox 옵션 label text
        }
      ]
========================================================================================== -->

<template>
  <div id="CheckSelectMultiple">
    <div 
      v-for="option in options" 
      :key="option.id" 
      class="radio-pair" 
      :class="{ selected: values.includes(option.value) }"
    >
      <input 
        type="checkbox" 
        :value="option.value" 
        :name="name" 
        :id="option.id"
        :checked='values.includes(option.value)'
        @change='changeHandler'
      >
      <label :for="option.id">{{ option.text }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    initialValue: {
      type: Array,
      default: () => [],
    }
  },
  created() {
    if(this.initialValue.length) {
      this.values = this.initialValue
    }
  },
  data() {
    return {
      values: []
    }
  },
  methods: {
    changeHandler(e) {
      const { checked, value } = e.target
      if(checked) {
        if(this.values.includes(Number(value))) return
        this.values.push(Number(value))
      } else {
        this.values = this.values.filter(v => v !== Number(value))
      }

      const payload = {
        checked,
        value
      }
      this.$emit('updateValue', payload)
    }
  }

}
</script>

<style lang='scss' scoped>
#CheckSelectMultiple {
  display: flex;
  align-items: center;

  .radio-pair {
    margin-right: 45px;
    display: flex;
    align-items: center;
  }

  input {
    margin-right: 6px;
  }

  label {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.38);
    margin: 0;
  }

  .radio-pair.selected {
    label {
      color: #000;
      font-weight: bold;
      font-size: 15px;
    }
  }
}
</style>