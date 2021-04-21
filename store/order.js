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
    // 付款方式
    payments: [],
    // 商品狀態
    status: [],
    // 點擊 id 紀錄
    lastClickedRecord: null,
    // loading 狀態
    loading: false
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
    getPayments(state) {
        return state.payments
    },
    getStatus(state) {
        return state.status
    },
    getLoading(state) {
        return state.loading
    }
}

export const mutations = {
    // 表單相關
    SET_FORM_DATA(state, data) {
        state.formData = data
    },
    // 訂單相關
    SET_ALL_ORDERS(state, orders) {
        state.orders = orders
    },
    SET_SINGLE_ORDER(state, order) {
        state.order = order
    },
    SET_PAYMENTS_DATA(state, payments) {
        state.payments = payments
    },
    SET_STATUS_DATA(state, status) {
        state.status = status
    },
    // 送出訂單的狀態
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    // 清除單筆訂單資料
    CLEAR_SINGLE_ORDER(state) {
        state.order = []
    },
    // 紀錄最後點擊的訂單 id
    SET_LAST_CLICKED_RECORD(state, record) {
        state.lastClickedRecord = record
    },
}

export const actions = {
    // 撈取後端表單資料
    async fetchFormData({ state, commit }) {
        // 若 state 中沒有表單資料才和後端請求
        if(state.formData.length == 0) {
            try {
                const res = await apiGetFormData()
                let payload = res.data.payments
                commit('SET_FORM_DATA', payload)
            } catch (error) {
                console.log('抓取失敗 from /store/order.js')
            }
        }
    },
    // 撈取所有訂單
    async fetchAllOrders({ commit }) {
        try {
            // 撈取
            const res = await apiGetAllOrders()
            // 宣告
            let orders = res.data.orders
            let payments = res.data.payments
            let status = res.data.status
            // 設置
            commit('SET_ALL_ORDERS', orders)
            commit('SET_PAYMENTS_DATA', payments)
            commit('SET_STATUS_DATA', status)
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
                let order = res.data.order
                await commit('SET_SINGLE_ORDER', order)
                // 紀錄最後點擊的訂單 ID
                commit('SET_LAST_CLICKED_RECORD', orderId)
            }
        } catch (error) {
            console.log(error)
            console.log('抓取失敗 from /store/order.js')
        }
    },
    // 建立訂單
    async createOrder({ dispatch, commit }, order) {
        // start loading
        commit('SET_LOADING', true)
        try {
            // 向後端發送資料
            await apiCreateOrder({
                payment_id: order.payment_id,
                address: order.address
            })
            // 訂單建立後從 store/cart.js 清空使用者的購物車資料
            await commit('cart/CLEAR_USER_CART', null, { root: true })
            // 撈取最新的訂單資料
            await dispatch('fetchAllOrders')
            // 最後導向至訂單頁面
            this.$router.push({ name: 'order' })
        } catch (error) {
            console.log('建立失敗 from /store/order.js')
        }
        // end loading
        commit('SET_LOADING', false)
    },
    // 刪除訂單
    async deleteSingleOrder({ dispatch, commit }, orderId) {
        // start loading
        commit('SET_LOADING', true)
        try {
            const result = confirm('您確定要刪除該筆訂單嗎?')
            if (result === true) {
                await apiDeleteSingleOrder(orderId)
                // 刪除後撈取最新的資料
                dispatch('fetchAllOrders')
            }
        } catch (error) {
            console.log(error)
            console.log('刪除失敗 from /store/order.js')
        }
        // end loading
        commit('SET_LOADING', false)
    },
}
