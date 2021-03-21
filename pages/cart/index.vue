<template>
    <v-container>
        <!-- 如果陣列內長度為 0 則顯示-->
        <div v-if="!userCart.length">
            <h1>您的購物車中沒有東西。</h1>
        </div>
        <v-col cols="12" class="cart_page_wrapper">
            <!-- 購物車標頭 -->
            <v-card class="cart_page_header d-flex mb-5 pa-5 rounded-t-xl" elevation="2">
                <div>
                    <span>商品</span>
                </div>
                <v-spacer></v-spacer>
                <div class="content d-flex justify-space-between">
                    <span>單價</span>
                    <span>數量</span>
                    <span>總計</span>
                    <span>動作</span>
                </div>
            </v-card>
            <!-- 購物車詳細內容 -->
            <v-card
                class="details d-flex justify-space-between pa-5"
                tile
                v-for="item in userCart"
                :key="item.id"
            >
                <!-- 商品名稱與圖片 (可導覽至該商品頁面) -->
                <nuxt-link :to="`products/${item.product_id}`">
                    <div class="d-flex align-center">
                        <v-img
                            width="80"
                            height="80"
                            :src="item.imgUrl"
                        ></v-img>
                        <span class="mx-2">{{ item.title }}</span>
                    </div>
                </nuxt-link>
                <div class="content d-flex justify-space-between align-center">
                    <!-- 價格區域 -->
                    <div class="price_zone d-flex flex-column ">
                        <!-- 原價 -->
                        <span  :class="[item.discount_rate == 1 ? '' : 'discounted']">
                            ${{ Math.floor(item.unit_price) }}
                        </span>
                        <!-- 折扣後 -->
                        <span v-if="item.discount_rate != 1" class="red--text text-lighten-5">
                            ${{ Math.floor(item.unit_price * item.discount_rate) }}
                        </span>
                    </div>
                    <!-- 增加 減少數量按鈕 -->
                    <div>
                        <QuantityField
                            :product_quantity="item.product_quantity"
                            :product_id="item.product_id"
                        />
                    </div>
                    <!-- 商品總價 -->
                    <div class="total">
                        <span>{{ item.total }}</span>
                    </div>
                    <!-- 刪除按鈕(單項商品) -->
                    <v-btn
                        @click="deleteFromCart(item.product_id)"
                        class="action white--text"
                        color="red lighten-2"
                    >
                        刪除
                    </v-btn>
                </div>
            </v-card>
            <!-- 購物車結算 -->
            <v-card class="cart_page_footer d-flex mt-4 pa-4 rounded-b-xl align-center text-right" elevation="2">
                <!-- 小計金額 -->
                <div class="subtotal mb-2 title font-weight-bold">
                    小計: <span class="red--text">{{ subTotal }}</span>
                </div>
                <!-- Footer 按鈕群組 -->
                <div class="d-flex">
                    <!-- 清空物品 -->
                    <v-btn
                        @click="deleteAllFromCart"
                        class="white--text mx-6" 
                        color="error"
                    >
                        清空購物車
                    </v-btn>
                    <!-- 結帳按鈕 -->
                    <v-btn 
                        class="white--text mx-6" 
                        color="blue lighten-2"
                        >
                        結帳
                    </v-btn>
                </div>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    middleware: 'authenticated', // 要先通過驗證才能訪問此頁面
    methods: {
        ...mapActions({
            deleteFromCart: 'cart/deleteFromCart', // 點擊按鈕購物車內的商品 (單項)
            deleteAllFromCart: 'cart/deleteAllFromCart', // 刪除購物車中的所有商品 (全品項)
        }),
    },
    computed: {
        ...mapGetters({
            userCart: 'cart/getUserCart', // 使用者的購物車資料
        }),
        // 價格小計
        subTotal() {
            // 初始為0
            let summary = 0
            // 累加
            this.userCart.forEach(element => {
                summary += Number(element.total) // 將字串轉換為數字(integer)
            })
            return summary
        },
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
.discounted {
    text-decoration: line-through;
}
.quantity_field_wrapper {
    max-width: 170px !important;
}


@media (max-width: 768px) {
    // cart page header-----------------------------Start
    .cart_page_header {
        display: none !important;
    }
    .details {
        flex-wrap: wrap;
    }
    .content {
        flex-direction: column;
        width: 100%
    }
    // 刪除按鈕
    .action {
        margin-top: 20%;
    }
    // 價格區域 ------------------Start
    .price_zone {
        margin: 1rem;
    }
    .total {
        display: none;
    }
    // 價格區域 ------------------End
    
    // cart page header-----------------------------End


    // cart page footer -------------Start
    .cart_page_footer {
        position: relative;
        flex-direction: column;
    }
    .subtotal {
        text-align: center;
        font-size: 1.2rem;
    }  
    // cart page footer -------------End
}
</style>
