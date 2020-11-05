<template>
    <v-container class="pa-auto">
        <div class="form-wrapper ma-auto">
            <!--註冊(登入) Icon -->
            <div class="img_wrapper">
                <v-img 
                    max-width="100" 
                    max-height="100" 
                    :src="require('../../static/form/1.png')" 
                    class="mx-auto pt-2">
                </v-img>
            </div>
            <!-- 登入表單 -->
            <v-form class="form pa-8">
                <h1 class="text-center my-10">註冊帳戶</h1>
                <!-- 電子郵件(帳號) -->
                <v-text-field
                    class="ma-8"
                    prepend-icon="fa-user"
                    color="blue" 
                    dense
                    label="電子郵件" 
                    placeholder="Email">
                </v-text-field>
                <!-- 密碼 -->
                <v-text-field
                    class="ma-8"
                    prepend-icon="fa-lock" 
                    dense 
                    label="密碼"
                    placeholder="Password">
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
                        color="pink" 
                        large
                        rounded
                        outlined 
                        type="submit">
                        註冊
                    </v-btn>
                </div>
            </v-form>
        </div>
    </v-container>
</template>

<script>
export default {

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