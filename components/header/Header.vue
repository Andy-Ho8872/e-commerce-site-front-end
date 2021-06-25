<template>
    <div class="navbar blue darken-1 white--text">
        <!-- Navbar 上層 -->
        <v-row class="navbar_upper d-md-flex align-center justify-center ma-3" :class="{ show: active }">
            <div class="content_wrapper d-flex caption">
                <!-- 回到首頁 -->
                <v-row class="content">
                    <li>
                        <nuxt-link :to="{ name: 'index' }">
                            <v-icon class="icon" dark small>fa-home fa-fw</v-icon>
                            <span>回到首頁</span>
                        </nuxt-link>
                    </li>
                </v-row>
            </div>
            <v-spacer></v-spacer>
            <!-- 以上勿動 -->
            <div class="content_wrapper d-flex caption">
                <!-- 通知總覽-->
                <v-row class="content">
                    <li class="notification" @mouseenter="appear = true" @mouseleave="appear = false">
                        <nuxt-link :to="{ name: 'user-notification' }">
                            <!-- 通知的數量 -->
                            <v-badge color="orange" left overlap :content="unReadNotifications.length" :value="unReadNotifications.length">
                                <v-icon class="icon" dark small>fa-bell fa-fw</v-icon>
                                <span>通知總覽</span>
                            </v-badge>
                        </nuxt-link>
                        <!-- 通知列 -->
                        <MiniNotification class="content_box" :class="{ show: appear }"/>   
                    </li>
                    <!-- 我的訂單-->
                    <li>
                        <nuxt-link :to="{ name: 'user-order' }">
                            <v-icon class="icon" dark small>fa-list-alt fa-fw</v-icon>
                            <span>我的訂單</span>
                        </nuxt-link>
                    </li>
                </v-row>
                <!-- 如果有使用者登入，則顯示他的帳號(電子郵件)以及登出按鈕 -->
                <v-row v-if="user" class="content">
                    <!-- 使用者帳號 -->
                    <li>
                        <nuxt-link :to="{ name: 'user-account' }">
                            <v-icon class="icon" dark small>fa-user fa-fw</v-icon>
                            <span>{{ user.email }}</span>
                        </nuxt-link>
                    </li>
                    <!-- 登出按鈕 -->
                    <li @click="logout">
                        <v-icon class="icon" dark small>fa-share fa-fw</v-icon>
                        <span>登出</span>
                    </li>
                </v-row>
                <!--  若使用者沒有登入 (註冊、登入按鈕) -->
                <v-row v-else class="content">
                    <li v-for="(list, index) in userList" :key="index">
                        <nuxt-link :to="list.to">
                            <v-icon class="icon" dark small>{{ list.icon }}</v-icon>
                            <span>{{ list.text }}</span>
                        </nuxt-link>
                    </li>
                </v-row>
            </div>
        </v-row>
        <!-- Navbar 下層 -->
        <v-row class="navbar_lower d-flex flex-nowrap justify-center">
            <!-- 畫面寬度在 medium 以下時隱藏 spacer -->
            <v-spacer class="hidden-md-and-down"></v-spacer>
            <!--  (Extend bar) 只有在 600 px 以下才顯示 -->
            <div class="extend_bar d-flex justify-center align-center" ref="extended"
                @click="active = !active"
                :class="{ toggle: active }"
            >
                <li class="line"></li>
                <li class="line"></li>
                <li class="line"></li>
            </div>
            <!-- 搜尋區域 -->
            <AutoComplete class="searchBox d-flex mt-2 mx-2"/>
            <!-- 購物車 ICON -->
            <nuxt-link class="cart_logo d-flex justify-center align-center" :to="{ name: 'cart' }">
                <!-- 如果購物車內有商品才顯示 -->
                <v-badge color="orange" :content="userCart.length" :value="userCart.length">
                    <!-- 購物車 svg -->
                    <v-img :src="require('~/static/cart/ShoppingCart.svg')"></v-img>
                </v-badge>
            </nuxt-link>
            <!-- 畫面寬度在 medium 以下時隱藏 spacer -->
            <v-spacer class="hidden-md-and-down"></v-spacer>
        </v-row>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            //* 帳戶操作
            userList: [
                {
                    icon: 'fa-user-tie fa-fw',
                    text: '註冊',
                    to: { name: 'auth-register' },
                },
                {
                    icon: 'fa-user-circle fa-fw',
                    text: '登入',
                    to: { name: 'auth-login' },
                },
            ],
            //* 觸發 class 
            active: false, //* 漢堡 sidebar
            appear: false, //* 通知列表
        }
    },
    computed: {
        ...mapGetters({
            //* 使用者 Token
            token: 'auth/getToken',
            //* 使用者資訊
            user: 'auth/getUserInfo',
            //* 使用者購物車中商品數量
            userCart: 'cart/getUserCart',
            //* 未讀取的通知 
            unReadNotifications: 'notification/getUnreadNotifications', 
        }),
    },
    methods: {
        ...mapMutations({
            //* 抓取 Token (從 localStorage)
            SET_TOKEN: 'auth/SET_TOKEN',
        }),
        ...mapActions({
            //* 登出使用者
            logout: 'auth/logout',  
            //* 撈取資料
            fetchTableColumns: 'order/fetchTableColumns', //? 其他資料表中的欄位
            fetchUserInfo: 'auth/fetchUserInfo', //? 使用者的資料
            fetchUserCart: 'cart/fetchUserCart', //? 使用者購物車
            fetchAllOrders: 'order/fetchAllOrders', //? 使用者訂單 
            fetchAllNotifications: 'notification/fetchAllNotifications', //? 使用者的通知
            // fetchAllProductTags: 'product/fetchAllProductTags' //? 商品的標籤
        }),
    },
    async mounted() {
        //* 點擊漢堡 SideBar 以外的區域則會關閉  
        document.addEventListener('click', e => {
            if (!this.$refs.extended.contains(e.target)) {
                this.active = false
            }
        })
        //* 取得憑證
        await this.SET_TOKEN()
        //* 若使用者有登入(持有 Token)，從 localStorage 中做初步判定)
        if (this.token) {
            //* 撈取資料
            this.fetchTableColumns() //? 其他資料表中的欄位
            this.fetchUserInfo() //? 使用者的資料
            this.fetchUserCart() //? 使用者的購物車
            this.fetchAllOrders() //? 使用者的訂單
            this.fetchAllNotifications() //? 使用者的通知
            // this.fetchAllProductTags() //? 產品的標籤
        }
    },
}
</script>

<style lang="scss" scoped>
li {
    cursor: pointer;
    list-style: none;
    font-size: 1rem;
    margin: 0 4px;
}
a {
    text-decoration: none;
    color: white;
}
.navbar {
    padding: 1em 10em;
    width: 100%;
    top: 0;
}
.content {
    margin: 0 4px;
    position: relative;
}
.notification {
    .content_box {
        display: none;
        position: absolute;
        z-index: 10;
        width: 350px;
    }
    .show {
        display: block;
    }
}
.icon {
    margin: 0 4px;
    margin-bottom: 4px;
}
.extend_bar {
    visibility: hidden; //? 預設隱藏
    flex-direction: column;
}
//* 搜尋區域
.searchBox {
    transform: translateY(10%);
}

//? 以下為 RWD
@media (max-width: 1024px) {
    .navbar {
        padding: 1rem 0;
        width: 100%;
        top: 0;
        z-index: 10000;
    }
    .navbar_lower {
        width: 90%;
        margin: auto;
    }
    //* 漢堡標籤的線條
    .line {
        background: white;
        width: 24px;
        height: 4px;
        margin-bottom: 6px;
        transition: 0.5s ease-in-out;
    }
    .toggle {
        .line {
            margin-bottom: 0;
            transition: 0.5s ease-in-out;
            &:nth-child(1) {
                transform: rotate(50deg) translateY(6px);
            }
            &:nth-child(2) {
                opacity: 0;
            }
            &:nth-child(3) {
                transform: rotate(-50deg) translateY(-6px);
            }
        }
    }
}
@media (max-width: 640px) {
    li {
        width: 100%;
    }
    //* navbar 上層 -------------------------------------------------------------- Start
    .navbar_upper {
        flex-direction: column;
        align-content: flex-start;
        position: absolute;
        width: 70vw;
        top: 100%;
        margin: 0 !important;
        background: rgba($color: #000000, $alpha: 0.8);
        opacity: 0; //? 預設不顯示，等點擊 extend bar 後才顯示
        transition: 0.5s ease-in-out;
        transform: translateX(-100%);
    }
    .content_wrapper {
        width: inherit;
        flex-direction: column;
        align-content: flex-start;
        li {
            margin: 10% 0;
        }
    }
    //? 使用者帳號、登出
    .content {
        flex-direction: column;
        margin: 0 5%;
        &:nth-child(-n + 1) {
            border-bottom: 1px solid white;
        }
    }
    //* navbar 上層 -------------------------------------------------------------- End

    //* 漢堡標籤 ----------------------------------------------------- Start
    .extend_bar {
        visibility: visible;
    }
    //? 觸發後顯示 navbar_upper
    .show {
        opacity: 1 !important;
        transition: 0.5s ease-in-out;
        transform: translateX(0%);
    }
    //* 漢堡標籤 ----------------------------------------------------- End
}
</style>
