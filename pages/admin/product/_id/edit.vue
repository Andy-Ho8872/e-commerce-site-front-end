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
                    <v-file-input
                        v-model="imageFile"
                        type="file"
                        name="image"
                        accept="image/*"
                        :loading="loading"
                        chips
                        show-size
                        label="上傳商品圖片(上限 10MB)"
                    ></v-file-input>
                    <v-card-subtitle> 
                        <!-- 若有上傳圖片，則 URL 不可任意更動 -->
                        <v-text-field :readonly="imageFile ? true : false" label="商品圖片網址" name="imgUrl" v-model="formInput.imgUrl" :rules="[rules.required]"></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>圖片預覽:
                        <v-img :src="formInput.imgUrl" :alt="formInput.title" width="200" height="200"></v-img>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-text-field label="單價" name="unit_price" v-model="formInput.unit_price" :rules="[rules.required, rules.numbersOnly]"></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-textarea label="敘述" name="description" v-model="formInput.description" :rules="[rules.required]"></v-textarea>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-text-field label="評分(最多5、最少1)" name="ratings" type="number" v-model="formInput.rating" :rules="[rules.required, rules.maxValue2, rules.minValue2, rules.maxLetterLength2]"></v-text-field>
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
                    <!-- 折價率 -->
                    <v-card-subtitle>
                        <v-text-field label="折價率: 最多1(原價)、最少0.01" type="number" name="discount_rate" v-model="formInput.discount_rate" :rules="[rules.required, rules.maxValue, rules.minValue, rules.maxLetterLength]"></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>  
                        <v-select label="是否有現貨(預設是)" :items="selectOptions" item-text="text" item-value="value" v-model="formInput.available" :rules="[rules.required]"></v-select>
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
import { apiUploadImage } from '~/APIs/externalAPI/imgur'
import inputRulesMixin from '~/mixins/inputRulesMixin'

export default {
    mixins: [inputRulesMixin], //* 表單驗證規則
    data() {
        return {
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
            //* 當前要刪除的規格
            currentSelectedVariation: {
                variation_title: '',
                product_id: null, 
                variation_id: null, 
            },
            //* 表單內容
            loading: false,
            imageFile: null, // 上傳的圖片->會先上傳到 imgur 的圖床然後在記錄下該圖片 URL 再賦值到 formInput 裡面的 imgUrl 
            formInput: {
                title: '',
                imgUrl: '', // 也可以直接輸入想上傳圖片的網址
                unit_price: '',
                description: '',
                rating: '',
                stock_quantity: '',
                tags: [],
                discount_rate: '',
                available: ''
            }
        }
    },
    computed: {
        ...mapGetters({
            products: 'admin/getViewedProducts',
            // product: 'admin/getProduct',
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
        initFormInput() {
            this.formInput = {
                title: this.product.title || '',
                imgUrl: this.product.imgUrl || '',
                unit_price: this.product.unit_price || '',
                description: this.product.description || '',
                rating: this.product.rating || '',
                stock_quantity: this.product.stock_quantity || '',
                tags: this.product.tags || [],
                discount_rate: this.product.discount_rate || '',
                available: this.product.available || ''
            }
        },
        async handleFileUpload() {
            this.loading = true
            try {
                const res = await apiUploadImage(this.imageFile)
                this.formInput.imgUrl = res.data.data.link
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false
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
        }
    },
    async mounted() {
        await this.fetchSingleProduct(this.$route.params.id)
        this.initFormInput()
    },
    watch: {
        'imageFile': function () {
            this.imageFile ? this.handleFileUpload() : this.formInput.imgUrl = ''
        }
    }
}
</script>

<style>

</style>