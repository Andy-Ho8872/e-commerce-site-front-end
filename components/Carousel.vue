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
            counter: 0
        }
    },
    methods: {
        // 增加 或 減少 counter 計數
        Counter (value) {
            this.counter += value
            console.log(this.counter);
        },
        // 依據 counter 輪播圖片每次移動 (-355 x counter) px, 355px 為 v-card 寬度
        Slide () {
            // 先取得使用者當前螢幕的寬度
            let clientWidth = document.querySelector('.carousel').offsetWidth
            
            // 
            const slide = document.querySelector('.switch_photo')
            slide.style.transform = `translateX( ${-(this.counter) * 355}px )`
            slide.style.transition = "transform 0.4s ease-in-out"
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

    // @media (max-width: 412px) {
    //     
    // }
</style>
