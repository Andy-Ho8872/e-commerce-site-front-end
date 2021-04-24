<template>
    <div class="text-center">
        <!-- 圖片 -->
        <v-img :src="require('~/static/order/NoDataLeft.svg')"
            class="mx-auto mb-4" 
            max-width="300"
            max-height="300">
        </v-img>
        <!-- 文字 -->
        <h2 class="my-8">您目前沒有任何訂單。</h2>
        <!-- 導向連結 -->
        <nuxt-link  :to="{ name: 'pagination-pageNumber', params: { pageNumber: 1 }}">
            <v-btn color="primary" x-large depressed>
                <v-icon>fa-cart-arrow-down</v-icon>
                <span class="mx-2">點我選購~</span> 
            </v-btn>
        </nuxt-link>
    </div>
</template>

<script>
export default {

}