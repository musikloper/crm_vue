<template>
  <div>
    
    <div class="button-area">
      <vs-button
        color="primary"
        class="button"
      >
      예약 항목
      </vs-button>

      <vs-button
        v-for="(item, index) in data" :key="index"
        class="button"
        type="border"
        @click="testbutton(item.id)"
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
        data : []
      }
    },

    methods: {
      getItems() {
        this.$http.get('/api/schedule/scheduleSettingList', 
        {params: {
          type: '예약 항목'
        }})
        .then((res) => {
          console.log(res)
          this.data = res.data.data
        })
      },

      testbutton(id) {
        console.log(id)
        this.$emit('selected-item', id)
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