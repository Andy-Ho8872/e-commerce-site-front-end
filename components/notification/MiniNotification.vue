<template>
    <v-container>
        <!-- 僅顯示未已讀的通知 -->
        <v-card class="pa-4" rounded="lg" width="350" height="500">
            <p class="text-center text-subtitle-1 font-weight-bold px-2">尚未讀取的通知</p>
            <v-divider></v-divider>
            <!-- 若無通知 -->
            <div v-if="!unReadNotifications.length" class="ma-4">
                <EmptyNotification />
            </div>
            <!-- 若有通知 -->
            <v-list v-else max-height="385" class="overflow-y-auto">
                <template v-for="notification in unReadNotifications">
                    <v-list-item  :key="notification.id">
                        <!-- 通知圖片 -->
                        <v-list-item-avatar tile size="40">
                            <v-img :src="require('~/static/order/OrderConfirmed.svg')"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <!-- 標題 -->
                            <v-list-item-title class="py-1 font-weight-bold">
                                {{ notification.data.title }}
                            </v-list-item-title>
                            <!-- 訂單編號 -->
                            <v-list-item-subtitle class="my-2">
                                訂單編號 - <span class="font-weight-bold">{{ notification.data.order_id }}</span>
                            </v-list-item-subtitle>
                            <!-- 訂購時間 -->
                            <v-list-item-subtitle>訂購時間 - 
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
                <div class="bottom_text text-center">
                    <span class="font-weight-bold pt-3">查看所有通知</span>
                </div>
            </nuxt-link>
        </v-card>
    </v-container>
</template>

<script>
import notificationMixin from '~/mixins/notificationMixin'

export default {
    mixins: [notificationMixin]
}
</script>

<style lang="scss" scoped>
.v-card {
    position: relative;
}
//* 隱藏 scroll bar 
.v-list::-webkit-scrollbar {
    display: none;
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