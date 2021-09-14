<template>
    <v-container>
        <!-- 讀取中 -->
        <LoadingCircle v-if="loading"/>
        <!-- 搜尋成功 -->
        <h2 class="text-center mb-6">
            關於
            <span class="blue--text lighten-5">
                "{{ searchText }}"
            </span>
            的搜尋結果
        </h2>
        <!-- 顯示搜尋內容 -->
        <v-sheet elevation="6" rounded="lg" class="px-6">
            <v-row justify="space-around">
                <div v-for="product in results.data" :key="product.id" class="mt-8 mb-16" >
                    <SkeletonCardV2 :cardWidth="200" v-if="loading" class="mx-8"/>
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
    data() {
        return {
            page: Number(this.$route.params.pageNumber) || 1,
        }
    },
    //* 此處的 search function 在 Components/Header.vue 裡
    computed: {
        ...mapGetters({
            //* 搜尋結果
            results: 'search/getResult',
            loading: 'search/getPageLoading',
            //* 紀錄搜尋URL 
            searchedUrlRecord: 'search/getSearchedUrlRecord', //! 暫時未用到
        }),
        searchText() {
            return this.$route.params.title
        },
        length() {
            return this.results.last_page
        }
    },
    methods: {
        ...mapActions({
            //* 搜尋商品
            fetchData: 'search/searchProductsWithPagination', 
        }),
        CheckOrFetch() {
            this.fetchData({ title: this.searchText, pageNumber: this.page })
        },
    },
    created() {
        this.CheckOrFetch()
    },
}
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}
//* 價格區域--------------------------Start
.price_zone {
    position: relative;
}
.discounted {
    text-decoration: line-through;
}
//? 折扣後的價格
.discounted_price {
    position: absolute;
    top: 1rem;
    left: 4rem;
    width: fit-content;
    transform: rotate(-5deg);
    font-size: 1.2rem;
}
//* 價格區域--------------------------End
</style>