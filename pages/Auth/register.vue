<template>
    <v-container>
        <div class="form-wrapper ma-auto">
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
                <h1 class="text-center my-10">註冊</h1>
                <!-- 電子郵件(帳號) -->
                <div>
                    <v-text-field
                        class="ma-6"
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
                        class="ma-6"
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
                    <span>已經註冊?</span>
                    <nuxt-link :to="{ name: 'auth-login' }">
                        <span class="mx-2">登入</span>
                    </nuxt-link>
                    <v-spacer></v-spacer>
                    <!-- 目前不使用 -->
                    <!-- <h4>忘記密碼</h4> -->
                </v-row>
                <!-- 註冊按鈕 -->
                <div class="text-center mt-10">
                    <v-btn
                        class="title"
                        @click.prevent="register(form)"
                        :disabled="!valid"
                        :loading="loading"
                        color="pink"
                        large
                        rounded
                        outlined
                    >
                        註冊
                    </v-btn>
                </div>
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
            title: '立即註冊以登入',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '優質的購物網站，全網最便宜都在這，立即註冊並開始血拚吧!'
                }
            ]
        }
    },
    mixins: [authMixin],
    methods: {
        ...mapActions({
            //* 註冊使用者
            register: 'auth/register',
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
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 80%);
    max-width: 600px;
    height: 600px;
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
</style>
