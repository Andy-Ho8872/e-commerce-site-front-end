<template>
    <div>
        <v-card :width="cardWidth" :height="cardHeight" nuxt :to="{ name: 'products-id', params: { id: product.id }}">
            <v-img class="ma-auto rounded-t-xl" :src="product.imgUrl" :lazy-src="product.imgUrl"></v-img>
            <v-card-title class="font-weight-bold text-body-1">
                {{ product.title }}
            </v-card-title>
            <v-card-subtitle>
                {{ product.description.substring(0, 30) }}
            </v-card-subtitle>

            <v-card-text class="price_zone">
                <!-- 折扣後 -->
                <div v-if="product.discount_rate != 1" class="discount_price text-body-1 font-weight-bold blue--text">
                    $ {{ Math.floor(product.unit_price * product.discount_rate) }}
                </div>
                <!-- 原價 -->
                <div :class="[ product.discount_rate == 1 ? '' : 'discounted' ]">
                   $ {{ product.unit_price }}
                </div>
            </v-card-text>
            <Tags :product="product" class="mx-2"/>
            <Ratings :product="product" class="mx-4"/>
    
        </v-card>
    </div>
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
            type: Number,
            require: true,
        },
        cardHeight: {
            type: Number,
            require: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.price_zone {
    position: relative;
}
.discounted {
    text-decoration: line-through;
}
</style>
