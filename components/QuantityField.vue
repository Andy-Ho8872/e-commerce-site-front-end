<template>
    <v-row class="quantity_field_wrapper align-center justify-center">
        <!-- 減少數量 -->
        <v-btn
            @click="decrement(product_id)"
            :disabled='status'
            tile 
            small 
            depressed 
            outlined 
            color="error">
            <v-icon>fa-minus fa-fw</v-icon>
        </v-btn>
        <!-- 當前數量 -->
        <input
            @keyup="validateInput(productPayload.quantity)"
            @change="updateQuantity(productPayload)"
            autocomplete="off" 
            :disabled='status'
            class="grey lighten-2 text-center"
            name="product_quantity"
            type="number" 
            v-model.number="productPayload.quantity">
        <!-- 增加數量 -->
        <v-btn 
            @click="increment(product_id)"
            :disabled='status'
            tile
            small 
            depressed 
            outlined 
            color="indigo">
            <v-icon>fa-plus fa-fw</v-icon>
        </v-btn>
    </v-row>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    props: ['product_id', 'product_quantity'],
    data () {  
        return {
            // 暫存數據
            productPayload: {
                id: this.product_id,
                 // 產品當前數量 預設 1 個
                quantity: this.product_quantity,
            },
        }
    },
    computed: {
        ...mapGetters({
            status: 'cart/getPendingStatus', // pending 的狀態
        })
    },
    methods: {
        ...mapActions({
            increseByOne: 'cart/increseByOne', // 減 一
            decreseByOne: 'cart/decreseByOne', // 加 一
            updateQuantity: 'cart/updateQuantity' // 修改數量
        }),
        // 購買數量輸入驗證
        validateInput(value) {
            // 正則表達式的結果
            const pattern = /^[1-9]\d{0,}/gi
            let result = pattern.test(value) 
            // 使用者輸入的值
            let inputVal = this.productPayload.quantity
            // 如果第一個數字不為 0 則回傳 false
            if(result == false || inputVal < 1) {
                this.productPayload.quantity = 1
            }
            else if(inputVal > 99) {
                this.productPayload.quantity = 99         
            }
        },
        // 增 減
        async increment (productId) {
            await this.increseByOne(productId)
            this.productPayload.quantity++ // 暫存數據 
            
        },
        async decrement (productId) {
            await this.decreseByOne(productId)
            this.productPayload.quantity-- // 暫存數據
            // 最小值為 1
            if(this.productPayload.quantity < 1) {
                this.productPayload.quantity = 1
            }
        },
    },
}
</script>

<style lang="scss" scoped>
input {
    width: 30%;
    padding: 2px 0;
    outline: 0;
}
// 移除 INPUT 數字預設的增減箭頭
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.quantity_field_wrapper {
    max-width: 170px !important;
}
</style>