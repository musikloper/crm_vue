<!-- =========================================================================================
    File Name: TagInput.vue
    Description: 해시태그 등록하는 input 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - hashTags: 기존에 해시태그가 있을 경우에만!
      - disabled: 입력 input 창을 막을 수 있는 기능!
    
    Action:
      - addHashTag: 사용하는 곳에서 해시태그 배열에 새로운 해시태그 추가 
         -> (참조) ** 새로운 해시태그가 배열에 이미 존재하는지 확인 필요! ** 
         -> (예시) if(this.hashTags.includes(tag)) return
      - deleteHashTag:사용하는 곳에서 해시태그 배열에서 해시태그 삭제
========================================================================================== -->

<template>
  <div id="tagInput">
    <div class="tag-container">
      <div class="tag" :class="{disabled}" v-for="tag in tags" :key="tag">
        <span>{{ tag }}</span>
        <button 
          @click="deleteTag(tag)"
        >x</button>
      </div>
    </div>
    <input 
      v-if='!disabled'
      v-model="inputValue" 
      @keyup.enter='addTag'
      type="text" 
      placeholder="태그를 등록하세요."
    >
  </div>
</template>

<script>
export default {
  props: {
    hashTags: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: '',
      tags: [],
    }
  },
  created() {
    if(this.hashTags.length) {
      this.tags = this.hashTags
    }
  },
  watch: {
    hashTags() {
      this.tags = this.hashTags
    },
  },
  methods: {
    addTag() {
      const inputValue = this.inputValue.trim()
      if(inputValue === '') return
      if(this.tags.includes(inputValue)) {
        this.clearInput()
        return
      }
      this.tags.push(inputValue)
      this.$emit('addHashTag', inputValue)
      this.clearInput()
    },
    deleteTag(tag) {
      this.tags = this.tags.filter(t => t !== tag)
      this.$emit('deleteHashTag', tag)
    },
    clearInput() {
      this.inputValue = ''
    }
  }
}
</script>

<style lang='scss' scoped>
  #tagInput {
    margin-top: 10px;

    .tag-container {
      margin-bottom: 15px;

      .tag {
        background-color: #0e36e6;
        border-radius: 5px;
        display: inline-block;
        padding: 5px 7px 5px 10px;
        margin-right: 10px;
        margin-bottom: 5px;

        &.disabled {
          padding: 5px 10px;
          button {
            display: none;
          }
        }

        span {
          color: #fff;
        }

        button {
          border: none;
          background: transparent;
          color: #fff;
          margin-left: 10px;
          transform: translateY(-10%);
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
      }
    }

    input {
      width: 100%;
      border: none;
      border-bottom: 1px solid grey;
      padding: 5px;
      &:focus {
        border-bottom: 2px solid #0e36e6;
      }
    }
  }
</style>