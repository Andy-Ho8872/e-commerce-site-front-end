<template>
    <v-container>
        <!-- loading -->
        <LoadingCircle v-if="loading"/>
        <!-- content -->
        <v-row>
            <v-col v-for="product in products.data" :key="product.id" class="mt-10 mb-12">
                <SkeletonCard :cardWidth="300" v-if="loading" class="mx-auto"/>
                <!-- 產品 Component -->
                <Product v-show="!loading" class="mx-auto" :product="product" :cardWidth="300" :cardHeight="600"/>
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
        }
    },

    // todo: test Start
    // async asyncData({ params }) {
    //     const res = await apiGetProductsWithPagination(params.pageNumber)
    //     return { products: res.data.products }
    // },
    // async fetch() {
    //     await this.$store.dispatch('pagination/fetchPaginatedProducts', this.page)
    // },
    // todo: test End

    computed: {
        ...mapGetters({
            //* 該頁資料
            products: 'pagination/getPaginatedProducts',
            //* loading 狀態
            loading: 'pagination/getLoading'
        }),
        pageNumber() {
            return Number(this.$route.params.pageNumber)
        },
    },
    methods: {
        ...mapActions({
            //* 撈取資料 
            fetchData: 'pagination/fetchPaginatedProducts',
        }),
    },
    //* 避免重複發送相同的 request
    created() {
        if (this.products.current_page != this.page) {
            this.fetchData(this.page)
        }
    },
}
</script>
