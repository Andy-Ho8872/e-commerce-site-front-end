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
            <!-- 表格內容 -->
            <table class="light-blue darken-1 rounded-xl">
                <!-- 標題 -->
                <thead class="white--text font-weight-bold">
                    <tr>
                        <th v-for="(head, index) in tableHeads" :key="index" class="text-center">
                            {{ head.title }}
                        </th>
                    </tr>
                </thead>
                <!-- 訂單細項 -->
                <tbody class="grey lighten-3 blue-grey--text text--darken-4">
                    <tr v-for="order in orders" :key="'order' + order.id">
                        <!-- 訂單編號 -->
                        <td data-title="訂單編號" id="order_id">         
                            <span class="blue--text">#{{ order.id }}</span>
                        </td>
                        <!-- 付款方式 -->
                        <td data-title="付款方式" id="payment_id">
                            <!-- 顯示符合付款 id 的名稱 -->
                            <template v-for="payment in payments">
                                <span v-if="order.payment_id == payment.id" :key="'payment' + payment.id">
                                    {{ payment.title }}
                                </span>
                            </template> 
                            <!-- 寫法 二 -->
                            <!-- <span>{{ payments.find((payment) => payment.id == order.payment_id).title }}</span> -->
                        </td>
                        <!-- 出貨狀態 -->
                        <td data-title="出貨狀態" id="status_id">
                            <!-- 顯示符合出貨狀態 id 的名稱 (可在優化) -->
                            <template v-for="status in status">
                                <v-btn rounded v-if="order.status_id == status.id" :key="'status' + status.id" 
                                    class="font-weight-bold"
                                    :class="status.title == '出貨中' ? 'yellow lighten-3 yellow--text text--darken-4' : 'green accent-1 green--text text-darken-4'"
                                >
                                    {{ status.title }}
                                </v-btn>
                            </template>
                        </td>
                        <!-- 購買件數 -->
                        <td data-title="商品個數" id="items_count">
                            <span>{{ order.items_count }} 件商品</span> 
                        </td>
                        <!-- 金額總計 -->
                        <td data-title="金額總計" id="sumSubtotal">
                            <span class="red--text text--lighten-1">{{ order.sumSubtotal }}</span>
                        </td>
                        <!-- 買家姓名 -->
                        <td data-title="買家姓名" id="buyer_name">
                            <span>{{ order.buyer_name }}</span>
                        </td>
                        <!-- 買家電話 -->
                        <td data-title="買家電話" id="buyer_phone">
                            <span>{{ order.buyer_phone }}</span>
                        </td>
                        <!-- 送達地址 -->
                        <td data-title="送達地址" id="address">
                            <span>{{ order.address }}</span>
                        </td>
                        <!-- 訂購時間 -->
                        <td data-title="訂購時間" id="created_at">
                            <span>{{ order.created_at }}</span>
                        </td>
                        <!-- 訂單操作 -->
                        <td data-title="編輯操作" id="actions">
                            <div class="btn_container">
                                <!-- 按鈕群組 -->
                                <DeleteDialog :order="order" class="delete_dialog_component"/>
                                <!-- 查看 --> 
                                <v-btn class="nav_button" color="primary" dark nuxt :to="{ name: 'order-id-details', params: { id: order.id }}">
                                    查看
                                </v-btn>   
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
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