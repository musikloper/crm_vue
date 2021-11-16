<!-- =========================================================================================
    File Name: ScheduleSetting.vue
    Description: 직원 설정 컴포넌트
    ----------------------------------------------------------------------------------------
    Props: 
      
    
========================================================================================== -->



<template>
  <div
    @keyup.esc="cancelPopup()">

    <vs-button 
      @click="popupFlag=true" 
      color="primary" 
      type="border"
    > 
    {{ title }}
    </vs-button>

    <vs-popup 
      class="holamundo" 
      :title="title" 
      :active.sync="popupFlag">
      <div class="container">
        <div class="table-area">

          <vs-table 
            v-model="selected"
            @selected="handleSelected"
            :data="managerList">
            <template slot="thead">
              <vs-th>
                이름
              </vs-th>
              <vs-th>
                구분
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

                <vs-td 
                  :data="data[indextr]">
                  {{data[indextr].type}}
                </vs-td>

                <!-- 사용 -->
                <!-- <vs-td>
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
                </vs-td> -->


                <!-- 삭제 -->
                <!-- <vs-td>
                  <vs-checkbox 
                    v-if="data[indextr].status === 2"
                    v-model="isChecked"
                  >

                  </vs-checkbox>
                  <vs-checkbox 
                    v-if="data[indextr].status === 1"
                    v-model="isNotChecked"
                  >
                </vs-td> -->
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
              :title="'직원 추가'" 
              :active.sync="addItemPopupFlag">

              <div class="add-data-area">
                <!-- label="이름" -->
                <vs-input
                  v-model="newDataName"
                  autofocus="true"
                  @keyup.esc="cancelAddItem()"></vs-input>

                <vs-input
                  label="구분"
                  v-model="newDataType"
                  @keyup.enter="addItem(newDataName, newDataType, switch1)"
                  autofocus="true"
                  @keyup.esc="cancelAddItem()"></vs-input>

                <vs-switch v-model="switch1">
                  <span slot="on">사용</span>
                  <span slot="off">삭제</span>
                </vs-switch>
              </div>
              <vs-button 
                color="primary" 
                type="filled"
                size="small"
                class="button"
                @click="addItem(newDataName, newDataType, switch1)" > 
              
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

    data() {
      return {
        title: '직원 설정',

        popupFlag: false,
        addItemPopupFlag: false,

        selected: [],
        managerList: [],
        isChecked: true,
        isNotChecked: false,

        newDataName: '',
        newDataType: '',
        status: 0,
        switch1: true,
      }
    },

    methods: {
      addItemPopup() {
        this.addItemPopupFlag = true
        this.getManagerList()
      },

      cancelPopup() {
        this.popupFlag = false
        this.getManagerList()
      },

      cancelAddItem() {
        this.addItemPopupFlag = false
        this.getManagerList()
      },

      refreshAll() {
        // 새로고침
        this.$router.go();
      },



      addItem(dataName, newDataType, switch1) {
        console.log(dataName, newDataType, switch1)
        const status = switch1 ? 1 : 2
        this.$http.post('/api/Manager', 
          {
            name: dataName,
            type: newDataType,
            status: status,
          })
        .then((res) => {

          this.newDataName = ''
          this.newDataType = ''
          this.getManagerList()

          this.$vs.notify({
            title: res.data.data.name,
            text: `${res.data.data.name} 추가 완료`
          })
        })
        .catch((err) => {
          console.log(err)
        })
      },


      handleSelected(tr) {
        console.log(tr)
        this.$vs.notify({
          title:`Selected ${tr.name}`,
          text:`명칭: ${tr.name}`
        })
      },


      getManagerList() {
        this.$http.get('/api/manager')
        .then((res) => {
          this.managerList = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
      }


    },

    created() {
      // this.testCustomerJobList()
      this.getManagerList()
    },

  }
</script>

<style lang="scss" scoped>
  .button-area {
    display: flex;
    justify-content: center;
  }

  .button {
    margin: 0 10px;
  }
</style>