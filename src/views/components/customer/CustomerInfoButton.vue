<template>
  <div>
    
    <!-- 이름 버튼 -->
    <vs-button 
      @click="customerInfoPopup()"
      color="primary"
      type="relief"
    >
    {{ customerName }}
    </vs-button>
    <!-- 이름 버튼 끝 -->

  </div>
</template>

<script>
  export default {

    props: {
      customerName: {
        type: String,
        default: '',
        required: true,
      }
    },

    data() {
      return {

      }
    },

    methods: {

    },


    
  }
</script>

<style lang="scss" scoped>

</style>