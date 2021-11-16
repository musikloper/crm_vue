<template>
  <div id="NoDataText">
    <div class="no-data">
      <span class="icon">!</span>
      <span>
        <slot name='text'></slot>
      </span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
#NoDataText {
  .no-data {
    text-align: center;
    transform: translateY(350%);
    padding: 10px;
    span {
      color: darkgray;
    }
    .icon {
      border: 1px solid #e2e2e2;
      background-color: #e2e2e2;
      border-radius: 50%;
      padding: 2px 8px;
      margin-right: 5px;
      color: #fff;
    }
  }
}
</style>