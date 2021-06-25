<template>
    <v-container>
        <LoadingCircle v-if="loading"/>
        <!-- 搜尋成功 -->
        <div v-else-if="result.length">
            <h2 class="text-center">
                關於
                <span class="blue--text lighten-5">
                    "{{ this.$route.params.title }}"
                </span>
                的搜尋結果
            </h2>
            <v-row >
                <v-col v-for="product in result" :key="product.id" cols="12" lg="2" md="3" sm="4">
                    <ProductV2 :product="product" :cardWidth="200" :cardHeight="290" :elevation="4" v-show="!loading" class="mx-auto my-12"/>
                </v-col>
            </v-row>
        </div>
        <!-- 搜尋失敗 -->
        <v-row v-else>
            <h2 class="ma-auto">
                找不到關於
                <span class="blue--text lighten-5">
                    "{{ this.$route.params.title }}"
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
    },
    methods: {
        ...mapActions({
            //* 搜尋商品
            search: 'search/searchProducts', 
        }),
    },
    created() {
        //* 避免再重新整理頁面的時候發送相同的 request 
        this.search(this.$route.params.title)
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
