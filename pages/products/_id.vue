<template>
    <v-container class="my-auto">
        <LoadingCircle v-if="!product"/>
        <!-- 商品 -->
        <v-row v-if="product">
            <v-col>
                <v-card
                    class="d-flex flex-wrap justify-space-between rounded-xl ma-auto"
                    elevation="4"
                    color="grey lighten-4"
                    width="900"
                >
                    <!-- 圖片 -->
                    <div class="half">
                        <v-img :src="product.imgUrl" class="rounded-xl ma-6"></v-img>
                        <v-card-subtitle class="product_created_at mx-4 grey--text text--darken-1 text-lg-left text-center">
                            本商品於 {{ $moment(product.created_at).format('ll') }}
                            ({{ $moment(product.created_at).fromNow() }}) 上架
                        </v-card-subtitle>
                    </div>
                    <!-- 詳細資訊 -->
                    <div class="half">
                        <!-- 名稱 -->
                        <v-card-title class="product_title justify-center">
                            {{ product.title }}
                        </v-card-title>
                        <!-- 敘述 -->
                        <v-card-text class="product_description text-justify">
                            {{ product.description }}
                        </v-card-text>
                        <!-- 價格 -->
                        <v-card-text class="title">
                            <!-- 原價 -->
                            <span class="product_original_price" :class="[product.discount_rate == 1 ? '' : 'discounted']">
                                $ {{ Math.floor(product.unit_price) }}
                            </span>
                            <!-- 折價後 -->
                            <span class="product_discount_price mx-2 title red--text" v-if="product.discount_rate != 1">
                                $ {{ Math.floor(product.unit_price * product.discount_rate) }}
                            </span>
                        </v-card-text>
                        <!-- 評級 -->
                        <Ratings :product="product" class="mx-4 my-6"/>
                        <!-- 標籤 -->
                        <Tags :product="product" class="mx-4 my-6"/>
                        <!-- 輸入數量 -->
                        <v-form>
                            <v-row class="input_container ma-3 py-4">
                                <span class="px-2">購買數量</span>
                                <!-- 減少按鈕 -->
                                <v-btn
                                    class="decrement_btn"
                                    @click="changeCount(-1)"
                                    tile
                                    small
                                    depressed
                                    outlined
                                    color="error"
                                >
                                    <v-icon>fa-minus fa-fw</v-icon>
                                </v-btn>
                                <!-- 輸入數量 -->
                                <input
                                    class="input_field grey lighten-2 text-center"
                                    name="product_quantity"
                                    type="number"
                                    autocomplete="off"
                                    @blur="validateInput(productPayload.quantity)"
                                    v-model.number="productPayload.quantity"
                                />
                                <!-- 增加按鈕 -->
                                <v-btn
                                    class="increment_btn"
                                    @click="changeCount(1)"
                                    tile
                                    small
                                    depressed
                                    outlined
                                    color="indigo"
                                >
                                    <v-icon>fa-plus fa-fw</v-icon>
                                </v-btn>
                            </v-row>
                            <!-- 購買按鈕-->
                            <div class="purchase_btn text-center">
                                <v-btn
                                    @click="addToCartWithQuantity(productPayload)"
                                    class="ma-3 rounded-lg"
                                    tile
                                    x-large
                                    depressed
                                    color="primary"
                                >
                                    <span>放入購物車</span>
                                </v-btn>
                            </div>
                        </v-form>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    validate({ params }) {
        return /^\d+$/.test(params.id)
    },
    data() {
        return {
            //* 暫存資料
            productPayload: {
                id: this.$route.params.id,
                quantity: 1, //* 產品當前數量 預設 1 個
            },
        }
    },
    computed: {
        ...mapGetters({
            products: 'product/getViewedProducts',
        }),
        product() {
            return this.products.find(product => product.id == this.$route.params.id)
        }
    },
    methods: {
        ...mapActions({
            //* 新增至購物車(包含數量)
            addToCartWithQuantity: 'cart/addToCartWithQuantity',
            //* 撈取商品 
            fetchSingleProduct: 'product/fetchSingleProduct'
        }),
        //* 點擊按鈕變更購買數量
        changeCount(value) {
            this.productPayload.quantity += value
            //* 當前購買數量
            const inputVal = this.productPayload.quantity
            //* 數量驗證 
            switch (true) {
                case inputVal < 1: //* 數字將不會小於 1
                    this.productPayload.quantity = 1
                    break;
                case inputVal > 99: //* 數字將不大於 99
                    this.productPayload.quantity = 99
                    break;
            }
        },
        //* 購買數量輸入驗證
        validateInput(value) {
            //* 只接受數字且第一個數不可為 0
            const pattern = /^[1-9]\d{0,}/gi
            //* 正則表達式的結果
            const valid = pattern.test(value)
            //* 使用者輸入的值
            const inputVal = this.productPayload.quantity
            switch (true) {
                case !valid || inputVal < 1:
                    this.productPayload.quantity = 1
                    break;
                case inputVal > 99:
                    this.productPayload.quantity = 99
            }
        }
    },
    created() {
        this.fetchSingleProduct(this.$route.params.id) 
    },
}
</script>

<style lang="scss" scoped>
.half {
    width: 50%;
}
.discounted {
    text-decoration: line-through;
}
//* 購買按鈕
.purchase_btn span {
    width: 6rem;
}
input {
    width: 20%;
    padding: 2px 0;
    outline: none;
}
//? RWD
@media (max-width: 768px) {
    .half {
        width: 100%;
    }
}
</style>
