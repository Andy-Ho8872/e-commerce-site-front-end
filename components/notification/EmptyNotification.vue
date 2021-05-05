<template>
    <div class="text-center">
        <!-- 圖片 -->
        <v-img
            :src="require('~/static/notification/EmptyNotification.svg')"
            class="mx-auto mb-4"
            max-width="300"
            max-height="300"
        >
        </v-img>
        <!-- 提示文字 -->
        <h2 class="mb-4">目前沒有任何通知。</h2>
    </div>
</template>

<script>
export default {}
</script>

