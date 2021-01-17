<template>
    <v-row class="quantity_field_wrapper align-center justify-center">
        <!-- 減少數量 -->
        <v-btn
            @click="decreseByOne(product_id)"
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
            v-model="product_quantity"
        >
        <!-- 增加數量 -->
        <v-btn 
            @click="increseByOne(product_id)"
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
    props: ['product_id', 'product_quantity'],
    data () {  
        return {
            productQty: 10
        }
    },
    methods: {
        ...mapActions({
            increseByOne: 'cart/increseByOne',
            decreseByOne: 'cart/decreseByOne'
        }),
        changeCount (value) {
            this.productQty += value
        }
    },
    computed: {
        
    }
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