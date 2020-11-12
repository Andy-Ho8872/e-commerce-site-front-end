<template>
<!-- 商品卡片 -->
    <v-card max-width="300" height="250" class="Products justify-center align-center flex-wrap my-10">
        <v-col>
            <!-- 商品標籤 -->
            <v-card-subtitle 
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
            </v-card-subtitle>
            <!-- 商品標題文字 -->
            <v-card-subtitle 
                class="
                product_title
                pa-5
                text-center
                font-weight-black
                "
                >
                {{ title }}
            </v-card-subtitle>
            <!-- 商品圖片 -->
            <v-img 
                :src="imgURL" 
                max-width="100" 
                max-height="100" 
                class="ma-auto"
                >
            </v-img>
            <!-- 商品原價 -->
            <v-card-subtitle 
                class="
                pa-1
                text-center 
                gray--text 
                text--lighten-1
                text-decoration-line-through
                "
                >
                NT.{{ price }}
            </v-card-subtitle>
            <!-- 商品打折後價格 -->
            <v-card-subtitle 
                class="
                discount_price
                pa-0
                title
                red--text 
                text--lighten-1
                "
                >
                NT.{{ Math.floor(price / 2) }}
            </v-card-subtitle>
        </v-col>
    </v-card>
</template>


<script>
export default {
    props: ['title', 'imgURL', 'price'] // passed from index.vue
}
</script>


<style lang="scss" scoped>
    .product_label {
        position: absolute;
        top: 0;
        right: 0;
        letter-spacing: 2px !important;
    }
    .product_title {
        letter-spacing: 2px;
    }
    .discount_price {
        position: absolute;
        right: 20%;
        bottom: 10%;
        transform: rotate(-5deg);
    }
    
    // RWD 
    @media (max-width: 768px) {
        .Products {
            margin: 0 auto;
        }
    }
</style>