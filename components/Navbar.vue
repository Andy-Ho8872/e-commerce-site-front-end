<template>
    <div class="Navbar blue darken-1 white--text">
        <!-- Navbar 上層 -->
        <v-row class="d-none d-md-flex align-center justify-center px-5">
            <div class="d-flex caption">
                <span>追蹤我們</span>
                <div v-for="(icon,index) in icons" :key="index">
                    <v-icon dark small class="mx-1 mb-1">{{ icon.title }}</v-icon>
                </div>
            </div>
            <v-spacer></v-spacer>
            <ul class="d-flex caption">
                <!-- 通知總覽, 幫助中心(文字) -->
                <li v-for="(list, index) in lists" :key="index" class="mx-1">
                    <v-icon dark small class="mb-1">
                        {{ list.icon }}
                    </v-icon>
                    <span>{{ list.text }}</span>
                </li>
                <!-- 註冊 登入(文字) -->
                <a href="#" class="mx-2">註冊</a>
                <v-divider vertical class="my-1"></v-divider>
                <a href="#" class="mx-2">登入</a>
            </ul>
        </v-row>

        <!-- Navbar 下層 -->
        <v-row class="d-flex flex-nowrap">
            <!-- 畫面寬度在 medium 以下時隱藏 spacer -->
            <v-spacer class="hidden-sm-and-down"></v-spacer>

            <a href="#" class="BrandLogo">
                <img src="../static/logo_size_invert.png" alt="LOGO" width="45" height="45" class="mx-6 mt-1">
            </a>
            
            <v-text-field 
                solo 
                dense
                placeholder="搜尋商品"
                class="d-flex mt-2 mx-2"
                append-icon="mdi-map-marker">
            </v-text-field>
            
            <a href="#" class="CartLogo">
                <v-icon medium color="white" class="d-flex mx-6 py-5">mdi-cart-outline</v-icon>
            </a>
            
            <v-spacer class="hidden-sm-and-down"></v-spacer>
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
    html, body {
        overflow-x: hidden;
    }

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

    @media (max-width: 768px) {
        .Navbar {
            padding: 1em 0em;
        }
    }
</style>