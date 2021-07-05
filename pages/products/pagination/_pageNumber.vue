<template>
    <v-container>
        <!-- loading -->
        <LoadingCircle v-if="loading"/>
        <!-- banner -->
        <Banner elevation="2" icon="fa-bookmark" iconColor="blue lighten-1" :text="`第 ${page} / ${pageLength} 頁`" backgroundColor="white" class="mt-6"/>
        <!-- content -->
        <v-sheet elevation="6" rounded="lg" class="px-6">
            <v-row justify="space-around">
                <div v-for="product in products.data" :key="product.id" class="mt-8 mb-16" >
                    <SkeletonCardV2 :cardWidth="200" :cardHeight="290" v-if="loading" class="mx-8"/>
                    <ProductV2 :product="product" :cardWidth="200" :cardHeight="290" :elevation="4" v-show="!loading" class="mx-8"/>
                </div>
            </v-row>
        </v-sheet>
        <PaginationController :pageNumber="pageNumber" class="my-6"/>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            page: Number(this.$route.params.pageNumber) || 1,
        }
    },
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
        pageLength() {
            return this.products.last_page || 'Loading...'
        }
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