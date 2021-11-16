/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'
// import VueSocketIO from 'vue-socket.io'
// Vue.use(new VueSocketIO({           
//     debug: false,
//     connection: '/',
    
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
//     options: { path: "/managers/" } //Optional options
// }))

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)
import VTooltip from 'v-tooltip';
Vue.use(VTooltip)
import CKEditor from '@ckeditor/ckeditor5-vue2';
Vue.use(CKEditor);
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts);
Vue.component('vue-apex-charts', VueApexCharts)

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

import Datepicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css';
Vue.component('datepicker', Datepicker);

import VuePerfectScrollbar from 'vue-perfect-scrollbar';
Vue.use(VuePerfectScrollbar);
Vue.component('VuePerfectScrollbar', VuePerfectScrollbar);

import VModal from 'vue-js-modal';
Vue.use(VModal, {});

Vue.directive("lazy", {
    inserted: (el, { value }) => {
      // eslint-disable-next-line no-unused-vars
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            // observer.unobserve(entry.target)
            let image = new Image()
            image.src = value
            image.onload = () => {
                entry.target.src = value
            }
            image = null
        })
      })
      observer.observe(el)
    }
})
// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

// Styles: SCSS
import './assets/scss/main.scss'

// Tailwind
import '@/assets/css/main.css';

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

// axios
import axios from 'axios'
Vue.prototype.$http = axios

// moment
import moment from 'moment'
Vue.prototype.$moment = moment

// i18n
import i18n from './i18n/i18n'

// Feather font icon
require('./assets/css/iconfont.css')

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')