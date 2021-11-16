<template>
  <div>
    
    <div class="button-area">
      <vs-button
        color="primary"
        class="button"
      >
      {{ title }}
      </vs-button>

      <vs-button
        v-for="(item, index) in items" :key="index"
        class="button"
        type="border"
        @click="selectCustomerType(item.id)"
      >
        {{ item.name }}
      </vs-button>

    </div>


  </div>
</template>

<script>
  export default {
    
    data() {
      return {
        title: '고객 분류',
        items : []
      }
    },

    methods: {
      getItems() {
        this.$http.get('/api/customer/customerSettingList', 
        {params: {
          type: this.title
        }})
        .then((res) => {
          this.items = res.data.data
        })
      },

      selectCustomerType(id) {
        console.log(id)
        this.$emit('selected-customer-type', id)
      }
    },

    created() {
      this.getItems()
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