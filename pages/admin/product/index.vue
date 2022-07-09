<template>
    <v-container>
        <v-btn class="mb-4" color="primary" @click="dialog = true">上架商品</v-btn>
        <v-dialog v-model="dialog" max-width="600" scrollable>
            <v-card>
                <v-card-title>上架商品</v-card-title>
                <v-card-text style="height: 500px">
                    <v-form v-model="valid">
                        <v-card-subtitle> 
                            <v-text-field label="名稱" name="title" v-model="formInput.title" :rules="[rules.required]"></v-text-field>
                        </v-card-subtitle>
                        <v-card-subtitle> 
                            <v-text-field label="商品圖片網址" name="imgUrl" v-model="formInput.imgUrl" :rules="[rules.required]"></v-text-field>
                        </v-card-subtitle>
                        <v-card-subtitle>
                            <v-text-field label="單價" name="unit_price" v-model="formInput.unit_price" :rules="[rules.required, rules.numbersOnly]"></v-text-field>
                        </v-card-subtitle>
                        <v-card-subtitle>
                            <v-textarea label="敘述" name="description" v-model="formInput.description" :rules="[rules.required]"></v-textarea>
                        </v-card-subtitle>
                        <v-card-subtitle>
                            <v-text-field label="評分(最多5、最少1)" name="ratings" type="number" v-model="formInput.rating" :rules="[rules.required, rules.maxValue2, rules.minValue2 ,rules.maxLetterLength2]"></v-text-field>
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
                            <v-text-field label="折價率: 最多1(預設)、最少0.01" type="number" name="discount_rate" v-model="formInput.discount_rate" :rules="[rules.required, rules.maxValue, rules.minValue, rules.maxLetterLength]"></v-text-field>
                        </v-card-subtitle>
                        <v-card-subtitle>  
                            <v-select label="是否有現貨(預設是)" :items="selectOptions" item-text="text" item-value="value" v-model="formInput.available" :rules="[rules.required]"></v-select>
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" text class="ma-2" @click="closeAndInitForm">取消</v-btn>
                            <v-btn color="primary" class="ma-2" :disabled="!valid" @click="[storeProduct(formInput), closeAndInitForm()]">上架</v-btn>
                        </v-card-actions>
                    </v-form>
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
                available: ''
            }
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
        closeAndInitForm() {
            this.formInput = {
                title: '',
                imgUrl: '',
                unit_price: '',
                description: '',
                rating: '',
                stock_quantity: '',
                tags: [],
                discount_rate: '',
                available: ''
            }
            this.dialog = false
        }
    },
    created() {
        this.fetchProducts()
        this.fetchProductTags()
    }
}
</script>

<style lang="scss" scoped>

</style>


