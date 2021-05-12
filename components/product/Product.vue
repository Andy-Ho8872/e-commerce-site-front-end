<template>
<!-- 商品卡片 -->
    <div class="product_wrapper">
        <!-- 產品連結  -->
        <nuxt-link :to="{ name: 'products-id', params: { id: product.id }}">
            <v-card class="rounded-t-xl"
                tile
                color="grey lighten-5"
                :width="cardWidth" 
                :height="cardHeight">
                <!-- 產品折扣 -->
                    <!-- 產品原始 折扣倍率為 1.00 即原價-->
                <v-card-subtitle v-if="product.discount_rate != 1"
                    class="
                    product_discount_lable
                    pa-1
                    yellow
                    rounded-tl-lg
                    rounded-bl-lg">
                    <span 
                        class="
                        red--text 
                        font-italic
                        font-weight-medium
                        overline">
                        {{ formatLabel }} 折
                    </span>
                </v-card-subtitle>
                <!-- 產品圖片 -->
                <v-img 
                    class="ma-auto rounded-t-xl"
                    :src="product.imgUrl"
                    :lazy-src="product.imgUrl">
                    <!-- 當圖片 Loading 時 -->
                    <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center">
                            <v-progress-circular
                                indeterminate
                                color="blue lighten-5">
                            </v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
                <!-- 產品名稱 -->
                <v-card-title 
                    class="
                    product_title
                    mt-2 pa-3
                    font-weight-black
                    justify-center">
                    {{ product.title }}
                </v-card-title>
                <!-- 產品敘述 -->
                <v-card-subtitle 
                    class="
                    px-8 py-4
                    text-justify">
                    <!-- 縮減字數後的商品敘述 -->
                    {{ subString }}
                </v-card-subtitle>
                <!-- 星星數量 -->
                <Ratings :product="product" class="px-5"/>
                <!-- 產品標籤 -->
                <Tags :product="product" class="px-5"/>
                <!-- 產品價格 -->
                <div class="mt-2">
                    <!-- 原價 -->
                    <v-card-subtitle 
                        class="
                        original_price
                        px-6
                        font-weight-medium
                        text-h6"
                        :class="[product.discount_rate == 1 ? '' : 'discounted']">
                        NT.{{ Math.floor(product.unit_price) }}
                    </v-card-subtitle>
                    <!-- 打折後 -->
                    <v-card-subtitle v-if="product.discount_rate != 1"
                        class="
                        discount_price
                        pa-0
                        text-center
                        title
                        red--text">
                        NT.{{ Math.floor(product.unit_price * product.discount_rate) }}
                    </v-card-subtitle>
                </div>      
            </v-card>
        </nuxt-link>      
        <!-- 放入購物車按鈕 -->
        <v-btn 
            @click="addToCart(product.id)"
            class="add_to_cart rounded-b-xl"
            color="primary"
            tile 
            large 
            depressed>
            <!-- 產品 ID -->
            <span>加入購物車</span>
        </v-btn>   
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    //? passed from pages/index.vue
    props: {
        'product': {
            type: Object,
            require: true
        },
        'cardWidth': {
            type: Number,
            require: true
        },
        'cardHeight': {
            type: Number,
            require: true
        } 
    },
    computed: {
        //* 商品折數
        formatLabel() {
            return this.product.discount_rate * 10
        },
        //* 縮減商品敘述的字串
        subString() {
            return this.product.description.substring(0, 50) + '...'
        },
    },
    methods: {
        ...mapActions({
            //* 加入購物車
            addToCart: 'cart/addToCart'
        })
    },
}
</script>


<style lang="scss" scoped>
    //? 常用變數
    $card_width: 300px; //* 商品卡片寬度
    $letter_sapcing: 2px; //* 文字字距
    $btn_letter_sapcing: 4px; //* 按鈕字距
    a {
        text-decoration: none;
    }
    .product_wrapper {
        width: $card_width;
    }
    //* 產品折扣標籤
    .product_discount_lable {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        letter-spacing: $letter_sapcing !important;
    }
    .product_title {
        letter-spacing: $letter_sapcing;
    }
    //* 若原價有折扣 
    .discounted {
        text-decoration: line-through;
    }
    //* 折扣後的樣式
    .discount_price {
        position: absolute;
        left: 40%;
        bottom: 5%;
        transform: rotate(-5deg);
    }
    //* 加入至購物車
    .add_to_cart {
        position: absolute;
        width: inherit;
        letter-spacing: $btn_letter_sapcing;
    } 
</style>