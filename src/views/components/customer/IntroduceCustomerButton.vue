<template>
  <div>
    
    <div class="button-area">
      <vs-button
          color="primary"
          class="button"
        >
        소개자
      </vs-button>


      <vs-button
        v-if="introduce_customer_id !== null"
        class="button"
        type="border"
        v-model="introduce_customer_id"
        @click="addIntroduceCustomer(introduce_customer_id)"
      >
        {{ introduce_customer_name }}
      </vs-button>

      <introduce-customer-find-button v-on:selected-name="selectedName" />
    </div>


  </div>
</template>

<script>
import IntroduceCustomerFindButton from '../customer/IntroduceCustomerFindButton.vue'
  export default {
    components: {
      IntroduceCustomerFindButton,
    },

    data() {
      return {
        introduce_customer_id: null,
        introduce_customer_name: '',
      }
    },

    methods: {

      /**
       * IntroduceCustomerFindButton 에서 데이터 받는 함수
       * @param { object } data customer  
       */
      selectedName(data) {
        console.log(data)
        this.introduce_customer_id = data.customer_id
        this.introduce_customer_name = data.customer_name
        this.$emit('selected-introduce-customer', data.customer_id)
      },

      /**
       * CustomerRegisterButton 으로 데이트 보내는 함수
       * @param { number } id customer_id
       * @emit selected-introduce-customer
       */
      addIntroduceCustomer(id) {
        console.log(id)
        this.$emit('selected-introduce-customer', id)
      }
    },

    created() {

    }

  }
</script>

<style lang="scss" scoped>

  .button-area {
    display: flex;
  }

  .button {
    margin: 0 10px
  }
</style>