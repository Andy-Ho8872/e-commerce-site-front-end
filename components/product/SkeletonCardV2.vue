<template>
    <!-- 骨架屏 -->
    <v-sheet elevation="2" class="card_content ma-auto">
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

<style lang="scss" scoped>
.card_content {
    width: 200px;
}
@media (max-width: 415px) {
    .card_content {
        width: 100%;
    }
}
</style>
