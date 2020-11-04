<template>
  <!-- v-container will automaticlly use default margin -->
  <v-container>
    <!-- 優惠計時 (月份從0開始計算， 例如: 數字5 == 6月)-->
    <Announcement
    :year='2020'
    :month='12'
    :day='5'
    :hour='8'
    :minute='7'
    :second='6'
    :millisecond='4'
    />
    <!-- 圖片輪播 -->
    <Carousel
    :products="products"
    />
    <v-divider></v-divider>
    <!-- 商品陳列 -->
    <div v-for="item in products" :key="item.id">
      <Products
      :title="item.title"
      :imgURL="item.url"
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
