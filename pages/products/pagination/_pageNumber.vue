<template>
    <v-container>
        <!-- loading -->
        <LoadingCircle v-if="loading"/>
        <!-- banner -->
        <Banner elevation="2" icon="fa-bookmark" iconColor="blue lighten-1" :text="`第 ${page} / ${length || 'loading...'} 頁`" backgroundColor="white" class="mt-6"/>
        <!-- content -->
        <v-sheet elevation="6" rounded="lg" class="px-6">
            <v-row justify="space-around">
                <div v-for="product in results.data" :key="product.id" class="mt-8 mb-16" >
                    <SkeletonCardV2 :cardWidth="200" :cardHeight="290" v-if="loading" class="mx-8"/>
                    <ProductV2 :product="product" :cardWidth="200" :cardHeight="290" :elevation="4" v-show="!loading" class="mx-8"/>
                </div>
            </v-row>
        </v-sheet>
        <!-- 控制分頁 -->
        <div class="text-center my-8">
            <v-pagination
                circle
                v-model="page"
                :length="length"
                @input="CheckOrFetch"
            ></v-pagination>
        </div>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    validate({ params }) {
        return /^\d+$/.test(params.pageNumber)
    },
    data() {
        return {
            page: Number(this.$route.params.pageNumber) || 1,
        }
    },
    computed: {
        ...mapGetters({
            //* 該頁資料
            results: 'product/getPaginatedProducts',
            //* loading 狀態
            loading: 'product/getLoading'
        }),
        //* 分頁的總長度 
        length() {
            return this.results.last_page
        }
    },
    methods: {
        ...mapActions({
            //* 撈取資料 
            fetchData: 'product/fetchPaginatedProducts',
        }),
        CheckOrFetch() {
            if (!this.results || this.results.current_page != this.page) {
                this.fetchData(this.page)
            }
        },
    },
    //* 避免重複發送相同的 request
    created() {
        this.CheckOrFetch()   
    },
}
</script>