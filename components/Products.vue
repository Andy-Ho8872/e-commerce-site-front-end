<template>
<!-- 商品卡片 -->
    <!-- 產品連結  (待修正) -->
    <nuxt-link :to="'products/' + id">

        <v-card
            color="grey lighten-5"
            width="300" 
            height="600" 
            class="
            Products 
            justify-center 
            align-center 
            flex-wrap my-10"
            >
            <!-- 產品圖片 -->
            <v-img 
                :src="imgURL"
                :lazy-src="imgURL" 
                class="product_image ma-auto"
                >
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
                px-8
                py-6
                gray--text 
                text--lighten-2
                text-justify"
                >
                {{ description }}
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
            <!-- 放入購物車按鈕 -->
            <v-btn class="add_to_cart" 
                tile 
                large 
                depressed
                color="primary"
                >
                加入購物車
            </v-btn>

                <!-- <v-card-subtitle 
                    class="
                    product_label
                    yellow
                    pa-1
                    caption
                    "
                    >
                    <span 
                        class="
                        red--text 
                        font-italic
                        font-weight-medium
                        text-uppercase
                        "
                        >
                        50% off!!
                    </span>
                </v-card-subtitle> -->

        </v-card>

    </nuxt-link>
    
</template>


<script>
export default {
    props: ['title', 'imgURL', 'price', 'id', 'description'] // passed from index.vue
}
</script>


<style lang="scss" scoped>
    a {
        text-decoration: none;
    }
    .product_label {
        position: absolute;
        top: 0;
        right: 0;
        letter-spacing: 2px !important;
    }
    .product_title {
        letter-spacing: 2px;
    }
    // .discount_price {
    //     position: absolute;
    //     right: 20%;
    //     bottom: 10%;
    //     transform: rotate(-5deg);
    // }
    .add_to_cart {
        position: absolute;
        bottom: 0;
        width: inherit;
        letter-spacing: 4px;
    }
    
    // RWD 
    @media (max-width: 768px) {
        .Products {
            margin: 0 auto;
        }
    }
</style>