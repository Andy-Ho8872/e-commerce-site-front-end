<template>
  <!-- v-container will automaticlly use default margin -->
    <v-container>
    <!-- 優惠計時 (月份從 0 開始計算， 例如: 數字5 == 6月)-->
        <Announcement
        :year='2021'
        :month='1'
        :day='5'
        :hour='8'
        :minute='7'
        :second='6'
        :millisecond='4'
        />
    <!-- 圖片輪播 -->
    <div v-if="loading">
        <SkeletonCarousel :cardHeight="355"/>
    </div>
    <div v-else>
        <!-- 圖片輪播張數為 10 張 -->
        <Carousel :products="products" :cardWidth="355" :cardHeight="355"/>
    </div>
    <!-- 置頂按鈕 -->
        <v-btn
            @click="scrollTop" 
            class="to-top mx-2"
            fab
            dark
            large
            color="primary">
            <v-icon>fa-chevron-up</v-icon>
        </v-btn>
    <!-- 商品陳列 -->
        <div class="products d-flex flex-wrap justify-space-between">
            <li v-for="product in products" :key="product.id" class="my-10">
                <!-- 骨架屏 -->
                <div v-if="loading">
                    <SkeletonCard :cardWidth="300"/>
                </div>
                <!-- 產品標題 、 圖片網址 、 價格 、 ID... -->
                <div v-else>
                    <Product :product="product" :cardWidth="300" :cardHeight="600"/>
                </div>
            </li>   
        </div>
    </v-container>
</template> 

<script>
import { mapActions, mapGetters } from 'vuex';
import { apiGetProducts, apiGetProduct } from '~/APIs/api.js';

export default {
    data() {
        return {
            loading: true // 骨架屏狀態
        }
    },
    // 從外部 API 讀取產品的資料
    async asyncData() {
        const res = await apiGetProducts()
        // 回傳產品資料
        return { products: res.data.products }     
    },
    computed: {
        ...mapGetters({
            message: 'cart/getMessage' // 提示訊息
        })
    },
    methods: {
        ...mapActions({
            fetchUserCart: 'cart/fetchUserCart', // 撈取使用者購物車
        }),
        // 點擊移動到最上層
        scrollTop () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
    },
    // 初次載入時先撈取購物車資料
    created () {
        this.fetchUserCart()
    },
    // 掛載時結束 loading 狀態
    mounted () {
        this.loading = false;
    }
}

</script>

<style lang="scss" scoped>
    li {
        list-style-type: none;
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
        left: 50%;
        bottom: 10%;
        transform: translateX(-50%);
    }
    // RWD
    @media (max-width: 650px)  {
        .products {
        justify-content: space-around !important;
    }
}
</style>