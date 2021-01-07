<template>
    <v-row class="quantity_field_wrapper align-center justify-center">
        <!-- 減少數量 -->
        <v-btn
            @click="changeCount(-1)"
            tile 
            small 
            depressed 
            outlined 
            color="error">
            <v-icon>fa-minus fa-fw</v-icon>
        </v-btn>
        <!-- 當前數量 -->
        <input
            class="grey lighten-2 text-center"
            name="product_quantity"
            type="text" 
            
            v-model="productQty"
        >
        <!-- 增加數量 -->
        <v-btn 
            @click="changeCount(1)"
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
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
    props: ['qty'],
    data () {  
        return {
            productQty: 0
        }
    },
    methods: {
        ...mapActions({
            increseByOne: 'cart/increseByOne'
        }),
        changeCount (value) {
            this.productQty += value
            // this.increseByOne()
            // 傳遞給父元件  事件名稱        計數
            // this.$emit('changeCount', this.qty)
        }
    },
    computed: {
        
    }
}
</script>

<style lang="scss" scoped>
    input {
        width: 30%;
    }
    .quantity_field_wrapper {
        max-width: 170px !important;
    }
</style>