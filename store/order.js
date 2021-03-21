import { apiGetAllOrders, apiGetSingleOrder } from '../APIs/api.js'

export const state = () => ({
    // 使用者的所有訂單
    orders: [],
    // 單筆訂單
    order: [],
})

export const getters = {
    getAllOrders(state) {
        return state.orders
    },
    getSingleOrder(state) {
        return state.order
    },
}

export const mutations = {
    SET_ALL_ORDERS(state, payload) {
        state.orders = payload
    },
    SET_SINGLE_ORDER(state, payload) {
        state.order = payload
    },
}

export const actions = {
    // 撈取所有訂單
    async fetchAllOrders({ commit }) {
        try {
            const res = await apiGetAllOrders()
            let payload = res.data.orders
            commit('SET_ALL_ORDERS', payload)
        } catch (error) {
            console.log(error)
            console.log('抓取失敗 from /store/order.js')
        }
    },
    // 撈取單筆訂單
    async fetchSingleOrder({ commit }, orderId) {
        try {
            const res = await apiGetSingleOrder(orderId)
            let payload = res.data.order
            commit('SET_SINGLE_ORDER', payload)
        } catch (error) {
            console.log(error)
            console.log('抓取失敗 from /store/order.js')
        }
    },
}
