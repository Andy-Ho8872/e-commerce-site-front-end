<template>
    <v-container>

        <v-card elevation="2"  v-for="item in product" :key="item.id" class="d-flex justify-space-around">
            <v-img :src="item.url" max-width="320" max-height="320"></v-img>
            <!-- 產品資訊 -->
            <div class="card_info">
                <!-- 商品名稱 -->
                <v-card-title class="justify-center">{{ item.title }}</v-card-title>
                <!-- 商品敘述 -->
                <v-card-text class="text-justify">{{ item.description }}</v-card-text> 
                <!-- 商品價格 -->
                <v-card-text class="headline">${{ item.price }}</v-card-text>
                <!-- 輸入商品數量 -->
                <v-row class="input_field align-center py-3">
                    <span class="px-2">購買數量</span>
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
                        class="grey lighten-2 text-center pt-1" 
                        :value="counter">
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
            </div>
        </v-card>
    
    </v-container>  
</template>

<script>
import axios from 'axios'
let url = 'https://my-json-server.typicode.com/Andy-Ho8872/FakeJsonData/products'

export default {
    data () {
        return {
            counter: 1 // 產品當前數量
        }
    },
    async asyncData () {
        let res = await axios.get(url)
        // get product results
        return { products: res.data }
    },
    computed: {
        // 尋找 product.id 與 Route.id 相符的商品
        product () {
            return this.products.filter(item => item.id == this.$route.params.id)
        }
    },
    methods: {
        // 點擊按鈕以 增加 或 減少 購買數量
        changeCount (value) {
            this.counter += value
        }
    }
}
</script>

<style lang="scss" scoped>
    .card_info {
        width: 50%;
    }
    input {
        width: 20%;
        outline: none;
    }
    .input_field {
        padding: 0 5%;
    }
    @media (max-width: 768px) {
        .card_info {
            width: 100%;
            // border-top: 0.5px solid grey;
        }
        .v-card {
            flex-wrap: wrap;
        }
        .input_field {
            padding: 0 3%;
        }       
    }
</style>