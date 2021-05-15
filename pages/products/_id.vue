<template>
    <v-container class="my-auto">
        <div v-if="loading" class="text-center">
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </div>
        <!-- 商品 -->
        <v-card
            v-else
            class="product_wrapper d-flex justify-space-between rounded-xl"
            elevation="4"
            color="grey lighten-4"
        >
            <!-- 圖片 -->
            <div class="img_wrapper">
                <v-img
                    :src="product.imgUrl"
                    class="rounded-xl"
                    max-width="inherit"
                    max-height="inherit"
                >
                </v-img>
            </div>
            <!-- 詳細資訊 -->
            <div class="card_info_wrapper">
                <!-- 名稱 -->
                <v-card-title class="justify-center">
                    {{ product.title }}
                </v-card-title>
                <!-- 敘述 -->
                <v-card-text class="text-justify">
                    {{ product.description }}
                </v-card-text>
                <!-- 價格 -->
                <v-card-text class="headline">
                    <!-- 包含折扣 -->
                    ${{ Math.floor(product.unit_price * product.discount_rate) }}
                </v-card-text>
                <!-- 標籤 -->
                <Tags :product="product" class="ma-4"/>
                <!-- 輸入數量 -->
                <v-form>
                    <v-row class="input_field align-center ma-3 pa-3">
                        <span class="px-2">購買數量</span>
                        <!-- 增加按鈕 -->
                        <v-btn
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
                            class="grey lighten-2 text-center"
                            name="product_quantity"
                            type="number"
                            autocomplete="off"
                            @keyup="validateInput(productPayload.quantity)"
                            v-model.number="productPayload.quantity"
                        />
                        <!-- 減少按鈕 -->
                        <v-btn
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
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { apiGetProduct } from '~/APIs/api.js'

export default {
    //todo 測試用
    async asyncData({ params }) {
        const res = await apiGetProduct(params.id)
        return {
            product: res.data.product,
        }
    },
    data() {
        return {
            //* 暫存資料
            productPayload: {
                id: this.$route.params.id,
                //* 產品當前數量 預設 1 個
                quantity: 1,
            },
            //* 讀取狀態
            loading: true,
        }
    },
    methods: {
        ...mapActions({
            //* 新增至購物車(包含數量)
            addToCartWithQuantity: 'cart/addToCartWithQuantity',
        }),
        //* 點擊按鈕變更購買數量
        changeCount(value) {
            this.productPayload.quantity += value
            //* 判斷以下數字
            let inputVal = this.productPayload.quantity
            //* 數字將不會小於 1
            if( inputVal < 1) {
                this.productPayload.quantity = 1
            }
            //* 數字將不大於 99
            else if(inputVal > 99) {
                this.productPayload.quantity = 99
            }
        },
        //* 購買數量輸入驗證
        validateInput(value) {
            //* 正則表達式的結果
            const pattern = /^[1-9]\d{0,}/gi
            let result = pattern.test(value) 
            //* 使用者輸入的值
            let inputVal = this.productPayload.quantity
            //* 如果第一個數字不為 0 則回傳 false
            if(result == false || inputVal < 1) {
                this.productPayload.quantity = 1
            }
            else if(inputVal > 99) {
                this.productPayload.quantity = 99         
            }
        }
    },
    mounted() {
        //* 讀取完畢
        this.loading = false
    },
}
</script>

<style lang="scss" scoped>
.product_wrapper {
    margin: 0% 10%;
}
.card_info_wrapper {
    width: 50%;
}
.img_wrapper {
    width: 50%;
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
@media (max-width: 960px) {
    .product_wrapper {
        flex-wrap: wrap;
        margin: 0;
    }
    .img_wrapper {
        width: 100%;
    }
    .card_info_wrapper {
        width: 100%;
    }
}
</style>
