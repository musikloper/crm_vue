<!-- =========================================================================================
    File Name: RadioSelect.vue
    Description: radio 버튼 선택 컴포넌트 (하나만 선택가능) [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - name: radio group 이름 
      - options: radio 버튼으로 생성될 옵션들
      - initialValue: '수정'일 경우, 세팅될 기존 값
    
    Action:
      - updateValue: radio 버튼을 선택해서 바뀔때마다, 사용하는 곳에서 선택된 value 업데이트 하는 함수                   
    ----------------------------------------------------------------------------------------
    options format (key이름):
      [
        {
          id, // 각각 radio 옵션 id -> key와 label 연결때 사용!
          value, // 각각 radio 옵션 value -> 이게 저장되는 값!
          text // 각각 radio 옵션 label text
        }
      ]
========================================================================================== -->

<template>
  <div id="radioSelect">
    <template v-if="options.length">
      <div 
        v-for="option in options" 
        :key="option.id" 
        class="radio-pair" 
        :class="{selected: value === option.value}"
      >
          <input 
            type="radio" 
            v-model="value" 
            :value="option.value" 
            :name="name" 
            :id="option.id"
            @change='changeHandler()'
          >
          <label :for="option.id">{{ option.text }}</label>
      </div>
    </template>
    <template v-else>
      <span class="no-options">
        {{ $t('Common.optionNotExist') }}
      </span>
    </template>
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
      type: [Number, String, Boolean]
    }
  },
  data() {
    return {
      value: null
    }
  },
  watch: {
    initialValue() {
      if(this.initialValue) {
        this.value = this.initialValue
      }
    }
  },
  methods: {
    changeHandler() {
      this.$emit('updateValue', this.value)
    }
  }
}
</script>

<style lang='scss' scoped>
#radioSelect {
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

  .no-options {
    color: rgba(0, 0, 0, 0.38);
  }
}
</style>