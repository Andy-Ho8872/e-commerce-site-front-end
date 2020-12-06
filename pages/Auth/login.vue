<template>
   <v-container class="pa-auto">
        <div class="form-wrapper ma-auto">
            <!--註冊(登入) Icon -->
            <div class="img_wrapper">
                <v-img 
                    class="mx-auto pt-2"
                    max-width="100" 
                    max-height="100" 
                    :src="require('../../static/form/1.png')" 
                    >
                </v-img>
            </div>
            <!-- 註冊表單 -->
            <v-form 
                class="form pa-8" 
                ref="form"
                v-model="valid"
                >
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
                        label="密碼"
                        placeholder="Password"
                        >
                    </v-text-field>
                </div>
                <!-- 顯示錯誤訊息(隱藏) -->
                <div 
                    class="error_msg text-center"
                    :class="[is_valid ? 'valid' : 'invalid']">
                    <h4 v-for="(msg, index) in messages" :key="index">{{ msg[0] }}</h4>
                </div>
                <!-- 已有帳戶? -->
                <v-row class="has_account font-italic">
                    <span>尚未註冊?</span>
                    <nuxt-link :to="{ name: 'auth-register' }">
                        <div class="mx-2 blue--text ligten-2">註冊</div>
                    </nuxt-link>
                    <v-spacer></v-spacer> 
                    <!-- 忘記密碼 -->
                    <h4>忘記密碼</h4>
                </v-row>
                <!-- 註冊按鈕 -->
                <div class="text-center mt-10">
                    <v-btn
                        class="title"
                        :disabled='!valid'
                        @click.prevent="login"  
                        color="pink" 
                        large
                        rounded
                        outlined 
                        type="submit"
                        >
                        登入
                    </v-btn>
                </div>
                <!-- <span>HELLO-{{ email }}</span> -->
            </v-form>
        </div>
    </v-container>
</template>

<script>
import { apiUserLogin, apiCsrfLogin } from '~/APIs/api.js';
import { mapMutations, mapActions } from 'vuex';

export default {
    data () {
        return {
            // 表單中的值
            form: {
                email: '',
                password: '',
            },
            // 錯誤訊息
            messages: '',
            is_valid: true,
            // 表單驗證規則
            valid: null, // 是否合格
            show: false, // 顯示 or 不顯示 密碼
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
        ...mapMutations({
            getFormValue: 'auth/SET_USER_DATA'
        }),
        ...mapActions({
            logUserIn: 'auth/login'
        }),
        login () {
            // 將 form 所接收到的值傳入到 vuex 
            this.getFormValue({ userData: this.form })
            // 使用 ajax 進行登入的程序
            this.logUserIn();

        }
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
    .form {
        margin: 0 0;
    }
    .img_wrapper {
        position: relative;
        top: 30px;
    }
    .has_account {
        margin: 0 10%;
    }      
</style>