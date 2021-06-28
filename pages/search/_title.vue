<template>
    <v-container>
        <LoadingCircle v-if="loading"/>
        <!-- 搜尋成功 -->
        <div v-else-if="result.length">
            <h2 class="text-center">
                關於
                <span class="blue--text lighten-5">
                    "{{ searchQuery }}"
                </span>
                的搜尋結果
            </h2>
            <!-- 商品陳列 -->
            <v-sheet elevation="6" rounded="lg" class="my-12 px-6">
                    <v-row justify="space-around">
                        <div v-for="product in result" class="mt-8 mb-16" :key="product.id">
                            <SkeletonCardV2 :cardWidth="200" :cardHeight="290" v-if="loading"/>
                            <ProductV2 :product="product" :cardWidth="200" :cardHeight="290" :elevation="4" v-show="!loading" class="mx-6"/>
                        </div>
                    </v-row>
            </v-sheet>
        </div>
        <!-- 搜尋失敗 -->
        <v-row v-else>
            <h2 class="ma-auto">
                找不到關於
                <span class="blue--text lighten-5">
                    "{{ searchQuery }}"
                </span>
                的搜尋結果
            </h2>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    //* 此處的 search function 在 Components/Header.vue 裡
    computed: {
        ...mapGetters({
            //* 搜尋結果
            result: 'search/getResult',
            loading: 'search/getPageLoading'
        }),
        searchQuery() {
            return this.$route.params.title
        }
    },
    methods: {
        ...mapActions({
            //* 搜尋商品
            search: 'search/searchProducts', 
        }),
    },
    created() {
        //* 避免再重新整理頁面的時候發送相同的 request 
        this.search(this.searchQuery)
    }
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
