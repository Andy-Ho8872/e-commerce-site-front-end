<template>
<!-- 可以設置 max-width 來限制輪播的寬度 -->
    <div class="carousel">
        <!-- 輪播控制按鈕 -->
        <v-icon 
            large class="switchBtn" 
            id="prev" 
            @click="subtractCounter() ; Slide()">
            fa-angle-left
        </v-icon>
        <v-icon 
            large class="switchBtn" 
            id="next" 
            @click="addCounter() ; Slide()">
            fa-angle-right
        </v-icon>
        <!-- 輪播圖片 -->
        <div class="switch_photo d-flex ">
            <v-card v-for="(item, index) in products" :key="index" tile max-width="400" >
                <v-img :src="item.url" max-width="400" max-height="400" class="my-auto"></v-img>
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
        addCounter () {
            this.counter++
            console.log(this.counter);
        },
        subtractCounter () {
            this.counter--
            console.log(this.counter);
        },
        // 輪播圖片每次移動 -400px
        Slide () {
            const slide = document.querySelector('.switch_photo')
            slide.style.transform = `translateX( ${-(this.counter) * 400}px )`
            slide.style.transition = "transform 0.4s ease-in-out"
            // 若圖片已達最左邊
            if (this.counter < 0) {
                // 將移動量重為 0 (即不動)
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
</style>
