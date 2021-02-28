<template>
    <v-container>
        <!-- 該頁產品 -->
        <h1 v-if="pending">撈取中</h1>
        <v-row>
            <v-col
                v-for="product in products.data"
                :key="product.id"
                class="my-12"
            >
                <SkeletonCard :cardWidth="300" v-if="pending"/>
                <!-- 產品 Component -->
                <Product v-show="!pending"
                    class="mx-auto"
                    :product="product"
                    :cardWidth="300"
                    :cardHeight="600"
                />
            </v-col>
        </v-row>
        <PaginationController :pageNumber="pageNumber" />
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { apiGetProductsWithPagination } from '../../APIs/api.js'

export default {
    data() {
        return {
            page: Number(this.$route.params.pageNumber) || 1,
            pending: true,
        }
    },

    // test Start

    // async asyncData({ params }) {
    //     const res = await apiGetProductsWithPagination(params.pageNumber)
    //     return { products: res.data.products }
    // },
    // async fetch() {
    //     // 撈取該頁資料
    //     await this.$store.dispatch('pagination/fetchPaginatedProducts', this.page)
    // },

    // test End

    computed: {
        ...mapGetters({
            // 取得該頁資料
            products: 'pagination/getPaginatedProducts',
        }),
        pageNumber() {
            return Number(this.$route.params.pageNumber)
        },
    },
    methods: {
        ...mapActions({
            fetchData: 'pagination/fetchPaginatedProducts',
        }),
    },
    // 避免重複發送相同的 request
    created() {
        if (this.products.current_page != this.page) {
            this.fetchData(this.page)
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.pending = true
        next()
    },
    mounted() {
        this.pending = false
    },
}
</script>
