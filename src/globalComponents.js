/*=========================================================================================
  File Name: globalComponents.js
  Description: Here you can register components globally
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import VxCard  from './components/vx-card/VxCard.vue'
import VxList  from './components/vx-list/VxList.vue'
import FeatherIcon  from './components/FeatherIcon.vue'

Vue.component(VxCard.name, VxCard)
Vue.component(VxList.name, VxList)
Vue.component(FeatherIcon.name, FeatherIcon)