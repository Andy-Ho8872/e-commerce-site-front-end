<template>
    <!-- 可以設置 max-width 來限制輪播的寬度 -->
    <div class="carousel">
        <!-- 輪播控制按鈕(左) -->
        <v-icon large id="prev" @click="SLIDE(-1)">fa-angle-left</v-icon>
        <!-- 輪播控制按鈕(右) -->
        <v-icon large id="next" @click="SLIDE(1)">fa-angle-right</v-icon>
        <!-- 輪播圖片(圖片滑動區域) -->
        <div class="switch_photo d-flex ">
            <!-- v-card 和 v-img 預設寬度為 355 px -->
            <v-card
                class="single_card"
                v-for="product in products"
                :key="product.id"
                tile
                :max-width="cardWidth"
            >
                <v-img
                    class="my-auto"
                    :src="product.imgUrl"
                    :lazy-src="product.imgUrl"
                    :max-width="cardWidth"
                    :max-height="cardHeight"
                >
                    <!-- 當圖片 Loading 時 -->
                    <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="blue lighten-5"
                            >
                            </v-progress-circular>
                        </v-row>
                    </template>
                    <!-- 商品折數 -->
                    <v-card-subtitle v-if="product.discount_rate != 1" class="discount_lable yellow pa-1 caption">
                        <span class="red--text font-italic font-weight-medium">{{ product.discount_rate * 10 }} 折</span>
                    </v-card-subtitle>
                </v-img>
                <!-- 產品名稱 -->
                <v-card-subtitle class="text-center text-subtitle-1">{{ product.title }}</v-card-subtitle>
            </v-card>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    // passed form pages/index.vue
    props: {
        'cardWidth': Number,
        'cardHeight': Number,
    }, 
    data() {
        return {
            // 圖片輪播
            interval: '',
        }
    },
    // 測試
    async fetch() {
        // 撈取輪播資料
        await this.$store.dispatch('carousel/fetchCarouselItem')
    },
    computed: {
        ...mapGetters({
            products: 'carousel/getCarouselItem',
        }),
    },
    methods: {
        // 滑動圖片
        ...mapMutations({
            SLIDE: 'carousel/SLIDE_CAROUSEL',
        }),
    },
    // 頁面掛載後執行自動輪播
    mounted() {
        // 圖片自動輪播
        this.interval = setInterval(() => {
            this.SLIDE(1)
        }, 5000)
    },
    // 在使用者點及其他頁面後，終止 interval 在背景的執行(為了減少效能損耗)
    beforeDestroy() { // 在 Vue3 為 beforeUnmount
        clearInterval(this.interval)
    },
    // 若有使用 Keep-Alive 的方式
    activated() {
        // 圖片自動輪播
        this.interval = setInterval(() => {
            this.SLIDE(1)
        }, 5000)
    },
    deactivated() {
        clearInterval(this.interval)
    },
}
</script>

<style lang="scss" scoped>
.carousel {
    overflow-x: hidden; // 必要
    position: relative;
    // 輪播控制按鈕 ( 左 右 )
    #prev {
        left: 5%;
    }
    #next {
        right: 5%;
    }
}
.switch_photo {
    max-width: 800px;
}
.v-icon {
    position: absolute;
    top: 50%;
    z-index: 10;
    color: red;
    cursor: pointer;
}
.v-card__subtitle {
    background: rgba(0, 0, 0, 0.7);
    color: white !important;
}
.discount_lable {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;   
}


// RWD 版面設定
@media (width: 1024px) {
    .v-card {
        max-width: 438px !important;
    }
    .v-image {
        max-width: 438px !important;
        max-height: 438px !important;
    }
}
@media (width: 768px) {
    .v-card {
        max-width: 374px !important;
    }
    .v-image {
        max-width: 374px !important;
        max-height: 374px !important;
    }
}

@media (width: 375px) {
    .v-card {
        max-width: 355px !important;
    }
    .v-image {
        max-width: 355px !important;
        max-height: 355px !important;
    }
}
@media (width: 414px) {
    .v-card {
        max-width: 394px !important;
    }
    .v-image {
        max-width: 394px !important;
        max-height: 394px !important;
    }
}
@media (width: 320px) {
    .v-card {
        max-width: 300px !important;
    }
    .v-image {
        max-width: 300px !important;
        max-height: 300px !important;
    }
}
</style>
