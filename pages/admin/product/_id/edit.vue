<template>
    <v-container>
        <LoadingCircle v-if="!product"/>
        <div v-else>
            <!-- 按鈕操作 -->
            <div class="action_btn">
                <v-btn color="primary" nuxt :to="{ name: 'admin-product' }">上一頁</v-btn>
            </div>
            <v-card class="my-4">
                <v-card-title>編輯商品-編號-{{ product.id }}</v-card-title>
                <v-form v-model="valid">
                    <InputForm :product="product" @passFormInput="receiveFormInputFromChild"/>
                    <v-card-subtitle>
                        規格:
                        <template v-if="product.variations">
                            <v-card-text v-for="variation in product.variations" :key="variation.id">
                                <v-chip color="teal" label outlined>{{ variation.title }}</v-chip> 
                                <v-btn class="mx-2" color="error" small @click="setCurrentSelectedVariation({ variation_title: variation.title, product_id: product.id, variation_id: variation.id })">刪除規格</v-btn>
                                <!-- 產品選項 -->
                                <v-card-text v-for="(option, index) in variation.options" :key="`option_${index}`" class="d-flex align-center">
                                    <span>#{{index + 1}}</span> 
                                    <div class="d-flex align-center">
                                        <div class="chip_wrapper">
                                            <v-chip color="primary" label outlined small class="mx-2">{{ option }}</v-chip>
                                        </div>
                                        <!-- 刪除選項按鈕 -->
                                        <template v-if="index != 0">
                                            <v-card-text>
                                                <v-btn color="error" icon small @click="deleteProductVariationOption({ product_id: product.id, variation_id: variation.id, options: variation.options, optionIndex: index })">
                                                    <v-icon>fa-xmark</v-icon>
                                                </v-btn>
                                            </v-card-text>
                                        </template> 
                                    </div>
                                </v-card-text>
                                <!-- 刪除規格彈出視窗 -->
                                <v-dialog v-model="deleteVariationDialog" max-width="600">
                                    <v-card>
                                        <v-card-title class="font-weight-bold">刪除規格 - {{ currentSelectedVariation.variation_title }}</v-card-title>
                                        <v-card-text>您即將刪除這個規格，是否繼續?</v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" text @click="deleteVariationDialog = false">取消</v-btn>
                                            <v-btn color="primary" @click="[deleteProductVariation({ 
                                                    product_id: currentSelectedVariation.product_id,
                                                    variation_id: currentSelectedVariation.variation_id 
                                                }), deleteVariationDialog = false]">
                                                確認
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-card-text>
                            <!-- 新增規格按鈕 -->
                            <v-card-text>
                                <v-btn color="primary" small @click="variationFormDialog = true">新增規格</v-btn>
                            </v-card-text>
                            <!-- 規格彈出視窗 -->
                            <v-dialog v-model="variationFormDialog" max-width="600" scrollable>
                                <v-form v-model="variationFormDialogValid">
                                    <v-card class="overflow-auto">
                                        <v-card-title class="font-weight-bold mb-4">新增規格</v-card-title>
                                        <!-- 滾動式內容 -->
                                        <v-card-text style="height: 450px">
                                            <v-card-subtitle>
                                                <v-text-field label="名稱" placeholder="尺寸..." name="variation_title" v-model="variationPayload.variation_title" :rules="[rules.required]"></v-text-field>
                                            </v-card-subtitle>
                                            <v-card-subtitle v-for="(option, index) in variationPayload.variation_options" :key="`variation_option_${index}`">
                                                <div class="d-flex align-center">
                                                    <v-text-field ref="variation_option_input" :label="`選項${index + 1}`" placeholder="XL..." name="variation_options[]" @keydown.enter="createVariationOptionInputField" v-model="variationPayload.variation_options[index]" :rules="[rules.required]"></v-text-field>
                                                    <!-- index 不為 0 才顯示 -->
                                                    <template v-if="index != 0">
                                                        <v-btn class="mx-2" color="error" icon small @click="deleteVariationOptionInputField(index)">
                                                            <v-icon>fa-trash</v-icon>
                                                        </v-btn>
                                                    </template>
                                                </div>
                                            </v-card-subtitle>
                                            <!-- 新增選項按鈕 -->
                                            <v-card-subtitle>
                                                <v-btn color="success" small @click="createVariationOptionInputField()">新增選項</v-btn>
                                            </v-card-subtitle>
                                        </v-card-text>
                                        <!-- 取消、確認按鈕 -->
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="error" @click="variationFormDialog = false">取消</v-btn>
                                            <v-btn color="primary" :disabled="!variationFormDialogValid"  @click="[addProductVariation(variationPayload), resetVariationPayload()]">確認</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-form>
                            </v-dialog>
                        </template>
                        <template v-else>
                            <v-card-text>尚無規格</v-card-text>
                        </template>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn color="primary" class="ma-2" :disabled="!valid" @click="updateProductInfo({ product_id: product.id, formInput })">更新商品資料</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import inputRulesMixin from '~/mixins/inputRulesMixin'

export default {
    mixins: [inputRulesMixin], //* 表單驗證規則
    data() {
        return {
            //* 父元件表單
            formInput: null,
            //* 彈出視窗 
            variationFormDialog: false,
            deleteVariationDialog: false,
            //* 表單是否通過驗證 
            valid: false,
            variationFormDialogValid: false,
            //* 規格參數 
            variationPayload: {
                product_id: this.$route.params.id,
                variation_title: '',
                variation_options: [
                    ''
                ]
            },
            //* 當前要刪除的規格
            currentSelectedVariation: {
                variation_title: '',
                product_id: null, 
                variation_id: null, 
            },
        }
    },
    computed: {
        ...mapGetters({
            products: 'admin/getViewedProducts',
            productTags: 'admin/getProductTags'
        }),
        product() {
            return this.products.find(p => p.id == this.$route.params.id) 
        }
    },
    methods: {
        ...mapActions({
            fetchSingleProduct: 'admin/fetchSingleProduct',
            addProductVariation: 'admin/addProductVariation',
            deleteProductVariation: 'admin/deleteProductVariation',
            deleteProductVariationOption: 'admin/deleteProductVariationOption',
            updateProductInfo: 'admin/updateProductInfo'
        }),
        resetVariationPayload() {
            this.variationPayload = {
                product_id: this.$route.params.id,
                variation_title: '',
                variation_options: ['',]
            }
            //* 關閉彈出視窗 
            this.variationFormDialog = false
        },
        //todo 目前對規格做 crud 不會重新渲染畫面
        async createVariationOptionInputField() { 
            await this.variationPayload.variation_options.push('')
            //* 當輸入框被新增時，則自動focus 最後一個輸入框
            const lastIndex = this.$refs.variation_option_input.length - 1
            this.$refs.variation_option_input[lastIndex].focus()
        },
        deleteVariationOptionInputField(index) {
            this.variationPayload.variation_options.splice(index, 1)
        },
        setCurrentSelectedVariation({ variation_title, product_id, variation_id }) {
            this.deleteVariationDialog = true
            this.currentSelectedVariation = {
                variation_title,
                product_id, 
                variation_id, 
            }
        },
        receiveFormInputFromChild(value) {
            this.formInput = value
        }
    },
    async mounted() {
        await this.fetchSingleProduct(this.$route.params.id)
    },
}
</script>

<style>

</style>