<template>
  <v-app dark>
    <v-main class="main_view">
      <Header class="header"/>
      <nuxt />  
    </v-main>
  </v-app>
  
    <!-- <v-main class="main_view">
      <Header class="header"/>
      <nuxt />  
    </v-main> -->
  
</template>

<script>
// import Navbar from '~/components/Navbar.vue'
export default {
  data () {
    return {
  
    }
  },
  methods: {
    
  },
}
</script>

<style lang="scss" >
  html, body {
    overflow-x: hidden;
  }
  .header {
    position: fixed;
    top: 0;
    z-index: 10000;
  }
  .v-main_wrap {
    padding: auto 0;
  }
  .main_view {
    display: flex;
    justify-content: center;
    padding-top: 10% !important;
  }

// RWD 版面設定
  @media (max-width: 1600px) {
    .main_view {
      padding-top: 10% !important;
    }
  }
  @media (max-width: 1400px) {
    .main_view {
      padding-top: 15% !important;
    }
  }
   @media (max-width: 950px) {
    .main_view {
      padding-top: 18% !important;
    }
  }
 
  @media (max-width: 768px) {
    .main_view {
      padding-top: 20% !important;
    }
  }
   @media (max-width: 700px) {
    .main_view {
      padding-top: 25% !important;
    }
  }
  @media (max-width: 580px) {
    .main_view {
      padding-top: 27% !important;
    }
  }
  // i phone 6 7 8 X
  @media (max-width: 375px) {
    .main_view {
      padding-top: 28% !important;
    }
  }
  // i phone 6/7/8 plus
  @media (width: 414px) {
    .main_view {
      padding-top: 25% !important;
    }
  }
  // i phone 5 / SE
  @media (width: 320px) {
    .main_view {
      padding-top: 33% !important;
    }
  }
</style>>

