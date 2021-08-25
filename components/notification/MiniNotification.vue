<template>
    <v-container>
        <!-- 僅顯示未已讀的通知 -->
        <v-card class="pa-4" rounded="lg" :width="cardWidth" :height="cardHeight">
            <p class="text-center text-subtitle-1 font-weight-bold px-2">尚未讀取的通知</p>
            <v-divider></v-divider>
            <!-- 若無通知 -->
            <div v-if="!unReadNotifications.length" class="ma-4">
                <EmptyNotification class="empty_notification"/>
            </div>
            <!-- 若有通知 -->
            <v-list v-else max-height="385" class="overflow-y-auto">
                <template v-for="notification in unReadNotifications">
                    <v-list-item  :key="notification.id">
                        <!-- 通知圖片 -->
                        <v-list-item-avatar tile size="60">
                            <v-img :src="notification.data.avatar_url" alt="OrderConfirmed"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <!-- 標題 -->
                            <v-list-item-title class="py-1 font-weight-bold">
                                {{ notification.data.title }}
                            </v-list-item-title>
                            <!-- 文字 -->
                            <v-list-item-subtitle class="my-2">
                                <span class="font-weight-bold">{{ notification.data.body }}</span>
                            </v-list-item-subtitle>
                            <!-- 時間 -->
                            <v-list-item-subtitle>
                                <span class="font-weight-bold">{{ notification.data.created_at }}</span>
                            </v-list-item-subtitle>
                            <v-divider class="my-2"></v-divider>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <p class="text-center text-subtitle-2">已經沒有通知了</p>
            </v-list>
            <!-- 導向連結 -->
            <nuxt-link :to="{ name: 'user-notification' }">
                <div class="bottom_text user_notification_link text-center">
                    <span class="font-weight-bold pt-3">查看所有通知</span>
                </div>
            </nuxt-link>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        cardWidth: {
            type: [String, Number],
            default: 350
        },
        cardHeight: {
            type: [String, Number],
            default: 500
        },
    },
    computed: {
        ...mapGetters({
            'unReadNotifications': 'notification/getUnreadNotifications'
        })
    }
}
</script>

<style lang="scss" scoped>
.v-card {
    position: relative;
}
.bottom_text {
    position: absolute;
    width: 90%;
    bottom: 2.5%;
    left: 50%;
    transform: translateX(-50%);
    border-top: 1px solid lightgray;
    padding-top: 16px;
}
</style>