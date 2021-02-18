<template>
    <div class="text-center">
        <v-pagination
            circle
            v-model="page"
            :length="length"
            @input="$fetch"
        ></v-pagination>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            page: 1,
        }
    },
    async fetch() {
        // 撈取該頁資料
        await this.$store.dispatch('pagination/fetchPaginatedProducts', this.page)
    },
    computed: {
        ...mapGetters({
            products: 'pagination/getPaginatedProducts',
        }),
        // 總長度
        length() {
            return this.products.last_page
        },
    },
}
</script>
