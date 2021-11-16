/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import navbarSearchAndPinList from '@/layouts/components/navbarSearchAndPinList'
import themeConfig from '@/../themeConfig.js'
import colors from '@/../themeConfig.js'
const state = {
    projectCreateCheck: false,
    projectExist: false,
    isSidebarActive: true,
    breakpoint: null,
    sidebarWidth: "default",
    reduceButton: themeConfig.sidebarCollapsed,
    bodyOverlay: false,
    sidebarItemsMin: false,
    theme: themeConfig.theme || 'light',
    navbarSearchAndPinList: navbarSearchAndPinList,

    accessToken: null,
    AppActiveUser: {
      uid: '',
      name: '',
      level: '',
      image: '',
      email: '',
      unreadNotifications: [],
    },
    themePrimaryColor: colors.primary,
    starredPages: navbarSearchAndPinList.data.filter((page) => page.highlightAction),

    //////////////////////
    /////// SQUATT ///////
    //////////////////////
    isLoading: false, // main page loading spinner
}

export default state
