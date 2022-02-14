<template>
    <v-container>
        <div>
        <!-- 按鈕操作 -->
            <div class="action_btn">
                <v-btn color="primary" nuxt :to="{ name: 'admin-product' }">上一頁</v-btn>
            </div>
            <v-card class="my-4">
                <v-card-title>上架商品</v-card-title>
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
                        規格(請先上架商品在至編輯頁面新增):
                    </v-card-subtitle>
                    <!-- 折價率 -->
                    <v-card-subtitle>
                        <v-text-field label="折價率(最多1、最少0.01)" type="number" name="discount_rate" v-model="formInput.discount_rate" :rules="[rules.required, rules.maxValue, rules.minValue, rules.maxLetterLength2]"></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>  
                        <v-select label="是否有現貨" :items="selectOptions" item-text="text" item-value="value" v-model="formInput.available" :rules="[rules.required]"></v-select>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn color="primary" class="ma-2" :disabled="!valid">上架商品</v-btn>
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
            valid: false,
            //* 驗證規則 
            rules: {
                required: value => !!value || '此欄位必填',
                maxLetterLength: value => value.length <= 3 || '字串長度不可超過 3 ex: 4.55',
                maxLetterLength2: value => value.length <= 4 || '字串長度不可超過 4 ex: 0.005',
                maxValue: value => value <= 1 || '請依照範圍輸入: 0 ~ 1 ex: 1.00',
                minValue: value => value > 0  || '請依照範圍輸入: 0 ~ 1 ex: 0.45',
                maxValue2: value => value <= 5  || '請依照範圍輸入: 1 ~ 5 ex: 4.5',
                minValue2: value => value >= 1  || '請依照範圍輸入: 1 ~ 5 ex: 1.1',
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
}
</script>

<style>

</style>