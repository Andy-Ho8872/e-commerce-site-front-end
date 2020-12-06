<template>
    <div class="navbar blue darken-1 white--text">
        <!-- Navbar 上層 -->
        <v-row class="navbar_upper d-md-flex align-center justify-center ma-3" :class="{ show : active }">
            <div class="content_wrapper d-flex caption">
                <!-- 社群帳號 icon -->
                <v-row class="justify-center mx-1">
                    <li v-for="(icon,index) in socialList" :key="index">
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
                <v-row class="mx-1">
                    <li class="mx-1">
                        <nuxt-link 
                            :to="{ name: 'index' }"
                            >
                            <v-icon 
                                dark
                                small
                                class="mx-1 mb-1"
                                >
                                fa-home fa-fw
                            </v-icon>
                            <span>回到首頁</span>
                        </nuxt-link>
                    </li>
                </v-row>
            </div>     
            <v-spacer></v-spacer>
            <!-- 以上勿動 -->
            <div class="content_wrapper d-flex caption">
                <!-- 通知總覽, 幫助中心(文字) -->
                <v-row class="content mx-1">
                    <li v-for="(list, index) in noteList" :key="index" class="mx-1">
                        <v-icon 
                            dark 
                            small 
                            class="mx-1 mb-1"
                            >
                            {{ list.icon }}
                        </v-icon>
                        <span>{{ list.text }}</span>
                    </li>
                </v-row>
                <!-- 如果有使用者登入，則顯示他的帳號(電子郵件)以及登出按鈕 -->
                <v-row v-if="user" class="content mx-1" >
                    <li class="mx-1">
                        <v-icon
                            dark 
                            small 
                            class="mx-1 mb-1"
                            >
                            fa-user fa-fw
                        </v-icon>
                        <span>{{ user }}</span>
                    </li>
                    <li class="mx-1" @click="logout">
                        <v-icon
                            dark 
                            small 
                            class="mx-1 mb-1"
                            >
                            fa-user fa-fw
                        </v-icon>
                        <span class="logout">登出</span>
                    </li>
                </v-row>
                <!--  若使用者沒有登入 -->
                <v-row v-if="!user" class="content mx-1" > 
                    <li v-for="(list, index) in userList" :key="index">
                        <nuxt-link 
                            :to="list.to"
                            class="mx-1"
                            >
                            <v-icon 
                                class="mx-1 mb-1"
                                small 
                                color="white"
                                >
                                {{ list.icon }}
                            </v-icon>
                            <span>{{ list.text }}</span>
                        </nuxt-link>
                    </li>
                </v-row>
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
                class="extend_bar ml-5 mb-4"
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
import { apiGetUserInfo } from '~/APIs/api.js'

export default {
    data () {
        return {
            socialList: [
                { icon : 'fa-facebook-square fa-fw' },
                { icon : 'fa-instagram fa-fw' },
                { icon : 'fa-google fa-fw' },
            ],
            noteList: [
                { icon : 'fa-envelope fa-fw', text : '通知總覽'},
                { icon : 'fa-question-circle fa-fw', text : '幫助中心'},
            ],
            userList: [ 
                { icon : 'fa-user-plus fa-fw', text : '註冊', to : '/auth/register' },
                { icon : 'fa-user-circle fa-fw', text : '登入', to : '/auth/login' },
            ],
            // 觸發 class
            active: false,
            // 使用者登入後顯示帳號
            user: null
        }
    },
    methods: {
        // 取得使用者資訊
        getUserInfo () {
        // 從 localStorage 取得使用者的 Email 與 ID
            const getUserID = localStorage.getItem('UserID')
            const getUserEmail = localStorage.getItem('UserEmail')
            console.log('目前的使用者為:',getUserEmail); 
            // 寫入資料
            //this.user.ID = getUserID;
            this.user = getUserEmail
            // 用 axios 不管了
            
            // try {
            //     const result = await apiGetUserInfo(this.user.ID)
            //     console.log('目前的使用者為(axios):', this.user.Email);
            // }
            // catch (error) {
            //     console.log(error);
            // }
        },

        // 登出使用者( 清除 localStorage 中的 token 與 UserInfo )
        logout () {
            const removeUserInfo = localStorage.clear()
            this.user = null
            console.log("使用者已登出");
        }
    },
    
    
    watch: {
        user:((value) => {
            console.log("監控到變化了!!");    
        })
    }
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
    .extend_bar {
        visibility: hidden; // 預設隱藏
    }
    li {
        list-style: none;
    }
    a { // for <nuxt-link>
        text-decoration: none;
        color: white
    }
    .logout {
        cursor: pointer;
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
    // navbar 上層
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
            transition: 0.5s ease-in-out;
            transform: translateX(-100%);  
        }
        .content_wrapper {
            // width: 100%;
            flex-direction: column;
            align-content: flex-start;
            li {
                margin: 20px 0px;
            }
        }
        // 使用者帳號、登出
        .content {
            flex-direction: column;
        }
    // 點擊後以 SideBar 的形式顯示
        .extend_bar {
            visibility: unset; // 預設隱藏
        }
        // 觸發後顯示
        .show {
            opacity: 1 !important;
            transition: 0.5s ease-in-out;
            transform: translateX(0%);
        }     
    }
</style>