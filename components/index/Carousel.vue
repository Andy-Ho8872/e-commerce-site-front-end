<template>
    <!-- 可以設置 max-width 來限制輪播的寬度 -->
    <div class="carousel">
        <!-- 輪播控制按鈕(左) -->
        <v-icon class="slide_btn" id="prev" @click="SLIDE(-1)">fa-angle-left</v-icon>
        <!-- 輪播控制按鈕(右) -->
        <v-icon class="slide_btn" id="next" @click="SLIDE(1)">fa-angle-right</v-icon>
        <!-- 輪播圖片(圖片滑動區域) -->
        <div class="switch_photo d-flex ">
            <!-- v-card 和 v-img 預設寬度為 355 px -->
            <v-card
                v-for="product in products"
                :key="product.id"
                :max-width="cardWidth"
                nuxt
                :to="{ name: 'products-id', params: { id: product.id } }"
                tile
            >
                    <v-img
                        class="my-auto"
                        :alt="product.title"
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
                        <v-card-subtitle v-if="product.discount_rate != 1" class="discount_label yellow pa-1 caption">
                            <span class="red--text font-italic font-weight-medium">{{ product.discount_rate * 10 }} 折</span>
                        </v-card-subtitle>
                    </v-img>
                    <!-- 產品名稱 -->
                    <v-card-subtitle class="carousel_item_title white--text text-center text-subtitle-1">{{ product.title }}</v-card-subtitle>
            </v-card>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
    //? passed form pages/index.vue
    props: {
        cardWidth: {
            type: Number,
            require: true
        },
        cardHeight: {
            type: Number,
            require: true
        },
    },
    data() {
        return {
            //* 圖片輪播
            interval: '',
        }
    },
    computed: {
        ...mapGetters({
            products: 'carousel/getCarouselItem',
        }),
    },
    methods: {
        //* 滑動圖片
        ...mapMutations({
            SLIDE: 'carousel/SLIDE_CAROUSEL',
        }),
        ...mapActions({
            fetchCarouselItem: 'carousel/fetchCarouselItem'
        })
    },
    //* 避免重複發送相同的 request
    created() {
        if(!this.products.length) {
            this.fetchCarouselItem()
        }
    },
    //* 頁面掛載後執行自動輪播
    mounted() {
        //* 圖片自動輪播
        this.interval = setInterval(() => {
            this.SLIDE(1)
        }, 5000)
    },
    //* 在使用者點及其他頁面後，終止 interval 在背景的執行(為了減少效能損耗)
    beforeDestroy() {
        //? 在 Vue3 為 beforeUnmount
        clearInterval(this.interval)
    },
}
</script>

<style lang="scss" scoped>
$icon-size: 48px;

.carousel {
    overflow-x: hidden; //* 必要
    position: relative;
    //* 輪播控制按鈕 ( 左 右 )
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
.slide_btn {
    font-size: $icon-size;
    width: $icon-size;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 50%;
    position: absolute;
    top: 45%;
    z-index: 10;
    cursor: pointer;
    &:hover {
        color: #1976D2;
        background: rgba(255, 255, 255, 0.7);
    }
}
.carousel_item_title {
    background: rgba(0, 0, 0, 0.7);
}
.discount_label {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
}

//? RWD 版面設定
@media (width: 1024px) {
    .v-card {
        max-width: 438px !important;
    }
}
@media (width: 768px) {
    .v-card {
        max-width: 374px !important;
    }
}
@media (width: 375px) {
    .v-card {
        max-width: 355px !important;
    }
}
@media (width: 414px) {
    .v-card {
        max-width: 394px !important;
    }
}
@media (width: 320px) {
    .v-card {
        max-width: 300px !important;
    }
}
</style>
