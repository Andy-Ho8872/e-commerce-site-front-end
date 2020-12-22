<template>
  <!-- v-container will automaticlly use default margin -->
    <v-container>
    <!-- 優惠計時 (月份從 0 開始計算， 例如: 數字5 == 6月)-->
        <Announcement
        :year='2020'
        :month='12'
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
            class="to_top mx-2"
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
                :title="product.title"
                :imgUrl="product.imgUrl"
                :price="product.unit_price"
                :id="product.id"
                :description="product.description"
                :tags="product.tags"
                />
                <!-- <Product
                :products="products"
                /> -->
            </li>   
        </div>
    </v-container>
</template> 

<script>
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
// import axios from 'axios';
// import { mapActions, mapGetters } from 'vuex';

import { apiGetProducts, apiGetProduct } from '~/APIs/api.js';

export default {
    // 測試用 (使用 asycsData 才可以在 Server 先渲染)  可留可不留????
    async asyncData() {
        const res = await apiGetProducts()
        console.log(res.data);
        return { products: res.data.products }
        
    },

    methods: {
            // 點擊移動到最上層
            scrollTop () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        // 撈取產品資料
        // ...mapActions({
        //     fetchAllProducts: 'product/fetchAllProducts'
        // })
    },

    // Vuex 方法
    // computed: {
    //     ...mapGetters({
    //         getAllProducts: 'product/getAllProducts'
    //     }),
    //     // 撈取到的所有產品資料
    //     products () {
    //        return this.getAllProducts
    //     }
    // },
    // created () {
    //     this.fetchAllProducts()
    // }
    // created () {
    //     const res = axios.get('http://127.0.0.1:8000/api/products')
    //     .then((res) => {
    //         console.log(res.data);
    //     })
    // }
}

</script>

<style lang="scss" scoped>
    .to_top {
        bottom: 10%;
        position: fixed;
        right: 0;
        z-index: 10000;
    }
    li {
        list-style-type: none;
    }
    @media (max-width: 650px)  {
        .products {
        justify-content: space-around !important;
    }
}
</style>