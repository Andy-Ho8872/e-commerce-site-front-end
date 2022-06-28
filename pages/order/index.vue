<template>
    <v-container>
        <!-- loading -->
        <LoadingCircle v-if="!user"/>
        <!-- 若無訂單 -->
        <EmptyOrder class="empty_order_component" v-else-if="!orders.length"/>
        <!-- 若有訂單 -->
        <div v-else>
            <div class="text-center text-subtitle-1 text-md-h5 mb-6">
                您好，<span class="font-weight-bold">{{ user.name || user.email }}</span>，以下為您的訂單
                <v-divider class="mt-2 mb-8"></v-divider>
            </div>
            <v-row>
                <v-col v-for="order in orders" :key="'order' + order.id" cols="12" sm="6" md="4" lg="3">
                    <v-card rounded="lg" class="ma-2">
                        <v-card-title>
                            <span class="blue--text text-subtitle-2 text-md-h6 font-weight-bold">#{{ order.id }}</span>
                            <span class="text-subtitle-2 text-md-subtitle-1 font-weight-bold mx-4">{{ order.items_count }} 樣商品</span>
                            <span class="text-subtitle-2 text-md-subtitle-1 font-weight-bold">於 {{ order.created_at }} 訂購</span>
                        </v-card-title>
                        <v-divider class="mx-4"></v-divider>
                        <!-- 配送訊息 -->
                        <v-card-title class="font-weight-bold">配送訊息</v-card-title>
                        <v-card-subtitle class="font-weight-bold">
                            <div class="my-4">付款方式:
                                <template v-for="payment in payments">
                                    <v-chip 
                                        v-if="order.payment_id == payment.id" :key="'payment' + payment.id"
                                        class="payment_id mx-2"
                                        color="blue"
                                        text-color="white"
                                        label
                                        small>
                                        {{ payment.title }}
                                    </v-chip>
                                </template>
                            </div>
                            <div class="my-4">出貨狀態:
                                <template v-for="status in status">
                                    <v-chip 
                                        v-if="order.status_id === status.id" :key="'status' + status.id"
                                        class="status_id mx-2"
                                        color="orange"
                                        text-color="white"
                                        label
                                        small>
                                        {{ status.title }}
                                    </v-chip>
                                </template>
                            </div>
                            <div class="my-4">消費總計: 
                                <span class="red--text mx-2">{{ order.sumSubtotal }}</span>
                            </div>
                            <div class="my-4">送達地址: 
                                <span class="mx-2">{{ order.address }}</span>
                            </div>
                        </v-card-subtitle>
                        <!-- 買家資訊 -->
                        <v-card-title class="font-weight-bold">買家資訊</v-card-title>
                        <v-card-subtitle class="font-weight-bold">
                            <div class="my-4">買家姓名: 
                                <span class="mx-2">{{ order.buyer_name }}</span>
                            </div>
                            <div class="my-4">買家電話: 
                                <span class="mx-2">{{ order.buyer_phone }}</span>
                            </div>
                        </v-card-subtitle>
                        <!-- 編輯操作 -->
                        <v-card-title class="font-weight-bold">編輯操作</v-card-title>
                        <v-card-subtitle>
                            <DeleteDialog :order="order" class="delete_dialog_component"/>
                            <v-btn class="nav_button my-2 mx-2" color="primary" nuxt :to="{ name: 'order-id-details', params: { id: order.id } }">查看</v-btn>
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import orderMixin from '~/mixins/orderMixin'

export default {
    head() {
        return {
            title: '訂單總覽',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '使用者的訂單與細項。'
                }
            ]
        }
    },
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    mixins:[orderMixin],
    data() {
        return {
            tableHeads: [
                { title: '訂單編號' },
                { title: '付款方式' },
                { title: '出貨狀態' },
                { title: '商品個數' },
                { title: '金額總計' },
                { title: '買家姓名' },
                { title: '買家電話' },
                { title: '送達地址' },
                { title: '訂購時間' },
                { title: '編輯操作' },
            ],
        }
    },
}
</script>
// style 在 main.css 