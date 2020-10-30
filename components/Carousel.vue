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
            <v-card v-for="(item, index) in products" :key="index" tile max-width="355">
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
            // 圖片移動量從 預設為 355px (v-card 寬度)
            slideValue: 355
        }
    },
    methods: {
        // 增加 或 減少 counter 計數
        Counter (value) {
            this.counter += value
            console.log(this.counter);
        },
        Slide () {
            // 先取得使用者當前螢幕的寬度
            const clientWidth = document.body.offsetWidth
            const slide = document.querySelector('.switch_photo')

            // i Phone 6, 7, 8, X 寬度 (375px)
            if (clientWidth === 375) {
                this.slideValue = clientWidth - 20 // 355 px
            } 
            // i Phone 6, 7, 8, plus 寬度(414px)
            else if (clientWidth === 414) {
                this.slideValue = clientWidth - 20 // 394 px
            }
            // i pad 寬度 (768px)
            else if (clientWidth === 768) {
                this.slideValue = clientWidth - 20 // 748 px
            }
            // i pad pro 寬度 (1024px)
            else if (clientWidth === 1024) {
                this.slideValue = clientWidth - 148 // 876 px
            }
            // 原始寬度 (355 px (v-card 寬度) )
            else {
                this.slideValue = this.slideValue
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
        },
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

    @media (max-width: 375px) {
        .v-card {
            max-width: 355px !important;
            
        }
        .v-image {
            max-width: 355px !important;
            max-height: 355px !important;
        }
    }

    @media (min-width: 414px) {
        .v-card {
            max-width: 394px !important;
            
        }
        .v-image {
            max-width: 394px !important;
            max-height: 394px !important;
        }
    }

    @media (min-width: 768px) {
        .v-card {
            max-width: 374px !important;
            
        }
        .v-image {
            max-width: 374px !important;
            max-height: 374px !important;
        }
    }

    @media (min-width: 1024px) {
        .v-card {
            max-width: 438px !important;
            
        }
        .v-image {
            max-width: 438px !important;
            max-height: 438px !important;
        }
    }
</style>
