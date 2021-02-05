<template>
    <v-container>
        <!-- 該頁產品 -->
        <v-row>
            <v-col
                v-for="product in products.data"
                :key="product.id"
                class="my-4"
            >
                <!-- 產品 Component -->
                <Product class="mx-auto my-6"
                    :product="product"
                    :cardWidth="300"
                    :cardHeight="600"
                />
            </v-col>
        </v-row>
        <!-- <PaginationController /> -->
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'paginate', // 換頁(Pagination)專用
    computed: {
        ...mapGetters({
            // 取得該頁資料
            products: 'pagination/getPaginatedProducts',
        }),
    },
}
</script>

<style lang="scss"></style>
