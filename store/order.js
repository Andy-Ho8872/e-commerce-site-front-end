import { apiGetOrders } from '../APIs/api.js'

export const state = () => ({
    // 使用者的訂單
    orders: [],
})

export const getters = {
    getUserOrder(state) {
        return state.orders
    },
}

export const mutations = {
    SET_USER_ORDER(state, payload) {
        state.orders = payload
    }
}

export const actions = {
    async fetchUserOrder({ commit }) {
        try {
            const res = await apiGetOrders()
            let payload = res.data.orders
            commit('SET_USER_ORDER', payload)
        } 
        catch (error) {
            console.log(error);
            console.log('抓取失敗 from /store/order.js');
        }
    }
}
