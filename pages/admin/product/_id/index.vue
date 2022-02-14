<template>
    <v-container>
        <LoadingCircle v-if="!product"/>
        <div v-else>
            <!-- 按鈕操作 -->
            <div class="action_btn d-flex">
                <v-btn color="primary" nuxt :to="{ name: 'admin-product' }">上一頁</v-btn>
                <v-btn class="ml-4" color="error" outlined nuxt :to="{ name: 'admin-product-id-edit', params: { id: product.id }}">編輯</v-btn>
            </div>
            <!-- 商品資訊 -->
            <v-card class="my-4" >
                <v-card-title class="my-4 font-weight-bold">產品資訊</v-card-title>
                <v-card-subtitle>編號: {{ product.id }}</v-card-subtitle>
                <v-card-subtitle>名稱: {{ product.title }}</v-card-subtitle>
                <v-card-subtitle>單價: {{ product.unit_price }}</v-card-subtitle>
                <v-card-subtitle>
                    敘述: 
                    <v-card-text>{{ product.description }}</v-card-text>
                </v-card-subtitle>
                <v-card-subtitle>評分: {{ product.rating }}</v-card-subtitle>
                <v-card-subtitle>庫存: {{ product.stock_quantity }}</v-card-subtitle>
                <v-card-subtitle>標籤: 
                    <v-card-text>
                        <v-chip-group>
                            <v-chip color="blue" v-for="tag in product.tags" :key="'tag' + tag.id">
                                <span class="white--text">{{ tag.title }}</span>
                            </v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card-subtitle>
                <v-card-subtitle>
                    規格:
                    <template v-if="product.variations.length">
                        <v-card-text v-for="variation in product.variations" :key="'variation' + variation.id">
                            <v-chip color="green" small label outlined>{{ variation.title }}</v-chip> 
                            <v-card-text v-for="(option, index) in variation.options" :key="'option' + index">
                                #{{index + 1}} - <v-chip color="primary" small label outlined>{{ option }}</v-chip>
                            </v-card-text>
                        </v-card-text>
                    </template>
                    <template v-else>
                        <v-card-text>
                            <v-chip color="error" label small outlined>尚無規格</v-chip>
                        </v-card-text>
                    </template>
                </v-card-subtitle>
                <v-card-subtitle>折價率: {{ product.discount_rate }}</v-card-subtitle>
                <v-card-subtitle>
                    有現貨:
                    <template v-if="product.available">是</template>
                    <template v-else>否</template>
                </v-card-subtitle>
                <v-card-subtitle>上架日期: {{ product.created_at }}</v-card-subtitle>
                <v-card-subtitle>更新日期: {{ product.updated_at }}</v-card-subtitle>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            products: 'admin/getViewedProducts'
        }),
        product() {
            return this.products.find(product => product.id == this.$route.params.id)
        }
    },
    methods: {
        ...mapActions({
            fetchSingleProduct: 'admin/fetchSingleProduct'
        })
    },
    mounted() {
        this.fetchSingleProduct(this.$route.params.id)
    }
}
</script>

<style>

</style>