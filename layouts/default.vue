<template>
    <v-app dark>
        <v-main class="main_view">
            <Header class="header" />
            <nuxt />
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
.alert-message {
    z-index: 10000;
    position: fixed;
    width: fit-content;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
}
</style>
