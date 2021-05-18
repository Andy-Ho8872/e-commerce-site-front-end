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
                    <!-- 對話框 -->
                    <v-dialog v-model="dialog" persistent max-width="290">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="red" dark v-bind="attrs" v-on="on">
                                <v-icon>fa-trash-alt fa-fw</v-icon>
                                <span>刪除所有通知</span>
                            </v-btn>
                        </template>
                        <v-card>
                            <!-- 標題 -->
                            <v-card-title class="headline">刪除所有通知?</v-card-title>
                            <!-- 內容 -->
                            <v-card-text>您確定要刪除所有的通知嗎? 此動作將無法復原。</v-card-text>
                            <!-- 按鈕群組 -->
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" text @click="dialog = false">
                                    <v-icon>fa-long-arrow-alt-left fa-fw</v-icon>
                                    <span class="font-weight-bold">返回</span>
                                </v-btn>
                                <v-btn color="red darken-1" text @click="[dialog = false, deleteAllNotifications()]">
                                    <v-icon>fa-trash-alt fa-fw</v-icon>
                                    <span class="font-weight-bold">刪除</span>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- 已讀按鈕 -->
                    <v-btn 
                    @click="markAllNotifications"
                    class="ma-2 white--text" 
                    :loading="notificationLoading" 
                    :disabled="unReadNotifications.length == 0"
                    color="blue" 
                    >
                        <v-icon>fa-check fa-fw</v-icon>
                        <span>全部設為已讀</span>
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
                                    <v-icon>fa-check fa-fw</v-icon>
                                    <span>設為已讀</span>
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
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    mixins: [notificationMixin],
    data() {
        return {
            dialog: false
        }
    }
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