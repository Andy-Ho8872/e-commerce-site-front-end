<template>
  <v-container>
    <!-- v-container will automaticlly use default margin -->
    <h1>Content</h1>

    <v-divider></v-divider>

    <div v-for="product in products" :key="product.id">
      <Products
      :title="product.title"
      :url="product.url"
      />
    </div>
    
  </v-container>
</template> 

<script>
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
import axios from 'axios'

export default {
  async asyncData () {
    // product results
    let res = await axios.get('https://my-json-server.typicode.com/Andy-Ho8872/FakeJsonData/products')
    return { products: res.data }
  },
}

</script>
