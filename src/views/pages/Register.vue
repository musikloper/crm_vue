<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title">
                                    <h4 class="mb-4">{{ $t('CreateAccount') }}</h4>
                                    <p>{{ $t('CreateAccountText') }}</p>
                                </div>
                                <div class="clearfix">
                                    <vs-input
                                        :success="(/^[가-힣a-zA-Z0-9_ ]{2,20}$/).test(username)" 
                                        :danger="!(/^[가-힣a-zA-Z0-9_ ]{2,20}$/).test(username)"
                                        danger-text="2~20 characters"
                                        label-placeholder="Username"
                                        name="username"
                                        placeholder="Username"
                                        v-model="username"
                                        class="w-full" />
                                    <vs-input
                                        :success="(/^[a-zA-Z0-9]{4,20}$/).test(userId)" 
                                        :danger="!(/^[a-zA-Z0-9]{4,20}$/).test(userId)"
                                        danger-text="only alphabet or numbers, 4~20 characters"
                                        label-placeholder="Id"
                                        name="Id"
                                        placeholder="Id"
                                        v-model="userId"
                                        class="w-full" />
                                    <vs-input
                                        :success="(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+\.[a-zA-Z]{2,5}$/).test(email)" 
                                        :danger="!(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+\.[a-zA-Z]{2,5}$/).test(email)"
                                        danger-text="please input correct email format"
                                        name="email"
                                        type="email"
                                        label-placeholder="Email"
                                        placeholder="Email"
                                        v-model="email"
                                        class="w-full mt-6" />
                                    <vs-input
                                        :success="(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/).test(password)" 
                                        :danger="!(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/).test(password)"
                                        danger-text="At least one special character, 6~20 characters"
                                        ref="password"
                                        type="password"
                                        name="password"
                                        label-placeholder="Password"
                                        placeholder="Password"
                                        v-model="password"
                                        class="w-full mt-6" />
                                    <vs-input
                                        :success="password == confirm_password" 
                                        :danger="password != confirm_password"
                                        danger-text="input same password"
                                        type="password"
                                        name="confirm_password"
                                        label-placeholder="Confirm Password"
                                        placeholder="Confirm Password"
                                        v-model="confirm_password"
                                        class="w-full mt-6" />
                                    <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">{{ $t('acceptText') }}</vs-checkbox>
                                    <vs-button  type="border" to="/pages/login" class="mt-6">{{ $t('Login') }}</vs-button>
                                    <vs-button class="float-right mt-6" @click="registerUser" :disabled="!(/^[a-zA-Z0-9]{4,20}$/).test(userId)||
                                                                                                        !(/^[가-힣a-zA-Z0-9_ ]{2,20}$/).test(username)||
                                                                                                        !(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+\.[a-zA-Z]{2,5}$/).test(email)||
                                                                                                        !(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/).test(password)||
                                                                                                        password != confirm_password">{{ $t('Register') }}</vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            userId: '',
            email: '',
            password: '',
            confirm_password: '',
            isTermsConditionAccepted: true,
            registerDisable: true,
        }
    },
    sockets: {
        ERROR: function (data) {
            this.$vs.notify({
                title: 'Register Fail!',
                text: data,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
            });
        },
        REGISTER_RESULT: function () {
            this.redirect();
        },
    },
    computed: {
    },
    methods: {
        registerUser() {
            if(this.$store.state.AppActiveUser.uid){
                return this.notifyAlreadyLogedIn();
            }
            this.$socket.emit('REGISTER', {id: this.userId, pw: this.password, name: this.username, email: this.email});
        },
        notifyAlreadyLogedIn() {
            this.$vs.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            });
        },
        redirect() {
            const {search} = window.location
            // console.log(search);
            const tokens = [search.replace(/^\?/, '').replace('&', '?')];
            const {to} = tokens.reduce((qs, tkn) => {
            const pair = tkn.split('=')
            pair[1] = pair.slice(1).join('=');
            qs[pair[0]] = decodeURIComponent(pair[1])
            return qs
            }, {})
            // console.log(to)
            if(to) this.$router.push(to)
            else this.$router.push('/')
        },
    },
    created() {
    //   this.sockets.unsubscribe('ERROR');
        // if (this.$store.getters.isAuthenticated){
        //     // console.log(this.$store.getters.isAuthenticated);
        //     console.log(this, this.$store.getters.isAuthenticated)
        //     this.redirect()
        // }
    },
    mounted(){
        // this.sockets.subscribe('ERROR', (data) => {
        //     this.$vs.notify({
        //         title: 'Register Fail!',
        //         text: data.message,
        //         iconPack: 'feather',
        //         icon: 'icon-alert-circle',
        //         color: 'danger'
        //     });
        // });
        // this.sockets.subscribe('REGISTER_RESULT', (data) => {
        //     this.$router.push('/');
        //     this.sockets.unsubscribe('REGISTER_RESULT');
        // });
    }
}
</script>
