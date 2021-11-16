<template>
  <div>
    <!-- <p>고객 리스트 컴포넌트</p>
    <vs-button 
      @click="getAllCustomer()" 
      color="primary" 
      type="border"
    > 
    테스트
    </vs-button> -->
    
    <div class="button-area">
      <customer-register-button class="button" />
      <!-- <br> -->
      <customer-setting class="button" settingName="고객 직업" />
      <!-- <br> -->
      <customer-setting class="button" settingName="고객 분류" />
      <!-- <br> -->
      <customer-setting class="button" settingName="유입 경로" />
      <!-- <br> -->
      <manager-setting class="button" />
      <!-- <br> -->
    </div>

    <div class="table-area">
      <customer-list />
    </div>
  </div>
</template>

<script>
import CustomerRegisterButton from '../../components/button/CustomerRegisterButton.vue'
import CustomerSetting from '../../components/customer/CustomerSetting.vue'
import ManagerSetting from '../../components/manager/ManagerSetting.vue'
import CustomerList from '../../components/customer/CustomerList.vue'

export default {
  components: {
    CustomerRegisterButton,
    CustomerSetting,
    ManagerSetting,
    CustomerList
  },
  data() {
    return {
      sample: '',
      data: '데이터 테스트',
      data1: 1,
      result: '',
      
      scheduleList: [],

      unique_number: '',
      customer_name: '홍길동',
      rrn_prefix: '',
      birth_date: null,
      email: ''


    }
  },
  methods: {
    

    customerListByData() {
      // this.$http.get('/api/customer/customerList').then(res => {
      //   console.log(res)
      // })
      // this.$http.get('/api/customer/customerList', { data: this.data}).then((res) => {
      //   console.log(res)
        
      // })
      this.$http.get('/api/customer/customerListByData', {
        params: {
          unique_number: this.unique_number,
          customer_name: this.customer_name,
          rrn_prefix: this.rrn_prefix,
          birth_date: this.birth_date,
          email: this.email
        }
      }).then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
        
      })
    }
  },
}
</script>

<style>
.button-area {
  display: flex;
  margin-bottom: 20px;
}

.button {
  margin: 0 10px;
}
</style>