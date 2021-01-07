<template>
    <v-container>
        <div v-if="userCart.length === 0">
            <h1>您的購物車中沒有東西。</h1>
        </div>

        <v-col cols="12" class="cart_page_wrapper">
            <!-- 購物車標頭 -->
            <v-card class="cart_page_header d-flex mb-5 pa-5">
                <div>
                    <span>商品</span>
                </div>
                <v-spacer></v-spacer>
                <div class="content d-flex justify-space-between pr-2">
                    <span>單價</span>
                    <span>數量</span>
                    <span>總計</span>
                    <span>動作</span>
                </div>
            </v-card>
            
            <!-- 購物車詳細內容 -->
            <v-card tile class="d-flex justify-space-between pa-5" v-for="order in userCart" :key="order.id">
                <!-- 商品名稱與圖片 (可導覽至該商品頁面) -->
                <nuxt-link :to="`products/${order.product_id}`">
                    <div class="d-flex align-center">
                        <v-img width="80" height="80" :src="order.imgUrl"></v-img>
                        <span>{{ order.title }}</span>
                    </div>
                </nuxt-link>
               
                <div class="content d-flex justify-space-between align-center">
                    <!-- 商品單價 -->
                    <div>
                        <span>{{ Math.floor(order.unit_price) }}</span>   
                    </div>
                    
                    <!-- 增加 減少數量按鈕 -->
                    <div>
                        <!-- <QuantityField 
                        @changeCount="updateValue(index)"
                        /> -->
                        <QuantityField 
                        
                        :qty="order.product_quantity"
                        />
                    </div>
                    <!-- output 測試 -->
                    <!-- <div>
                        <span>{{ productQty }}</span>
                    </div> -->
                
                    <!-- 測試用 -->
                    <!-- <v-row class="quantity_field_wrapper align-center justify-center">   
                        <v-btn
                            @click="changeCount(index, -1)"
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
                            :value="order.product_quantity"
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
                    </v-row> -->

                    <!-- 商品總價 -->
                    <div>
                        <span>{{ Math.floor(order.unit_price * order.product_quantity * order.discount_rate) }}</span>
                        <!-- <span>TEST {{ qty }}</span> -->
                    </div>
                    

                    <!-- 測試 -->
                    <!-- <span class="subtotal mx-8">測試當前數量: {{ currentCount }}</span> -->

                    <!-- 刪除按鈕 -->
                    <v-btn
                        @click="deleteItem(order.product_id)" 
                        color="red lighten-2" 
                        class="white--text">
                        刪除
                    </v-btn>
                </div>            
            </v-card>

            <!-- 購物車結算 -->
            <v-card class="cart_page_footer d-flex mt-5 pa-5 align-center text-right">
                <!-- 小計金額 -->
                <span class="subtotal mx-8">小計: {{ subTotal }}</span>

                <!-- 結帳按鈕 -->
                <v-btn color="blue lighten-2" class="white--text">結帳</v-btn>
            </v-card>

        </v-col>

    </v-container>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
    data () {
        return {
            qty: 0
        }
    },
    methods: {
        ...mapActions({
            fetchUserCart: 'cart/fetchUserCart', // 撈取使用者購物車
            deleteFromCart: 'cart/deleteFromCart',
        }),
        ...mapMutations({
            changeByOne: 'cart/CHANGE_QUANTITY_BY_ONE'
        }),
        async deleteItem(product_id) {
            // 根據商品 id 刪除
            await this.deleteFromCart(product_id);
            // 刪除商品之後重新撈取資料
            this.fetchUserCart();
        },
    },
    computed: {
        ...mapGetters({
            getUserCart: 'cart/getUserCart',
        }),
        // 使用者的購物車
        userCart () {
            return this.getUserCart;
        },
        // 價格小計
        subTotal () {
            // 初始為0
            let summary = 0;
            // 累加
            this.userCart.forEach(element => {
               summary += Number(element.Total) // 將字串轉換為數字(integer)
            });
            return summary;
        }
    },
    // 初次載入時先撈取購物車資料
    created () {
        this.fetchUserCart();
    },
}
</script>


<style lang="scss" scoped>
    .content {
        width: 60%;
    }
    .cart_page_footer .subtotal {
        width: 100%;
    }
    input {
        width: 30%;
    }
    .quantity_field_wrapper {
        max-width: 170px !important;
    }
</style>