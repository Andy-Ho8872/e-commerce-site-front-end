<template>
    <v-container>
        <div class="text-center text-h4 mb-6">您好，User，以下為您的訂單</div>
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
                <tr v-for="order in userOrder" :key="order.id">
                    <!-- 訂單編號 -->
                    <td data-title="訂單編號" id="order_id">
                        {{ order.id }}
                    </td>
                    <!-- 付款方式 -->
                    <td data-title="付款方式" id="payment_id">
                        {{ order.payment_id == 1 ? '貨到付款' : '刷卡付款' }}
                    </td>
                    <!-- 出貨狀態 -->
                    <td data-title="出貨狀態" id="status_id">
                        {{ order.status_id == 1 ? '出貨中' : '已到貨' }}
                    </td>
                    <!-- 購買件數 -->
                    <td data-title="商品個數" id="items_count">
                        {{ order.items_count }} 件商品
                    </td>
                    <!-- 金額總計 -->
                    <td data-title="金額總計" id="sumSubtotal">
                        <span class="red--text text--lighten-1">{{ order.sumSubtotal }}</span>
                    </td>
                    <!-- 送達地址 -->
                    <td data-title="送達地址" id="address">
                        {{ order.address.substring(0, 10) }}
                    </td>
                    <!-- 訂購時間 -->
                    <td data-title="訂購時間" id="created_at">
                        {{ order.created_at.substring(0, 10) }}
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
            userOrder: 'order/getAllOrders',
        }),
    },
}
</script>

// <style lang="scss" scoped>
// $letter-spacing: 0.125rem;
// $padding: 10%;
// $td-padding: 1.5rem 0;
// // only for RWD
// $title-font-weight: 600;

// a {
//     text-decoration: none;
// }
// table {
//     width: 100%;
//     border-collapse: collapse;
//     border-bottom: 4px solid;
//     box-shadow: 2px 2px 4px #eceff1;
//     th {
//         letter-spacing: $letter-spacing;
//         padding: 1rem;
//     }
// }
// tbody {
//     text-align: center;
//     td {
//         padding: $td-padding;
//         font-weight: $title-font-weight;
//         letter-spacing: $letter-spacing;
//     }
//     tr {
//         &:hover {
//             transform: scale(1.05);
//         }
//         &:nth-child(even) {
//             background: #fff;
//         }
//     }
// }

// @media (max-width: 768px) {
//     th {
//         display: none;
//     }
//     tbody {
//         td {
//             display: block;
//             position: relative;
//             text-align: right;
//             padding-right: $padding;
//             // 除了最後一個元素之外，其餘的都要加上底線
//             &:not(:last-child) {
//                 border-bottom: 1px solid #b0bec5;
//             }
//             // 表格標題
//             &::before {
//                 content: attr(data-title);
//                 position: absolute;
//                 font-weight: $title-font-weight;
//                 letter-spacing: $letter-spacing;
//                 padding-left: $padding;
//                 left: 0;
//             }
//         }
//     }
// }
// </style>
