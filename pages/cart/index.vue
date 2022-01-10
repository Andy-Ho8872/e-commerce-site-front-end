<template>
    <v-container>
        <!-- 若無商品-->
        <EmptyCart class="empty_cart_component" v-if="!userCart.length" />
        <!-- 若有商品-->
        <div v-else>
            <!-- Hidden only on xs -->
            <div class="cart_desktop_ui d-none d-sm-block">
                <!-- Banner -->
                <Banner
                    icon="fa-shopping-cart"
                    text="您的購物車"
                    elevation="1"
                    class="my-4"
                />
                <!-- Header -->
                <v-card class="cart_header d-flex justify-space-around mb-4 pa-6 font-weight-bold" elevation="2">
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
                <v-card class="cart_section_wrapper d-flex justify-space-around pa-5" tile v-for="item in userCart" :key="item.id">
                    <div class="cart_section d-flex justify-space-around align-center">
                        <!-- section left -->
                        <div class="cart_section__left">
                            <!-- 商品名稱與圖片 (可導覽至該商品頁面) -->
                            <nuxt-link
                                :to="{
                                    name: 'products-id',
                                    params: { id: item.product_id },
                                }"
                            >
                                <div
                                    class="navigator d-flex flex-column justify-center align-center"
                                >
                                    <v-img
                                        width="80"
                                        height="80"
                                        :src="item.imgUrl"
                                    ></v-img>
                                    <span class="mx-2">{{ item.title }}</span>
                                </div>
                            </nuxt-link>
                        </div>
                        <!-- section right -->
                        <div
                            class="cart_section__right d-flex flex-sm-row flex-column justify-space-around align-center"
                        >
                            <!-- 價格區域 -->
                            <div
                                class="unit_price d-flex flex-sm-column font-weight-bold grey--text text--darken-2"
                            >
                                <!-- 原價 -->
                                <span
                                    class="original_price"
                                    :class="[
                                        item.discount_rate == 1
                                            ? ''
                                            : 'discounted',
                                    ]"
                                >
                                    ${{ Math.floor(item.unit_price) }}
                                </span>
                                <!-- 折扣後 -->
                                <span
                                    v-if="item.discount_rate != 1"
                                    class="discounted_price red--text text-lighten-5"
                                >
                                    ${{
                                        Math.floor(
                                            item.unit_price * item.discount_rate
                                        )
                                    }}
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
                            <div
                                class="total d-none d-sm-flex font-weight-bold grey--text text--darken-2"
                            >
                                <span>${{ item.total }}</span>
                            </div>
                            <!-- 刪除按鈕(單項商品) -->
                            <v-btn
                                class="delete_single_item cart_section_btn white--text"
                                @click="deleteFromCart(item.product_id)"
                                color="red"
                                outlined
                            >
                                <v-icon small>fa-trash-alt fa-fw</v-icon>
                                <span>刪除</span>
                            </v-btn>
                        </div>
                    </div>
                </v-card>
                <!-- Footer -->
                <v-card
                    class="cart_footer d-flex flex-column justify-end mt-4 pa-4 align-center text-right"
                    elevation="2"
                >
                    <!-- 小計金額 -->
                    <div class="subtotal text-sm-right text-center font-weight-bold">
                        <div class="py-2">小計: ${{ subTotal }}</div>
                        <div class="py-2">運費: ${{ delivery_fee }}</div>
                        <div class="py-2">總金額: 
                            <span class="blue--text text-h6">${{ subTotal + delivery_fee }}</span>
                        </div>
                        <v-divider></v-divider>
                        <!-- 按鈕群組 -->
                        <div class="cart_footer_btn pt-4">
                            <!-- 清空物品 -->
                            <v-btn
                                class="delete_all_items white--text"
                                @click="deleteAllFromCart"
                                color="error"
                                :disabled="!valid"
                            >
                                <v-icon small>fa-calendar-times fa-fw</v-icon>
                                <span class="ml-2">清空購物車</span>
                            </v-btn>
                            <!-- 若不為 valid 則無法導向至該頁面 -->
                            <nuxt-link
                                :to="{ name: 'order-create' }"
                                :event="valid ? 'click' : ''"
                            >
                                <!-- 結帳按鈕 -->
                                <v-btn
                                    class="white--text ml-6"
                                    color="primary"
                                    :disabled="!valid"
                                >
                                    <v-icon small>fa-check-square fa-fw</v-icon>
                                    <span class="ml-2">結帳</span>
                                </v-btn>
                            </nuxt-link>
                        </div>
                    </div>
                </v-card>
            </div>
            <!-- 手機版UI -->
            <div class="cart_mobile_ui pa-4 d-sm-none">
                <!-- 標頭 -->
                <div class="mobile_header d-flex text-body-1 font-weight-bold">
                    <div>我的購物車</div>
                    <v-spacer></v-spacer>
                    <v-btn color="error" outlined text small @click="deleteAllFromCart">清空</v-btn>
                </div>
                <div class="cart_content_container d-flex py-6" v-for="item in userCart" :key="item.id">
                    <nuxt-link :to="{
                            name: 'products-id',
                            params: { id: item.product_id },
                        }">
                        <v-img :src="item.imgUrl" :alt="item.title" max-width="100" max-height="100" class="cart_image rounded-lg"></v-img>
                    </nuxt-link>
                    <div class="cart_content pl-4">
                        <!-- 商品訊息 -->
                        <div class="cart_content_details">
                            <div class="item_title text-body-2 font-weight-bold">{{ item.title }}</div>
                            <div class="item_unit_price text-button">
                                <!-- 原價 -->
                                <span class="blue-grey--text" :class="item.discount_rate != 1 ? 'text-decoration-line-through' : null">
                                    ${{ Math.floor(item.unit_price) }}
                                </span>
                                <!-- 特價 -->
                                <span class="blue--text" v-if="item.discount_rate != 1">
                                    ${{ Math.floor(item.unit_price * item.discount_rate) }}
                                </span>
                            </div>
                        </div>
                        <!-- 按鈕群組 -->
                        <div class="d-flex">
                            <QuantityField :product_id="item.product_id" :product_quantity="item.product_quantity"></QuantityField>
                            <!-- 刪除 -->
                            <v-btn x-small fab outlined color="error" class="ml-4" @click="deleteFromCart(item.product_id)">
                                <v-icon x-small>fa-trash</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>
                <!-- 金額計算 -->
                <div class="mobile_footer text-body-1 font-weight-bold">
                    <div>消費明細</div>
                    <div class="d-flex pt-4 text-button">
                        <div class="grey--text">小計</div>
                        <v-spacer></v-spacer>
                        <div>${{ subTotal }}</div>
                    </div>
                    <div class="d-flex pt-4 text-button">
                        <div class="grey--text">運費</div>
                        <v-spacer></v-spacer>
                        <div>${{ delivery_fee }}</div>
                    </div>
                    <div class="d-flex pt-4 text-button">
                        <div class="grey--text">總金額</div>
                        <v-spacer></v-spacer>
                        <div class="blue--text text-h6">${{ subTotal + delivery_fee }}</div>
                    </div>
                </div>
                <!-- 點擊前往結帳頁面 -->
                <div class="mt-4">
                    <v-btn block nuxt :to="{ name: 'order-create' }" color="primary">結帳去</v-btn>
                </div>
            </div>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    head() {
        return {
            title: '我的購物車',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '使用者所購買的商品。',
                },
            ],
        }
    },
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    data() {
        return {
            delivery_fee: 0
        }
    },
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

</style>