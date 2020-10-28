<template>
    <div class="carousel">
        <!-- 輪播控制按鈕 -->
        <v-icon large id="prev">fa-angle-left</v-icon>
        <v-icon large id="next">fa-angle-right</v-icon>
        <!-- 輪播圖片 -->
        <div class="d-flex">
            <v-card v-for="(item, index) in products" :key="index" tile >
                <v-img :src="item.url" max-width="400" max-height="300"></v-img>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    props: ['products']

}
</script>

<style lang="scss" scoped>
    .carousel {
        overflow-x: hidden;
        position: relative;
        // 輪播控制按鈕 ( 左 右 )
        #prev {
            left: 5%;
        }
        #next {
            right: 5%;
        }
    }
    .v-icon {
        position: absolute;
        top: 50%;
        z-index: 10;
        color: red;
    }
</style>
