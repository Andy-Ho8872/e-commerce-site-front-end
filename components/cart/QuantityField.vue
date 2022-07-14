<template>
    <div>
        <!-- 減少數量 -->
        <v-btn
            @click="decrement(cart_id)"
            :disabled='loading || product_quantity <= 1'
            fab
            x-small 
            outlined 
            color="error">
            <v-icon x-small>fa-minus fa-fw</v-icon>
        </v-btn>
        <!-- 當前數量 -->
        <input
            @keyup="validateInput(payload.product_quantity)"
            @change="updateQuantity(payload)"
            autocomplete="off" 
            :disabled='loading'
            class="text-center"
            name="product_quantity"
            v-model.number="payload.product_quantity">
        <!-- 增加數量 -->
        <v-btn 
            @click="increment(cart_id)"
            :disabled='loading || product_quantity >= stock_quantity'
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
        cart_id: {
            type: Number | String,
            require: true
        },
        product_id: {
            type: Number | String,
            require: true
        },
        product_quantity: {
            type: Number | String,
            require: true,
            default: 1
        },
        stock_quantity: {
            type: Number | String,
            require: true
        }
    },
    data () {  
        return {
            //* 暫存數據
            payload: {
                cart_id: this.cart_id,
                product_id: this.product_id,
                //* 產品當前數量 預設 1 個
                product_quantity: this.product_quantity,
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
            const inputVal = this.payload.product_quantity
            switch (true) {
                case !valid || inputVal < 1: //* 如果第一個數字為 0 或是小於 1
                    this.payload.product_quantity = 1
                    break;
                case inputVal > this.stock_quantity:
                    this.payload.product_quantity = this.stock_quantity
            }
        },
        //* 增加數量
        async increment (cart_id) {
            await this.increaseByOne(cart_id)
        },
        //* 減少數量
        async decrement (cart_id) {
            await this.decreaseByOne(cart_id)
            //* 最小值為 1
            if(this.payload.product_quantity < 1) {
                this.payload.product_quantity = 1
            }
        },
    },
    watch: {
        product_quantity() {
            //* 若 props 有變動則更新暫存的數據 
            this.payload.product_quantity = this.product_quantity
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