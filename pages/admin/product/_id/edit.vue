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
                    <template v-if="product.variations">
                        <v-card-text v-for="variation in product.variations" :key="variation.id">
                            {{ variation.title }} 
                            <v-btn class="mx-2" color="error" small @click="deleteProductVariation({ product_id: product.id, variation_id: variation.id })">刪除規格</v-btn>
                            <v-card-text v-for="(option, index) in variation.options" :key="`option_${index}`" class="d-flex">
                                #{{index + 1}} - {{ option }}
                                <!-- index 不為 0 才顯示 -->
                                <template v-if="index != 0">
                                    <v-btn class="mx-2" color="error" x-small icon>
                                        <v-icon>fa-trash</v-icon>
                                    </v-btn>
                                </template>
                            </v-card-text>
                            <v-card-text>
                                <v-btn color="primary" small>新增選項</v-btn>
                            </v-card-text>
                        </v-card-text>
                        <v-card-text>
                            <v-btn color="primary" small @click="variationFormDialog = true">新增規格</v-btn>
                        </v-card-text>
                        <!-- 規格表單 -->
                        <v-dialog v-model="variationFormDialog" max-width="600" scrollable>
                            <v-card class="overflow-auto">
                                <v-card-title class="mb-4">新增規格</v-card-title>
                                <!-- 滾動式內容 -->
                                <v-card-text style="height: 450px">
                                    <v-card-subtitle>
                                        <v-text-field label="名稱" name="variation_title" v-model="variationPayload.variation_title"></v-text-field>
                                    </v-card-subtitle>
                                    <v-card-subtitle v-for="(option, index) in variationPayload.variation_options" :key="`variation_option_${index}`">
                                        <div class="d-flex align-center">
                                            <v-text-field :label="`選項${index + 1}`" name="variation_options[]" v-model="variationPayload.variation_options[index]"></v-text-field>
                                            <!-- index 不為 0 才顯示 -->
                                            <template v-if="index != 0">
                                                <v-btn class="mx-2" color="error" icon small @click="deleteVariationOptions(index)">
                                                    <v-icon>fa-trash</v-icon>
                                                </v-btn>
                                            </template>
                                        </div>
                                    </v-card-subtitle>
                                    <!-- 新增選項按鈕 -->
                                    <v-card-subtitle>
                                        <v-btn color="success" small @click="addVariationOptions()">新增選項</v-btn>
                                    </v-card-subtitle>
                                </v-card-text>
                                <!-- 取消、確認按鈕 -->
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="error" @click="variationFormDialog = false">取消</v-btn>
                                    <v-btn color="primary" @click="[addProductVariation(variationPayload), resetVariationPayload()]">確認</v-btn>
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
            //* 規格參數 
            variationPayload: {
                product_id: this.$route.params.id,
                variation_title: '',
                variation_options: [
                    ''
                ]
            },
            //* 表單內容
            formInput: {
                title: '',
                unit_price: '',
                description: '',
                rating: '',
                stock_quantity: '',
                tags: [],
                // variations: [],
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
        resetVariationPayload() {
            this.variationPayload = {
                product_id: this.$route.params.id,
                variation_title: '',
                variation_options: ['',]
            }
            //* 關閉彈出視窗 
            this.variationFormDialog = false
        },
        //* 選項輸入框操作
        addVariationOptions() {
            this.variationPayload.variation_options.push('')
        },
        deleteVariationOptions(index) {
            this.variationPayload.variation_options.splice(index, 1)
        }
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