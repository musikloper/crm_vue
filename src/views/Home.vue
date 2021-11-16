<template>
	<div id="Home">  
    <div class="home-container">
      <h1>HOME</h1>
      <p>아직 준비중인 화면입니다.</p>
    </div>
	</div>
</template>


<script>

export default {
  created() {
    // this.$socket.emit('TOKEN_CHECK', {token: this.$store.getters.isAuthenticated, level: 0});
    // this.activeUser = JSON.parse(JSON.stringify(this.$store.state.AppActiveUser));
  },
  data(){
    return {
      activeUser: {},
      userDatas:[],
    }
  },
  methods:{
    showSidebar() {
      this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
    },
  }
}
</script>

<style lang='scss' scoped>
.home-container {
  padding: 50px;
}
h1 {
  margin-bottom: 15px;
}

p {
  color: grey;
}
</style>