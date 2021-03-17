<template>
    <v-container>
        <div>以下為您的訂單</div>
        

            <table>
                <thead>
                    <tr>
                        <th v-for="(head, index) in tableHeads" :key="index" class="text-center">
                            {{ head.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in userOrder" :key="order.id">
                        <td>{{ order.id }}</td>
                        <td>{{ order.payment_id }}</td>
                        <td>{{ order.status_id }}</td>
                        <td>{{ order.address }}</td>
                        <td>{{ order.created_at.substring(0, 10) }}</td>
                        <td>
                            <nuxt-link :to="{ name: 'order-id', params: { id: order.id }}">
                                查看
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
tbody {
    text-align: center;
    tr {
        border-bottom: 1px solid gray;
        line-height:3rem;
    }
}

table {
    width: 100%;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    border-collapse: collapse;
    
    th {
       padding: 0 16px;
    }
}


@media (max-width: 768px) {
    // th {
    //     width: 100%;
    // }
}
</style>