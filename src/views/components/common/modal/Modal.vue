<!-- =========================================================================================
    File Name: Modal.vue
    Description: Modal 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Slots: 
      - header: 모달 제목
      - body: 모달 내용
      - buttonNO: no 버튼 텍스트 or 내용
      - buttonOK: yes 버튼 텍스트 or 내용
    
    Action:
      - confirm: buttonOK 눌렸을 때 실행될 함수
      - close: buttonNO 눌렸을 때 실행될 함수         
========================================================================================== -->

<template>
  <div>
    <transition name="dialogModal">
      <div class="dialogModal-mask">
        <div class="dialogModal-wrapper">
            <div class="dialogModal-container">

                <div class="dialogModal-header">
                  <slot name="header"></slot>
                </div>

                <div class="dialogModal-body">
                  <slot name="body"></slot>
                </div>
                
                <div class="dialogModal-footer">
                    <button class="buttonNO" @click="$emit('close')">
                        <slot name="buttonNO"></slot>
                    </button>
                    <button class="buttonOK" @click="$emit('confirm')">
                        <slot name="buttonOK"></slot>
                    </button>
                </div>

            </div>
        </div>
      </div>
    </transition>
  </div>
</template>