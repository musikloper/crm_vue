import Vue from 'vue'
import toggleLoading from '@/utils/toggleLoading.js'

export default function socketEmit(name, payload) {
  toggleLoading(true)
  Vue.prototype.$socket.emit(name, payload)
}