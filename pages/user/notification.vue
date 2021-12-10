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
                    <v-dialog v-model="dialog" persistent max-width="600">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="red" outlined v-bind="attrs" v-on="on">
                                <span>刪除所有通知</span>
                            </v-btn>
                        </template>
                        <v-card>
                            <!-- 標題 -->
                            <v-card-title class="headline font-weight-bold">刪除所有通知?</v-card-title>
                            <!-- 內容 -->
                            <v-card-text class="font-weight-bold">您確定要刪除所有的通知嗎? 此動作將無法復原。</v-card-text>
                            <!-- 按鈕群組 -->
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" outlined @click="dialog = false">
                                    <span class="font-weight-bold">返回</span>
                                </v-btn>
                                <v-btn color="red darken-1" outlined @click="[dialog = false, deleteAllNotifications()]">
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
                        <span>全部設為已讀</span>
                    </v-btn>
                </div>
                <template v-for="notification in notifications" >
                    <v-list-item  :key="notification.id">
                        <!-- 通知圖片 -->
                        <v-list-item-avatar tile size="100">
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
                            <v-list-item-subtitle class="my-2">
                                <span class="font-weight-bold">{{ $moment(notification.data.created_at).format('YYYY年 MMM Do a h:mm:ss') }}</span>
                            </v-list-item-subtitle>
                            <!-- 已讀時間 -->
                            <v-list-item-subtitle class="my-2" v-show="notification.read_at">
                                <span class="font-weight-bold">在 {{ $moment(notification.read_at).format('YYYY年 MMM Do a h:mm:ss') }} 看過這則通知</span>
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
    head() {
        return {
            title: '通知總覽',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '使用者所接收到的通知'
                }
            ]
        }
    },
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