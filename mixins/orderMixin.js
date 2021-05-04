//* 使用在 pages/user/index.vue 和 pages/order/index.vue
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            //* 使用者的資料
            user: 'auth/getUserInfo',
            //* 訂單相關的資料
            orders: 'order/getAllOrders', //* 所有訂單
            payments: 'order/getPayments', //* 付款方式
            status: 'order/getStatus', //* 商品狀態
            //* loading 狀態
            loading: 'order/getLoading'
        }),
    },
    methods: {
        ...mapActions({
            //* 刪除訂單
            deleteSingleOrder: 'order/deleteSingleOrder',
        })
    }
}