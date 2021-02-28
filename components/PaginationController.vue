<template>
    <div class="text-center">
        <v-pagination
            circle
            v-model="page"
            :length="length"
            @input="fetchData(page)"
        ></v-pagination>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        pageNumber: [String, Number],
    },
    data() {
        return {
            page: this.pageNumber || 1,
        }
    },
    // test Start
    // async fetch() {
    //     // 撈取該頁資料
    //     await this.$store.dispatch('pagination/fetchPaginatedProducts', this.page)
    // },
    // test End

    computed: {
        ...mapGetters({
            products: 'pagination/getPaginatedProducts',
        }),
        // 總長度
        length() {
            return this.products.last_page
        },
    },
    // 暫未使用
    methods: {
        ...mapActions({
            fetchData: 'pagination/fetchPaginatedProducts',
        }),
    },
}
</script>
