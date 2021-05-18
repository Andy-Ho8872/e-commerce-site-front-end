<template>
    <v-container fluid class="blue darken-1">
        <v-tabs
            grow
            centered
            slider-size="4"
            height="60"
            background-color="blue darken-1"
            color="white"
            class="header_tabs d-flex justify-end"
        >
            <v-tab nuxt :to="{ name: 'index' }">
                <v-icon>fa-home fa-fw</v-icon>
                <span>首頁</span>
            </v-tab>
            <v-tab nuxt :to="{ name: 'user-notification' }">
                <v-badge color="orange" left overlap :content="unReadNotifications.length" :value="unReadNotifications.length">
                    <v-icon>fa-bell fa-fw</v-icon>
                    <span>通知</span>
                </v-badge>
            </v-tab>
            <v-tab nuxt :to="{ name: 'user-order' }">
                <v-icon>fa-list-alt fa-fw</v-icon>
                <span>訂單</span>
            </v-tab>
            <v-tab nuxt :to="{ name: 'user-account' }">
                <v-icon>fa-user fa-fw</v-icon>
                <span>會員</span>
            </v-tab>
        </v-tabs>
        <!-- 搜尋區域 -->
        <v-row>
            <v-spacer />
            <v-text-field
                class="searchBox d-flex mt-2 mx-2"
                name="search"
                placeholder="相機、螢幕、服裝、折扣..."
                append-icon="fa-search"
                solo
                dense
            >
            </v-text-field>
            <!-- 購物車 ICON -->
            <nuxt-link class="cart_logo d-flex justify-center align-center" :to="{ name: 'cart' }">
                <!-- 如果購物車內有商品才顯示 -->
                <v-badge color="orange" :content="userCart.length" :value="userCart.length">
                    <!-- 購物車 svg -->
                    <v-img :src="require('~/static/cart/ShoppingCart.svg')"></v-img>
                </v-badge>
            </nuxt-link>
            <v-spacer />
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            tab: null,
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

<style lang="scss">
.header_tabs {
    padding-right: 10%;
}
.searchBox {
    transform: translateY(10%);
}

@media (max-width: 768px) {
    .header_tabs {
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 0
    }
    .v-item-group {
        width: 100%;
    }
}
</style>
