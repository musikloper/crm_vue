<template>
  <div></div>
</template>
<script>

export default {
  created() {
    // if(this.$store.state.AppActiveUser.uid){
    //   this.$socket.emit('TOKEN_CHECK', {token: this.$store.getters.isAuthenticated});
    // }else{
    //   this.$socket.emit('TOKEN_CHECK_GETDATA', {token: this.$store.getters.isAuthenticated});
    // }
  },
  sockets: {
    CHECK_RESULT: function () {
      this.$emit('Auth')
    },
    CHECK_ERROR: function (data) {
      this.$vs.notify({
        title: 'Not Authenticated!',
        text: data.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
      if(data.backFlg) this.$router.back();
      else this.$router.push('/pages/logout');
    },
  },
  methods:{
  }
}


</script>