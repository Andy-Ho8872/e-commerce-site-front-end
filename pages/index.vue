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
        <!-- <Carousel :cardWidth="355" :cardHeight="355" v-show="!loading"/> -->
        <CarouselV2 :cardWidth="340" :cardHeight="340" v-show="!loading"/>
        <!-- 標語 -->
        <Banner elevation="2" icon="fa-tags" iconColor="teal lighten-1" text="標籤搜尋" backgroundColor="white" class="mt-16"/>
        <!-- 標籤搜尋 -->
        <v-sheet elevation="6" rounded="lg" class="pa-6">
            <v-row>
                <v-chip-group column>
                    <v-chip v-for="tag in tags" :key="tag.id" color="primary" nuxt :to="{ name: 'search-title', params: { title: tag.title } }">
                        {{ tag.title }}
                    </v-chip>
                </v-chip-group>
            </v-row>
        </v-sheet>
        <!-- 標語 -->
        <Banner elevation="2" icon="fa-burn" iconColor="red lighten-1" text="熱門商品" backgroundColor="white" class="mt-16"/>
        <!-- 商品陳列 -->
        <v-sheet elevation="6" rounded="lg" class="px-6">
            <v-row justify="space-around">
                <div v-for="product in products" class="mt-8 mb-16" :key="product.id">
                    <SkeletonCardV2 :cardWidth="200" :cardHeight="290" v-if="loading" class="mx-6"/>
                    <ProductV2 :product="product" :cardWidth="200" :cardHeight="290" :elevation="4" v-show="!loading" class="mx-6"/>
                </div>
                <!-- <v-col v-for="product in products" class="mt-2 mb-16" :key="product.id"> -->
                    <!-- 骨架屏 -->
                    <!-- <SkeletonCard :cardWidth="300" v-if="loading"/> -->
                    <!-- 商品卡片 -->
                    <!-- <Product :product="product" :cardWidth="300" :cardHeight="600" v-show="!loading"/>         -->
                    <!-- <ProductV2 :product="product" :cardWidth="200" :cardHeight="290" v-show="!loading"/>         -->
                <!-- </v-col> -->
            </v-row>
        </v-sheet>
        <!-- 觀看更多商品 -->
        <div class="text-center">
            <!-- 預設點擊後到第一頁 -->
            <v-btn class="my-16" color="primary" dark x-large nuxt :to="{ name: 'pagination-pageNumber', params: { pageNumber: 1 } }">
                <span>查看更多</span>
                <v-icon>fa-shopping-cart fa-fw</v-icon>
            </v-btn> 
        </div>
    </v-container>
</template>

<script>
// import { apiGetIndexPageProducts, apiGetProductTags } from '~/APIs/api.js'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            loading: true, // 骨架屏狀態
        }
    },
    // 從外部 API 讀取產品的資料 //! 暫時不用
    // async asyncData() {
    //     const res = await apiGetIndexPageProducts()
    //     const tagResponse = await apiGetProductTags()
    //     return { 
    //         products: res.data.products,
    //         tags: tagResponse.data.tags
    //     }
    // },
    methods: {
        ...mapActions({
            fetchIndexPageProducts: 'product/fetchIndexPageProducts', //? 首頁的商品
            fetchAllProductTags: 'product/fetchAllProductTags' //? 商品的標籤
        })
    },
    computed: {
        ...mapGetters({
            products: 'product/getIndexPageProducts',
            tags: 'product/getAllProductTags'
        })
    },
    // 掛載時結束 loading 狀態
    async mounted() { 
        await this.fetchIndexPageProducts()
        await this.fetchAllProductTags()
        this.loading = false    
    },
}
</script>

<style lang="scss" scoped>

</style>
