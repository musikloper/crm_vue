/*=========================================================================================
  File Name: getters.js
  Description: Vuex Store - getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const getters = {
  isAuthenticated (state) {
    const accessToken = state.accessToken || localStorage.accessToken
    return accessToken
  },

	// COMPONENT
		// vx-autosuggest
  // starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),

  // mRegSend(state){
  //   return state.missionRegistorForm
  // }
  
}

export default getters