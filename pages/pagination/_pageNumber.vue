<template>
    <v-container>
        <div v-if="pending" class="text-center">
            pending...
        </div>
        <!-- 該頁產品 -->
        <PaginationController :pageNumber="pageNumber"/>
        <v-row>
            <v-col
                v-for="product in products.data"
                :key="product.id"
                class="my-12"
            >
                <!-- 產品 Component -->
                <Product class="mx-auto"
                    :product="product"
                    :cardWidth="300"
                    :cardHeight="600"
                />
            </v-col>
        </v-row>
        <PaginationController :pageNumber="pageNumber"/>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiGetProductsWithPagination } from '../../APIs/api.js'

export default {
    // layout: 'paginate', // 換頁(Pagination)專用
    data() {
        return {
            pending: true,
            // test
            page: Number(this.$route.params.pageNumber) || 1,
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
        }
    },
    mounted() {
        this.pending = false
    }
}
</script>

<style lang="scss"></style>
