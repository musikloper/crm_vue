<template>
  <div>
    <p>예약 리스트 컴포넌트</p>
    <br>

    <vs-button 
      @click="scheduleAllList()" 
      color="primary" 
      type="border"
    > 
    예약 전체 리스트 테스트
    </vs-button>
    <br>
    <div class="button-area">
      <schedule-setting class='button setting-button' settingName="예약 항목" />
      <schedule-setting class='button setting-button' settingName="예약 구분" />
      <schedule-setting class='button setting-button' settingName="예약 상태" />
      <manager-setting class="button" />
    </div>
    <br>
    <schedule-register-button class="button ">
    <br>
    <vue-cal style="height: 250px" />
  </div>
</template>

<script>
import ScheduleSetting from '../../components/schedule/ScheduleSetting.vue'
import ScheduleRegisterButton from '../../components/schedule/ScheduleRegisterButton.vue'
import ManagerSetting from '../../components/manager/ManagerSetting.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'


  export default {
    components: {
      ScheduleSetting,
      ScheduleRegisterButton,
      ManagerSetting,
      VueCal,
    },

    data() {
      return {

        scheduleList: [],


      }
    },

    methods: {
      scheduleAllList() {
        this.$http.get('/api/schedule')
        .then((res) => {
          console.log(res)
          this.scheduleList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
      },


    },

    created() {
      this.scheduleAllList()
    }






  }
</script>

<style lang="scss" scoped>
  .button-area {
    display: flex;
    
  }

  .button {
    margin: 10px 10px
  }
</style>