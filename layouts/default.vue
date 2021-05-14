<template>
    <v-app dark>
        <v-main class="main_view">
            <Header class="header" />
            <!-- <HeaderV2 class="header"/> -->
            <nuxt class="content"/>
            <AlertMessage class="alert-message"/>
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

export default {
    methods: {
        scrollTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
$z-index-top : 10000;
.header {
    position: fixed;
    top: 0;
    z-index: $z-index-top;
}
.alert-message {
    z-index: $z-index-top;
    position: fixed;
    width: fit-content;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
}
.to-top {
    z-index: $z-index-top;
    bottom: 10%;
    position: fixed !important;
    right: 0;
}

@media (max-width: 768px) {
    //! 此樣式只套用在 有使用 HeaderV2 的時候 
    .content {
        padding-bottom: 20%;
    }
}
</style>
