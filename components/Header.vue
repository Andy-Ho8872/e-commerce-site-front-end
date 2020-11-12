<template>

    <div class="navbar blue darken-1 white--text">
        <!-- Navbar 上層 -->
        <v-row class="navbar_upper d-md-flex align-center justify-center ma-3" :class="{ show : active }">
            <div class="content d-flex caption">
                <!-- 社群帳號 icon -->
                <v-row class="justify-center mx-1">
                    <li v-for="(icon,index) in icons" :key="index">
                        <v-icon 
                            dark 
                            small 
                            class="mx-1 mb-1"
                            >
                            {{ icon.icon }}
                        </v-icon>
                    </li>
                </v-row>
                <!-- 回到首頁 -->
                <li class="mx-1">
                    <nuxt-link 
                        to="/"
                        >
                        <v-icon 
                            dark
                            small
                            class="mx-1 mb-1"
                            >
                            fa-home
                        </v-icon>
                        回到首頁
                    </nuxt-link>
                </li>
            </div>

            <v-spacer></v-spacer>

            <div class="content d-flex caption">
                <!-- 通知總覽, 幫助中心(文字) -->
                <li v-for="(list, index) in lists" :key="index" class="mx-1">
                    <v-icon 
                        dark 
                        small 
                        class="mx-1 mb-1"
                        >
                        {{ list.icon }}
                    </v-icon>
                    <span>{{ list.text }}</span>
                </li>
                <!-- 註冊 登入(文字) -->
                <li>
                    <nuxt-link 
                        to="/Auth/register" 
                        class="mx-1"
                        >
                        <v-icon 
                            class="mx-1 mb-1"
                            small 
                            color="white"
                            >
                            fa-user-plus
                        </v-icon>
                        註冊
                    </nuxt-link>
                </li>
                <v-divider vertical class="my-1 hidden-xs-only"></v-divider>
                <li>
                    <nuxt-link 
                        to="/Auth/login" 
                        class="mx-1"
                        >
                        <v-icon 
                            class="mx-1 mb-1"
                            small 
                            color="white"
                            >
                            fa-user
                        </v-icon>
                        登入
                    </nuxt-link>
                </li>
            </div>
        </v-row>

        <!-- Navbar 下層 -->
        <v-row class="navbar_lower d-flex flex-nowrap">
            <!-- 畫面寬度在 medium 以下時隱藏 spacer -->
            <v-spacer class="hidden-md-and-down"></v-spacer>
            <!--  (extend bar) 只有在 600 px 以下才顯示 -->
            <v-icon
                @click="active = !active"
                medium 
                color="white" 
                class="extend_Bar ml-5 mb-4"
                >
                fa-bars
            </v-icon>
            <!-- 搜尋區域 -->
            <v-text-field 
                class="d-flex mt-2 mx-2"
                solo 
                dense
                placeholder="搜尋商品"
                append-icon="fa-search"
                >
            </v-text-field>
            <!-- 購物車 ICON -->
            <a href="#" class="cart_logo">
                <v-icon 
                    medium 
                    color="white" 
                    class="mr-5 py-4"
                    >
                    fa-cart-plus
                </v-icon>
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
                { 'icon' : 'fa-facebook-square' },
                { 'icon' : 'fa-instagram' },
                { 'icon' : 'fa-google' },
            ],
            lists: [
                { 'icon' : 'fa-envelope', 'text' : '通知總覽'},
                { 'icon' : 'fa-question', 'text' : '幫助中心'},
            ],
            // 觸發 class
            active: false
        }
    },
}
</script>


<style lang="scss" scoped> 
    .navbar {
        padding: 1em 10em;
        width: 100%;
        top: 0;
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
        .navbar {
            padding: 1em 0em;
            width: 100%;
            top: 0;
            z-index: 10000;
        }
    }
    @media (max-width :484px) {
        .navbar_upper {
            flex-direction: column;
            align-content: flex-start;
            position: absolute;
            width: 50vw;
            top: 104px;
            margin: 0 !important;
            background: rgba($color: #000000, $alpha: 0.8);
            // 預設不顯示，等點擊 extend bar 後才顯示
            opacity: 0;
            transform: translateX(-100%);

            .content {
                flex-direction: column;
                align-content: flex-start;
                li {
                    margin: 20px 0px;
                }
            }
        }
        // 觸發後顯示
        .show {
            opacity: 1 !important;
            transition: 0.5s ease-in-out;
            transform: translateX(0%);
        }     
    }
</style>