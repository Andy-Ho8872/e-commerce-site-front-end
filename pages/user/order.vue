<template>
    <v-container>
        <v-card class="pa-4" rounded="lg" >
            <!-- 若無訂單 -->
            <div v-if="! orders.length" class="ma-4">
                <EmptyOrder />
            </div>
            <!-- 若有訂單 -->
            <v-list v-else max-height="500" class="overflow-y-auto">
                <v-list-item v-for="order in orders" :key="'order' + order.id">
                    <v-list-item-content>
                        <!-- 子標題(導覽連結) -->
                        <nuxt-link :to="{ name: 'order-id-details', params: { id: order.id }}">
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
                            <v-card-subtitle v-if="order.payment_id == payment.id" :key="'payment' + payment.id">
                                付款方式: <span class="font-weight-bold black--text">{{ payment.title }}</span>
                            </v-card-subtitle>
                        </template>
                        <!-- 商品狀態 -->
                        <template v-for="status in status" >
                            <v-card-subtitle v-if="order.status_id == status.id" :key="'status' + status.id">
                                商品狀態: <span class="font-weight-bold black--text">{{ status.title }}</span>
                            </v-card-subtitle>
                        </template>
                        <!-- 訂購時間 -->
                        <v-card-subtitle>
                            訂購時間: <span class="font-weight-bold black--text">{{ $moment(order.created_at).format('YYYY年 MMM Do a h:mm:ss') }}</span>
                        </v-card-subtitle>
                        <!-- 刪除按鈕 -->
                        <div class="btn_container ma-2 pa-2">
                            <DeleteDialog :order="order"/>
                        </div>
                        <!-- 分隔線 -->
                        <v-divider></v-divider>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
import orderMixin from '~/mixins/orderMixin'

export default {
    head() {
        return {
            title: '我的訂單',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '使用者的購物資料'
                }
            ]
        }
    },
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    mixins:[orderMixin]
}
</script>

<style lang="scss"scoped>
@media (max-width: 768px) {
    .btn_container {
        text-align: center;
    }
}
</style>