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
                flex-wrap"
                tile
                color="grey lighten-5"
                :width="cardWidth" 
                :height="cardHeight" >
                <!-- 產品折扣 -->
                    <!-- 產品原始 折扣倍率為 1.00 即原價-->
                <v-card-subtitle v-if="formatLabel != 10"
                    class="
                    product_discount_lable
                    yellow
                    pa-1
                    caption">
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
                    class="product_image ma-auto"
                    :src="imgUrl"
                    :lazy-src="imgUrl" >
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
                    text-center
                    font-weight-black
                    justify-center">
                    {{ title }}
                </v-card-title>
                <!-- 產品敘述 -->
                <v-card-subtitle 
                    class="
                    product_description
                    px-8 py-4
                    gray--text 
                    text--lighten-2
                    text-justify">
                    <!-- 縮減字數後的商品敘述 -->
                    {{ subString }}
                    <!-- 產品標籤 -->
                    <v-chip-group class="my-5">
                        <v-chip class="mx-1" color="primary" v-for="tag in tags" :key="tag.id">
                            <v-icon size="medium">fa-check-circle fa-fw</v-icon>
                            <span>{{ tag.title }}</span>
                        </v-chip>
                    </v-chip-group>      
                </v-card-subtitle>
                <!-- 產品價格 -->
                <div class="text--lighten-1 text-center">
                    <!-- 原價 -->
                    <v-card-subtitle 
                        class="
                        original_price
                        pa-1
                        subtitle-1
                        gray--text "
                        :class="[formatLabel == 10 ? '' : 'discounted']"
                        >
                        NT.{{ Math.floor(unit_price) }}
                    </v-card-subtitle>
                    <!-- 打折後 -->
                    <v-card-subtitle v-if="formatLabel != 10"
                        class="
                        discount_price
                        pa-0
                        title
                        red--text"
                        >
                        NT.{{ Math.floor(unit_price * discount_rate) }}
                    </v-card-subtitle>
                </div>      
            </v-card>
        </nuxt-link>      
        <!-- 放入購物車按鈕 -->
        <v-btn class="add_to_cart" 
            tile 
            large 
            depressed
            color="primary">
            <span @click="addToCart(id)">加入購物車</span>
        </v-btn>   
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['title', 'imgUrl', 'unit_price', 'id', 'description', 'tags', 'discount_rate'], // passed from pages/index.vue
   
    data () {
        return {
            // 商品卡片大小
            cardWidth: 300,
            cardHeight: 600
        }
    },
    computed: {
        // 折扣標籤
        formatLabel () {
            return this.discount_rate * 10
        },
        // 縮減商品敘述的字串
        subString () {
            return this.description.substring(0, 50) + '...'
        }
    },
    methods: {
        ...mapActions({
            addToCart: 'cart/addToCart'
        })
    }
}
</script>


<style lang="scss" scoped>
    // 常用變數
    $card_width: 300px; // 商品卡片寬度
    $letter_sapcing: 2px; // 文字字距
    $btn_letter_sapcing: 4px; // 按鈕字距
    //  styling
    a {
        text-decoration: none;
    }
    .product_wrapper {
        width: $card_width;
    }
    // 產品折扣標籤
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
    // 若原價有折扣 
    .discounted {
        text-decoration: line-through;
    }
    // 折扣後的樣式
    .discount_price {
        transform: rotate(-5deg);
    }
    // 加入至購物車
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