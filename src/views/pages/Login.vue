<template>
  <div id="Login">
      <header>
        <h1>{{ $t('Common.CompanyName') }} {{ $t('Login.logoText') }}</h1>
      </header>

      <main class="center-items">
        <div class="login-form center-items">
          <div class="form-section">
            <label for='email'>{{ $t('Login.email') }}</label>
            <input 
              v-model="email" 
              id="email"
              type="email"
              :placeholder="$t('Login.emailPlaceholder')" 
            />
          </div>
          <div class="form-section">
            <label for="password">{{ $t('Login.password') }}</label>
            <input 
              v-model="password" 
              id="password" 
              type="password" 
              :placeholder="$t('Login.passwordPlaceholder')" 
              @keyup.enter="loginUser"
            />
          </div>
          <div class="bottom form-section center-items">
            <button @click="loginUser">{{ $t('Login.login') }}</button>
          </div>
        </div>
      </main>
  </div>
</template>

<script>
export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    created() {
      if(this.$route.query.logout) this.$socket.emit('LOGOUT');
    },
    sockets: {
      ERROR: function (data) {
        this.$vs.notify({
            title: 'Login Fail!',
            text: data.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
        });
      },
      USERINFO: function () {
        this.redirect();
      },
    },
    methods: {
      loginUser() {
        if(!this.validate()) return
        this.$socket.emit('LOGIN', {id: this.email, pw: this.password});
      },
      validate() {
        let result
        if(
          this.email.trim() === '' || this.password.trim() === ''
        ) {
          alert(this.$t('Common.enterEverything'))
          result = false
        } else {
          result = true
        }
        return result
      },
      redirect() {
        this.$router.push('/')

        // const {search} = window.location
        // const tokens = [search.replace(/^\?/, '').replace('&', '?')];
        // const {to} = tokens.reduce((qs, tkn) => {
        //   const pair = tkn.split('=')
        //   pair[1] = pair.slice(1).join('=');
        //   qs[pair[0]] = decodeURIComponent(pair[1])
        //   return qs
        // }, {})
        // console.log("to::", to) // 로그인 후, 페이지 넘어갈때 이거 찍힘! 지금은 undefined!        
        // if(to) this.$router.push(to)
        // else this.$router.push('/')
      },      
    },
}
</script>

<style lang="scss" scoped>
#Login {
  height: 88vh;

  header {
    border-bottom: 1.5px solid #eee;
    padding: 25px;
  }

  main {
    height: 100%;
  }

  .login-form {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12);
    width: 500px;
    padding: 40px 20px 20px 20px;
    flex-direction: column;
  }

  .form-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-bottom: 15px;

    label {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 15px;
    }

    input {
      padding: 10px;
    }
  }

  .form-section.bottom {
    button {
      border: 1px solid #000;
      border-radius: 5px;
      background-color: #000;
      color: #fff;
      font-size: 15px;
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      &:active {
        transform: scale(0.98);
      }
    }

    strong { 
      font-weight: normal;
      color: grey;
    }

    strong::before {
      content: '!';
      display: inline-block;
      background-color: lightgray;
      border-radius: 50%;
      font-weight: bold;
      color: #fff;
      padding: 0 10px;
      margin-right: 5px;
    }

    a {
      display: inline-block;
      margin: 0 auto;
      margin-top: 15px;
    }
  }

  .center-items {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
