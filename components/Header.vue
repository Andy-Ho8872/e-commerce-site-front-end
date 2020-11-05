<template>
    <div class="Navbar blue darken-1 white--text">
        <!-- Navbar 上層 -->
        <v-row class="Navbar_upper d-md-flex align-center justify-center px-5">

            <div class="upper_content d-flex caption">
                <div class="d-flex">
                    <span >追蹤我們</span>
                    <div v-for="(icon,index) in icons" :key="index">
                        <v-icon dark small class="mx-1 mb-1">{{ icon.title }}</v-icon>
                    </div>
                </div>
            </div>

            <v-spacer></v-spacer>

            <div class="lower_content d-flex caption">
                <!-- 通知總覽, 幫助中心(文字) -->
                <li v-for="(list, index) in lists" :key="index" class="mx-1">
                    <v-icon dark small class="mb-1">
                        {{ list.icon }}
                    </v-icon>
                    <span>{{ list.text }}</span>
                </li>
                <!-- 註冊 登入(文字) -->
                <nuxt-link to="/Auth/register" class="mx-2">註冊</nuxt-link>
                <v-divider vertical class="my-1"></v-divider>
                <nuxt-link to="/Auth/login" class="mx-2">登入</nuxt-link>
            </div>

        </v-row>

        <!-- Navbar 下層 -->
        <v-row class="Navbar_lower d-flex flex-nowrap">
            <!-- 畫面寬度在 medium 以下時隱藏 spacer -->
            <v-spacer class="hidden-md-and-down"></v-spacer>
            <!-- 商城 ICON -->
            <nuxt-link to="/">
                <img src="../static/logo.png" alt="LOGO" width="45" height="45" class="mx-6 mt-1">
            </nuxt-link>
            <!-- 搜尋區域 -->
            <v-text-field 
                class="d-flex mt-2 mx-2"
                solo 
                dense
                placeholder="搜尋商品"
                append-icon="fa-search">
            </v-text-field>
            <!-- 購物車 ICON -->
            <a href="#" class="CartLogo">
                <v-icon medium color="white" class="d-flex mx-6 py-5">mdi-cart-outline</v-icon>
            </a>
            <!-- 畫面寬度在 medium 以下時隱藏 spacer -->
            <v-spacer class="hidden-md-and-down"></v-spacer>
        </v-row>

    </div>
</template>


<script>
export default {
    data() {
        return {
            icons: [
                { 'title' : 'mdi-facebook' },
                { 'title' : 'mdi-instagram' },
                { 'title' : 'mdi-google' },
            ],
            lists: [
                { 'icon' : 'mdi-bell', 'text' : '通知總覽'},
                { 'icon' : 'mdi-help-circle-outline', 'text' : '幫助中心'},
            ]
        }
    }
}
</script>


<style lang="scss" scoped> 
    .Navbar {
        padding: 1em 10em; 
    }

    .theme--light.v-divider {
        border-color: white;
    }

    li {
        list-style: none;
    }

    a { // for <nuxt-link>
        text-decoration: none;
        color: white
    }

    @media (max-width: 1024px) {
        .Navbar {
            padding: 1em 0em;
            
        }
    }
    @media (max-width :440px) {
        .Navbar_upper, .lower_content {
            flex-direction: column;
            align-content: flex-start;
            .upper_content {
                span {
                    display: none;
                }
            }
        }     
    }
</style>