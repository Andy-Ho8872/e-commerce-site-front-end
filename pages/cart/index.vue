<template>
    <v-container>
        <!-- 若無商品-->
        <EmptyCart v-if="!userCart.length"/>
        <!-- 若有商品-->
        <div v-else>
            <!-- Banner -->
            <Banner icon="fa-shopping-cart" text="您的購物車" elevation="1" class="my-4"/>
            <!-- Header -->
            <v-card class="cart_header d-none d-sm-flex justify-space-around mb-4 pa-6 font-weight-bold" elevation="2">
                <!-- left -->
                <div class="cart_header__left">
                    <div class="icon_group">
                        <v-icon>fa-shopping-cart fa-fw</v-icon>
                        <span>商品</span>
                    </div>
                </div>
                <!-- right -->
                <div class="cart_header__right d-flex justify-space-around">
                    <div class="icon_group">
                        <v-icon>fa-dollar-sign fa-fw</v-icon>
                        <span>單價</span>
                    </div>
                    <div class="icon_group">
                        <v-icon>fa-random fa-fw</v-icon>
                        <span>數量</span>
                    </div>
                    <div class="icon_group">
                        <v-icon>fa-clipboard-list fa-fw</v-icon>
                        <span>總計</span>
                    </div>
                    <div class="icon_group">
                        <v-icon>fa-exclamation-circle fa-fw</v-icon>
                        <span>編輯</span>
                    </div>
                </div>
            </v-card>
            <!-- Section -->
            <v-card class="cart_section_wrapper d-flex justify-space-around pa-5"
                tile
                v-for="item in userCart"
                :key="item.id"
            >
                <div class="cart_section d-flex justify-space-around align-center">
                    <!-- section left -->
                    <div class="cart_section__left">
                        <!-- 商品名稱與圖片 (可導覽至該商品頁面) -->
                        <nuxt-link :to="{ name: 'products-id', params: { id: item.product_id }}">
                            <div class="navigator d-flex flex-column justify-center align-center">
                                <v-img width="80" height="80" :src="item.imgUrl"></v-img>
                                <span class="mx-2">{{ item.title }}</span>
                            </div>
                        </nuxt-link>
                    </div>
                    <!-- section right -->
                    <div class="cart_section__right d-flex flex-sm-row flex-column justify-space-around align-center">
                        <!-- 價格區域 -->
                        <div class="unit_price d-flex flex-sm-column font-weight-bold grey--text text--darken-2">
                            <!-- 原價 -->
                            <span :class="[item.discount_rate == 1 ? '' : 'discounted']">
                                ${{ Math.floor(item.unit_price) }}
                            </span>
                            <!-- 折扣後 -->
                            <span v-if="item.discount_rate != 1" class="red--text text-lighten-5">
                                ${{ Math.floor(item.unit_price * item.discount_rate) }}
                            </span>
                        </div>
                        <!-- 增加 減少數量按鈕 -->
                        <div class="quantity_field">
                            <QuantityField :product_quantity="item.product_quantity" :product_id="item.product_id"/>
                        </div>
                        <!-- 商品總價 -->
                        <div class="total d-none d-sm-flex font-weight-bold grey--text text--darken-2">
                            <span>${{ item.total }}</span>
                        </div>
                        <!-- 刪除按鈕(單項商品) -->
                        <v-btn class="cart_section_btn white--text"
                            @click="deleteFromCart(item.product_id)"
                            color="red lighten-2"
                        >
                            <v-icon small>fa-trash-alt fa-fw</v-icon>
                            <span>刪除</span>
                        </v-btn>
                    </div>
                </div>
            </v-card>
            <!-- Footer -->
            <v-card class="cart_footer d-flex flex-sm-row flex-column mt-4 pa-4 align-center text-right" elevation="2">
                <!-- 小計金額 -->
                <div class="subtotal text-sm-right text-center title font-weight-bold">
                    小計: <span class="red--text">{{ subTotal }}</span>
                </div>
                <!-- 按鈕群組 -->
                <div class="cart_footer_btn d-flex">
                    <!-- 清空物品 -->
                    <v-btn class="white--text mx-6"
                        @click="deleteAllFromCart"
                        color="error"
                        :disabled="!valid"
                    >
                        <v-icon small>fa-calendar-times fa-fw</v-icon>
                        <span class="ml-2">清空購物車</span>
                    </v-btn>
                    <!-- 若不為 valid 則無法導向至該頁面 -->
                    <nuxt-link :to="{ name: 'order-create' }" :event="valid ? 'click' : ''">
                        <!-- 結帳按鈕 -->
                        <v-btn class="white--text mx-6"
                            color="blue lighten-2"
                            :disabled="!valid"
                        >
                            <v-icon small>fa-shopping-basket fa-fw</v-icon>
                            <span class="ml-2">結帳</span>
                        </v-btn>
                    </nuxt-link>
                </div>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    methods: {
        ...mapActions({
            //* 點擊按鈕購物車內的商品 (單項)
            deleteFromCart: 'cart/deleteFromCart',
            //* 刪除購物車中的所有商品 (全品項)
            deleteAllFromCart: 'cart/deleteAllFromCart',
        }),
    },
    computed: {
        ...mapGetters({
            //* 使用者的購物車資料
            userCart: 'cart/getUserCart',
            //* 是否通過驗證
            valid: 'cart/getValidStatus',
        }),
        //* 價格小計
        subTotal() {
            //* 初始為0
            let summary = 0
            // 累加
            this.userCart.forEach(element => {
                summary += Number(element.total) //* 將字串轉換為數字(integer)
            })
            return summary
        },
    },
}
</script>

<style lang="scss" scoped>
$header_icon__color: #42a5f5;
$header_width__left: 40%;
$header_width__right: 70%;
$section_width__left: 40%;
$section_width__right: 70%;
$discounted_text__color: rgba(119, 112, 112, 0.65);

//? Header -------------------------------Start
.cart_header {
    i {
        color: $header_icon__color;
    }
    .cart_header__left {
        padding-left: 7.5%;
        width: $header_width__left;
    }
    .cart_header__right {
        width: $header_width__right;
    }
}
//? Header -------------------------------End

//? Section -------------------------------Start
.cart_section {
    width: 100%;
    .cart_section__left {
        padding-left: 5%;
        width: $section_width__left;
    }
    .cart_section__right {
        width: $section_width__right;
    }
}
.navigator {
    width: 140px;
}
.unit_price,
.total {
    min-width: 80px;
    margin-left: 12px;
    margin-right: 12px;
}
.discounted {
    text-decoration: line-through;
    color: $discounted_text__color;
}
.quantity_field {
    width: 170px;
}
//? Section -------------------------------End

//? Footer  -------------------------------Start
.cart_footer .subtotal {
    width: 100%;
}
//? Footer  -------------------------------End

@media (max-width: 600px) {
    //? Section -------------------------------Start
    .cart_section {
        .cart_section__left {
            padding: 0;
        }
        .cart_section__right {
            margin-left: 10%;
        }
    }
    .unit_price {
        width: 100%;
        margin-left: 0.5rem;
        margin-bottom: 1.5rem;
        margin-top: 0.5rem;
    }
    .discounted {
        margin-right: 6px;
    }
    .cart_section_btn {
        margin-top: 25%;
    }
    //? Section -------------------------------End

    //? Footer  ----------------------------------Start
    .subtotal {
        margin-bottom: 16px;
        font-size: 1.2rem;
    }
    //? Footer  ----------------------------------End
}
</style>