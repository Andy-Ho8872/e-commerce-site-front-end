<template>
    <v-container>
        <!-- 彈出式提醒 -->
        <Popups class="mb-6"/>
        <!-- 優惠計時 (月份從 0 開始計算， 例如: 數字5 == 6月)-->
        <CountdownTimer
            background="blue darken-1"
            :year="2023"
            :month="9"
            :day="5"
            :hour="8"
            :minute="7"
            :second="6"
            :millisecond="4"
        />
        <!-- 限時特賣 -->
        <Banner elevation="2" icon="fa-clock" iconColor="blue lighten-1" text="限時特賣" backgroundColor="white" class="mt-6"/>
        <SkeletonCarousel :cardHeight="355" v-if="loading"/>
        <!-- <CarouselV3 :cardWidth="340" :cardHeight="340" :data="items.flash_sale_products" v-show="!loading"/> -->
        <CarouselV2 :cardWidth="340" :cardHeight="340" :data="items.flash_sale_products" v-show="!loading"/>
        <!-- 標籤搜尋 (包含骨架屏)-->
        <Banner elevation="2" icon="fa-tags" iconColor="teal lighten-1" text="標籤搜尋" backgroundColor="white" class="mt-16"/>
        <SearchTag elevation="6" class="pa-6 mb-16"/>
        <!-- 最新上架 -->
        <Banner elevation="2" icon="fa-bullhorn" iconColor="blue lighten-1" text="最新上架" backgroundColor="white" class="mt-6"/>
        <SkeletonCarousel :cardHeight="355" v-if="loading"/>
        <!-- <CarouselV3 :cardWidth="340" :cardHeight="340" :data="items.latest_products" v-show="!loading"/> -->
        <CarouselV2 :cardWidth="340" :cardHeight="340" :data="items.latest_products" v-show="!loading"/>
        <!-- 熱門商品 -->
        <Banner elevation="2" icon="fa-burn" iconColor="red lighten-1" text="熱門商品" backgroundColor="white" class="mt-16"/>
        <ProductGrid :data="items.hot_sale_products" :loading="loading"/>
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
    head() {
        return {
            title: '首頁',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '全網最便宜都在這，優質的購物網站，快來血拚吧!'
                }
            ]
        }
    },
    data() {
        return {
            loading: true, // 骨架屏狀態
        }
    },
    methods: {
        ...mapActions({
            fetchIndexPageProducts: 'product/fetchIndexPageProducts', //? 首頁的商品(含 slider 商品)
        })
    },
    computed: {
        ...mapGetters({
            items: 'product/getIndexPageProducts',
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
