<template>
  <div>
    <vs-button 
      @click="registerCustomerPopup()" 
      color="primary" 
      type="border"
    > 
    고객등록
    </vs-button>

    <vs-popup 
      fullscreen
      class="holamundo" 
      title="고객등록" 
      :active.sync="popupFlag">
      
      
      <div class="container">
        <div class="left-area">
          <div class="table-area">

      
            <table>
              <!-- <vs-tr>
                <vs-th>고객사진</vs-th>
                <vs-td>
                  <input ref="fileSelector" class="upload" type="file" >
                </vs-td>
              </vs-tr> -->

              <vs-tr>
                <vs-th>고객번호</vs-th>
                <vs-td>
                  <vs-input 
                    placeholder="20210830-001"
                    v-model="customer_number"
                  />
                </vs-td>
              </vs-tr>

              <vs-tr>
                <vs-th>고객명</vs-th>
                <vs-td>
                  <vs-input 
                    placeholder="예) 홍길동"
                    v-model="customer_name"
                  />
                </vs-td>
              </vs-tr>

              <vs-tr>
                <vs-th>주민번호</vs-th>
                <vs-td>
                  <vs-input 
                    placeholder="970101"
                    v-model="customer_rrn_prefix"
                  />
                  <vs-input 
                    placeholder="1234567"
                    v-model="customer_rrn_suffix"
                  />
                </vs-td>
              </vs-tr>

              <vs-tr>
                <vs-th>생년월일</vs-th>
                <vs-td>
                  <date-picker 
                    :hideEnd="true"
                    v-model="customer_birth_date" /><br>
                  <vs-radio 
                    color="success" 
                    vs-name="luna_calendar" 
                    vs-value="1"
                    v-model="luna_calendar">양력</vs-radio>
                  <vs-radio 
                    color="success" 
                    vs-name="luna_calendar" 
                    vs-value="2"
                    v-model="luna_calendar">음력</vs-radio>
                </vs-td>


              </vs-tr>
              <vs-tr>
                <vs-th>기본연락처</vs-th>
                <vs-td>
                  <vs-input 
                    placeholder="예) 01012345678"
                  />
                </vs-td>
              </vs-tr>

              <vs-tr>
                <vs-th>추가연락처</vs-th>
                <vs-td>
                  <vs-input 
                    
                  />
                </vs-td>
              </vs-tr>

              <vs-tr>
                <vs-th>추가연락처</vs-th>
                <vs-td>
                  <vs-input 
                    
                  />
                </vs-td>
              </vs-tr>

              <vs-tr>
                <vs-th>E-Mail</vs-th>
                <vs-td>
                  <vs-input 
                    placeholder="email@email.com"
                    v-model="customer_email"
                  />
                </vs-td>
              </vs-tr>
              
              <vs-tr>
                <vs-th>우편번호</vs-th>
                <vs-td>
                  <vs-input 
                    v-model="customer_zipcode"/>
                  <vs-button 
                    color="primary" 
                    type="border"
                    @click="daumpopupFlag=true 
                    openDaumPostcode()"
                  >
                  주소 검색
                  </vs-button>
                </vs-td>
              </vs-tr>
              
              <vs-tr>
                  <vs-th>주소</vs-th>
                  <vs-td>
                    <vs-input 
                      v-model="customer_road_address"/>
                  </vs-td>
              </vs-tr>

              <vs-tr>
                  <vs-th>상세주소</vs-th>
                  <vs-td>
                    <vs-input 
                      v-model="customer_address_detail"
                      />
                  </vs-td>
              </vs-tr>

              <vs-tr>
                  <vs-th>특이사항</vs-th>
                  <vs-td>
                    <vs-textarea 
                      width="50%"
                      height="200px"
                      v-model="customer_memo"  />
                  </vs-td>
              </vs-tr>

            </table>
          </div>
        </div> 
        <!-- left-area 끝 -->


        <!-- right-area 시작 -->
        <div class="right-area">
          <customer-job-button v-on:selected-customer-job="selectedCustomerJob" />
          <!-- <customer-setting-button settingName="고객 직업" /> -->
          <br>
          <customer-type-button v-on:selected-customer-type="selectedCustomerType" />
          <!-- <customer-setting-button settingName="고객 분류" /> -->
          <br>
          <visit-path-button v-on:selected-visit-path="selectedVisitPaht" />
          <!-- <customer-setting-button settingName="유입 경로" /> -->
          <br>
          <manager-list-button v-on:selected-manager="selectedManager" />
          <br>
          <!-- 소개자 -->
          <introduce-customer-button v-on:selected-introduce-customer="selectedIntroduceCustomer" />
        </div> 
        <!-- right-area 끝 -->
      </div>

        
      <div class="button-area">
        <vs-button 
          color="danger" 
          @click="cancelBtn()" 
          type="flat"
        >
        취소
        </vs-button>

        <vs-button 
          color="success" 
          @click="registerCustomer()" 
          type="flat"
        >
        회원가입
        </vs-button>
      </div>
    </vs-popup>

  </div>
</template>

<script>
import CustomerSettingButton from "../customer/CustomerSettingButton.vue"
import IntroduceCustomerButton from '../customer/IntroduceCustomerButton.vue'
import CustomerTypeButton from '../customer/CustomerTypeButton.vue'
import VisitPathButton from '../customer/VisitPathButton.vue'
import CustomerJobButton from '../customer/CustomerJobButton.vue'
import ManagerListButton from '../manager/ManagerListButton.vue'
import DatePicker from "../common/datePicker/DatePicker.vue"
// import DataListButton from './DataListButton.vue'
  export default {
    components: { 
      CustomerSettingButton,
      IntroduceCustomerButton,
      VisitPathButton,
      CustomerTypeButton,
      CustomerJobButton,
      ManagerListButton,
      DatePicker,
      // DataListButton,
    },
    
    data() {
      return {
        popupFlag: false,
        daumpopupFlag: false,
        address: '',
        postcode: '',
        colorx: '',

        reqData: {},

        // 고객 등록 데이터
        customer_number: '',                            // 고객번호
        customer_name: '',                              // 고객이름
        customer_rrn_prefix: '800110',                  // 주민번호 앞
        customer_rrn_suffix: '1234567',                 // 주민번호 뒤
        customer_birth_date: '1980-01-10',              // 생년월일
        luna_calendar: 1,                               // 양력: 1 음력: 2
        customer_email: 'test@test.com',                // 이메일
        customer_zipcode: '',                           // 우편번호
        customer_road_address: '',                      // 도로명주소
        customer_old_address: '',                       // 지번 주소
        customer_address_detail: '아파트 101동 101호',   // 상세주소
        customer_memo: '',                              // 메모
        receive_event_sms: 1,                           // 이벤트문자 수신: 1 거절: 2
        receive_schedule_sms: 1,                        // 예약문자 수신: 1 거절: 2
        customer_gender: 1,                             // 성별 남성: 1 여성: 2
        foreigner: 1,                                   // 외국인 여부 내국인: 1 외국인: 2
        customer_status: 1,                             // 사용: 1 삭제: 2

        customer_type: null,                               // 고객 분류
        customer_job_id: null,                             // 고객 직업
        visit_path_id: null,                               // 유입 경로
        manager_id: null,                                  // 담당 직원 id
        introduce_customer_id: null,                       // 소개자 고객 id

      }
    },

    created() {
    },

    methods: {


      registerCustomerPopup() {
        this.popupFlag = true
        this.getCustomerNumber()
      },

      registerCustomer() {
        this.$http.post('/api/customer/register', { 
          unique_number:            this.customer_number,
          customer_name:            this.customer_name,
          rrn_prefix:               this.customer_rrn_prefix,
          rrn_suffix:               this.customer_rrn_suffix,
          birth_date:               this.customer_birth_date,
          luna_calendar:            this.luna_calendar,
          email:                    this.customer_email,
          zipcode:                  this.customer_zipcode,
          road_address:             this.customer_road_address,
          old_address:              this.customer_old_address,
          address_detail:           this.customer_address_detail,
          customer_memo:            this.customer_memo,
          receive_event_sms:        this.receive_event_sms,
          receive_schedule_sms:     this.receive_schedule_sms,
          gender:                   this.customer_gender,
          foreigner:                this.foreigner,
          customer_status:          this.customer_status,
          customer_type:            this.customer_type,
          customer_job_id:          this.customer_job_id,
          visit_path_id:            this.visit_path_id,
          manager_id:               this.manager_id,
          introduce_customer_id:    this.introduce_customer_id
        }).then((res) => {
          console.log(res)
          this.popupFlag = false
          this.refreshAll()
        })
      },

      cancelBtn() {
        this.popupFlag = false
        this.refreshAll()
        // this.$refs.userJob.testUserJob()
        // console.log(this.$vs)
      },

      refreshAll() {
        // 새로고침
        this.$router.go();
      },
      
      /**
       * IntroduceCustomerButton 에서 데이터 받는 함수
       * @param { number } data customer_id
       */
      selectedIntroduceCustomer(data) {
        this.introduce_customer_id = data
      },

      /**
       * VisitPathButton 에서 데이터 받는 함수
       * @param { number } data id
       */
      selectedVisitPaht(data) {
        this.visit_path_id = data
      },

      /**
       * CustomerTypeButton 에서 데이터 받는 함수
       * @param { number } data id
       */
      selectedCustomerType(data) {
        this.customer_type = data
      },

      /**
       * ManagerListButton 에서 데이터 받는 함수
       * @param { number } data id
       */
      selectedManager(data) {
        this.manager_id = data
      },

      /**
       * CustomerJobButton 에서 데이터 받는 함수
       * @param { number } data id
       */
      selectedCustomerJob(data) {
        this.customer_job_id = data
      },

      /**
       * 고객 번호 
       * @example '20210101-001'
       * @returns { string } customer_number : unique_number
       */
      getCustomerNumber() {
        this.$http.get('/api/customer/customerNumber')
        .then((res) => {
          this.customer_number = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      },

      // 주소 검색 Daum Api
      openDaumPostcode () {
        new window.daum.Postcode({
          oncomplete: (data) => {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // let addr = '' // 주소 변수
            let postcode = data.zonecode // 우편번호

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                this.customer_road_address = data.roadAddress
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                this.customer_old_address = data.jibunAddress
            }
      
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            this.customer_zipcode = postcode
          },

          width: '100%',
          height: '400px',
        
        }).open()
      },
    



    }
  }
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: -webkit-box;
  // justify-content: space-around;
}

</style>