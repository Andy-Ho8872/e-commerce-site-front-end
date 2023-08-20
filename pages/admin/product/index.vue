<template>
    <v-container>
        <v-btn class="mb-4" color="primary" @click="[dialog = true]">上架商品</v-btn>
        <v-dialog v-model="dialog" max-width="600" scrollable>
            <v-card>
                <v-card-title>上架商品</v-card-title>
                <v-card-text style="height: 500px">
                    <v-form v-model="valid">
                        <InputForm @passFormInput="receiveFormInputFromChild"/>
                        <!-- 按鈕操作 -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" text class="ma-2" @click="[dialog = false]">取消</v-btn>
                            <v-btn color="primary" class="ma-2" :disabled="!valid" @click="[storeProduct(formInput), dialog = false, scrollToBottom()]">上架</v-btn>
                        </v-card-actions>
                    </v-form>
                    <v-card-subtitle>
                        規格(請先上架商品在至編輯頁面新增):
                    </v-card-subtitle>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- table -->
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
import inputRulesMixin from '~/mixins/inputRulesMixin'

export default {
    mixins: [inputRulesMixin], //* 表單驗證規則
    data() {
        return {
            dialog: false,
            valid: false,
            //* 父元件表單
            formInput: null,
        }
    },
    computed: {
        ...mapGetters({
            products: 'admin/getProducts',
            productTags: 'admin/getProductTags',
        }),
    },
    methods: {
        ...mapActions({
            fetchProducts: 'admin/fetchProducts',
            fetchProductTags: 'admin/fetchProductTags',
            storeProduct: 'admin/storeProduct',
        }),
        receiveFormInputFromChild(value) {
            this.formInput = value
        },
        scrollToBottom() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            })
        }
    },
    created() {
        this.fetchProducts()
        this.fetchProductTags()
    },
}
</script>

<style lang="scss" scoped>

</style>