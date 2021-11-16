import Vue from 'vue'

export default function vsNotify(status, msg) {
  const title = status === 'error' ? "오류발생!" : "성공!"
  const color = status === 'error' ? 'danger' : 'success'

  Vue.prototype.$vs.notify({
    title: title,
    text: msg,
    iconPack: 'feather',
    icon: 'icon-alert-circle',
    color: color,
  })
}