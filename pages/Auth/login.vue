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
                <h1 class="text-center my-10">登入</h1>
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
                    尚未註冊?
                    <nuxt-link to="/Auth/register">
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
                        color="purple" 
                        large
                        rounded
                        outlined 
                        type="submit">
                        登入
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