<template>
    <v-container>
        <!-- <h1>{{ $route.params.id }}</h1> -->

        <v-card v-for="item in product" :key="item.id" class="d-flex justify-space-around">
            <v-img :src="item.url" max-width="500" max-height="500"></v-img>
            <div class="card_info">
                <!-- 商品名稱 -->
                <v-card-title class="justify-center">{{ item.title }}</v-card-title>
                <!-- 商品敘述 -->
                <v-card-text class="text-justify">{{ item.description }}</v-card-text> 
                <!-- 商品價格 -->
                <v-card-text class="headline">${{ item.price }}</v-card-text>
                <!-- 輸入商品數量 -->
                <div class="input_field">
                    <v-text-field
                        class="pa-3" 
                        filled 
                        label="購買數量" 
                        value="1"
                        >
                    </v-text-field>
                </div>
            </div>
        </v-card>
    
    </v-container>
    
</template>

<script>
import axios from 'axios'
let url = 'https://my-json-server.typicode.com/Andy-Ho8872/FakeJsonData/products'

export default {
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
    }
}
</script>

<style lang="scss" scoped>
    .card_info {
        width: 50%;
    }
    .input_field {
        width: 30%;
    }
</style>