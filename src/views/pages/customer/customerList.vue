<template>
  <div>

    <vs-table
      :max-items="descriptionItems[0]"
      pagination
      :data="customerList"
      description
      :description-items="descriptionItems"
      description-title="Registries"
      description-connector="of"
      description-body="Pages">

      <template slot="header">
        <h3>
          Users
        </h3>
      </template>
      <template slot="thead">
        <vs-th>
          고객 번호
        </vs-th>
        <vs-th>
          이름
        </vs-th>
        <vs-th>
          생년월일
        </vs-th>
        <vs-th>
          성별
        </vs-th>
        <vs-th>
          Email
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].unique_number">
            {{data[indextr].unique_number}}
          </vs-td>
<!-- :data="data[indextr].customer_name" -->
          <vs-td >
            <!-- <customer-info-button :customerName="data[indextr].customer_name" /> -->
            <!-- <vs-button 
              @click="customerInfoPopup()"
              color="primary"
              type =relief
            > 
            {{data[indextr].customer_name}}
            </vs-button> -->
          </vs-td>

          <vs-td :data="data[indextr].birth_date">
            {{data[indextr].birth_date}}
          </vs-td>

          <vs-td :data="data[indextr].gender">
            {{data[indextr].gender}}
          </vs-td>

          <vs-td :data="data[indextr].email">
            {{data[indextr].email}}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>



  </div>
</template>

<script>
import CustomerInfoButton from '../../components/customer/CustomerInfoButton.vue'

  export default {
    components: {
      CustomerInfoButton,
    },
    
    data() {
      return {
        descriptionItems: [5, 10],

        customerList: [],

      }
    },

    methods: {

      customerInfoPopup() {
        
      },

      getAllCustomer() {
        this.$http.get('/api/customer/customerList')
        .then((res) => {
          console.log(res)
          this.customerList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
      },


    },

    created() {
      this.getAllCustomer()
    }

  }
</script>

<style lang="scss" scoped>

</style>