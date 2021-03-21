<template>
    <v-container>
        <!-- {{ order }} -->

        {{ userOrder }}
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { apiGetSingleOrder } from '../../../APIs/api'

export default {
    // asyncData 的方法，因為要使用 localStorage 取得 User 的 Token，所以如果直接在網址上輸入 order/order_id 的話會報錯。
    // async asyncData({ params }) {
    //     const res = await apiGetSingleOrder(params.id)
    //     return { order: res.data.order }
    // },
    methods: {
        ...mapActions({
            fetchSingleOrder: 'order/fetchSingleOrder',
        }),
    },
    computed: {
        ...mapGetters({
            userOrder: 'order/getSingleOrder',
        }),
    },
    mounted() {
        this.fetchSingleOrder(this.$route.params.id)
    }
}
</script>

<style>

</style>
