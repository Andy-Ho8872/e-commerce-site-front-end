<template>
    <div class="card_wrapper" :style="{ width: `${cardWidth}px`}">
        <v-card rounded="t-lg"
            :elevation="elevation"
            :width="cardWidth"
            :height="cardHeight"
            nuxt
            :to="{ name: 'products-id', params: { id: product.id } }"
        >
            <img
                class="responsive_img"
                :src="product.imgUrl"
                :alt="product.title"
            />
            <div
                class="label text-center yellow blue--text rounded-tr-lg rounded-bl-lg"
                v-if="product.discount_rate != 1"
            >
                <span>{{ formatLabel }} 折</span>
            </div>
            <!-- 標籤名稱 -->
            <Tags :product="product" class="tags mx-2" />
            <!-- 商品名稱 -->
            <v-card-title class="font-weight-bold text-body-2">
                {{ conditionalTitle }}
            </v-card-title>
            <!-- 商品價格 -->
            <v-card-text
                class="price d-flex"
                :class="[
                    product.discount_rate != 1
                        ? 'text-body-1 font-weight-bold blue--text'
                        : '',
                ]"
            >
                $ {{ conditionalPrice }}
            </v-card-text>
            <Ratings :product="product" :size="12" class="ratings mx-1 my-2" />
        </v-card>
        <!-- 放入購物車按鈕 -->
        <v-btn 
            :elevation="elevation"
            @click="addToCart(product.id)"
            class="action_btn rounded-b-lg"
            color="primary"
            tile 
            large 
            depressed>
            <span>加入購物車</span>
        </v-btn>  
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    //? passed from pages/index.vue
    props: {
        product: {
            type: Object,
            require: true,
        },
        cardWidth: {
            type: [Number, String],
            default: 200
        },
        cardHeight: {
            type: [Number, String],
            default: 290
        },
        //* 卡片陰影 (box-shadow)
        elevation: {
            type: [Number, String],
            default: 2
        }
    },
    computed: {
        //* 商品折數
        formatLabel() {
            return this.product.discount_rate * 10
        },
        //* 若商品標題過長則縮減
        conditionalTitle() {
            const target = 14
            return this.product.title.length > target
                ? this.product.title.substring(0, target) + '...'
                : this.product.title
        },
        //* 若該商品有打折則顯示折扣後的價格，否則顯示原價
        conditionalPrice() {
            return this.product.discount_rate == 1
                ? Math.floor(this.product.unit_price)
                : Math.floor(
                      this.product.unit_price * this.product.discount_rate
                )
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
.responsive_img {
    width: 100%;
    height: auto;
}
.label {
    width: 48px;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
}
.tags {
    position: absolute;
    left: 0;
    bottom: 30%;
}
.ratings {
    position: absolute;
    bottom: 0;
    right: 0;
}
.price {
    position: relative;
}
.action_btn {
    position: absolute;
    width: inherit;
}
</style>
