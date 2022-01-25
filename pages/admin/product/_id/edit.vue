<template>
    <v-container>
        <LoadingCircle v-if="!product"/>
        <v-card class="my-4" v-else>
            <v-card-title>編輯商品-編號-{{ product.id }}</v-card-title>
            <v-form>
                <v-card-subtitle> 
                    <v-text-field label="名稱" name="title" v-model="formInput.title"></v-text-field>
                </v-card-subtitle>
                <v-card-subtitle>
                    <v-text-field label="單價" name="unit_price" v-model="formInput.unit_price"></v-text-field>
                </v-card-subtitle>
                <v-card-subtitle>
                    <v-textarea label="敘述" name="description" v-model="formInput.description"></v-textarea>
                </v-card-subtitle>
                <v-card-subtitle>
                    <v-text-field label="評分" name="ratings" v-model="formInput.rating"></v-text-field>
                </v-card-subtitle>
                <v-card-subtitle>
                    <v-text-field label="庫存" name="stock_quantity" v-model="formInput.stock_quantity"></v-text-field>
                </v-card-subtitle>
                <v-card-subtitle>
                    <v-combobox 
                        v-model="formInput.tags"
                        label="標籤" 
                        chips 
                        multiple 
                        return-object 
                        :items="productTags" 
                        item-text="title" 
                        item-value="id">
                    </v-combobox>
                </v-card-subtitle>
                <v-card-subtitle>
                    規格:
                    <template v-if="product.variations.length">
                        <v-card-text v-for="variation in product.variations" :key="variation.id">
                            {{ variation.title }} 
                            <v-btn class="mx-2" color="error" small @click="deleteProductVariation({ product_id: product.id, variation_id: variation.id })">刪除規格</v-btn>
                            <v-card-text v-for="(option, index) in variation.options" :key="option.id" class="d-flex">
                                #{{index + 1}} - {{ option }}
                                <div class="variation_option_btns d-flex flex-column">
                                    <v-btn class="mx-2" color="error" small>刪除選項</v-btn>
                                    <v-btn class="mx-2 mt-4" color="primary" small>新增選項</v-btn>
                                </div>
                            </v-card-text>
                        </v-card-text>
                        <v-card-text>
                            <v-btn color="primary" small @click="variationFormDialog = true">新增規格</v-btn>
                        </v-card-text>
                        <!-- 規格表單 -->
                        <v-dialog v-model="variationFormDialog" max-width="600">
                            <v-card>
                                <v-card-title class="mb-4">新增規格</v-card-title>
                                <v-card-subtitle>
                                    <v-text-field label="名稱" name="variation_title" v-model="variationPayload.variation_title"></v-text-field>
                                </v-card-subtitle>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="error" @click="variationFormDialog = false">取消</v-btn>
                                    <v-btn color="primary" @click="addProductVariation(variationPayload)">確認</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                    <template v-else>
                        <v-card-text>尚無規格</v-card-text>
                    </template>
                </v-card-subtitle>
                <!-- 折價率 -->
                <v-card-subtitle>
                    <v-text-field label="折價率" type="number" max="1" name="discount_rate" v-model="formInput.discount_rate"></v-text-field>
                </v-card-subtitle>
                <v-card-subtitle>
                    <v-text-field label="有現貨" name="available" v-model="formInput.available"></v-text-field>
                </v-card-subtitle>
                <v-card-actions>
                    <v-btn color="primary" class="ma-2">更新商品資料</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            variationFormDialog: false,
            variationPayload: {
                product_id: this.$route.params.id,
                variation_title: ''
            },
            //* 表單內容
            formInput: {
                title: '',
                unit_price: '',
                description: '',
                rating: '',
                stock_quantity: '',
                tags: [],
                variations: [],
                discount_rate: '',
                available: ''
            }
        }
    },
    computed: {
        ...mapGetters({
            products: 'admin/getViewedProducts',
            product: 'admin/getProduct',
            productTags: 'admin/getProductTags'
        }),
    },
    methods: {
        ...mapActions({
            refetchSingleProduct: 'admin/refetchSingleProduct',
            fetchProductTags: 'admin/fetchProductTags',
            addProductVariation: 'admin/addProductVariation',
            deleteProductVariation: 'admin/deleteProductVariation'
        }),
        initFormInput() {
            this.formInput = {
                title: this.product.title || null,
                unit_price: this.product.unit_price || null,
                description: this.product.description || null,
                rating: this.product.rating || null,
                stock_quantity: this.product.stock_quantity || null,
                tags: this.product.tags || null,
                discount_rate: this.product.discount_rate || null,
                available: this.product.available || null
            }
        },
    },
    async mounted() {
        await this.refetchSingleProduct(this.$route.params.id)
        this.fetchProductTags()
        this.initFormInput()
    }
}
</script>

<style>

</style>