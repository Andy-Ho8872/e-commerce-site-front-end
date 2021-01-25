<template>
    <v-row class="quantity_field_wrapper align-center justify-center">
        <!-- 減少數量 -->
        <v-btn
            @click="decreseByOne(product_id); decrement()"
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
            @change="updateQuantity(productPayload)" 
            :disabled='status'
            class="grey lighten-2 text-center"
            name="product_quantity"
            type="text" 
            v-model="productPayload.quantity">
        <!-- 增加數量 -->
        <v-btn 
            @click="increseByOne(product_id); increment()"
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
        // 暫存數據 增 減
        increment () {
            this.productPayload.quantity++  
        },
        decrement () {
            this.productPayload.quantity--
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
    .quantity_field_wrapper {
        max-width: 170px !important;
    }
</style>