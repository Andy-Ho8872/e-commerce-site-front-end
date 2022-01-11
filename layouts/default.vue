<template>
    <v-app dark>
        <v-main>
            <Header class="header"/>
            <!-- <HeaderV2 class="header"/> -->
            <nuxt class="content"/>
            <Footer class="footer"/>
            <AlertMessage class="alert-message"/>
            <!-- 置頂按鈕 -->
            <v-fab-transition>
                <v-btn class="to-top mx-2" v-show="!hidden" @click="scrollToTop" color="primary" fab dark>
                    <v-icon>fa-chevron-up</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-main>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
            hidden: true
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        },
        scrollToShow() {
            const scrollTop = document.documentElement.scrollTop
            const innerHeight = window.innerHeight / 2.5
            //* 判定是否大於 innerHeight
            scrollTop > innerHeight ? this.hidden = false : this.hidden = true
        }
    },
    created() {
        if(process.client) {
            window.addEventListener('scroll', this.scrollToShow)
        }
    }
}
</script>

<style lang="scss" scoped>
$z-index-top : 10000;
$padding-top-xl: 9.5rem; //*   4k and ultra-wide or large desktop...  > 1904px 
$padding-top-lg: 10rem; //*   desktop... 1264px > < 1904px
$padding-top-md: 7.5rem; //*   desktop... 1264px > < 1904px

.v-main {
    background-color: #FAFAFA;
}
.header {
    position: fixed;
    top: 0;
    z-index: $z-index-top;
}
.content {
    padding: 0;
    padding-top: $padding-top-xl;
    min-height: 100vh;
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
    bottom: 15%;
    position: fixed !important;
    right: 0;
}

@media (max-width: 768px) {
    .content {
        padding-top: $padding-top-lg;
    }
}
@media (max-width: 640px) {
    .content {
        padding-top: $padding-top-md;
    }
}
</style>
