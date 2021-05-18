<template>
    <!-- 提示訊息 -->
    <v-scroll-y-transition>
        <v-alert v-if="message" dark border="left" :type="message.type">
            {{ message.text }}
        </v-alert>
    </v-scroll-y-transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            message: 'globalMessage/getMessage', //* 提示訊息
        }),
    },
}
</script>
