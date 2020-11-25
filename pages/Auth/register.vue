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
                <!-- 註冊帳戶文字 -->
                <h1 class="text-center my-10">註冊</h1>
                <!-- 電子郵件(帳號) -->
                <v-text-field
                    class="ma-8"
                    name="email"
                    :rules="[rules.required, rules.email]"
                    v-model="form.email"
                    required
                    prepend-icon="fa-user"
                    color="blue" 
                    label="電子郵件" 
                    placeholder="Email"
                    >
                </v-text-field>
                <!-- 密碼 -->
                <v-text-field
                    class="ma-8"
                    name="password"
                    @click:append="show = !show"
                    :type="show ? 'text' : 'password'"
                    v-model="form.password"
                    required
                    :rules="[rules.required, rules.min]"
                    counter
                    minlength="6" 
                    prepend-icon="fa-lock" 
                    :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                    label="密碼"
                    placeholder="Password"
                    >
                </v-text-field>
                <!-- 已有帳戶? -->
                <v-row class="has_account font-italic">
                    已經註冊?
                    <nuxt-link to="/Auth/login">
                        <div class="mx-2 blue--text ligten-2">登入</div>
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
                        @click.prevent="register"  
                        color="pink" 
                        large
                        rounded
                        outlined 
                        type="submit"
                        >
                        註冊
                    </v-btn>
                </div>
            </v-form>
        </div>
    </v-container>
</template>

<script>
import axios from 'axios' // default
let baseURL = 'http://localhost:8000' // default
let backEndUrl = '/api/auth/register' // default

let NewBackEndUrl = '/auth/register' // new


export default {
    data () {
        return {
            // 表單中的值
            form: {
                email: '',
                password: '',
                message: ''
            },
            // 表單驗證規則
            valid: null, // 是否合格
            show: false, // 顯示 / 不顯示 密碼
            rules: {
                required: value => !!value || '此欄位必填',
                min: value => value.length >= 6 || '至少需要6個英文或數字',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || '範例 : abc123@gmail.com'
                }
            }
        }
    },
    methods: {
        // default
        // async register () {
        //     let result = await axios.post((baseURL + backEndUrl), {
        //         email: this.form.email,
        //         password: this.form.password
        //     })
        //     console.log(result);
        //     //this.$router.push({ name: 'auth-login' }) // 註冊成功後跳轉至登入頁面
        //     alert('註冊成功 請登入')
        // }   

        // new
        async register () {
            let result = await this.$axios.$post(NewBackEndUrl, {
                email: this.form.email,
                password: this.form.password
            })
            console.log(result);

            //this.$router.push({ name: 'auth-login' }) // 註冊成功後跳轉至登入頁面
            alert('註冊成功 請登入')
        }    
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