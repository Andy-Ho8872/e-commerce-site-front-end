<template>
  <!-- 骨架屏 -->
    <v-sheet tile elevation="4" :height="cardHeight" class="loading d-flex justify-center align-center">
        <div class="text">
            LOADING...
        </div>
    </v-sheet>
</template>

<script>
export default {
    props:['cardWidth', 'cardHeight']
}
</script>

<style lang="scss" scoped>
    .text {
        font-family: 'Poppins', sans-serif;
        letter-spacing: 8px;
    }
</style>
