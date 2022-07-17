<template>
    <v-container>
        <div class="form-wrapper ma-auto rounded-xl">
            <!--註冊(登入) Icon -->
            <div class="img_wrapper">
                <v-img
                    class="mx-auto pt-2"
                    max-width="100"
                    max-height="100"
                    :src="require('~/static/auth/ToTheMoon.svg')"
                >
                </v-img>
            </div>
            <!-- 表單 -->
            <v-form class="pa-8" ref="form" v-model="valid">
                <!-- 帳戶文字 -->
                <h1 class="text-center my-10">登入</h1>
                <!-- 電子郵件(帳號) -->
                <div>
                    <v-text-field
                        class="input_email ma-6"
                        name="email"
                        required
                        v-model="form.email"
                        :rules="[rules.required, rules.email]"
                        prepend-icon="fa-user"
                        color="blue"
                        label="電子郵件"
                        placeholder="Email"
                    >
                    </v-text-field>
                    <!-- 密碼 -->
                    <v-text-field
                        class="input_password ma-6"
                        name="password"
                        required
                        counter
                        v-model="form.password"
                        :rules="[rules.required, rules.min]"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                        :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                        minlength="6"
                        prepend-icon="fa-lock"
                        color="blue"
                        label="密碼"
                        placeholder="Password"
                    >
                    </v-text-field>
                </div>
                <!-- 已有帳戶? -->
                <v-row class="has_account font-italic">
                    <span>尚未註冊?</span>
                    <nuxt-link :to="{ name: 'auth-register' }">
                        <span class="mx-2">註冊</span>
                    </nuxt-link>
                </v-row>
                <!-- 登入按鈕 -->
                <div class="text-center mt-8">
                    <v-btn
                        class="submit_btn title"
                        @click.prevent="login(form)"
                        :disabled="!valid"
                        :loading="loading"
                        color="purple"
                        large
                        rounded
                        outlined
                    >
                        登入
                    </v-btn>
                </div>
                <!-- divider -->
                <div class="divider d-flex align-center mt-8">
                    <div class="divider_line"></div>
                    <div class="divider__text px-2">或</div>
                    <div class="divider_line"></div>
                </div>
                <!-- 第三方登入按鈕 -->
                <v-row class="my-8">
                    <v-col cols="12" md="4">
                        <v-btn block color="red" @click="socialiteLogin('google')">
                            <v-icon color="white">mdi-google</v-icon>
                            <span class="white--text">Google</span>
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-btn block color="primary" @click="socialiteLogin('facebook')">
                            <v-icon color="white">mdi-facebook</v-icon>
                            <span>Facebook</span>
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-btn block color="blue-grey lighten-2" @click="socialiteLogin('github')">
                            <v-icon color="white">mdi-github</v-icon>
                            <span class="white--text">Github</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
            <!-- 顯示錯誤訊息(預設隱藏) -->
            <div class="error_msg text-center">
                <v-scroll-y-transition group>
                    <v-alert class="mx-4" type="error" v-for="(msg, index) in message" :key="index">
                        {{ msg[0] }}
                    </v-alert>
                </v-scroll-y-transition>
            </div>
        </div>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import authMixin from '~/mixins/authMixin'

export default {
    head() {
        return {
            title: '立即登入以購物',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '優質的購物網站，全網最便宜都在這，立即登入並開始血拚吧!'
                }
            ]
        }
    },
    mixins: [authMixin],
    methods: {
        ...mapActions({
            //* 登入使用者
            login: 'auth/login',
            socialiteLogin: 'auth/socialiteLogin', //* 第三方登入
        }),
    },
    mounted() {
        //* 此處的 function 在 authMixin 裡面
       this.checkIfUserHasLoggedIn() //? 確認使用者是否已經登入
    }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
    position: relative;
    background-image: linear-gradient(135deg, #74EBD5 0%, #9FACE6 100%);
    max-width: 600px;
}
.error_msg {
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translateX(-50%);
    width: fit-content;
}
.img_wrapper {
    position: relative;
    top: 30px;
}
.has_account {
    margin: 0 10%;
}
.divider_line {
    width: 100%;
    height: 0px;
    border-bottom: 1px solid white;
}
</style>
