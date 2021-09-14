<template>
    <!-- 骨架屏 -->
    <v-sheet elevation="2" :width="cardWidth" :height="cardHeight">
        <!-- 圖片和標題 -->
        <v-skeleton-loader type="card"></v-skeleton-loader>
        <!-- 文字敘述 -->
        <v-skeleton-loader type="text" class="mx-4"></v-skeleton-loader>
        <v-skeleton-loader type="text" class="ml-4 mr-16 mt-4"></v-skeleton-loader>
    </v-sheet>
</template>

<script>
export default {
    //? passed from pages/index.vue
    props:{
        cardWidth: {
            type: Number,
            default: 200
        },
        cardHeight: {
            type: Number,
            default: 330
        }
    }
}
</script>

<style></style>
