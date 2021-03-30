import {
    apiGetFormData,
    apiCreateOrder,
    apiGetAllOrders,
    apiGetSingleOrder,
    apiDeleteSingleOrder,
} from '../APIs/api.js'

export const state = () => ({
    // 後端回傳的表單資訊
    formData: [],
    // 使用者的所有訂單
    orders: [],
    // 單筆訂單
    order: [],
    // 點擊 id 紀錄
    lastClickedRecord: null,
})

export const getters = {
    getFormData(state) {
        return state.formData
    },
    getAllOrders(state) {
        return state.orders
    },
    getSingleOrder(state) {
        return state.order
    },
}

export const mutations = {
    SET_FORM_DATA(state, payload) {
        state.formData = payload
    },
    SET_ALL_ORDERS(state, payload) {
        state.orders = payload
    },
    SET_SINGLE_ORDER(state, payload) {
        state.order = payload
    },
    CLEAR_SINGLE_ORDER(state) {
        state.order = []
    },
    SET_LAST_CLICKED_RECORD(state, payload) {
        state.lastClickedRecord = payload
    },
}

export const actions = {
    // 撈取後端表單資料
    async fetchFormData({ commit }) {
        try {
            const res = await apiGetFormData()
            let payload = res.data.payments
            commit('SET_FORM_DATA', payload)
        } catch (error) {
            console.log('抓取失敗 from /store/order.js')
        }
    },
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
    async fetchSingleOrder({ commit, state }, orderId) {
        try {
            // 如果和最後一次點擊的 ID 不同則撈取
            if (state.lastClickedRecord != orderId) {
                // 換下一筆資料前清空之前訂單的資料
                await commit('CLEAR_SINGLE_ORDER')
                // 撈取該筆資料
                const res = await apiGetSingleOrder(orderId)
                let payload = res.data.order
                await commit('SET_SINGLE_ORDER', payload)
                // 紀錄最後點擊的訂單 ID
                commit('SET_LAST_CLICKED_RECORD', orderId)
            }
        } catch (error) {
            console.log(error)
            console.log('抓取失敗 from /store/order.js')
        }
    },
    // 建立訂單
    async createOrder({ dispatch, commit }, data) {
        try {
            await apiCreateOrder({
                payment_id: data.payment_id,
                address: data.address
            })
            // 從 store/cart.js 清空使用者的購物車資料
            await commit('cart/CLEAR_USER_CART', null, { root: true })
            // 撈取新的資料
            await dispatch('fetchAllOrders')
            // 建立後導向至訂單頁面
            this.$router.push({ name: 'order' })
        } catch (error) {
            console.log('建立失敗 from /store/order.js')
        }
    },
    // 刪除訂單
    async deleteSingleOrder({ dispatch }, orderId) {
        try {
            const result = confirm('您確定要刪除該筆訂單嗎?')
            if (result === true) {
                await apiDeleteSingleOrder(orderId)
                dispatch('fetchAllOrders')
            }
        } catch (error) {
            console.log(error)
            console.log('刪除失敗 from /store/order.js')
        }
    },
}
