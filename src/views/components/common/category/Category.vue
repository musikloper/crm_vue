<!-- =========================================================================================
    File Name: Category.vue
    Description: 카테고리 tab 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - listData: '전체'를 제외한 그 외 카테고리 리스트
      - initialTab: 맨 처음 hightlight 될 카테고리
    
    Action:
      - fetchData: 카테고리를 선택해서 바뀔때마다 사용하는 곳에서 value 업데이트 하는 함수 (해당 카테고리의 데이터 fetching)                    
    ----------------------------------------------------------------------------------------
    listData format (key이름):
      [
        {
          id, // 카테고리 id
          text // 카테고리명 text
        }
      ]
========================================================================================== -->

<template>
  <div id="Category">
    <ul>
      <li 
        id="0"
        :class="{active: currentTab === 0}"
        @click="clickHandler(0)"
      >
        {{ $t('Common.all') }}
      </li>
      <li 
        v-for="li in listData" 
        :key="li.id"
        :id="li.id"
        :class="{active: currentTab === li.id}"
        @click="clickHandler(li.id)"
      >
        {{ li.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: () => [],
      required: true
    },
    initialTab: {
      type: [Number, String]
    }
  },
  created() {
    if(this.initialTab.length) {
      this.currentTab = Number(this.initialTab)
    }
  },
  watch: {
    initialTab() {
      if(this.initialTab.length) {
      this.currentTab = Number(this.initialTab)
    }
    }
  },
  data() {
    return {
      list: [],
      currentTab: 0,
    }
  },
  methods: {
    clickHandler(id) {
      this.updateCurrentTab(id)
      this.fetchData(id)
    },
    updateCurrentTab(id) {
      this.currentTab = id
    },
    fetchData(id) {
      this.$emit('fetchData', id)
    }
  },
}
</script>

<style lang='scss' scoped>
  #Category {
    ul {
      padding: 5px;
      padding-left: 0;
      display: flex;
    }

    li { 
      color: grey;     
      list-style: none;
      padding: 2px 5px;
      margin: 0 5px;
      cursor: pointer;
    }

    li.active {
      border-bottom: 2px solid black;
      font-weight: bold;
      color: #000;
    }
  }
</style>