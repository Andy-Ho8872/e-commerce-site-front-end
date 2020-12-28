<template>
    <v-container>

        <v-col cols="12" class="cart_page_wrapper">
            <!-- 購物車標頭 -->
            <v-card class="cart_page_header d-flex justify-space-between mb-5 pa-5">
                <div>
                    <span>商品</span>
                </div>
                <div class="content d-flex justify-space-between">
                    <span>單價</span>
                    <span>數量</span>
                    <span>總計</span>
                    <span>動作</span>
                </div>
            </v-card>

            <!-- 購物車詳細內容 -->
            <v-card tile class="d-flex justify-space-between pa-5" v-for="order in orders" :key="order.id">
                <!-- 商品圖片 + 文字 -->
                <div class="d-flex align-center">
                    <v-img width="80" height="80" :src="order.imgUrl"></v-img>
                    <span>{{ order.title }}</span>
                </div>
               
                <div class="content d-flex justify-space-between align-center">
                    <span>{{ order.unit_price }}</span>
                    <span>{{ order.product_quantity }}</span>
                    <span>{{ order.Total }}</span>
                    <!-- 刪除按鈕 -->
                    <v-btn color="red lighten-2" class="white--text">刪除</v-btn>
                </div>            
            </v-card>

            <!-- 購物車結算 -->
            <v-card class="cart_page_footer d-flex mt-5 pa-5 align-center text-right">
                <!-- 小計金額 -->
                <span class="subtotal mx-8">小計: {{ 1234 }}</span>
                <!-- 結帳按鈕 -->
                <v-btn color="blue lighten-2" class="white--text">結帳</v-btn>
            </v-card>
        </v-col>

    </v-container>
</template>

<script>
import { apiGetCartProducts } from '../../APIs/api.js'

export default {
    async asyncData() {
        const res = await apiGetCartProducts(1)
        console.log(res);
        return { orders: res.data.orders }
    }
}
</script>

<style lang="scss" scoped>
    .content {
        width: 50%;
    }
    .cart_page_footer .subtotal {
        width: 100%;
    }

    // @media (max-width: 768px) {
    //     .cart_page_wrapper {
    //         flex-direction: column;
    //     }
    //     .content {
    //         flex-direction: column;
    //     }
    // }
</style>