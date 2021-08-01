<template>
    <div class="text-center">
        <!-- 圖片 -->
        <v-img :src="require('~/static/order/EmptyOrder.svg')" alt="EmptyOrder.svg"
            class="mx-auto mb-4" 
            :max-width="width"
            :max-height="height">
        </v-img>
        <!-- 文字 -->
        <h2 class="my-8">{{ text }}</h2>
        <!-- 導向連結 -->
        <nuxt-link  :to="{ name: 'products-pagination-pageNumber', params: { pageNumber: 1 }}">
            <v-btn color="primary" x-large depressed>
                <v-icon>fa-cart-arrow-down</v-icon>
                <span class="mx-2">點我選購~</span> 
            </v-btn>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: [String, Number],
            default: 300
        },
        height: {
            type: [String, Number],
            default: 300
        },
        text: {
            type: String,
            default: "您目前沒有任何訂單。"
        }
    }
}
</script>