<template>
    <div class="navbar blue darken-1 white--text">
        <!-- Navbar 上層 -->
        <v-row
            class="navbar_upper d-md-flex align-center justify-center ma-3"
            :class="{ show: active }"
        >
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
                <!-- 通知總覽, 幫助中心(文字) -->
                <v-row class="content">
                    <li v-for="(list, index) in noteList" :key="index">
                        <nuxt-link :to="list.to">
                            <v-icon class="icon" dark small>{{ list.icon }}</v-icon>
                            <span>{{ list.text }}</span>
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
            <div
                class="extend_bar d-flex justify-center align-center"
                ref="extended"
                @click="active = !active"
                :class="{ toggle: active }"
            >
                <li class="line"></li>
                <li class="line"></li>
                <li class="line"></li>
            </div>
            <!-- 搜尋區域 -->
            <v-text-field
                class="searchBox d-flex mt-2 mx-2"
                name="search"
                v-model="searchText"
                placeholder="相機、螢幕、服裝、折扣..."
                append-icon="fa-search"
                @keydown.enter="search(searchText)"
                @click:append="search(searchText)"
                solo
                dense
            >
            </v-text-field>
            <!-- 購物車 ICON -->
            <nuxt-link
                class="cart_logo d-flex justify-center align-center"
                :to="{ name: 'cart' }"
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
            //* 訊息通知
            noteList: [
                {
                    icon: 'fa-bell fa-fw',
                    text: '通知總覽',
                    to: { name: 'user-notification' },
                },
                {
                    icon: 'fa-question-circle fa-fw',
                    text: '幫助中心',
                    to: { name: 'help' },
                },
            ],
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
            //* 觸發 class (漢堡 SideBar)
            active: false,
            //* 搜尋欄文字
            searchText: '',
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
            //* 搜尋商品
            search: 'search/searchProducts', 
            //* 撈取資料
            fetchTableColumns: 'order/fetchTableColumns', //? 其他資料表中的欄位
            fetchUserInfo: 'auth/fetchUserInfo', //? 使用者的資料
            fetchUserCart: 'cart/fetchUserCart', //? 使用者購物車
            fetchAllOrders: 'order/fetchAllOrders', //? 使用者訂單 
            fetchAllNotifications: 'notification/fetchAllNotifications' //? 使用者的通知
        }),
    },
    async mounted() {
        //* 點擊漢堡 SideBar 以外的區域則會關閉
        if (this.$refs.extended.style.visibility !== 'hidden') {
            document.addEventListener('click', e => {
                if (!this.$refs.extended.contains(e.target)) {
                    this.active = false
                }
            })
        }
        //* 取得憑證
        await this.SET_TOKEN()
        //* 若使用者有登入(持有 Token)，從 localStorage 中做初步判定)
        if (this.token) {
            //* 撈取資料
            this.fetchTableColumns() //? 其他資料表中的欄位
            this.fetchUserInfo() //? 使用者的資料
            this.fetchUserCart() //? 使用者的購物車
            this.fetchAllOrders() //? 使用者的訂單
            this.fetchAllNotifications()
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
