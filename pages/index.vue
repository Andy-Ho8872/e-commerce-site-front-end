<template>
  <!-- v-container will automaticlly use default margin -->
  <v-container>
    <!-- 圖片輪播 -->
    <Carousel
    :products="products"
    />
    
    <v-divider></v-divider>

    <!-- 商品陳列 -->
    <div v-for="product in products" :key="product.id">
      <Products
      :title="product.title"
      :imgURL="product.url"
      />
    </div>   

  </v-container>
</template> 

<script>
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
import axios from 'axios'
// products URL
let url = 'https://my-json-server.typicode.com/Andy-Ho8872/FakeJsonData/products'

export default {
  async asyncData () {
    let res = await axios.get(url)
    // get product results
    return { products: res.data }
  },
}

</script>
