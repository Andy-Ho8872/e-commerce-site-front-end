<template>
    <v-container>
        <v-hover>
            <v-expand-transition>
                <v-card class="pa-4" rounded="lg" width="300" height="450">
                    <!-- 若無通知 -->
                    <div v-if="!notifications.length" class="ma-4">
                        <EmptyNotification />
                    </div>
                    <!-- 若有通知 -->
                    <v-list v-else max-height="450" class="overflow-y-auto">
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
                                    <v-divider class="my-2"></v-divider>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                    <v-divider></v-divider>
                    <!-- 導向連結 -->
                    <nuxt-link :to="{ name: 'user-notification' }">
                        <div>查看所有通知</div>
                    </nuxt-link>
                </v-card>
            </v-expand-transition>
        </v-hover>
    </v-container>
</template>

<script>
export default {

}
</script>