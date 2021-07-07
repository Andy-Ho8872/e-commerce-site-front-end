<template>
    <div class="text-center">
        <!-- 圖片 -->
        <v-img
            :src="require('~/static/notification/EmptyNotification.svg')"
            class="mx-auto mb-4"
            :max-width="width"
            :max-height="height"
        >
        </v-img>
        <!-- 提示文字 -->
        <h2 class="mt-12">{{ text }}</h2>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: [String, Number],
            default: 300
        },
        height: {
            type: [String, Number],
            default: 300
        },
        text: {
            type: String,
            default: "目前沒有任何通知"
        }
    }
}
</script>

