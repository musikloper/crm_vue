<!-- =========================================================================================
    File Name: CustomerSetting.vue
    Description: 고객분류, 고객직업, 유입경로 등 고객 관련 설정 컴포넌트
    ----------------------------------------------------------------------------------------
    Props: 
      - settingName: 설정 이름 (고객분류, 고객직업, 유입경로, 고객 상용구) 
    
========================================================================================== -->



<template>
  <div>

    <vs-button 
      @click="popupFlag=true" 
      color="primary" 
      type="border"
    > 
    {{ settingName }}
    </vs-button>

    <vs-popup 
      class="holamundo" 
      :title="settingName" 
      :active.sync="popupFlag"
      @keyup.esc="cancelPopup()"
      >
      <div class="container">
        <div class="table-area">

          <vs-table 
            v-model="selected"
            @selected="handleSelected"
            :data="dataList">
            <template slot="thead">
              <vs-th>
                명칭
              </vs-th>
              <vs-th>
                사용
              </vs-th>
              <vs-th>
                삭제
              </vs-th>
            </template>
          
            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >

                <!-- 명칭 -->
                <vs-td 
                  :data="data[indextr]">
                  {{data[indextr].name}}
                </vs-td>

                <!-- 사용 -->
                <vs-td>
                  <vs-checkbox 
                    v-if="data[indextr].status === 1"
                    v-model="isChecked"
                  >

                  </vs-checkbox>
                  <vs-checkbox 
                    v-if="data[indextr].status === 2"
                    v-model="isNotChecked"
                  >

                  </vs-checkbox>
                </vs-td>


                <!-- 삭제 -->
                <vs-td>
                  <vs-checkbox 
                    v-if="data[indextr].status === 2"
                    v-model="isChecked"
                  >

                  </vs-checkbox>
                  <vs-checkbox 
                    v-if="data[indextr].status === 1"
                    v-model="isNotChecked"
                  >
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <div class="button-area">
            
            <!-- 저장 버튼 -->
            <vs-button 
              color="primary" 
              type="filled"
              size="small"
              class="button"
            >
            저장
            </vs-button>

            <!-- 추가 버튼 -->
            <vs-button 
              color="primary" 
              type="filled"
              size="small"
              class="button"
              @click="addItemPopup()" > 
            
            추가
            </vs-button>

            <!-- 추가 팝업 -->
            <vs-popup 
              class="holamundo" 
              :title="settingName + ' 추가'" 
              :active.sync="addItemPopupFlag">

              <div class="add-data-area">
                  <!-- label="명칭" -->
                <vs-input
                  v-model="newDataName"
                  class="add-data-input"
                  @keyup.enter="addItem(newDataName, switch1)"
                  @keyup.esc="cancelAddItem()"></vs-input>

                <vs-switch 
                  v-model="switch1"
                  class="add-data-switch">
                  <span slot="on">사용</span>
                  <span slot="off">삭제</span>
                </vs-switch>
              </div>

              <vs-button 
                color="primary" 
                type="filled"
                size="small"
                class="button"
                @click="addItem(newDataName, switch1)" > 
              
              추가
              </vs-button>




            </vs-popup>

            <vs-button 
              color="primary" 
              type="border" 
              icon="arrow_upward"
              size="small"
              class="button" />
            <vs-button 
              color="primary" 
              type="border" 
              icon="arrow_downward"
              size="small"
              class="button" />
          </div>

        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
  export default {
    props: {
      settingName : {
        type: String,
        default: '',
        required: true
      }
    },

    data() {
      return {
        popupFlag: false,
        addItemPopupFlag: false,


        selected: [],
        dataList: [],

        isChecked: true,
        isNotChecked: false,
        newDataName: '',            // 입력한 이름
        status: 0,                  // 사용 삭제 여부
        switch1: true,              // 스위치 버튼
      }
    },

    methods: {

      checkbox(status) {
        console.log(status)
        // if (Number(status) === 1) {
        // }
      },

      addItemPopup() {
        this.addItemPopupFlag = true
        this.getCustomerSettingList()
      },

      cancelPopup() {
        this.popupFlag = false
        this.getCustomerSettingList()
      },

      cancelAddItem() {
        this.addItemPopupFlag = false
        this.getCustomerSettingList()
      },



      addItem(dataName, switch1) {
        const status = switch1 ? 1 : 2
        this.$http.post('/api/customer/customerSetting', 
          {
            type: this.settingName,
            name: dataName,
            status: status,
          })
        .then((res) => {
          console.log(res)
          this.newDataName = ''
          this.getCustomerSettingList()

          this.$vs.notify({
            title: res.data.data.name,
            text: `${res.data.data.name} 추가 완료`
          })
        })
        .catch((err) => {
          console.log(err)
        })
      },


      refreshAll() {
        // 새로고침
        this.$router.go();
      },

      handleSelected(tr) {
        this.$vs.notify({
          title:`Selected ${tr.name}`,
          text:`명칭: ${tr.name}`
        })
      },


      getCustomerSettingList() {
        this.$http.get('/api/customer/customerSettingList', 
          {params : {
            type: this.settingName
          }})
        .then((res) => {
          this.dataList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
      }


    },

    created() {
      this.getCustomerSettingList()
    },
    

  }
</script>

<style lang="scss" scoped>
  .add-data-area {
    display: flex;
    align-items: center;
  }

  .add-data-switch, 
  .add-data-input {
    margin: 0 20;
  }

  .button-area {
    display: flex;
    justify-content: center;
  }

  .button {
    margin: 0 10px;
  }
</style>