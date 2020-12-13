<template>
    <v-container class="my-auto">

        <div v-if="loading">
            <h1>Loading</h1>
        </div>

        <v-card v-else
            class="product_wrapper d-flex justify-space-between" 
            elevation="4" 
            color="grey lighten-4"
            >
            <!-- 商品圖片 -->
            <div class="img_wrapper">
                <v-img 
                    :src="product.imgUrl"
                    max-width="inherit" 
                    max-height="inherit">
                </v-img>
            </div>
            <!-- 商品詳細資訊 -->
            <div class="card_info_wrapper">
                <!-- 商品名稱 -->
                <v-card-title 
                    class="justify-center">
                    {{ product.title }}
                </v-card-title>
                <!-- 商品敘述 -->
                <v-card-text 
                    class="text-justify">
                    {{ product.description }}
                </v-card-text> 
                <!-- 商品價格 -->
                <v-card-text 
                    class="headline">
                    ${{ product.unit_price }}
                </v-card-text>
                <!-- 輸入商品數量 -->
                <v-row class="input_field align-center ma-3 pa-3">
                    <span class="px-2">購買數量</span>
                    <!-- 減少數量 -->
                    <v-btn
                        @click="changeCount(-1)"
                        tile 
                        small 
                        depressed 
                        outlined 
                        color="error">
                        <v-icon>fa-minus fa-fw</v-icon>
                    </v-btn>
                    <!-- 當前數量 -->
                    <input
                        class="grey lighten-2 text-center"
                        type="text" 
                        v-model="productQty"
                        >
                    <!-- 增加數量 -->
                    <v-btn 
                        @click="changeCount(1)"
                        tile
                        small 
                        depressed 
                        outlined 
                        color="indigo">
                        <v-icon>fa-plus fa-fw</v-icon>
                    </v-btn>
                </v-row>
                <!-- 購買按鈕區 -->

                <div class="purchase_btn text-center">
                    <v-btn
                        class="ma-3" 
                        tile 
                        x-large 
                        depressed
                        color="primary">
                        <span>放入購物車</span>
                    </v-btn>
                    <v-btn
                        class="ma-3" 
                        tile 
                        x-large 
                        depressed
                        color="success">
                        <span>直接購買</span>
                    </v-btn>
                </div>
            </div>
        </v-card> 

    </v-container>  
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    data () {
        return {
            // 產品當前數量
            productQty: 1 ,

            loading: true
        }
    },
    computed: {
        ...mapGetters({
            getSingleProduct: 'product/getSingleProduct'
        }),
        product () {
            return this.getSingleProduct
        }
    },
    methods: {
        ...mapMutations({
            resetProduct: 'product/RESET_PRODUCT'
        }),
        ...mapActions({
            fetchSingleProduct: 'product/fetchSingleProduct'
        }),
        // 點擊按鈕以 增加 或 減少 購買數量
        changeCount (value) {
            this.productQty += value
        }
    },
    // 撈取所點擊的商品並依該商品的 id 來撈取資料
    created () {    
        // 讀取中 
        this.loadig = true
        // 該商品的 id
        const productId = this.$route.params.id
        this.fetchSingleProduct(productId) 
    },
    mounted () {
        // 讀取完畢
        this.loading = false
    },
    // 清空原本 Object 所存有的商品資訊，為了讓點選其他商品時的轉場更加順暢。
    beforeDestroy () {
        this.resetProduct()
    }
}
</script>

<style lang="scss" scoped>
    .product_wrapper {
        margin: 0% 10%;
    }
    .img_wrapper {
        width: 50%;
    }
    .card_info_wrapper {
        width: 50%;
    }
    // 購買按鈕
    .purchase_btn span {
        width: 100px;
    }
    input {
        width: 20%;
        padding: 2px 0;
        outline: none;
    }
    
    @media (max-width: 1200px) {
        .product_wrapper {
            flex-wrap: wrap;
            margin: 0
        }
        .img_wrapper {
            width: 100%;
        }
        .card_info_wrapper {
            width: 100%;
        }
        .input_field {
            padding: 0 3%;
        }       
    }
</style>