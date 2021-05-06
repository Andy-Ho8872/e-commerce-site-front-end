<template>
    <v-container>
        <!-- loading -->
        <LoadingCircle v-if="!user"/>
        <!-- content -->
        <v-card class="pa-4" rounded="lg" v-else>
            <div class="d-flex justify-center align-center text-center text-h6 font-weight-bold">
                歡迎回來 {{ user.email }}
            </div>
            <!-- tabs -->
            <v-tabs centered v-model="tab">
                <v-tab v-for="(item, index) in items" :key="index" >
                    <v-icon>{{ item.icon }}</v-icon>
                    <span>{{ item.title }}</span>
                </v-tab>
            </v-tabs>
            <!-- 分隔線 -->
            <v-divider class="mt-6"></v-divider>
            <!-- tab items -->
            <v-tabs-items v-model="tab">
                <!-- 個人資料 -->
                <v-tab-item>
                    <v-card flat>
                        <!-- 用戶編號 -->
                        <v-card-subtitle>
                            用戶編號: 
                            <span class="font-weight-bold black--text">
                                {{ user.id }}
                            </span>
                        </v-card-subtitle>
                        <!-- 用戶帳號 -->
                        <v-card-subtitle>
                            用戶帳號: 
                            <span class="font-weight-bold black--text">
                                {{ user.email }}
                            </span>
                        </v-card-subtitle>
                        <!-- 加入時間 -->
                        <v-card-subtitle>
                            加入時間: 
                            <span class="font-weight-bold black--text">
                                {{ user.created_at }}
                            </span>
                        </v-card-subtitle>
                    </v-card>
                </v-tab-item>    
                <!-- 我的訂單 -->
                <v-tab-item>
                    <!-- 若無訂單 -->
                    <div v-if="! orders.length" class="ma-4">
                        <EmptyOrder />
                    </div>
                    <!-- 若有訂單 -->
                    <v-list v-else max-height="500" class="overflow-y-auto">
                        <v-list-item v-for="order in orders" :key="order.id">
                            <v-list-item-content>
                                <!-- 子標題(導覽連結) -->
                                <nuxt-link :to="{ name: 'order-details-id', params: { id: order.id }}">
                                    <v-subheader inset class="blue--text">點我查看細項</v-subheader>
                                </nuxt-link>
                                <!-- 編號 -->
                                <v-card-subtitle>
                                    訂單編號: <span class="font-weight-bold black--text">{{ order.id }}</span>
                                </v-card-subtitle>
                                <!-- 地址 -->
                                <v-card-subtitle>
                                    送達地址: <span class="font-weight-bold black--text">{{ order.address }}</span>
                                </v-card-subtitle>
                                <!-- 付款方式 -->
                                <template v-for="payment in payments" >
                                    <v-card-subtitle v-if="order.payment_id == payment.id" :key="payment.id">
                                        付款方式: <span class="font-weight-bold black--text">{{ payment.title }}</span>
                                    </v-card-subtitle>
                                </template>
                                <!-- 商品狀態 -->
                                <template v-for="(status, index) in status" >
                                    <v-card-subtitle v-if="order.status_id == status.id" :key="index" >
                                        商品狀態: <span class="font-weight-bold black--text">{{ status.title }}</span>
                                    </v-card-subtitle>
                                </template>
                                <!-- 訂購時間 -->
                                <v-card-subtitle>
                                    訂購時間: <span class="font-weight-bold black--text">{{ order.created_at }}</span>
                                </v-card-subtitle>
                                <!-- 刪除按鈕 -->
                                <div class="btn_container">
                                    <v-btn 
                                    @click="deleteSingleOrder(order.id)" 
                                    class="ma-4 pa-4 white--text" 
                                    :loading="loading" 
                                    :disabled="loading"
                                    color="red" 
                                    >
                                        刪除這筆訂單
                                    </v-btn>
                                </div>
                                <!-- 分隔線 -->
                                <v-divider></v-divider>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-tab-item>
                <!-- 通知總覽 -->
                <v-tab-item>
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
                            class="ma-4 pa-4 white--text" 
                            :loading="notificationLoading" 
                            color="red" 
                            >
                                刪除所有通知
                            </v-btn>
                            <!-- 已讀按鈕 -->
                            <v-btn 
                            @click="markAllNotifications"
                            class="ma-4 pa-4 white--text" 
                            :loading="notificationLoading" 
                            :disabled="unReadNotifications.length == 0"
                            color="blue" 
                            >
                                全部設為已讀
                            </v-btn>
                        </div>
                        <template v-for="notification in notifications" >
                            <v-list-item two-line :key="notification.id">
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
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
import orderMixin from '~/mixins/orderMixin'
import { mapGetters, mapActions } from 'vuex'

export default {
    mixins:[orderMixin],
    data() {
        return {
            tab: null,
            items: [
                {
                    icon: 'fa-address-book fa-fw',
                    title: '個人資料',
                },
                {
                    icon: 'fa-list-alt fa-fw',
                    title: '我的訂單',
                },
                {
                    icon: 'fa-bell fa-fw',
                    title: '通知總覽',
                },
            ],
        }
    },
    computed: {
        ...mapGetters({
            notifications: 'notification/getNotifications', //* 所有通知
            unReadNotifications: 'notification/getUnreadNotifications', //* 未讀取的通知 
            notificationLoading: 'notification/getLoading' //* loading 狀態
        })
    },
    methods: {
        ...mapActions({
            //* 標示為已讀 
            markNotification: 'notification/markNotification', //? 單筆通知
            markAllNotifications: 'notification/markAllNotifications', //? 所有通知 
            //* 刪除通知 
            deleteAllNotifications: 'notification/deleteAllNotifications' //? 所有通知
        })
    }
}
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
    .btn_container {
        text-align: center;
    }
}
</style>