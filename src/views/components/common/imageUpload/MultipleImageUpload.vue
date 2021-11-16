<!-- =========================================================================================
    File Name: MultipleImageUpload.vue
    Description: firebase storage에 이미지 "여러개" 업로드 하는 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - storageFolder: firebase storage 폴더 이름. -> 'banner'(배너등록/수정) or 'mission_main_image'(미션등록/수정) or 'tutorial_image'(튜토리얼 등록/수정)
      - propsImgUrl: '수정'일 경우에만, 기존에 있는 이미지 url 받기
    
    Action:
      - updateUrl: 사용하는 곳에서 firebase에 업로드한 이미지 url 업데이트 하는 함수
========================================================================================== -->

<template>
  <div id="MultipleImageUpload" class="inherit-width-height">
    <div class="upload-section inherit-width-height">
      <div v-if="loading" class="progress-bar">
        <div class="progress" :style="{width: `${progress}%`}"></div>
        <small>loading...{{ progress }}%</small>
      </div>
      <p v-else-if="error" class="error-msg">{{ error }}</p>
      <p v-else-if="notice" class="notice-msg">{{ notice }}</p>
      <p v-else-if="firebaseErr" class="error-msg">{{ firebaseErr }}</p>

      <button class="upload-btn inherit-width-height" 
        @click="uploadAreaClicked" 
        @drop.prevent="dropImg"
        @dragenter.prevent
        @dragover.prevent
      >
        <img src="@/assets/images/admimages/uploadimg.svg">
        <pre>{{ uploadBtnText }}</pre>
      </button>
      <input type="file" 
        @change="selectImg" 
        ref="fileInput" 
        class="file-input"
        accept="image/*"
      />
    </div>
    <div class="result-section inherit-width-height">
      <div v-if="multiImgUrl.length" class="prev-img-container inherit-width-height">
        <div 
          v-for="(img, index) in multiImgUrl" 
          :key="index"
          class="preview-img inherit-width-height"
        >
          <img :src="img" alt="banner" class="inherit-width-height" />
          <button @click="deleteImage(index)" class="delete-btn">
            <img src="@/assets/mfast/images/trash.svg" alt="trash" class="trash-icon">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imageStorage } from '@/firebase/config.js'

// import dummyImg from '@/assets/mfast/images/dummy-img.png'

export default {
  props: {
    storageFolder: {
      type: String,
      default: '',
      required: true
    },
    propsImgUrl: {
      // type: String,
      // default: '',
    }
  },
  created() {
    // '수정'일 경우만, 기존 이미지 세팅!
    if(this.propsImgUrl) {
      this.url = this.propsImgUrl
      this.disabled = true
    }
  },
  data() {
    return {
      types: ['image/png', 'image/jpeg'],
      error: null,
      notice: null,
      loading: false,
      // uploadImage
      image: null,
      // url: 'url',
      progress: 0,
      disabled: false,
      firebaseErr: null,

      // multiImgUrl: [dummyImg, dummyImg, dummyImg],
      multiImgUrl: []
    }
  },
  computed: {
    uploadBtnText() {
      let text
      if (this.disabled) {
        text = '한번에 하나의 파일만 선택하세요!'
      } else {
       text = `파일을 이곳에 드래그하거나 
클릭해서 파일을 선택해주세요.`
      }
      return text
    },
    showUploadSection() {
      return !this.url && !this.loading && !this.error && !this.notice && !this.firebaseErr
    }
  },
  methods: {
    uploadAreaClicked() {
      this.$refs.fileInput.click()
    },
    selectImg(e) {
      // if(this.disabled) return

      const selected = e.target.files[0]
      this.onImageDrop(selected)
    },
    dropImg(e) {
      // if(this.disabled) return

      const dropped = e.dataTransfer.files[0]
      this.onImageDrop(dropped)
    },
    onImageDrop(file) {

      if (!file) {
        this.image = null
        this.error = "선택된 파일이 없습니다."
        setTimeout(() => {
          this.error = null
        }, 1000)
        return
      }
      if (!this.types.includes(file.type)) {
        this.image = null
        this.error = "이미지 파일만 업로드 가능합니다!"
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
      const uploadTask = imageStorage.ref().child(`${this.storageFolder}/${this.image.name}`).put(this.image)
      this.loading = true
      this.uploadToFirebase(uploadTask)
    },
    deleteImage(index) {

      const urlInfo = imageStorage.refFromURL(this.multiImgUrl[index])

      const image = imageStorage.ref(`${this.storageFolder}/${urlInfo.name}`)
      const fileExt = image.name.split('.').pop()
      const resizedImg = imageStorage.ref(`${this.storageFolder}/${image.name.replace(/\.[^/.]+$/, "")}_200x200.${fileExt}`)
      this.deleteFrmFirebase(image)
      this.deleteFrmFirebase(resizedImg, index)
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
          this.multiImgUrl.push(url)
          this.$emit('updateUrl', url)
  
          this.loading = false
          this.disabled = true
        } catch (error) {
          console.error(`url을 가져오는데 실패했습니다. error: ${error}`)
        }
      })
    },
    deleteFrmFirebase(image, index) {
      image.delete()
        .then(() => {
          this.image = null
          this.multiImgUrl = this.multiImgUrl.filter(i => this.multiImgUrl.indexOf(i) !== index)
          this.deleteSuccessMsg()
          this.emptyUrl()
        }).catch((err) => {
          console.error("firebase err::", err)
          this.firebaseErrMsg('삭제')
          this.emptyUrl()
        })
    },
    deleteSuccessMsg() {
      this.notice = '이미지가 삭제되었습니다.'
      setTimeout(() => {
        this.notice = null
      }, 1000)
    },
    firebaseErrMsg(action) {
      this.firebaseErr = `이미지 ${action}에 실패하였습니다.`
      setTimeout(() => {
        this.firebaseErr = null
      }, 1500)
    },
    emptyUrl() {
      this.url = ''
      this.$emit('updateUrl', '')
      // this.disabled = false
    }
  }
}
</script>

<style lang='scss' scoped>
  .inherit-width-height {
    height: 100%;
    width: 100%;
  }

  #MultipleImageUpload {
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

        pre {
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

    .prev-img-container {
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
    }

    .preview-img {
      display: inline-block;
      position: relative;

      img {
        border-radius: 3px;
      }
      .delete-btn {
        display: none;
        border: none;
        background: transparent;
        color: black;
        font-weight: bold;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        cursor: pointer;

        .trash-icon {
          width: 40px;
          &:hover {
            transform: rotate(15deg)
          }
        }
      }

      &:hover {
        .delete-btn {
          display: block;
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