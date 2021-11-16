<template>
  <div @keyup.esc="cancelPopup()">
    <vs-button 
      @click="registerSchedulePopup()" 
      color="primary" 
      type="border"
    > 
    예약등록
    </vs-button>

    <vs-popup 
      fullscreen
      class="holamundo" 
      title="예약등록" 
      :active.sync="popupFlag">

      <div class="container">

        <div class="left-area">

          <div class="search-area">
            <vs-input
              placeholder="이름을 입력하세요"
              v-model="customer_name" />
            <customer-find-button v-on:selected-name="selectedName" />
          </div>

          <div class="date-area">

            <date-picker 
              class="date-picer"
              :hideEnd="true"
              :withTime="true"
              @setPeriod="getStartDate" />

            <date-picker 
              class="date-picer"
              :hideEnd="true"
              :withTime="true"
              @setPeriod="getEndDate" />
          </div>

          <div class="memo-area">
            <vs-textarea 
              width="50%"
              height="200px"
              v-model="memo"  />
          </div>

          <vs-button 
            color="danger" 
            @click="alert()" 
            type="flat"
          >
          취소
          </vs-button>
          <vs-button 
            color="success" 
            @click="registerSchedule()" 
            type="flat"
          >
          예약 등록
          </vs-button>
        </div>

        <div class="right-area">
          <!-- 예약 항목 -->
          <schedule-items-button v-on:selected-item="selectedItem" />
          <br>
          <!-- 예약 구분 -->
          <schedule-sections-button v-on:selected-sections="selectedSection" />
          <br>
          <!-- 예약 상태 -->
          <schedule-status-button v-on:selected-status="selectedStatus" />
          <br>
          <!-- 직원 선택 -->
          <manager-list-button v-on:selected-manager="selectedManager" />
          <br>
        </div>
      </div>
    </vs-popup>

  </div>
</template>

<script>
  import CustomerFindButton from '../customer/CustomerFindButton';
  import DatePicker from "../common/datePicker/DatePicker.vue"
  import ScheduleItemsButton from '../schedule/ScheduleItemsButton.vue'
  import ScheduleSectionsButton from '../schedule/ScheduleSectionsButton.vue'
  import ScheduleStatusButton from '../schedule/ScheduleStatusButton.vue'
  import ManagerListButton from '../manager/ManagerListButton.vue'

  export default {
    components: {
      CustomerFindButton,
      DatePicker,
      ScheduleItemsButton,
      ScheduleSectionsButton,
      ScheduleStatusButton,
      ManagerListButton,
    },

    data() {
      return {
        popupFlag: false,

        customer_id: 0,
        unique_number: '',
        customer_name: '',
        schedule_date: '',
        start_time: '',
        end_time: '',
        memo: '',
        schedule_item: 0,
        schedule_section: 0,
        schedule_status: 0,
        manager: 0,

      }
    },

    methods: {
      registerSchedulePopup() {
        this.popupFlag = true
      },
      
      cancelPopup() {
        this.popupFlag = false
      },
      
      selectedName(data) {
        console.log(data)
        this.customer_id = data.customer_id
        this.customer_name = data.customer_name
        this.unique_number = data.unique_number
      },

      selectedItem(data) {
        console.log(data)
        this.schedule_item = data

      },

      selectedSection(data) {
        console.log(data)
        this.schedule_section = data
      },

      selectedStatus(data) {
        console.log(data)
        this.schedule_status = data
      },

      selectedManager(data) {
        console.log(data)
        this.manager = data
      },

      getStartDate(start, end) {
        console.log(start, end)
        this.start_time = start
      },
      getEndDate(start, end) {
        console.log(start, end)
        this.end_time = start
      },

      refreshAll() {
        // 새로고침
        this.$router.go();
      },    
      
      registerSchedule() {
        this.$http.post('/api/schedule', {
          customer_id: this.customer_id,
          unique_number: this.unique_number,
          // schedule_date: this.schedule_date,
          start_time: this.start_time,
          end_time: this.end_time,
          memo: this.memo,
          schedule_item: this.schedule_item,
          schedule_section: this.schedule_section,
          schedule_status: this.schedule_status,
          manager_id: this.manager,
        })
        .then(() => {
          alert('예약이 등록되었습니다.')
          this.popupFlag = false
          this.refreshAll()
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }



  }
</script>

<style>
  .container {
    display: flex;
  }

  .search-area {
    display: flex;
  }

  .date-area {
    display: flex;
  }

  .date-picer {
    margin: 10 10;
  }
</style>