<template>
<!-- 商品卡片 -->
    <div class="product_wrapper">
        <!-- 產品連結  -->
        <nuxt-link :to="`products/${id}`">
            <v-card
                class="
                Products 
                justify-center 
                align-center 
                flex-wrap mt-5"
                tile
                color="grey lighten-5"
                :width="cardWidth" 
                :height="cardHeight" 
                >
                <!-- 產品折扣 -->
                <v-card-subtitle 
                    class="
                    product_discount_lable
                    yellow
                    pa-1
                    caption"
                    >
                    <span 
                        class="
                        red--text 
                        font-italic
                        font-weight-medium
                        text-uppercase"
                        >
                        50% off!!
                    </span>
                </v-card-subtitle>
                <!-- 產品圖片 -->
                <v-img 
                    class="product_image ma-auto"
                    :src="imgURL"
                    :lazy-src="imgURL" 
                    >
                    <!-- 當圖片 Loading 時 -->
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                                >
                                <v-progress-circular
                                    indeterminate
                                    color="blue lighten-5"
                                    >
                                </v-progress-circular>
                            </v-row>
                        </template>
                </v-img>
                <!-- 產品名稱 -->
                <v-card-title 
                    class="
                    product_title
                    pa-3
                    text-center
                    font-weight-black
                    justify-center"
                    >
                    {{ title }}
                </v-card-title>
                <!-- 產品敘述 -->
                <v-card-subtitle 
                    class="
                    product_description
                    px-8
                    py-6
                    gray--text 
                    text--lighten-2
                    text-justify"
                    >
                    <!-- 縮減字數後的商品敘述 -->
                    {{ subString }}
                </v-card-subtitle>
                <!-- 產品價格 -->
                <div class="text--lighten-1 text-center">
                    <!-- 原價 -->
                    <v-card-subtitle 
                        class="
                        original_price
                        pa-1
                        gray--text 
                        text-decoration-line-through"
                        >
                        NT.{{ price }}
                    </v-card-subtitle>
                    <!-- 打折後 -->
                    <v-card-subtitle 
                        class="
                        discount_price
                        pa-0
                        title
                        red--text"
                        >
                        NT.{{ Math.floor(price / 2) }}
                    </v-card-subtitle>
                </div>
            </v-card>
        </nuxt-link>
        
        <!-- 放入購物車按鈕 -->
        <v-btn class="add_to_cart" 
            tile 
            large 
            depressed
            color="primary"
            >
            <span>加入購物車</span>
        </v-btn>   
    </div>
    
    
</template>


<script>
export default {
    props: ['title', 'imgURL', 'price', 'id', 'description'], // passed from pages/index.vue
   // props: ['products'],
    data () {
        return {
            // 商品卡片大小
            cardWidth: 300,
            cardHeight: 600
        }
    },
    computed: {
        // 縮減商品敘述的字串
        subString () {
            return this.description.substring(0, 50) + '...'
        }
    }
}
</script>


<style lang="scss" scoped>
    // 常用變數
    $card_width: 300px; // 商品卡片寬度
    $letter_sapcing: 2px;
    $btn_letter_sapcing: 4px; // 按鈕字距

    //  styling
    .product_wrapper {
        width: $card_width;
    }
    a {
        text-decoration: none;
    }
    .product_discount_lable {
        position: absolute;
        z-index: 100;
        top: 0;
        right: 0;
        letter-spacing: $letter_sapcing !important;
    }
    .product_title {
        letter-spacing: $letter_sapcing;
    }
    // .discount_price {
    //     position: absolute;
    //     right: 20%;
    //     bottom: 10%;
    //     transform: rotate(-5deg);
    // }
    .add_to_cart {
        position: absolute;
        width: inherit;
        letter-spacing: $btn_letter_sapcing;
    }
    
    // RWD 
    @media (max-width: 768px) {
        .Products {
            margin: 0 auto;
        }
    }
</style>