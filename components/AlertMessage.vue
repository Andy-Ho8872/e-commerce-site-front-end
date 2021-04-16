<template>
    <!-- 提示訊息 -->
    <v-alert v-if="message" dark border="left" :type="message.type">
        {{ message.text }}
    </v-alert>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            message: 'cart/getMessage', // 提示訊息
        }),
    },
}
</script>
