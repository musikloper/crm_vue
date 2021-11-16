import store from '@/store/store.js'

export default function toggleLoading(status) {
  store.commit('TOGGLE_LOADING', status)
}