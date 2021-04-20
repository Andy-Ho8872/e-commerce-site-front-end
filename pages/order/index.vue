<template>
    <v-container>
        <!-- loading -->
        <div class="text-center" v-if="!user">
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            >
            </v-progress-circular>
        </div>
        <!-- content -->
        <div v-else>
            <div class="text-center text-h5 mb-6" >
                您好，{{ user.email }}，以下為您的訂單
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
                    <tr v-for="order in orders" :key="order.id">
                        <!-- 訂單編號 -->
                        <td data-title="訂單編號" id="order_id">
                            <span>{{ order.id }}</span>
                        </td>
                        <!-- 付款方式 -->
                        <td data-title="付款方式" id="payment_id">
                            <!-- 顯示符合付款 id 的名稱 -->
                            <template v-for="payment in payments">
                                <div v-if="order.payment_id == payment.id" :key="payment.id">
                                    {{ payment.title }}
                                </div>
                            </template> 
                            <!-- 寫法 二 -->
                            <!-- <span>{{ payments.filter((p) => p.id !== order.payment_id) }}</span> -->
                        </td>
                        <!-- 出貨狀態 -->
                        <td data-title="出貨狀態" id="status_id">
                            <!-- 顯示符合出貨狀態 id 的名稱 (可在優化) -->
                            <template v-for="status in status">
                                <div v-if="order.status_id == status.id" :key="status.id">
                                    {{ status.title }}
                                </div>
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
                        <!-- 送達地址 -->
                        <td data-title="送達地址" id="address">
                            <span>{{ order.address }}</span>
                        </td>
                        <!-- 訂購時間 -->
                        <td data-title="訂購時間" id="created_at">
                            <span>{{ order.created_at.substring(0, 10) }}</span>
                        </td>
                        <!-- 訂單操作 -->
                        <td data-title="編輯操作" id="actions">
                            <!-- 刪除 -->
                            <v-btn dark rounded color="red lighten-1" class="ma-1" @click="deleteSingleOrder(order.id)">
                                刪除
                            </v-btn>
                            <!-- 查看 -->
                            <nuxt-link :to="{ name: 'order-details-id', params: { id: order.id }}">
                                <v-btn dark rounded color="light-blue" class="ma-1">
                                    查看
                                </v-btn>
                            </nuxt-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            tableHeads: [
                { title: '訂單編號' },
                { title: '付款方式' },
                { title: '出貨狀態' },
                { title: '商品個數' },
                { title: '金額總計' },
                { title: '送達地址' },
                { title: '訂購時間' },
                { title: '編輯操作' },
            ],
        }
    },
    methods: {
        ...mapActions({
            fetchAllOrders: 'order/fetchAllOrders',
            deleteSingleOrder: 'order/deleteSingleOrder',
        }),
    },
    computed: {
        ...mapGetters({
            // 使用者的資料
            user: 'auth/getUserInfo',
            // 訂單相關的資料
            orders: 'order/getAllOrders', // 所有訂單
            payments: 'order/getPayments', // 付款方式
            status: 'order/getStatus', // 商品狀態
        }),
        filteredPayment() {
            return this.payments.filter((payment) => {
                payment.id !== order.payment_id
            })
        }
    },
}
</script>

<style lang="scss" scoped>
$letter-spacing: 0.125rem;
$padding: 10%;
$td-padding: 1.5rem 0;
// only for RWD
$title-font-weight: 600;

a {
    text-decoration: none;
}
table {
    width: 100%;
    border-collapse: collapse;
    border-bottom: 4px solid;
    box-shadow: 2px 2px 4px #eceff1;
    th {
        letter-spacing: $letter-spacing;
        padding: 1rem;
    }
}
tbody {
    text-align: center;
    td {
        padding: $td-padding;
        font-weight: $title-font-weight;
        letter-spacing: $letter-spacing;
        max-width: 200px;
    }
    tr {
        &:hover {
            transform: scale(1.035);
            transition: all .3s ease-out;
        }
        &:nth-child(even) {
            background: #fff;
        }
    }
}

@media (max-width: 768px) {
    th {
        display: none;
    }
    tbody {
        td {
            max-width: 100%;
            display: block;
            position: relative;
            text-align: right;
            padding-right: $padding;
            // 除了最後一個元素之外，其餘的都要加上底線
            &:not(:last-child) {
                border-bottom: 1px solid #b0bec5;
            }
            // 表格標題
            &::before {
                content: attr(data-title);
                position: absolute;
                font-weight: $title-font-weight;
                letter-spacing: $letter-spacing;
                padding-left: $padding;
                left: 0;
            }
            // 測試 span
            span {
                display: flex;
                flex-wrap: wrap;
                padding-left: 40%;
                justify-content: flex-end;
                align-items: center;
                text-align: justify;
            }
        }
    }
}
</style>
