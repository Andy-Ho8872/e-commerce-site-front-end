<template>
    <v-container >
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
            <!-- 註冊表單 -->
            <v-form class="pa-8" ref="form" v-model="valid">
                <!-- 帳戶文字 -->
                <h1 class="text-center my-10">登入</h1>
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
                    <span>尚未註冊?</span>
                    <nuxt-link :to="{ name: 'auth-register' }">
                        <span class="mx-2">註冊</span>
                    </nuxt-link>
                    <v-spacer></v-spacer>
                    <!-- 忘記密碼 -->
                    <h4>忘記密碼</h4>
                </v-row>
                <!-- 登入按鈕 -->
                <div class="text-center mt-10">
                    <v-btn
                        class="title"
                        :disabled="!valid"
                        :loading="loading"
                        @click.prevent="login(form)"
                        color="purple"
                        large
                        rounded
                        outlined
                    >
                        登入
                    </v-btn>
                </div>
            </v-form>
            <!-- 顯示錯誤訊息(隱藏) -->
            <div class="error_msg text-center">
                <v-scroll-y-transition>
                    <v-alert class="mx-4" type="error" v-for="(msg, index) in message" :key="index">
                        {{ msg[0] }}
                    </v-alert>
                </v-scroll-y-transition>
            </div>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            //* 表單中的值
            form: {
                email: '',
                password: '',
            },
            //* 表單驗證規則
            valid: null, //* 是否合格
            show: false, //* 顯示 or 不顯示 密碼
            rules: {
                required: value => !!value || '此欄位必填',
                min: value => value.length >= 6 || '至少需要6個英文或數字',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || '範例 : abc123@gmail.com'
                },
            },
        }
    },
    methods: {
        ...mapActions({
            //* 登入使用者
            login: 'auth/login',
            //* 確認使用者是否已經登入
            checkIfUserHasLoggedIn: 'auth/checkIfUserHasLoggedIn'
        }),
    },
    computed: {
        ...mapGetters({
            //* 錯誤訊息
            message: 'auth/getMessage',
            //* loading 狀態
            loading: 'auth/getLoading'
        }),
    },
    mounted() {
       this.checkIfUserHasLoggedIn()
    }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
    position: relative;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
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
