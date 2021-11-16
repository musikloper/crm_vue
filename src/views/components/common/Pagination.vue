<!-- =========================================================================================
    File Name: Pagination.vue
    Description: pagination 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - total: 표시될 전체 페이지 수
      - current: 현재 페이지
    
    Action:
      - movePages: 각각 페이지 or 이전/다음 버튼 등 클릭 시, 페이지 이동 시키는 함수                   
========================================================================================== -->

<template>
  <div class="pagination">
    <div class="flex">
      <div class="icon-container left" :class="{disabled: currentPage <= 1}">
        <chevrons-left-icon @click="toFirstPage" size='1.5x' class="icons start"></chevrons-left-icon>
      </div>
      <button @click="prevPage" class="pagination-btn flex" :class="{disabled: currentPage <= 1}">
        {{ $t('Common.prev') }}
      </button>
      <span 
        @click="pageChange(page + 1)"
        v-for="page in totalPages" 
        :key="page + 1"
        id="page"
        class="flex"
        :class="{ active: currentPage === page + 1}"
      >
        {{ page + 1 }}
      </span>
      <button @click="nextPage" class="pagination-btn flex" :class="{disabled: currentPage >= total}">
        {{ $t('Common.next') }}
      </button>
      <div class="icon-container right" :class="{disabled: currentPage >= total}">
        <chevrons-right-icon @click="toLastPage" size='1.5x' class="icons end"></chevrons-right-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronsLeftIcon, ChevronLeftIcon, ChevronsRightIcon, ChevronRightIcon } from 'vue-feather-icons'

export default {
  props: {
    total: Number,
    current: Number
  },
  components: { ChevronsLeftIcon, ChevronLeftIcon, ChevronsRightIcon, ChevronRightIcon },
  data() {
    return {
      totalPages: null,
      currentPage: null,
    }
  },
  created() {
    this.setTotalPages()
    this.currentPage = this.current
  },
  watch: {
    current() {
      this.currentPage = this.current
    },
    total() {
      this.setTotalPages()
    }
  }, 
  methods: {
    setTotalPages() {
      this.totalPages = [...Array(this.total).keys()]
    },
    pageChange(page) {
      if(page === this.currentPage) return
      this.$emit('movePages', page)
    },
    prevPage() {
      if (this.currentPage <= 1) return
      this.$emit('movePages', this.currentPage - 1)
    },
    nextPage() {
      if (this.currentPage >= this.total) return
      this.$emit('movePages', this.currentPage + 1)
    },
    toFirstPage() {
      if (this.currentPage <= 1) return
      this.$emit('movePages', 1)
    },
    toLastPage() {
      if(this.currentPage >= this.total) return
      this.$emit('movePages', this.total)
    }
  }
}
</script>

<style lang='scss'>
  $baseColor: rgba(0, 0, 0, 0.54);
  $activeColor: rgba(0, 0, 0, 0.87);

  #page {
    color: $baseColor;
    &.active {
      color: $activeColor;
      font-weight: bold;
    }
  }

  .pagination-btn {
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
      color: #cccccc;
    }
  }

  .icons {
    &.start {
      margin-right: 10px;
    }
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-left: 10px;

    &.disabled.right {
      &::after {
        content: '';
        display: block;
        width: 24px;
        height: 24px;
        background-color: rgba(245,246,250, 0.7);
        position: absolute;
        top: 0;
        right: 0;
        cursor: not-allowed;
      }
    }
    &.disabled.left {
      &::after {
        content: '';
        display: block;
        width: 24px;
        height: 24px;
        background-color: rgba(245,246,250, 0.7);
        position: absolute;
        top: 0;
        left: 0;
        cursor: not-allowed;
      }
    }
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>