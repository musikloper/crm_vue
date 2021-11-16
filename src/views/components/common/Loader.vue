<!-- =========================================================================================
    File Name: Loader.vue
    Description: Loading Spinner 컴포넌트 [reusable 컴포넌트]
========================================================================================== -->

<template>
  <div id="loading">
  </div>
</template>

<style lang='scss' scoped>
  #loading {
    border: 4px solid #ccc;
    border-radius: 50%;
    border-top: 4px solid black;
    width: 30px;
    height: 30px;
    animation: loader-spin 0.5s linear infinite;
    z-index: 1000;
  }

  @keyframes loader-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>