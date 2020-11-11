<template>

<!-- 可以設置 max-width 來限制輪播的寬度 -->
    <div class="carousel">
        <!-- 輪播控制按鈕(左) --> 
        <v-icon 
            large class="switchBtn" 
            id="prev" 
            @click="changeCounter(-1) ; slideCarousel()">
            fa-angle-left
        </v-icon>
        <!-- 輪播控制按鈕(右) --> 
        <v-icon 
            large class="switchBtn" 
            id="next" 
            @click="changeCounter(1) ; slideCarousel()">
            fa-angle-right
        </v-icon>
        <!-- 輪播圖片(圖片滑動區域) -->
        <div class="switch_photo d-flex ">
            <!-- v-card 和 v-img 預設寬度為 355 px -->
            <v-card class="single_card" v-for="(item, index) in products" :key="index" tile max-width="355">
                <v-img :src="item.url" max-width="355" max-height="355" class="my-auto"></v-img>
                <v-card-subtitle class="text-center heading-6">{{ item.title }}</v-card-subtitle>
            </v-card>
        </div>
    </div>
    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    props: ['products'],
    data () {
        return {
            interval: ''
        }
    },
    methods: {
        // Mutations
        ...mapMutations({ 
            counter : 'carousel/CHANGE_COUNTER' 
        }),
        changeCounter (value) {
            this.counter(value)
        },
        // Actions
        ...mapActions({
            setCarousel : 'carousel/setCarousel'
        }),
        slideCarousel () {
            this.setCarousel()
        },
    },
    // 頁面掛載後執行自動輪播
    mounted () {
        // 圖片自動輪播
        this.interval = setInterval(() => {
            this.changeCounter(1);
            this.slideCarousel(); 
        }, 5000)
    },
    // 在使用者點及其他頁面後，終止 interval 在背景的執行(為了減少效能損耗)
    beforeDestroy () { // 在 Vue3 為 beforeUnmount
        clearInterval(this.interval)
    }
}
</script>

<style lang="scss" scoped>
    .carousel {
        overflow-x: hidden; // 必要
        position: relative;
        // 輪播控制按鈕 ( 左 右 )
        #prev {
            left: 5%;
        }
        #next {
            right: 5%;
        }
    }
    .switch_photo {
        max-width: 800px;
    }
    .v-icon {
        position: absolute;
        top: 50%;
        z-index: 10;
        color: red;
        cursor: pointer;
    }
    .v-card__subtitle {
        background: rgba(0, 0, 0, 0.7);
        color:white !important;
    }

    // RWD 版面設定
    @media (width: 375px) {
        .v-card {
            max-width: 355px !important;
            
        }
        .v-image {
            max-width: 355px !important;
            max-height: 355px !important;
        }
    }

    @media (width: 414px) {
        .v-card {
            max-width: 394px !important;
            
        }
        .v-image {
            max-width: 394px !important;
            max-height: 394px !important;
        }
    }

    @media (width: 768px) {
        .v-card {
            max-width: 374px !important;
            
        }
        .v-image {
            max-width: 374px !important;
            max-height: 374px !important;
        }
    }

    @media (width: 1024px) {
        .v-card {
            max-width: 438px !important;
            
        }
        .v-image {
            max-width: 438px !important;
            max-height: 438px !important;
        }
    }
</style>
