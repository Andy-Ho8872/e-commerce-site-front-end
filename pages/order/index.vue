<template>
    <v-container>
        <div>您的訂單</div>
        <div>{{ user }}</div>
        <div>{{ orders }}</div>
    </v-container>
</template>

<script>
import { apiGetOrders, apiGetUserInfo } from '../../APIs/api.js'

export default {
    data() {
        return {
            orders: '',
            user: ''
        }
    },

    async mounted() {
        const res = await apiGetOrders()
        const res2 = await apiGetUserInfo()
         
        this.orders = res.data.orders
        this.user = res2.data.user
    },
}
</script>
