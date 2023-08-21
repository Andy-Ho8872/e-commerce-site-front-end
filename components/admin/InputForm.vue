<template>
    <div>
        <v-btn color="error" outlined class="ml-4" :disabled="disabled" @click="initFormInput">清空資料</v-btn>
        <v-card-subtitle>
            <v-text-field
                label="名稱"
                name="title"
                v-model="formInput.title"
                :rules="[rules.required]"
            ></v-text-field>
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
            <v-text-field
                :readonly="imageFile ? true : false"
                label="商品圖片網址"
                name="imgUrl"
                v-model="formInput.imgUrl"
                :rules="[rules.required]"
            ></v-text-field>
        </v-card-subtitle>
        <v-card-subtitle
            >圖片預覽:
            <v-img
                :src="formInput.imgUrl"
                :alt="formInput.title"
                width="200"
                height="200"
            ></v-img>
        </v-card-subtitle>
        <v-card-subtitle>
            <v-text-field
                label="單價"
                name="unit_price"
                v-model="formInput.unit_price"
                :rules="[rules.required, rules.numbersOnly]"
            ></v-text-field>
        </v-card-subtitle>
        <v-card-subtitle>
            <v-textarea
                label="敘述"
                name="description"
                v-model="formInput.description"
                :rules="[rules.required]"
            ></v-textarea>
        </v-card-subtitle>
        <v-card-subtitle>
            <v-text-field
                label="評分(最多5、最少1)"
                name="ratings"
                type="number"
                v-model="formInput.rating"
                :rules="[
                    rules.required,
                    rules.maxValue2,
                    rules.minValue2,
                    rules.maxLetterLength2,
                ]"
            ></v-text-field>
        </v-card-subtitle>
        <v-card-subtitle>
            <v-text-field
                label="庫存"
                name="stock_quantity"
                v-model="formInput.stock_quantity"
                :rules="[rules.required]"
            ></v-text-field>
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
                item-value="id"
            >
            </v-combobox>
        </v-card-subtitle>
        <!-- 折價率 -->
        <v-card-subtitle>
            <v-text-field
                label="折價率: 最多1(原價)、最少0.01"
                type="number"
                name="discount_rate"
                v-model="formInput.discount_rate"
                :rules="[
                    rules.required,
                    rules.maxValue,
                    rules.minValue,
                    rules.maxLetterLength,
                ]"
            ></v-text-field>
        </v-card-subtitle>
        <v-card-subtitle>
            <v-select
                label="是否有現貨(預設是)"
                :items="selectOptions"
                item-text="text"
                item-value="value"
                v-model="formInput.available"
                :rules="[rules.required]"
            ></v-select>
        </v-card-subtitle>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiUploadImage } from '~/APIs/externalAPI/imgur'
import inputRulesMixin from '~/mixins/inputRulesMixin'

export default {
    mixins: [inputRulesMixin], //* 表單驗證規則
    props: {
        product: {
            type: Object
        },
        initForm: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            //* 表單選項
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
            productTags: 'admin/getProductTags'
        }),
        disabled() {
            if(this.product) return false
            return true
        }
    },
    methods: {
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
        initFormInput() {
            this.imageFile = null
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
        passFormInput() {
            this.$emit('passFormInput', this.formInput)
        },
    },
    watch: {
        'imageFile': function() {
            this.imageFile ? this.handleFileUpload() : this.formInput.imgUrl = ''
        },
        'formInput': {
            handler(newVal, oldVal) {
                this.passFormInput()
            },
            deep: true
        },
    },
    mounted() {
        if(this.product) this.initFormInput()
    }
}
</script>

<style></style>
