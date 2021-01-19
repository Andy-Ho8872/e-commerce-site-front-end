<template>
    <v-container class="my-auto">
        <div v-if="loading" class="text-center">
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </div>
        <!-- 商品 -->
        <v-card v-else
            class="product_wrapper d-flex justify-space-between" elevation="4" color="grey lighten-4">
            <!-- 圖片 -->
            <div class="img_wrapper">
                <v-img 
                    :src="product.imgUrl"
                    max-width="inherit" 
                    max-height="inherit">
                </v-img>
            </div>
            <!-- 詳細資訊 -->
            <div class="card_info_wrapper">
                <!-- 名稱 -->
                <v-card-title class="justify-center">{{ product.title }}</v-card-title>
                <!-- 敘述 -->
                <v-card-text class="text-justify">{{ product.description }}</v-card-text> 
                <!-- 價格 -->
                <v-card-text class="headline">
                    <!-- 包含折扣 -->
                    ${{ Math.floor(product.unit_price * product.discount_rate) }}
                </v-card-text>
                <!-- 標籤 -->
                <v-chip-group class="ma-4">
                    <v-chip class="mx-1" color="primary" v-for="tag in product.tags" :key="tag.id">
                        <v-icon size="medium">fa-check-circle fa-fw</v-icon>
                        <span>{{ tag.title }}</span>
                    </v-chip>
                </v-chip-group>
                <!-- 輸入數量 -->
                <v-form>
                    <v-row class="input_field align-center ma-3 pa-3">
                        <span class="px-2">購買數量</span>
                        <v-btn
                            @click="changeCount(-1)"
                            tile 
                            small 
                            depressed 
                            outlined 
                            color="error">
                            <v-icon>fa-minus fa-fw</v-icon>
                        </v-btn>
                        <input
                            class="grey lighten-2 text-center"
                            name="product_quantity"
                            type="text" 
                            autocomplete="off"
                            v-model="productPayload.quantity"
                        >
                        <v-btn 
                            @click="changeCount(1)"
                            tile
                            small 
                            depressed 
                            outlined 
                            color="indigo">
                            <v-icon>fa-plus fa-fw</v-icon>
                        </v-btn>
                        <!-- 購買按鈕-->
                        <div class="purchase_btn text-center">
                            <v-btn
                                @click="addToCartWithQuantity(productPayload)"
                                class="ma-3" 
                                tile 
                                x-large 
                                depressed
                                color="primary">
                                <span>放入購物車</span>
                            </v-btn>
                        </div>
                    </v-row>
                </v-form>  
            </div>
        </v-card> 
    </v-container>  
</template>

<script>
import { mapActions } from 'vuex';
import { apiGetProduct, apiAddToCart } from '~/APIs/api.js';

export default {
    // 測試用
    async asyncData({ params }) {
        const res = await apiGetProduct(params.id)
        return { 
            product: res.data.product, 
        }
    },
    data () {
        return {
            productPayload: {
                id: this.$route.params.id,
                 // 產品當前數量 預設 1 個
                quantity: 1,
            },
            // 讀取狀態
            loading: true
        }
    },
    methods: {
        ...mapActions({
            addToCartWithQuantity: 'cart/addToCartWithQuantity'
        }),
        changeCount (value) {
            this.productPayload.quantity += value
        },
    },
    mounted () {
        // 讀取完畢
        this.loading = false
    },
}
</script>

<style lang="scss" scoped>
    .product_wrapper {
        margin: 0% 10%;
    }
    .card_info_wrapper {
        width: 50%;
    }
    .img_wrapper {
        width: 50%;
    }
    // 購買按鈕
    .purchase_btn span {
        width: 6rem;
    }
    input {
        width: 20%;
        padding: 2px 0;
        outline: none;
    }
    // RWD
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
    }
</style>