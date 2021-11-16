<template>
  <div>
    <!-- <vs-button 
      @click="scheduleAllList()" 
      color="primary" 
      type="border"
    > 
    예약 전체 리스트 테스트
    </vs-button> -->
    <div class="button-area">
      <schedule-setting class='button setting-button' settingName="예약 항목" />
      <schedule-setting class='button setting-button' settingName="예약 구분" />
      <schedule-setting class='button setting-button' settingName="예약 상태" />
      <manager-setting class="button" />
      <schedule-register-button class="button ">
    </div>

      
    <div @keyup.esc="cancelEventCreation()">

    
    <vue-cal 
      :selected-date="today"
      hide-weekends
      active-view="day"
      today-button
      locale="ko"
      :time-from="6 * 60" 
      :time-to="22 * 60" 
      :time-step="30"
      :disable-views="['years', 'year', 'month']" 
      editable-events
      :events="events"
      :on-event-dblclick="onEventClick"
      :split-days="splitDays"
      :sticky-split-labels="stickySplitLabels"
      :min-cell-width="minCellWidth"
      :min-split-width="minSplitWidth"
      snap-to-time="15"
      :on-event-create = "onEventCreate" 
      @view-change="viewChange($event)"
      @event-drag-create="dragCreate($event)"/>

    <vs-popup
      :active.sync="showDialog"
      :title="selectedEvent.title" >

      <p>{{ selectedEvent.schedule_item }}</p>
      <p>{{ selectedEvent.content }}</p>
      <p>{{ selectedEvent.memo }}</p>
      <!-- {{ selectedEvent.manager.name }} -->
    </vs-popup>
    
    <div class="popup"
    
      >
    
  
    <vs-popup 
      fullscreen
      class="holamundo" 
      title="예약등록"
      :button-close-hidden="true" 
      :active.sync="popupFlag"
      >

      <div class="container">

        <div class="left-area">

          <div class="search-area">
            <vs-input
              placeholder="이름을 입력하세요"
              v-model="customer_name" />
            <customer-find-button v-on:selected-name="selectedName" />
          </div>

          <div class="date-area">

            <vs-input 
              class="date-picer"
              v-model="start_time"
              />

            <vs-input 
              class="date-picer"
              v-model="end_time"
              />
          </div>

          <div class="memo-area">
            <vs-textarea 
              width="50%"
              height="200px"
              v-model="memo"  />
          </div>

          <vs-button 
            color="danger" 
            @click="cancelEventCreation()" 
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
    </div>


  </div>

  
</template>

<script>
import ScheduleSetting from '../../components/schedule/ScheduleSetting.vue'
import ScheduleRegisterButton from '../../components/schedule/ScheduleRegisterButton.vue'
import ManagerSetting from '../../components/manager/ManagerSetting.vue'
import CustomerFindButton from '../../components/customer/CustomerFindButton.vue';
import ScheduleItemsButton from '../../components/schedule/ScheduleItemsButton.vue'
import ScheduleSectionsButton from '../../components/schedule/ScheduleSectionsButton.vue'
import ScheduleStatusButton from '../../components/schedule/ScheduleStatusButton.vue'
import ManagerListButton from '../../components/manager/ManagerListButton.vue'
import DatePicker from "../../components/common/datePicker/DatePicker.vue"
    

import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/ko.js'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/drag-and-drop.js'

  export default {
    components: {
      VueCal, 
      ScheduleSetting,
      ScheduleRegisterButton,
      ManagerSetting,
      CustomerFindButton,
      ScheduleItemsButton,
      ScheduleSectionsButton,
      ScheduleStatusButton,
      ManagerListButton,
      DatePicker,

    },

    created() {
      this.getToday()
    },

    data() {
      return {
        popupFlag: false,

        stickySplitLabels: false,
        minCellWidth: 400,
        minSplitWidth: 0,
        splitDays: [
          // The id property is added automatically if none (starting from 1), but you can set a custom one.
          // If you need to toggle the splits, you must set the id explicitly.
          { id: 1, class: '의사1', label: '의사1' },
          { id: 2, class: '의사2', label: '의사2', hide: false },
          { id: 3, class: '의사3', label: '의사3' },
          { id: 4, class: '의사4', label: '의사4' },
        ],
        today: '',

        customer_id: null,
        unique_number: '',
        customer_name: '',
        schedule_date: '',
        start_time: '',
        end_time: '',
        memo: '',
        schedule_item: null,
        schedule_section: null,
        schedule_status: null,
        manager: null,

        scheduleList: [],
        selectedEvent: {},
        showDialog: false,
        event: {},
        events: [
          // {
          //   start: '2021-11-02 14:00',
          //   end: '2021-11-02 18:00',
          //   title: '테스트 일정',
          //   icon: 'shopping_cart', // Custom attribute.
          //   content: 'Click to see my shopping list',
          //   contentFull: 'My shopping list is rather long:<br><ul><li>Avocados</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>', // Custom attribute.
          //   class: 'leisure',
          //   start_date: '2030-11-03 14:00'
          // }
        ]
      }
    },
    methods: {

      onEventCreate (event, deleteEventFunction) {
        this.selectedEvent = event
        this.showEventCreationDialog = true
        this.deleteEventFunction = deleteEventFunction

        return event
      },
      onEventClick (event, e) {
        this.selectedEvent = event
        this.showDialog = true

        // Prevent navigating to narrower view (default vue-cal behavior).
        e.stopPropagation()
      },

      cancelEventCreation () {
        this.closeCreationDialog()
        this.deleteEventFunction()
      },

      closeCreationDialog () {
        this.popupFlag = false
        this.selectedEvent = {}
      },

      getToday() {
        this.today = this.$moment().format('YYYY-MM-DD')
        const endDate = this.$moment().add('1', 'd').format('YYYY-MM-DD')

        this.getScheduleListByDate(this.today, endDate)
      },

      viewChange(event) {
        let startDate = this.$moment(event.startDate).format('YYYY-MM-DD')
        let endDate = this.$moment(event.endDate).add('1', 'd').format('YYYY-MM-DD')

        this.getScheduleListByDate(startDate, endDate)
      },
      refreshAll() {
        // 새로고침
        this.$router.go();
      }, 
      dragCreate(event) {
        console.log(event)
        this.start_time = this.$moment(event.start).format('YYYY-MM-DD HH:mm:ss') 
        this.end_time = this.$moment(event.end).format('YYYY-MM-DD HH:mm:ss') 
        console.log(this.start_time)
        this.popupFlag = true
      },

      getScheduleListByDate(startDate, endDate) {
        this.$http.get('/api/schedule/scheduleByDate', 
          { params: {
            startDate: startDate,
            endDate: endDate
          }})
        .then((res) => {
          const responseDataList = res.data.data
          this.events = []
          for (let i = 0; i < responseDataList.length; i++) {
            let event = {}
            event.id = responseDataList[i].id
            event.start = this.$moment(responseDataList[i].start_time).format('YYYY-MM-DD HH:mm')
            event.end = this.$moment(responseDataList[i].end_time).format('YYYY-MM-DD HH:mm')
            event.title = responseDataList[i].customer_id.customer_name
            event.content = responseDataList[i].schedule_section.name
            event.contentFull = responseDataList[i].start_date
            event.customer_id = responseDataList[i].customer_id
            event.customer_name = responseDataList[i].customer_id.name
            event.manager = responseDataList[i].manager_id.name
            event.memo = responseDataList[i].memo
            event.status = responseDataList[i].status
            event.schedule_item = responseDataList[i].schedule_item.name
            event.schedule_section = responseDataList[i].schedule_section.name
            event.schedule_status = responseDataList[i].schedule_status.name
            event.class = responseDataList[i].schedule_section.name
            event.split = 1
            this.events.push(event)
          }
        })
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

    }
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

.vuecal__event {
  cursor: pointer;
  background-color: aqua;
}

.vuecal__event-title.vuecal__event-title--edit{
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}

.vuecal__event-time {
  display: inline-block;
  /* margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(212, 200, 33, 0.2); */
}

.vuecal__event-content {
  font-style: italic;
}

.vuecal__event.수술 {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46); 
  color: #fff;
}
.vuecal__event.상담 {
  background-color: rgba(66, 253, 75, 0.9);
  border: 1px solid rgba(66, 253, 75, 0.9); 
  color: #fff;
}

/* Green-theme. */
.vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
.vuecal__title-bar {background-color: #e4f5ef;}
.vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
.vuecal__cell--selected:before {border-color: rgba(66, 185, 131, 0.5);}



  /* You can easily set a different style for each split of your days. */
.vuecal__cell-split.의사1 {background-color: rgba(221, 238, 255, 0.5);}
.vuecal__cell-split.의사2 {background-color: rgba(255, 232, 251, 0.5);}
.vuecal__cell-split.의사3 {background-color: rgba(221, 255, 239, 0.5);}
.vuecal__cell-split.의사4 {background-color: rgba(255, 250, 196, 0.5);}
.vuecal__cell-split .split-label {color: rgba(0, 0, 0, 0.1);font-size: 26px;}
</style>