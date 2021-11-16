<template>
  <div
    @keyup.esc="cancelPopup()">

    <div class="container">
      
      <vs-button 
        @click="customerFindPopup()" 
        color="primary" 
        type="border"
      > 
      고객 검색
      </vs-button>

      <vs-popup 
        class="holamundo" 
        title="고객 검색" 
        :active.sync="popupFlag">

      <!-- 검색창 영역 -->
      <div class="search-area">
        <vs-input
          placeholder="이름을 입력하세요"
          v-model="customer_name"
          @keyup.enter="search(customer_name)" />

        <vs-button
          @click="search(customer_name)"
          color="success"
          type="border" >
        검색
        </vs-button>
      </div>
      <!-- 검색창 영역 끝 -->

      <!-- 결과 테이블 -->
        <vs-table
          v-model="selected"
          @selected="handleSelected"
          :data="customer_name_list">

        <template slot="header">
          <h3>
            고객 검색 결과
          </h3>
        </template>
        <template slot="thead">
          <vs-th>
            이름
          </vs-th>
          <!-- <vs-th>
            Name
          </vs-th>
          <vs-th>
            Website
          </vs-th>
          <vs-th>
            Nro
          </vs-th> -->
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
            <!-- <vs-td :data="data[indextr].email">
              {{data[indextr].email}}
            </vs-td> -->

            <vs-td 
              :data="data[indextr].customer_name"
              @click="selectedData(data[indextr])"
            >
              {{data[indextr].customer_name}}
            </vs-td>

            <!-- <vs-td :data="data[indextr].website">
              {{data[indextr].website}}
            </vs-td>

            <vs-td :data="data[indextr].id">
              {{data[indextr].id}}
            </vs-td> -->
          </vs-tr>
        </template>
      </vs-table>

      <!-- 결과 테이블 끝 -->
      </vs-popup>
    </div>
  </div>
</template>

<script>
  export default {
    
    data() {
      return {
        popupFlag: false,

        customer_name: '',

        selected:[],

        // response data
        customer_name_list: [],

      }
    },

    methods: {
      customerFindPopup() {
        this.popupFlag = true
      },

      selectedData(data) {
        console.log(data)
      },

      cancelPopup() {
        this.popupFlag = false
      },

      handleSelected(tr) {
        
        this.$emit('selected-name', tr)

        this.$vs.notify({
          title:`Selected ${tr.customer_name}`,
          text:`Email: ${tr.customer_name}`
        })
        this.popupFlag = false
      },

      search(customer_name) {
        console.log(customer_name)

        this.$http.get('/api/customer/customerListByData', 
          {
            params: {
              customer_name: customer_name
            }
          }).then((res) => {
            console.log(res.data)
            this.customer_name_list = res.data.data
          }).catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-area {
    display: flex;
    justify-content: space-evenly;
  }

  .container {
    display: flex;
  }
</style>