<template>
    <v-container>
        <div class="text-center text-h4 mb-6">您好，User，以下為您的訂單</div>
        <table class="light-blue darken-1 rounded-xl">
            <thead class="white--text font-weight-bold">
                <tr>
                    <th v-for="(head, index) in tableHeads" :key="index" class="text-center">
                        {{ head.title }}
                    </th>
                </tr>
            </thead>
            <tbody class="grey lighten-3 blue-grey--text text--darken-4">
                <tr v-for="order in userOrder" :key="order.id">
                    <td data-title="訂單編號">{{ order.id }}</td>
                    <td data-title="付款方式">{{ order.payment_id }}</td>
                    <td data-title="出貨狀態">{{ order.status_id }}</td>
                    <td data-title="送達地址">{{ order.address }}</td>
                    <td data-title="訂購時間">{{ order.created_at.substring(0, 10) }}</td>
                    <td data-title="編輯操作">
                        <nuxt-link :to="{ name: 'order-id', params: { id: order.id } }">
                            <v-btn color="light-blue" dark rounded>查看</v-btn>
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
                { title: '送達地址' },
                { title: '訂購時間' },
                { title: '編輯操作' },
            ],
        }
    },
    methods: {
        ...mapActions({
            fetchOrder: 'order/fetchUserOrder',
        }),
    },
    computed: {
        ...mapGetters({
            userOrder: 'order/getUserOrder',
        }),
    },
    mounted() {
        this.fetchOrder()
    },
}
</script>

<style lang="scss" scoped>
$letter-spacing: 0.125rem;
$padding: 10%;
$td-padding: 1.5rem 0;
// only for RWD
$title-font-weight: 800;

a {
    text-decoration: none;
}
table {
    width: 100%;
    border-collapse: collapse;
    border-bottom: 4px solid;
    box-shadow: 2px 2px 4px #ECEFF1;
    th {
        letter-spacing: $letter-spacing;
        padding: 1rem;
    }
}
tbody {
    text-align: center;
    td {
        padding: $td-padding;
    }
    tr {
        &:hover {
            transform: scale(1.05);
        }
        &:nth-child(even) {
            background: #FFF;
        }
    }
}

@media (max-width: 768px) {
    th {
        display: none;
    }
    tbody {
        td {
            display: block;
            position: relative;
            text-align: right;
            padding-right: $padding;
            // 除了最後一個元素之外，其餘的都要加上底線
            &:not(:last-child) {
                border-bottom: 1px solid #B0BEC5;
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
        }
    }
}
</style>
