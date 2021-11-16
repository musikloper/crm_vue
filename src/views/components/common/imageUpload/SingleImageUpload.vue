<!-- =========================================================================================
    File Name: SingleImageUpload.vue
    Description: firebase storage에 이미지 "한개만" 업로드 하는 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - storageFolder: firebase storage 폴더 이름. -> 예: 'banner'(배너등록/수정) or 'mission_main_image'(미션등록/수정) or 'tutorial_image'(튜토리얼 등록/수정)
      - propsImgUrl: '수정'일 경우에만, 기존에 있는 이미지 url 받기
    
    Action:
      - updateUrl: 사용하는 곳에서 firebase에 업로드한 이미지 url 업데이트 하는 함수
========================================================================================== -->

<template>
  <div id="SingleImageUpload" class="inherit-width-height">
    <div v-if="showUploadSection" class="upload-section inherit-width-height">
      <button class="upload-btn inherit-width-height" 
        @click="uploadAreaClicked" 
        @drop.prevent="dropImg"
        @dragenter.prevent
        @dragover.prevent
        :disabled='disabled' 
      >
        <img src="@/assets/images/admimages/uploadimg.svg">
        <p class="pre">{{ $t('SingleImageUpload.uploadAreaTxt1') }}</p>
        <p class="pre">{{ $t('SingleImageUpload.uploadAreaTxt2') }}</p>
      </button>
      <input type="file" 
        @change="selectImg" 
        ref="fileInput" 
        class="file-input"
        accept="image/*"
      />
    </div>
    <div v-else class="result-section inherit-width-height">
      <div v-if="loading" class="progress-bar">
        <div class="progress" :style="{width: `${progress}%`}"></div>
        <small>{{ $t('CommonEng.loading') }}{{ progress }}%</small>
      </div>
      <p v-else-if="error" class="error-msg">{{ error }}</p>
      <p v-else-if="notice" class="notice-msg">{{ notice }}</p>
      <p v-else-if="firebaseErr" class="error-msg">{{ firebaseErr }}</p>
      <div v-if="url" class="preview-img inherit-width-height">
        <img :src="url" alt="banner" class="inherit-width-height" />
        <button @click="deleteImage" class="delete-btn">X</button>
      </div>
    </div>
  </div>
</template>

<script>
import { imageStorage } from '@/firebase/config.js'

export default {
  props: {
    storageFolder: {
      type: String,
      default: '',
      required: true
    },
    propsImgUrl: {
      type: String,
      default: '',
    }
  },
  watch: {
    propsImgUrl() {
      // '수정'일 경우만, 기존 이미지 세팅!
      if(this.propsImgUrl) {
        this.url = this.propsImgUrl
        this.disabled = true
      }
    }
  },
  data() {
    return {
      types: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'], // dropImg 파일 ext 확인용
      error: null,
      notice: null,
      loading: false,
      // uploadImage
      image: null,
      url: '',
      progress: 0,
      disabled: false,
      firebaseErr: null,
      //
      savedImgName: null,
    }
  },
  computed: {
    showUploadSection() {
      return !this.url && !this.loading && !this.error && !this.notice && !this.firebaseErr
    }
  },
  methods: {
    uploadAreaClicked() {
      this.$refs.fileInput.click()
    },
    selectImg(e) {
      if(this.disabled) return
      const selected = e.target.files[0]
      this.onImageDrop(selected)
    },
    dropImg(e) {
      if(this.disabled) return
      const dropped = e.dataTransfer.files[0]
      this.onImageDrop(dropped)
    },
    onImageDrop(file) {
      if (!file) {
        this.image = null
        this.error = this.$t('SingleImageUpload.selectedImgNotExist')
        setTimeout(() => {
          this.error = null
        }, 1000)
        return
      }
      if (!this.types.includes(file.type)) {
        this.image = null
        this.error = this.$t('SingleImageUpload.canOnlyUploadImg')
        setTimeout(() => {
          this.error = null
        }, 1000)
        return
      }  
      this.image = file
      this.error = null
      this.uploadImage()
    },
    uploadImage() {
      // getting img file name
      const todayMilli = this.$moment().valueOf()
      const fileExt = this.image.name.split('.').pop()
      const imgWithoutExt = this.image.name.replace(`.${fileExt}`, '')
      const finalImgName = `${imgWithoutExt}_${todayMilli}.${fileExt}`
      this.savedImgName = finalImgName
      // upload task
      const uploadTask = imageStorage.ref().child(`${this.storageFolder}/${this.savedImgName}`).put(this.image)
      this.loading = true
      this.uploadToFirebase(uploadTask)
    },
    deleteImage() {
      let image
      if(this.image) {
        image = imageStorage.ref(`${this.storageFolder}/${this.savedImgName}`)
      } else {
        const urlInfo = imageStorage.refFromURL(this.url)
        image = imageStorage.ref(`${this.storageFolder}/${urlInfo.name}`)
      }
      this.deleteFrmFirebase(image)
      // 나중에 200x200 사이즈 이미지도 생성한다면 다시 추가!
      // const fileExt = image.name.split('.').pop() --> savedImgName 사용하기!
      // const resizedImg = imageStorage.ref(`${this.storageFolder}/${image.name.replace(/\.[^/.]+$/, "")}${this.$t('SingleImageUpload.imgSize200')}.${fileExt}`)
      // this.deleteFrmFirebase(resizedImg)
    },
    uploadToFirebase(uploadTask) {
      uploadTask.on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
        this.progress = percentage 
      }, (err) => {
        this.loading = false
        this.firebaseErrMsg('업로드')
        console.error("firebase err::", err)
      }, async () => {
        try {
          const url = await uploadTask.snapshot.ref.getDownloadURL()
          this.url = url
          this.$emit('updateUrl', url)
          this.loading = false
          this.disabled = true
        } catch(err) {
          console.error(`url을 가져오는데 실패했습니다. error: ${err}`)
        }
      })
    },
    deleteFrmFirebase(image) {
      image.delete()
        .then(() => {
          this.image = null
          this.deleteSuccessMsg()
          this.emptyUrl()
        }).catch((err) => {
          console.error("firebase err::", err)
          this.firebaseErrMsg('삭제')
          this.emptyUrl()
        })
    },
    deleteSuccessMsg() {
      this.notice = this.$t('SingleImageUpload.imgDeleted')
      setTimeout(() => {
        this.notice = null
      }, 1000)
    },
    firebaseErrMsg(action) {
      this.firebaseErr = this.$t('SingleImageUpload.firebaseErr', { action: action })
      setTimeout(() => {
        this.firebaseErr = null
      }, 1500)
    },
    emptyUrl() {
      this.url = ''
      this.$emit('updateUrl', '')
      this.disabled = false
    }
  }
}
</script>

<style lang='scss' scoped>
  .inherit-width-height {
    height: 100%;
    width: 100%;
  }

  #SingleImageUpload {
    display: flex;
    align-items: center;

    .upload-section {
      .file-input {
        display: none;
      }
      .upload-btn {
        border: 1px dashed #ababab;
        background-color: #eee;
        border-radius: 3px;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        img {
          margin-bottom: 20px;
        }

        .pre {
          color: rgba(0, 0, 0, 0.38);
          font-size: 14px;
          line-height: 1.43;
        }
      
        &:disabled {
          background-color: grey;
          cursor: not-allowed;
        }
        &:disabled:hover {
          pre {
            color: #fff;
          }
        }
      }
    }

    .result-section {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .preview-img {
      display: inline-block;
      position: relative;

      img {
        border-radius: 3px;
      }
      .delete-btn {
        display: none;
      }

      &:hover {
        .delete-btn {
          display: block;
          border: none;
          background: transparent;
          color: black;
          font-weight: bold;
          padding: 5px;
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;

          &:hover {
            color: red;
          }
        }
      }
    }

    .error-msg {
      color: crimson;
      padding: 5px;
      text-align: center;
    }
    .notice-msg {
      color: orange;
      padding: 5px;
      text-align: center;
    }

    .progress-bar {
      border-radius: 10px;
      height: 10px;
      width: 100%;
      background-color: #eee;
      .progress {
        background-color:#2a9df4;
        border-radius: inherit;
        height: inherit;
      }
      small {
        color: grey;
      }
    }
  }
</style>