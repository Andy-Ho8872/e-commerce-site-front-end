<template>
    <v-container>
        <!-- 如果陣列內長度為 0 則顯示-->
        <div v-if="!userCart.length" class="text-center">
            <h1 class="mb-4">您的購物車中沒有東西。</h1>
            <nuxt-link  :to="{ name: 'pagination-pageNumber', params: { pageNumber: 1 }}">
                <v-btn color="primary" x-large depressed>
                    <v-icon>fa-cart-arrow-down</v-icon>
                    <span class="mx-2">點我選購~</span> 
                </v-btn>
            </nuxt-link>
        </div>
        <v-col cols="12">
            <!-- Header -->
            <v-card class="cart_header justify-space-around d-flex mb-5 pa-5 rounded-t-xl" elevation="2">
                <div v-for="(header, index) in cartHeader" :key="index">
                    <v-icon color="blue lighten-1" class="mb-1">{{ header.icon }}</v-icon>
                    <span class="font-weight-bold">{{ header.text }}</span>
                </div>
            </v-card>
            <!-- Section -->
            <v-card
                class="cart_section_wrapper d-flex justify-space-around pa-5"
                tile
                v-for="item in userCart"
                :key="item.id"
            >
                <div class="cart_section d-flex justify-space-around align-center">
                    <!-- 商品名稱與圖片 (可導覽至該商品頁面) -->
                    <nuxt-link :to="{ name: 'products-id', params: { id: item.product_id }}">
                        <div class="navigator d-flex flex-column justify-center align-center">
                            <v-img
                                width="80"
                                height="80"
                                :src="item.imgUrl"
                            ></v-img>
                            <span class="mx-2">{{ item.title }}</span>
                        </div>
                    </nuxt-link>
                    <!-- 價格區域 -->
                    <div class="unit_price d-flex flex-column ">
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
                    <div class="quantity_field">
                        <QuantityField
                            :product_quantity="item.product_quantity"
                            :product_id="item.product_id"
                        />
                    </div>
                    <!-- 商品總價 -->
                    <div class="total">
                        <span>${{ item.total }}</span>
                    </div>
                    <!-- 刪除按鈕(單項商品) -->
                    <v-btn
                        @click="deleteFromCart(item.product_id)"
                        class="cart_section_btn white--text"
                        color="red lighten-2"
                    >
                        <v-icon small>fa-trash-alt fa-fw</v-icon>
                        <span class="ml-2">刪除</span>
                    </v-btn>
                </div>
            </v-card>
            <!-- Footer -->
            <v-card class="cart_footer d-flex mt-4 pa-4 rounded-b-xl align-center text-right" elevation="2">
                <!-- 小計金額 -->
                <div class="subtotal title font-weight-bold">
                    小計: <span class="red--text">{{ subTotal }}</span>
                </div>
                <!-- 按鈕群組 -->
                <div class="cart_footer_btn d-flex">
                    <!-- 清空物品 -->
                    <v-btn
                        @click="deleteAllFromCart"
                        class="white--text mx-6" 
                        color="error"
                        :disabled="!valid"
                    >
                        <v-icon small>fa-calendar-times fa-fw</v-icon>
                        <span class="ml-2">清空購物車</span>
                    </v-btn>
                    <!-- 結帳按鈕 -->
                        <!-- 若不為 valid 則無法導向至該頁面 -->
                    <nuxt-link :to="{ name: 'order-create' }" :event="valid ? 'click' : ''">
                        <v-btn 
                            class="white--text mx-6" 
                            color="blue lighten-2"
                            :disabled="!valid"
                            >
                            <v-icon small>fa-shopping-basket fa-fw</v-icon>
                            <span class="ml-2">結帳</span>
                        </v-btn>
                    </nuxt-link>
                </div>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    middleware: 'authenticated', // 要先通過驗證才能訪問此頁面
    data() {
        return {
            cartHeader: [
                {
                    icon: 'fa-shopping-cart fa-fw',
                    text: '商品'
                },
                {
                    icon: 'fa-dollar-sign fa-fw',
                    text: '單價'
                },
                {
                    icon: 'fa-random fa-fw',
                    text: '數量'
                },
                {
                    icon: 'fa-clipboard-list fa-fw',
                    text: '總計'
                },
                {
                    icon: 'fa-exclamation-circle fa-fw',
                    text: '動作'
                },
            ]
        }
    },
    methods: {
        ...mapActions({
            deleteFromCart: 'cart/deleteFromCart', // 點擊按鈕購物車內的商品 (單項)
            deleteAllFromCart: 'cart/deleteAllFromCart', // 刪除購物車中的所有商品 (全品項)
        }),
    },
    computed: {
        ...mapGetters({
            userCart: 'cart/getUserCart', // 使用者的購物車資料
            valid: 'cart/getValidStatus' // 是否通過驗證
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
// Section -------------------------------Start
.cart_section {
    width: 100%;
}
.navigator {
    width: 140px;
}
.discounted {
    text-decoration: line-through;
}
.quantity_field_wrapper {
    max-width: 170px !important;
}
.quantity_field {
    width: 170px;
}
// Section -------------------------------End


// Footer  -------------------------------Start
.cart_footer .subtotal {
    width: 100%;
}
// Footer  -------------------------------End


@media (max-width: 768px) {
    // Header-----------------------------Start
    .cart_header {
        display: none !important;
    }
    // Header-----------------------------End


    // Section -------------------------------Start
    .cart_section_wrapper {
        flex-wrap: wrap;
    }
    .cart_section {
        flex-direction: column;
        width: 100%
    }
    .navigator {
        width: 100%;
    }
    .unit_price {
        margin: 1rem;
        span {
            width: 100%;
        }
    }
    .total {
        display: none;
    }
    .cart_section_btn {
        margin-top: 15%;
    }
    // Section -------------------------------End


    // Footer  ----------------------------------Start
    .cart_footer {
        position: relative;
        flex-direction: column;
    }
    .subtotal {
        text-align: center;
        font-size: 1.2rem;
    }  
    // Footer  ----------------------------------End
}
</style>
