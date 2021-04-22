<template>
<!-- 骨架屏 -->
    <v-sheet tile elevation="2" class="pb-2" :width="cardWidth">
        <!-- 圖片和標題 -->
        <v-skeleton-loader 
            type="card">
        </v-skeleton-loader>
        <!-- 文字敘述 -->
        <v-skeleton-loader 
            type="list-item-two-line">
        </v-skeleton-loader>
        <!-- 標籤 -->
        <div class="d-flex">
            <v-skeleton-loader class="mx-4"
                type="chip">
            </v-skeleton-loader>
            <v-skeleton-loader
                type="chip">
            </v-skeleton-loader>
        </div>
    </v-sheet>
</template>

<script>
export default {
    //? passed from pages/index.vue
    props:{
        'cardWidth': Number
    }
}
</script>
