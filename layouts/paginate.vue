<template>
    <v-app dark>
        <v-main class="main_view">
            <Header class="header" />
            <!-- 路由頁面 -->
            <nuxt />
            <!-- 提示訊息 -->
            <div class="alert-message">
                <v-alert v-if="message" dark border="left" :type="message.type">
                    {{ message.text }}
                </v-alert>
            </div>
            <!-- 置頂按鈕 -->
            <v-btn
                @click="scrollTop"
                class="to-top mx-2"
                color="primary"
                fab
                dark
                large
            >
                <v-icon>fa-chevron-up</v-icon>
            </v-btn>
            <PaginationController />
        </v-main>
    </v-app>
</template>

<script>
// ! 此元件目前暫不使用
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            message: 'cart/getMessage', // 提示訊息
        }),
    },
    methods: {
        scrollTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        },
        ...mapMutations({
            fetchAccount: 'auth/FETCH_USER_ACCOUNT', // 抓取使用者資料 (從 localStorage)
        }),
        ...mapActions({
            fetchUserCart: 'cart/fetchUserCart', // 撈取使用者購物車
        }),
    },
    // 初次載入時先撈取購物車資料 (使用 localStorage)
    created() {
        this.fetchUserCart()
    },
    mounted() {
        this.fetchAccount()
    },
}
</script>
