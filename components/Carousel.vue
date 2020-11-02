<template>
<!-- 可以設置 max-width 來限制輪播的寬度 -->
    <div class="carousel">
        <!-- 輪播控制按鈕 -->
        <v-icon 
            large class="switchBtn" 
            id="prev" 
            @click="Counter(-1) ; Slide()">
            fa-angle-left
        </v-icon>
        <v-icon 
            large class="switchBtn" 
            id="next" 
            @click="Counter(1) ; Slide()">
            fa-angle-right
        </v-icon>
        <!-- 輪播圖片 -->
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
export default {
    props: ['products'],
    data () {
        return {
            // 計數器從 0 開始
            counter: 0,
            // 圖片移動量  預設為 355px (v-card 寬度)
            slideValue: 355,
            // 最大滑動次數 (會依照使用者當前螢幕寬度來取值)
            maxSlide: null,
            // 將 intetval 寫進變數裡面，來中止或繼續執行
            interval: ''
        }
    },
    methods: {
        // 增加 或 減少 counter 計數 (手動點擊箭頭)
        Counter (value) {
            this.counter += value
            console.log('counter',this.counter);
        },
        // 輪播張數為 10張
        Slide () {
            // 先取得使用者當前螢幕的寬度
            const clientWidth = document.body.offsetWidth
            // 滑動區域
            const slide = document.querySelector('.switch_photo')
            // i Phone 6, 7, 8, X 寬度 (375px)
            if (clientWidth === 375) {
                this.slideValue = clientWidth - 20 // 355 px
                this.maxSlide = 9
            } 
            // i Phone 6, 7, 8, plus 寬度(414px)
            else if (clientWidth === 414) {
                this.slideValue = clientWidth - 20 // 394 px
                this.maxSlide = 9
            }
            // i pad 寬度 (768px) 一次顯示 2 張圖片
            else if (clientWidth === 768) {
                this.slideValue = clientWidth - 20 // 748 px
                this.maxSlide = 4
            }
            // i pad pro 寬度 (1024px) 一次顯示 2 張圖片
            else if (clientWidth === 1024) {
                this.slideValue = clientWidth - 148 // 876 px
                this.maxSlide = 4
            }
            // 桌電瀏覽原始寬度 (355 px (v-card 寬度) )
            else {
                this.slideValue = this.slideValue
                this.maxSlide = 5
            }
            // 圖片轉場、位移
            slide.style.transition = "transform 0.4s ease-in-out"
            slide.style.transform = `translateX( ${ -(this.counter) * this.slideValue }px )`
            // 若圖片已達最左邊
            if (this.counter < 0) {
                // 將移動量重設為 0 (即不動)
                slide.style.transform = `translateX(0)`
                this.counter = 0
            }
            // 若圖片已達最右邊
            if (this.counter > this.maxSlide - 1) {
                this.counter = this.maxSlide
                this.maxSlide = this.maxSlide
                slide.style.transform = `translateX( ${ -(this.maxSlide) * this.slideValue }px )`
            }
        },
    },
    mounted () {
        // 圖片自動輪播
        this.interval = setInterval(() => {
            this.counter++ // 自動增加計數
            this.Slide()
            if (this.counter > this.maxSlide - 1) {
                // 圖片重新移動至最左邊
                this.counter = 0
                this.maxSlide = this.maxSlide
            }
        }, 5000) // 觸發頻率
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
