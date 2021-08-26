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
    orders: [],
    //* 付款方式
    payments: [],
    //* 商品狀態
    status: [],
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