<template>
    <v-container>
            <table class="elevation-2">
                <!-- header -->
                <thead>
                    <tr>
                        <th class="text-left">
                            序號
                        </th>
                        <th class="text-left">
                            商品
                        </th>
                        <th class="text-left">
                            單價
                        </th>
                        <th class="text-left">
                            庫存
                        </th>
                        <th class="text-center">
                            操作
                        </th>
                    </tr>
                </thead>
                <!-- content -->
                <tbody>
                    <tr v-for="(product, index) in products" :key="product.id">
                        <td class="text-left px-4" data-title="序號">
                            <span>#{{ index + 1 }}</span>
                        </td>
                        <td class="text-left pl-2" data-title="商品">
                            <span>
                                <v-avatar size="36">
                                    <v-img :src="product.imgUrl"></v-img>
                                </v-avatar>
                                {{ product.title }}
                            </span>
                        </td>
                        <td class="text-left px-4" data-title="單價">
                            <span>{{ product.unit_price }}</span>
                        </td>
                        <td class="text-left px-4" data-title="庫存">
                            <span>{{ product.stock_quantity }}</span>
                        </td>
                        <td class="text-center px-4" data-title="操作">
                            <div class="action_btns text-right text-md-center">
                                <v-btn color="error" outlined nuxt :to="{ name: 'admin-product-id-edit', params: { id: product.id } }">編輯</v-btn>
                                <v-btn color="primary" nuxt :to="{ name: 'admin-product-id', params: { id: product.id } }">查看</v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            products: 'admin/getProducts'
        }),
    },
    methods: {
        ...mapActions({
            fetchProducts: 'admin/fetchProducts',
            fetchProductTags: 'admin/fetchProductTags',
        })
    },
    created() {
        this.fetchProducts()
        this.fetchProductTags()
    }
}
</script>

<style lang="scss" scoped>
table {
    width:80%
}
</style>


