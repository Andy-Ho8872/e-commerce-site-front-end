<template>
    <v-container>
        <!-- 彈出式提醒 -->
        <Popups />
        <!-- 優惠計時 (月份從 0 開始計算， 例如: 數字5 == 6月)-->
        <CountdownTimer
            :year="2021"
            :month="9"
            :day="5"
            :hour="8"
            :minute="7"
            :second="6"
            :millisecond="4"
        />
        <!-- 圖片輪播 -->
            <!-- 骨架屏 -->
        <SkeletonCarousel :cardHeight="355" v-if="loading"/>
            <!-- 輪播張數為 10 張 -->
        <Carousel :cardWidth="355" :cardHeight="355" v-show="!loading"/>
        <!-- 商品陳列 -->
        <v-row justify="space-around">
            <v-col  v-for="product in products" class="my-10" :key="product.id">
                <!-- 骨架屏 -->
                <SkeletonCard :cardWidth="300" v-if="loading"/>
                <!-- 商品卡片 -->
                <Product :product="product" :cardWidth="300" :cardHeight="600" v-show="!loading"/>        
            </v-col>
        </v-row>
        <!-- 觀看更多商品 -->
        <div class="text-center">
            <!-- 預設點擊後到第一頁 -->
            <v-btn class="my-16" color="primary" dark x-large nuxt :to="{ name: 'pagination-pageNumber', params: { pageNumber: 1 } }">
                <span>查看更多</span>
                <v-icon>fa-shopping-cart fa-fw</v-icon>
            </v-btn> 
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
// li {
//     list-style-type: none;
// }
</style>
