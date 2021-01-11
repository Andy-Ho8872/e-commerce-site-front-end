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
        <Carousel
        :products="products"
        />
        <v-divider></v-divider>
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
        <!-- 標題 、 圖片網址 、 價格 、 產品ID -->
            <li v-for="product in products" :key="product.id" class="my-10">
                <Product
                :id="product.id"
                :title="product.title"
                :description="product.description"
                :imgUrl="product.imgUrl"
                :unit_price="product.unit_price"
                :discount_rate="product.discount_rate"
                :tags="product.tags"
                />
            </li>   
        </div>
    <!-- 提示訊息 -->
        <div class="alert-message">
            <v-alert v-if="message" type="success">{{ message }}</v-alert>
        </div>
    </v-container>
</template> 

<script>
import { mapActions, mapGetters } from 'vuex';
import { apiGetProducts, apiGetProduct } from '~/APIs/api.js';

export default {
    // 測試用 (使用 asycsData 才可以在 Server 先渲染)  可留可不留????
    async asyncData() {
        const res = await apiGetProducts()
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