export const state = () => ({
    //* 單筆訂單 (測試)
    order: {
        id: 1,
        items: [
            {
                id: 1,
                title: "item-1"
            },
            {
                id: 2,
                title: "item-22"
            },
        ]
    },
    //* 所有訂單
    orders: [
        {
            id: 1,
            payment_id: 1,
            status_id: 1,
            items_count: 2,
            sumSubtotal: 1380,
            address: '桃園市OO區OO路OO號',
            created_at: '2021/09/04'
        },
        {
            id: 2,
            payment_id: 1,
            status_id: 1,
            items_count: 4,
            sumSubtotal: 3660,
            address: '桃園市OO區OO路OO號',
            created_at: '2021/09/05'
        },
    ],
    //* 付款方式
    payments: [
        {
            id: 1,
            title: '現金付款'
        },
        {
            id: 2,
            title: '刷卡付款'
        },
    ],
    //* 商品狀態
    status: [
        {
            id: 1,
            title: '出貨中'
        },
        {
            id: 2,
            title: '已到貨'
        }
    ],
    //* */ loading 狀態
    loading: false
})
export const getters = {
    getAllOrders(state) {
        return state.orders
    },
    getLoading(state) {
        return state.loading
    },
    getPayments(state) {
        return state.payments
    },
    getStatus(state) {
        return state.status
    }
}
export const mutations = {
    //* 訂單相關
    SET_ALL_ORDERS(state, orders) {
        state.orders = orders
    },
    REMOVE_SINGLE_ORDER: jest.fn((state) => {
        state.order = {}
    })
}
export const actions = {
    fetchAllOrders: jest.fn(),
    fetchTableColumns: jest.fn(),
    deleteSingleOrder: jest.fn(({ commit }) => {
        commit('REMOVE_SINGLE_ORDER')
    })
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}