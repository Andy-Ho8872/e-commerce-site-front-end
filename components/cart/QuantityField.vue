<template>
    <div>
        <!-- 減少數量 -->
        <v-btn
            @click="decrement(product_id)"
            :disabled='loading'
            fab
            x-small 
            outlined 
            color="error">
            <v-icon x-small>fa-minus fa-fw</v-icon>
        </v-btn>
        <!-- 當前數量 -->
        <input
            @keyup="validateInput(productPayload.quantity)"
            @change="updateQuantity(productPayload)"
            autocomplete="off" 
            :disabled='loading'
            class="text-center"
            name="product_quantity"
            type="number"
            v-model="productPayload.quantity">
        <!-- 增加數量 -->
        <v-btn 
            @click="increment(product_id)"
            :disabled='loading'
            fab
            x-small 
            outlined 
            color="indigo">
            <v-icon x-small>fa-plus fa-fw</v-icon>
        </v-btn>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    //? passed from pages/cart/index.vue
    props: {
        product_id: {
            type: Number,
            require: true
        },
        product_quantity: {
            type: Number,
            require: true,
            default: 1
        }
    },
    data () {  
        return {
            //* 暫存數據
            productPayload: {
                id: this.product_id,
                //* 產品當前數量 預設 1 個
                quantity: this.product_quantity,
            },
        }
    },
    computed: {
        ...mapGetters({
            loading: 'cart/getLoading', //* loading 的狀態
        })
    },
    methods: {
        ...mapActions({
            increaseByOne: 'cart/increaseByOne', //* 減 一
            decreaseByOne: 'cart/decreaseByOne', //* 加 一
            updateQuantity: 'cart/updateQuantity' //* 修改數量
        }),
        //* 購買數量輸入驗證
        validateInput(value) {
            //* 只接受數字且第一個數不可為 0
            const pattern = /^[1-9]\d{0,}/gi
            //* 正則表達式的結果
            const valid = pattern.test(value) 
            //* 使用者輸入的值
            const inputVal = this.productPayload.quantity
            switch (true) {
                case !valid || inputVal < 1: //* 如果第一個數字為 0 或是小於 1
                    this.productPayload.quantity = 1
                    break;
                case inputVal > 99:
                    this.productPayload.quantity = 99
            }
        },
        //* 增加數量
        async increment (productId) {
            await this.increaseByOne(productId)
        },
        //* 減少數量
        async decrement (productId) {
            await this.decreaseByOne(productId)
            //* 最小值為 1
            if(this.productPayload.quantity < 1) {
                this.productPayload.quantity = 1
            }
        },
    },
    watch: {
        product_quantity() {
            //* 若 props 有變動則更新暫存的數據 
            this.productPayload.quantity = this.product_quantity
        }
    }
}
</script>

<style lang="scss" scoped>
input {
    width: 30%;
    padding: 2px 0;
    outline: 0;
}
</style>