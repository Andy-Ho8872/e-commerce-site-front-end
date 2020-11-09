<template>
  <!-- v-container will automaticlly use default margin -->
  <v-container>
    <!-- 優惠計時 (月份從 0 開始計算， 例如: 數字5 == 6月)-->
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
    <!-- 置頂按鈕 -->
    <v-btn
        @click="scrollTop" 
        class="to_Top mx-2"
        fab
        dark
        large
        color="primary"
      >
      <v-icon>fa-chevron-up</v-icon>
    </v-btn>
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
  methods: {
    // 點擊移動到最上層
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .to_Top {
    bottom: 10%;
    position: fixed;
    right: 0;
    z-index: 10000;
  }
</style>