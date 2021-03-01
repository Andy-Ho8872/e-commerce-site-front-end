<template>
    <div class="navbar blue darken-1 white--text">
        <!-- Navbar 上層 -->
        <v-row
            class="navbar_upper d-md-flex align-center justify-center ma-3"
            :class="{ show: active }"
        >
            <div class="content_wrapper d-flex caption">
                <!-- 回到首頁 -->
                <v-row class="mx-1">
                    <li class="mx-1">
                        <nuxt-link :to="{ name: 'index' }">
                            <v-icon class="mx-1 mb-1" dark small>
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
                    <li
                        v-for="(list, index) in noteList"
                        :key="index"
                        class="mx-1"
                    >
                        <v-icon class="mx-1 mb-1" dark small>
                            {{ list.icon }}
                        </v-icon>
                        <span>{{ list.text }}</span>
                    </li>
                </v-row>
                <!-- 如果有使用者登入，則顯示他的帳號(電子郵件)以及登出按鈕 -->
                <v-row v-if="user" class="content mx-1">
                    <!-- 使用者帳號 -->
                    <li class="mx-1">
                        <v-icon class="mx-1 mb-1" dark small>
                            fa-user fa-fw
                        </v-icon>
                        <span>{{ user }}</span>
                    </li>
                    <!-- 登出按鈕 -->
                    <li class="mx-1" @click="logUserOut">
                        <v-icon class="mx-1 mb-1" dark small>
                            fa-share fa-fw
                        </v-icon>
                        <span>登出</span>
                    </li>
                </v-row>
                <!--  若使用者沒有登入 -->
                <v-row v-else class="content mx-1">
                    <li v-for="(list, index) in userList" :key="index">
                        <nuxt-link :to="list.to" class="mx-1">
                            <v-icon class="mx-1 mb-1" small color="white">
                                {{ list.icon }}
                            </v-icon>
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
            <!-- 點擊該區域外關閉 -->
            <div
                @click="active = !active"
                ref="extended"
                class="extend_bar d-flex justify-center align-center"
            >
                <!-- 漢堡 icon-->

                <!-- <svg viewBox="0 0 100 100" fill="#FFF" width="24" height="24">
                    <rect width="100" height="15"></rect>
                    <rect y="30" width="100" height="15"></rect>
                    <rect y="60" width="100" height="15"></rect>
                </svg> -->

                <div class="sidebar" :class="{ toggle: active }">
                    <li class="line"></li>
                    <li class="line"></li>
                    <li class="line"></li>
                </div>
            </div>
            <!-- 搜尋區域 -->
            <v-text-field
                class="searchBox d-flex mt-2 mx-2"
                name="search"
                v-model="searchText"
                solo
                dense
                placeholder="相機、螢幕、服裝、折扣..."
                append-icon="fa-search"
                @keydown.enter="search"
                @click:append="search"
            >
            </v-text-field>
            <!-- 購物車 ICON -->
            <nuxt-link
                :to="{ name: 'cart' }"
                class="cart_logo d-flex justify-center align-center"
            >
                <!-- 如果購物車內有商品才顯示 -->
                <v-badge
                    :content="userCart.length"
                    :value="userCart.length"
                    color="orange"
                >
                    <!-- 購物車 svg -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#FFF"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"
                        />
                    </svg>
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
            // 訊息通知
            noteList: [
                { 
                    icon: 'fa-envelope fa-fw', 
                    text: '通知總覽' 
                },
                { 
                    icon: 'fa-question-circle fa-fw', 
                    text: '幫助中心' 
                }
            ],
            // 帳戶操作
            userList: [
                {
                    icon: 'fa-user-plus fa-fw',
                    text: '註冊',
                    to: { name: 'auth-register' },
                },
                {
                    icon: 'fa-user-circle fa-fw',
                    text: '登入',
                    to: { name: 'auth-login' },
                }
            ],
            // 觸發 class (漢堡 SideBar)
            active: false,
            // 搜尋欄文字
            searchText: ''
        }
    },
    methods: {
        ...mapMutations({
            CLEAR_CART: 'cart/CLEAR_USER_CART', // 清空購物車暫存
            FETCH_ACCOUNT: 'auth/FETCH_USER_ACCOUNT', // 抓取使用者資料 (從 localStorage)
        }),
        ...mapActions({
            logout: 'auth/logout', // 登出使用者
            searchProducts: 'search/searchProducts', // 搜尋商品
            fetchUserCart: 'cart/fetchUserCart', // 撈取使用者購物車
        }),
        // 登出使用者
        async logUserOut() {
            await this.logout()
            // 等使用者登出之後則清除購物車暫存
            this.CLEAR_CART()
        },
        // 搜尋功能
        search() {
            this.searchProducts(this.searchText)
        },
    },
    computed: {
        ...mapGetters({
            // 使用者資訊
            user: 'auth/getUserAccount',
            // 使用者購物車中商品數量
            userCart: 'cart/getUserCart',
        }),
    },
    async mounted() {
        // 點擊漢堡 SideBar 以外的區域則會關閉
        if(this.$refs.extended.style.visibility !== "hidden") {
            document.addEventListener('click', e => { 
                if (!this.$refs.extended.contains(e.target)) {
                    this.active = false
                }
            })
        }
        // 抓取使用者資料
        await this.FETCH_ACCOUNT()
        // 若使用者有登入 (從 localStorage 中做初步判定)
        if(this.user) {
            // 撈取使用者購物車
            this.fetchUserCart()
        }
    },
}
</script>

<style lang="scss" scoped>
li {
    list-style: none;
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
.extend_bar {
    visibility: hidden; // 預設隱藏
}
.line {
    background: white;
    width: 24px;
    height: 4px;
    margin-bottom: 6px;
}
.toggle {
    .line {
        margin-bottom: 0;
        transition: 0.5s ease-in-out;
        &:nth-child(1) {
            transform: rotate(45deg) translateY(3px)
        } 
        &:nth-child(2) {
            display: none;
        } 
        &:nth-child(3) {
            transform: rotate(-45deg) translateY(-3px)
        } 
    } 
}
// 登入、登出、訊息通知... 等按鈕
.content {
    cursor: pointer;
}
// 搜尋區域
.searchBox {
    transform: translateY(10%);
}
// 以下為 RWD
@media (max-width: 1024px) {
    li {
        font-size: 1rem;
    }
    .navbar {
        padding: 1em 0em;
        width: 100%;
        top: 0;
        z-index: 10000;
    }
    .navbar_lower {
        width: 90%;
        margin: auto;
    }
}
@media (max-width: 640px) {
    // navbar 上層 Start
    .navbar_upper {
        flex-direction: column;
        align-content: flex-start;
        position: absolute;
        width: 70vw;
        top: 100%;
        margin: 0 !important;
        background: rgba($color: #000000, $alpha: 0.8);
        // 預設不顯示，等點擊 extend bar 後才顯示
        opacity: 0;
        transition: 0.5s ease-in-out;
        transform: translateX(-100%);
    }
    .content_wrapper {
        width: 100%;
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
    // navbar 上層 End

    // 漢堡標籤 (sideBar) Start
    .extend_bar {
        visibility: unset; // 預設隱藏
    }
        // 觸發後顯示
    .show {
        opacity: 1 !important;
        transition: 0.5s ease-in-out;
        transform: translateX(0%);
    }
    // 漢堡標籤  End
}
</style>
