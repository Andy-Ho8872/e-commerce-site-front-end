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
                    <v-card-subtitle> 
                        <v-text-field label="名稱" name="title" v-model="formInput.title" :rules="[rules.required]"></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle> 
                        <v-text-field label="商品圖片網址" name="imgUrl" v-model="formInput.imgUrl" :rules="[rules.required]"></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-text-field label="單價" name="unit_price" v-model="formInput.unit_price" :rules="[rules.required]"></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-textarea label="敘述" name="description" v-model="formInput.description" :rules="[rules.required]"></v-textarea>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-text-field label="評分(最多5、最少1)" name="ratings" type="number" v-model="formInput.rating" :rules="[rules.required, rules.maxValue2, rules.minValue2 ,rules.maxLetterLength]"></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-text-field label="庫存" name="stock_quantity" v-model="formInput.stock_quantity" :rules="[rules.required]"></v-text-field>
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
                                <v-chip color="teal" label outlined>{{ variation.title }}</v-chip> 
                                <v-btn class="mx-2" color="error" small @click="deleteProductVariation({ product_id: product.id, variation_id: variation.id })">刪除規格</v-btn>
                                <!-- 產品選項 -->
                                <v-card-text v-for="(option, index) in variation.options" :key="`option_${index}`" class="d-flex align-center">
                                    <span>#{{index + 1}}</span> 
                                    <div class="d-flex align-center">
                                        <div class="chip_wrapper">
                                            <v-chip color="primary" label outlined small class="mx-2">{{ option }}</v-chip>
                                        </div>
                                        <template v-if="index != 0">
                                            <v-card-text>
                                                <v-btn color="primary" small @click="deleteProductVariationOption({ product_id: product.id, variation_id: variation.id, options: variation.options, optionIndex: index })">刪除選項</v-btn>
                                            </v-card-text>
                                        </template> 
                                    </div>
                                </v-card-text>
                            </v-card-text>
                            <!-- 新增規格按鈕 -->
                            <v-card-text>
                                <v-btn color="primary" small @click="variationFormDialog = true">新增規格</v-btn>
                            </v-card-text>
                            <!-- 規格彈出視窗 -->
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
                                                    <v-btn class="mx-2" color="error" icon small @click="dialogDeleteVariationOptions(index)">
                                                        <v-icon>fa-trash</v-icon>
                                                    </v-btn>
                                                </template>
                                            </div>
                                        </v-card-subtitle>
                                        <!-- 新增選項按鈕 -->
                                        <v-card-subtitle>
                                            <v-btn color="success" small @click="dialogAddVariationOptions()">新增選項</v-btn>
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
                        <v-text-field label="折價率(最多1、最少0.01)" type="number" name="discount_rate" v-model="formInput.discount_rate" :rules="[rules.required, rules.maxValue, rules.minValue, rules.maxLetterLength2]"></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>  
                        <v-select label="是否有現貨" :items="selectOptions" item-text="text" item-value="value" v-model="formInput.available" :rules="[rules.required]"></v-select>
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

export default {
    data() {
        return {
            variationFormDialog: false,
            //* 表單是否通過驗證 
            valid: false,
            //* 驗證規則 
            rules: {
                required: value => !!value || '此欄位必填',
                shouldContainOne: value => value.length > 0 || '請至少選擇一個選項',
                maxLetterLength: value => value.length <= 3 || '字串長度不可超過 3 ex: 4.55',
                maxLetterLength2: value => value.length <= 4 || '字串長度不可超過 4 ex: 0.005',
                maxValue: value => value <= 1 || '請依照範圍輸入: 0 ~ 1 ex: 1.00',
                minValue: value => value > 0  || '請依照範圍輸入: 0 ~ 1 ex: 0.45',
                maxValue2: value => value <= 5  || '請依照範圍輸入: 1 ~ 5 ex: 4.5',
                minValue2: value => value >= 1  || '請依照範圍輸入: 1 ~ 5 ex: 1.1',
            },
            //* 規格參數 
            variationPayload: {
                product_id: this.$route.params.id,
                variation_title: '',
                variation_options: [
                    ''
                ]
            },
            selectOptions: [
                { 
                    text: '是',
                    value: '1' 
                },
                { 
                    text: '否',
                    value: '0' 
                },
            ],
            //* 表單內容
            formInput: {
                title: '',
                imgUrl: '',
                unit_price: '',
                description: '',
                rating: '',
                stock_quantity: '',
                tags: [],
                discount_rate: '',
                available: 1
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
            deleteProductVariation: 'admin/deleteProductVariation',
            deleteProductVariationOption: 'admin/deleteProductVariationOption',
            updateProductInfo: 'admin/updateProductInfo'
        }),
        initFormInput() {
            this.formInput = {
                title: this.product.title || null,
                imgUrl: this.product.imgUrl || null,
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
        dialogAddVariationOptions() {
            this.variationPayload.variation_options.push('')
        },
        dialogDeleteVariationOptions(index) {
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