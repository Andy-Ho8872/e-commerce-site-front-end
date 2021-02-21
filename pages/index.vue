<template>
    <v-container>
        <!-- 優惠計時 (月份從 0 開始計算， 例如: 數字5 == 6月)-->
        <Announcement
            :year="2021"
            :month="2"
            :day="5"
            :hour="8"
            :minute="7"
            :second="6"
            :millisecond="4"
        />
        <!-- 圖片輪播 -->
        <div v-if="loading">
            <SkeletonCarousel :cardHeight="355" />
        </div>
        <div v-else>
            <!-- 圖片輪播張數為 10 張 -->
            <Carousel :cardWidth="355" :cardHeight="355" />
        </div>
        <!-- 商品陳列 -->
        <div class="products d-flex flex-wrap justify-space-between">
            <li v-for="product in products" :key="product.id" class="my-10">
                <!-- 骨架屏 -->
                <div v-if="loading">
                    <SkeletonCard :cardWidth="300" />
                </div>
                <!-- 產品標題 、 圖片網址 、 價格 、 ID... -->
                <div v-else>
                    <Product
                        :product="product"
                        :cardWidth="300"
                        :cardHeight="600"
                    />
                </div>
            </li>
        </div>
        <!-- 觀看更多商品 -->
        <div class="check_more text-center">
            <!-- 預設點擊後到第一頁 -->
            <nuxt-link
                :to="{
                    name: 'pagination-pageNumber',
                    params: { pageNumber: 1 },
                }"
            >
                <v-btn class="my-16" color="primary" dark x-large>
                    查看更多
                    <v-icon>fa-shopping-cart</v-icon>
                </v-btn>
            </nuxt-link>
        </div>
    </v-container>
</template>

<script>
import { apiGetIndexPageProducts } from '~/APIs/api.js'

export default {
    data() {
        return {
            loading: true, // 骨架屏狀態
        }
    },
    // 從外部 API 讀取產品的資料
    async asyncData() {
        const res = await apiGetIndexPageProducts()
        // 回傳產品資料
        return { products: res.data.products }
    },
    // 掛載時結束 loading 狀態
    mounted() {
        this.loading = false
    },
}
</script>

<style lang="scss" scoped>
li {
    list-style-type: none;
}

// RWD
@media (max-width: 650px) {
    .products {
        justify-content: space-around !important;
    }
}
</style>
