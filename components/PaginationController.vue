<template>
    <div class="text-center">
        <v-pagination
            circle
            v-model="page"
            :length="length"
            @input="fetchProducts(page)"
        ></v-pagination>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            page: 1,
        }
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
    methods: {
        ...mapActions({
            fetchProducts: 'pagination/fetchPaginatedProducts',
        }),
    },
    created() {
        // 預設為第一頁
        this.fetchProducts(this.page)
    },
}
</script>

<style lang="scss"></style>
