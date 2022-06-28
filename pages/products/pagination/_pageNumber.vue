<template>
    <v-container>
        <!-- loading -->
        <LoadingCircle v-if="loading"/>
        <div class="banner_container">
            <!-- filter -->
            <v-col class="filter_container" cols="6" sm="4" md="3" lg="2">
                <v-select
                    v-model="selectedFilter"
                    :items="selectOptions"
                    item-text="title"
                    item-value="orderBy, sortBy"
                    label="排序依據"
                    prepend-icon="mdi-filter-variant"
                    :menu-props="{ offsetY: true }"
                    return-object
                ></v-select>
            </v-col>
            <!-- banner -->
            <Banner elevation="2" icon="fa-bookmark" iconColor="blue lighten-1" :text="`第 ${pageQuery.page} / ${length || 'loading...'} 頁`" backgroundColor="white" class="mt-6"/>
        </div>
        <!-- content -->
        <ProductGrid :data="results.data" :loading="loading"/>
        <!-- 控制分頁 -->
        <div class="text-center my-8">
            <v-pagination
                circle
                v-model="pageQuery.page"
                :length="length"
                @input="CheckOrFetch"
            ></v-pagination>
        </div>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    head() {
        return {
            title: '瀏覽所有商品',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '優質的購物網站，全網最便宜都在這。'
                }
            ]
        }
    },
    validate({ params }) {
        return /^\d+$/.test(params.pageNumber)
    },
    data() {
        return {
            selectedFilter: { title: "預設", orderBy: "id", sortBy: "asc" },
            selectOptions: [
                { title: "預設", orderBy: "id", sortBy: "asc" },
                { title: "評級(高到低)", orderBy: "rating", sortBy: "desc" },
                { title: "評級(低到高)", orderBy: "rating", sortBy: "asc" },
                { title: "價格(高到低)", orderBy: "unit_price", sortBy: "desc" },
                { title: "價格(低到高)", orderBy: "unit_price", sortBy: "asc" },
            ],
            pageQuery: {
                // 預設選項
                orderBy: 'id' || this.selectedFilter.orderBy,
                sortBy: 'asc' || this.selectedFilter.sortBy,
                page: Number(this.$route.params.pageNumber) || 1
            }
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
            if (!this.results || this.results.current_page != this.pageQuery.page) {
                this.fetchData(this.pageQuery)
            }
        },
        setPageQuery() {
            this.pageQuery.orderBy = this.selectedFilter.orderBy
            this.pageQuery.sortBy = this.selectedFilter.sortBy
        }
    },
    //* 避免重複發送相同的 request
    created() {
        this.CheckOrFetch()   
    },
    watch: {
        //* 若是值有變動，則套用新的值
        selectedFilter() {
            this.setPageQuery()
            this.fetchData(this.pageQuery)
        }
    }
}
</script>

<style lang="scss" scoped>
.banner_container {
    position: relative;
}
.filter_container {
    position: absolute;
    z-index: 1;
    width: 50%;
    right: 0
}
</style>