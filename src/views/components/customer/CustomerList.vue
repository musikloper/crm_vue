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

          <vs-td :data="data[indextr].customer_name">
            {{data[indextr].customer_name}}
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
  export default {
    
    data() {
      return {
        descriptionItems: [5, 10],

        customerList: [],

      }
    },

    methods: {

      getAllCustomer() {
        this.$http.get('/api/customer/customerList')
        .then((res) => {
          const moment = require('moment')
          const dataList = res.data.data

          for (let i = 0; i < dataList.length; i++) {
            let event = {}
            event.unique_number = dataList[i].unique_number
            event.customer_name = dataList[i].customer_name

            event.birth_date = moment(dataList[i].birth_date).format('YYYY-MM-DD')
            
            if (dataList[i].gender === 1) {
              event.gender = '남성'
            }
            else if (dataList[i].gender === 2) {
              event.gender = '여성'
            }

            event.email = dataList[i].email
            this.customerList.push(event)
          }

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