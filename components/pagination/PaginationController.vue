<template>
    <div class="text-center">
        <v-pagination
            circle
            v-model="page"
            :length="length"
            @input="CheckOrFetch"
        ></v-pagination>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        pageNumber: {
            type: [ String, Number ],
            require: true
        },
    },
    data() {
        return {
            page: this.pageNumber || 1,
        }
    },
    
    //todo test Start
    // async fetch() {
    //     撈取該頁資料
    //     await this.$store.dispatch('pagination/fetchPaginatedProducts', this.page)
    // },
    //todo test End

    computed: {
        ...mapGetters({
            products: 'pagination/getPaginatedProducts',
        }),
        //* 總長度
        length() {
            return this.products.last_page
        },
    },
    methods: {
        ...mapActions({
            //* 撈取資料
            fetchData: 'pagination/fetchPaginatedProducts',
        }),
        //* 若選取頁數為同一頁則不發送 request
        CheckOrFetch() {
            if (this.products.current_page != this.page) {
                this.fetchData(this.page)
            }
        },
    },
}
</script>
