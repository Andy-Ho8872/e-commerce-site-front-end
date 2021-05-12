<template>
    <v-container>
        <v-card class="pa-4" rounded="lg" >
            <!-- 若無通知 -->
            <div v-if="!notifications.length" class="ma-4">
                <EmptyNotification />
            </div>
            <!-- 若有通知 -->
            <v-list v-else max-height="500" class="overflow-y-auto">
                <!-- 刪除按鈕 -->
                <div class="btn_container">
                    <v-btn 
                    @click="deleteAllNotifications"
                    class="ma-2 white--text" 
                    :loading="notificationLoading" 
                    color="red" 
                    >
                        刪除所有通知
                    </v-btn>
                    <!-- 已讀按鈕 -->
                    <v-btn 
                    @click="markAllNotifications"
                    class="ma-2 white--text" 
                    :loading="notificationLoading" 
                    :disabled="unReadNotifications.length == 0"
                    color="blue" 
                    >
                        全部設為已讀
                    </v-btn>
                </div>
                <template v-for="notification in notifications" >
                    <v-list-item  :key="notification.id">
                        <!-- 通知圖片 -->
                        <v-list-item-avatar tile size="80">
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
                            <!-- 已讀按鈕 -->
                            <div class="btn_container">
                                <v-btn 
                                @click="markNotification(notification)"
                                class="ma-4 pa-4 white--text" 
                                :loading="notificationLoading"
                                :disabled="notification.read_at !== null" 
                                color="blue" 
                                >
                                    設為已讀
                                </v-btn>
                            </div>
                            <v-divider class="my-2"></v-divider>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
import notificationMixin from '~/mixins/notificationMixin'

export default {
    mixins: [notificationMixin]
}
</script>

<style lang="scss"scoped>
@media (max-width: 768px) {
    .v-list-item {
        min-height: 0;
        flex-direction: column;
    }
    .btn_container {
        text-align: center;
    }
}
</style>