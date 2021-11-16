import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'
Vue.use(Router)

const logout = () => () => {
  store.dispatch('LOGOUT').then(() => {router.push({path: '/pages/login', query: { logout: true}})});
}

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
     

      {
    // =============================================================================  1
    // MAIN LAYOUT ROUTES
    // =============================================================================
        path: '',
        component: () => import('./layouts/main/Main.vue'),
        children: [
      // =============================================================================
      // Theme Routes
      // =============================================================================
          {
            path: '/',
            redirect: '/Home',
          },
          {
            path: '/Home',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
          },
          {
            path: '/schedule/scheduleList',
            name: 'schedule',
            component: () => import('@/views/pages/schedule/scheduleList.vue')
          },
          {
            path: '/receive/receiveList',
            name: 'receive',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/schedule/scheduleSearch',
            name: 'scheduleSearch',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/customer/customerList',
            name: 'customer',
            component: () => import('@/views/pages/customer/customerMain.vue')
          },
          {
            path: '/storage/storageList',
            name: 'storage',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/advice/adviceList',
            name: 'advice',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/photo/photoList',
            name: 'photo',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/penchart/penchartList',
            name: 'penchart',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/textchart/textchartList',
            name: 'textchart',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/managechart/managechartList',
            name: 'managechart',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/mms/mmsSearchList',
            name: 'mmsSearch',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/mms/mmsSetupList',
            name: 'mmsSetup',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/prescription/prescriptionList',
            name: 'prescription',
            // component: () => import('@views/pages/user/userList.vue')
          },
          {
            path: '/call/callList',
            name: 'call',
            // component: () => import('@views/pages/user/userList.vue')
          },

          // { // EXAMPLE
          //   path: '/productManage',
          //   name: 'productManage',
          //   component: () => import('@/views/pages/Product/productMain.vue'),
          // },

          {
            path: '/settings',
            name: 'settings',
            component: () => import('@/views/pages/Settings.vue')
          },
          
          {
            path: '/pages/logout',
            name: '로그아웃',
            beforeEnter: logout()
          },

          // {
          //   path: '/customer/customerJabSetting',
          //   name: '고객직업설정',
          //   component: () => import('@/views/pages/customer/CustomerTypeRegister.vue')
          // }
        ],
      },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
      {
        path: '',
        component: () => import('@/layouts/full-page/FullPage.vue'),
        children: [
      // =============================================================================
      // PAGES
      // =============================================================================
          {
            path: '/pages/login',
            name: 'pageLogin',
            component: () => import('@/views/pages/Login.vue')
          },
          {
            path: '/pages/register',
            name: 'pageregister',
            component: () => import('@/views/pages/Register.vue')
          },
          {
            path: '/pages/error-404',
            name: 'pageError404',
            component: () => import('@/views/pages/Error404.vue')
          },
        ]
      },
      // Redirect to 404 page, if no match found
      {
        path: '*',
        redirect: '/pages/error-404'
      }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})


export default router
