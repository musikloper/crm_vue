<template>
        <div class="navTop">
            <feather-icon class="sm:inline-flex xl:hidden cursor-pointer" icon="MenuIcon" style="float: left; height: 50px; margin-right: 10px;" @click.stop="showSidebar"></feather-icon>
          <div class="navTopItems">
            <!-- SEARCHBAR -->
            <div v-if="searchFlg">
            <input v-model="searchText" style="vertical-align: middle; height: 30px; background-color: inherit; border: none; border-bottom: 1px solid;" @input="filterItems(searchText)">
            <feather-icon style="vertical-align: middle;" icon="SearchIcon" class="cursor-pointer navbar-fuzzy-search ml-4" @click="filterItems(searchText)"></feather-icon>
            </div>
            <!-- NOTIFICATIONS -->
            <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer" style="vertical-align: middle; margin-right: 20px;">
              <feather-icon icon="BellIcon" class="cursor-pointer mt-1 ml-4" :badge="$store.state.AppActiveUser.unreadNotifications.length"></feather-icon>
              <vs-dropdown-menu class="notification-dropdown dropdown-custom">

                  <div class="notification-top text-center p-5 bg-primary text-white">
                  <h3 class="text-white">{{ $store.state.AppActiveUser.unreadNotifications.length }} New</h3>
                  <p class="opacity-75">App Notifications</p>
                  </div>

                  <VuePerfectScrollbar ref="mainSidebarPs" class="scroll-area--nofications-dropdown p-0 mb-10" :settings="{maxScrollbarLength: 60, wheelSpeed: .60,}">
                  <ul class="bordered-items">
                  <li v-for="ntf in $store.state.AppActiveUser.unreadNotifications" :key="ntf.index" class="flex justify-between px-4 py-4 notification cursor-pointer">
                      <div class="flex items-start">
                      <feather-icon :icon="ntf.icon" :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"></feather-icon>
                      <div class="mx-2">
                          <span class="font-medium block notification-title" :class="[`text-${ntf.category}`]">{{ ntf.title }}</span>
                          <small>{{ ntf.msg }}</small>
                      </div>
                      </div>
                      <small class="mt-1 whitespace-no-wrap">{{ elapsedTime(ntf.time) }}</small>
                  </li>
                  </ul>
                  </VuePerfectScrollbar>
                          <div class="
                              checkout-footer
                              fixed
                              pin-b
                              rounded-b-lg
                              text-primary
                              w-full
                              p-2
                              font-semibold
                              text-center
                              border
                              border-b-0
                              border-l-0
                              border-r-0
                              border-solid
                              border-grey-light
                              cursor-pointer">
                              <span>View All Notifications</span>
                          </div>
              </vs-dropdown-menu>
            </vs-dropdown>
            <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer" style="vertical-align: middle;">
              <p :style="`display: inline-block; width: 45px; height: 45px; border-radius: 10px; margin-right: 10px; background: center/cover url(${$store.state.AppActiveUser.image});`"></p>
              <p class="font-semibold" style="display: inline-block; vertical-align: top; line-height: 45px;">{{$store.state.AppActiveUser.name}} {{$store.state.AppActiveUser.lastName}}</p>
              <vs-dropdown-menu>
                  <ul style="min-width: 9rem">
                 <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="$router.push('/profile')"><feather-icon icon="UserIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">MyPage</span></li> -->
                  <vs-divider class="m-1"></vs-divider>
                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="onClickLogout()">
                      <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"></feather-icon> 
                      <span class="ml-2">Logout</span>
                  </li>
                  </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>
</template>


<script>
export default {
    name: 'createNavBar',
    props: {
        // icon: { type: String, required: true },
        searchFlg: {type: Boolean}
    },
    data:function(){
        return {
            searchText: '',
        }
    },
    methods: {
        showSidebar() {
            this.$emit('showSidebar');
        },
        filterItems(event) {
            this.$emit('filterItems',event)
        },
        onClickLogout() {
            // this.$store.dispatch('LOGOUT').then(() => { console.log(this); this.$router.push('/pages/login')})
            this.$router.push('/pages/logout');
        },
    }
}

</script>