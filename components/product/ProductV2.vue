<template>
    <v-card class="card_content ma-auto" rounded="t-lg" :elevation="elevation">
        <nuxt-link :to="{ name: 'products-id', params: { id: product.id } }">
            <img
                class="responsive_img rounded-t-lg"
                :src="product.imgUrl"
                :alt="product.title"
            />
            <div
                class="product_label text-center yellow blue--text rounded-tr-lg rounded-bl-lg"
                v-if="product.discount_rate != 1"
            >
                <span>{{ formatLabel }} 折</span>
            </div>
            <!-- 標籤名稱 -->
            <Tags :product="product" :sliced="true" class="product_tags mx-2" />
            <!-- 商品名稱 -->
            <v-card-title class="product_title font-weight-bold text-body-2 black--text">
                <span class="text-truncate">{{ product.title }}</span>
            </v-card-title>
            <!-- 評級 -->
            <v-card-subtitle>
                <Ratings :product="product" :size="12" class="pt-2"/>
            </v-card-subtitle>
            <!-- 商品價格 -->
            <v-card-text>
                <div class="product_unit_price d-flex" :class="[product.discount_rate != 1 ? 'text-body-1 font-weight-bold blue--text' : 'black--text']">$ {{ conditionalPrice }}</div>
            </v-card-text>
        </nuxt-link>
    </v-card>
</template>

<script>

export default {
    //? passed from pages/index.vue
    props: {
        product: {
            type: Object,
            require: true,
        },
        cardWidth: {
            type: [Number, String],
            default: 200,
        },
        //* 卡片陰影 (box-shadow)
        elevation: {
            type: [Number, String],
            default: 2,
        },
    },
    computed: {
        //* 商品折數
        formatLabel() {
            return this.product.discount_rate * 10
        },
        //* 若該商品有打折則顯示折扣後的價格，否則顯示原價
        conditionalPrice() {
            return this.product.discount_rate == 1
                ? Math.floor(this.product.unit_price)
                : Math.floor(this.product.unit_price * this.product.discount_rate)
        },
    },
}
</script>

<style lang="scss" scoped>
.card_content {
    width: 200px;
}
.responsive_img {
    width: 100%;
    height: auto;
}
.product_label {
    width: 48px;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
}
.product_tags {
    position: absolute;
    left: 0;
    bottom: 35%;
}
.product_ratings {
    position: absolute;
    left: 5%;
    bottom: 5%;
}
.product_unit_price {
    position: relative;
}
.action_btn {
    position: absolute;
    width: 100%;
}
@media (max-width: 415px) {
    .card_content {
        width: 100%;
    }
}
</style>
