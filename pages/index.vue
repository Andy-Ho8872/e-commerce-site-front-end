<template>
    <v-container>
        <!-- 彈出式提醒 -->
        <Popups />
        <!-- 優惠計時 (月份從 0 開始計算， 例如: 數字5 == 6月)-->
        <CountdownTimer
            background="blue darken-1"
            :year="2021"
            :month="9"
            :day="5"
            :hour="8"
            :minute="7"
            :second="6"
            :millisecond="4"
        />
        <!-- 標語 -->
        <Banner elevation="2" icon="fa-clock" iconColor="blue lighten-1" text="限時特賣" backgroundColor="white" class="mt-6"/>
        <!-- 圖片輪播 -->
            <!-- 骨架屏 -->
        <SkeletonCarousel :cardHeight="355" v-if="loading"/>
            <!-- 輪播張數為 10 張 -->
        <CarouselV2 :cardWidth="340" :cardHeight="340" v-show="!loading"/>
        <!-- 標語 -->
        <Banner elevation="2" icon="fa-tags" iconColor="teal lighten-1" text="標籤搜尋" backgroundColor="white" class="mt-16"/>
        <!-- 標籤搜尋(包含骨架屏) -->
        <SearchTag elevation="6" class="pa-6"/>
        <!-- 標語 -->
        <Banner elevation="2" icon="fa-burn" iconColor="red lighten-1" text="熱門商品" backgroundColor="white" class="mt-16"/>
        <!-- 商品陳列 -->
        <v-sheet elevation="6" rounded="lg" class="px-6">
            <v-row justify="space-around">
                <!-- 骨架屏 -->
                <template v-for="(n,index) in 6"> 
                    <SkeletonCardV2 :cardWidth="200" :cardHeight="290" :key="index" v-if="loading" class="mx-6 mt-8 mb-16"/>
                </template>
                <!-- 商品卡片 -->
                <template v-for="product in products">
                    <ProductV2 :product="product" :cardWidth="200" :cardHeight="290" :elevation="4" :key="product.id" v-if="!loading" class="mx-6 mt-8 mb-16"/>
                </template>
            </v-row>
        </v-sheet>
        <!-- 觀看更多商品 -->
        <div class="text-center">
            <!-- 預設點擊後到第一頁 -->
            <v-btn class="my-16" color="primary" dark x-large nuxt :to="{ name: 'products-pagination-pageNumber', params: { pageNumber: 1 } }">
                <span>查看更多</span>
                <v-icon>fa-shopping-cart fa-fw</v-icon>
            </v-btn> 
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            loading: true, // 骨架屏狀態
        }
    },
    methods: {
        ...mapActions({
            fetchIndexPageProducts: 'product/fetchIndexPageProducts', //? 首頁的商品
        })
    },
    computed: {
        ...mapGetters({
            products: 'product/getIndexPageProducts',
        })
    },
    // 掛載時結束 loading 狀態
    async mounted() { 
        await this.fetchIndexPageProducts()
        this.loading = false    
    },
}
</script>

<style lang="scss" scoped>

</style>
