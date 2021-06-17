<template>
    <v-app dark>
        <v-main>
            <Header class="header"/>
            <!-- <HeaderV2 class="header"/> -->
            <nuxt class="content"/>
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
$header-v2-padding-bottom: 20%; //! 若使用 HeaderV2 則必須使用此屬性
$padding-top-xl: 10%; //*   4k and ultra-wide or large desktop...  > 1904px 
$padding-top-lg: 15%; //*   desktop... 1264px > < 1904px
$padding-top-md: 20%; //*   Large tablet to laptop... 960px > < 1264px
$padding-top-xs: 30%; //*   mobile... <600px
$padding-top-xss: 35%; //*   mobile... <375px

.v-main {
    background-color: #FAFAFA;
}

.header {
    position: fixed;
    top: 0;
    z-index: $z-index-top;
}
.content {
    padding-top: $padding-top-xl;
    // padding-bottom: $header-v2-padding-bottom; //! 若使用 HeaderV2 則必須使用此屬性
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

@media (max-width: 1260px) {
    .content {
        padding-top: $padding-top-lg;
    }
}
@media (max-width: 960px) {
    .content {
        padding-top: $padding-top-md;
    }
}
@media (max-width: 600px) {
    .content {
        padding-top: $padding-top-xs;
    }
}
@media (max-width: 375px) {
    .content {
        padding-top: $padding-top-xss;
    }
}
</style>
