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
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

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
    },
    mounted() {
        this.fetchAccount()
    },
}
</script>

<style lang="scss">
html,
body {
    overflow-x: hidden;
}
.header {
    position: fixed;
    top: 0;
    z-index: 10000;
}
.v-main_wrap {
    padding: auto 0;
}
.main_view {
    display: flex;
    justify-content: center;
    padding-top: 10% !important;
}
.to-top {
    z-index: 10000;
    bottom: 10%;
    position: fixed;
    right: 0;
}
.alert-message {
    z-index: 10000;
    position: fixed;
    width: fit-content;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
}

// RWD 版面設定
@media (max-width: 1600px) {
    .main_view {
        padding-top: 10% !important;
    }
}
@media (max-width: 1400px) {
    .main_view {
        padding-top: 15% !important;
    }
}
@media (max-width: 950px) {
    .main_view {
        padding-top: 18% !important;
    }
}

@media (max-width: 768px) {
    .main_view {
        padding-top: 20% !important;
    }
}
@media (max-width: 700px) {
    .main_view {
        padding-top: 25% !important;
    }
}
@media (max-width: 580px) {
    .main_view {
        padding-top: 27% !important;
    }
}
// i phone 6 7 8 X
@media (max-width: 375px) {
    .main_view {
        padding-top: 28% !important;
    }
}
// i phone 6/7/8 plus
@media (width: 414px) {
    .main_view {
        padding-top: 25% !important;
    }
}
// i phone 5 / SE
@media (width: 320px) {
    .main_view {
        padding-top: 33% !important;
    }
}</style
>>
