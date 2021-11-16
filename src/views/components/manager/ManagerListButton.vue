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
        v-for="(item, index) in data" :key="index"
        class="button"
        type="border"
        @click="selectManager(item.id)"
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
        title: '담당 직원',
        data : []
      }
    },

    methods: {
      getItems() {
        this.$http.get('/api/manager')
        .then((res) => {
          this.data = res.data.data
        })
      },

      selectManager(id) {
        console.log(id)
        this.$emit('selected-manager', id)
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