import {
    apiGetTableColumns,
    apiCreateOrder,
    apiGetAllOrders,
    apiGetSingleOrder,
    apiDeleteSingleOrder,
} from '../APIs/api.js'

export const state = () => ({
    //* 所有訂單
    orders: [],
    //! 單筆訂單 (暫不使用)
    order: [],
    //* 付款方式
    payments: [],
    //* 商品狀態
    status: [],
    //! 點擊 id 紀錄 (暫不使用)
    lastClickedRecord: null,
    //* loading 狀態
    loading: false,
})

export const getters = {
    getAllOrders(state) {
        return state.orders
    },
    //! 暫不使用 
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
    },
}

export const mutations = {
    //* 訂單相關
    SET_ALL_ORDERS(state, orders) {
        state.orders = orders
    },
    //! 暫不使用 
    SET_SINGLE_ORDER(state, order) {
        state.order = order
    },
    SET_PAYMENTS_DATA(state, payments) {
        state.payments = payments
    },
    SET_STATUS_DATA(state, status) {
        state.status = status
    },
    //* 送出訂單的狀態
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    //! 紀錄最後點擊的訂單 id (暫不使用)
    SET_LAST_CLICKED_RECORD(state, record) {
        state.lastClickedRecord = record
    },
    //* 刪除暫存陣列中的資料(不必向後端在發送撈取資料的 request)
    REMOVE_SINGLE_ORDER(state, orderId) {
        const index = state.orders.findIndex(item => {
            return item.id == orderId
        })
        if (index !== -1) {
            state.orders.splice(index, 1)
        }
    },
    //! 清除單筆訂單資料 (暫不使用)
    CLEAR_SINGLE_ORDER(state) {
        state.order = []
    },
    //* 使用者登出時清空暫存 
    CLEAR_USER_ORDERS(state) {
        state.orders = []
    }
}

export const actions = {
    //* 撈取後端表單資料
    async fetchTableColumns({ commit }) {
        try {
            const res = await apiGetTableColumns()
            //* 付款方式與貨物狀態
            const payments = res.data.payments
            const status = res.data.status
            //* 設置到 state 中
            commit('SET_PAYMENTS_DATA', payments)
            commit('SET_STATUS_DATA', status)
        } catch (error) {
            console.log('抓取失敗 from /store/order.js')
        }
    },
    //* 撈取所有訂單
    async fetchAllOrders({ commit }) {
        try {
            //* 撈取
            const res = await apiGetAllOrders()
            const orders = res.data.orders
            commit('SET_ALL_ORDERS', orders)
        } catch (error) {
            console.log(error)
            console.log('抓取失敗 from /store/order.js')
        }
    },
    //! 撈取單筆訂單 (暫不使用)
    async fetchSingleOrder({ commit, state }, orderId) {
        try {
            //* 如果和最後一次點擊的 ID 不同則撈取
            if (state.lastClickedRecord != orderId) {
                //* 換下一筆資料前清空之前訂單的資料
                await commit('CLEAR_SINGLE_ORDER')
                //* 撈取該筆資料
                const res = await apiGetSingleOrder(orderId)
                const order = res.data.order
                await commit('SET_SINGLE_ORDER', order)
                //* 紀錄最後點擊的訂單 ID
                commit('SET_LAST_CLICKED_RECORD', orderId)
            }
        } catch (error) {
            console.log(error)
            console.log('抓取失敗 from /store/order.js')
        }
    },
    //* 建立訂單
    async createOrder({ dispatch, commit }, order) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            //* 向後端發送資料
            await apiCreateOrder({
                payment_id: order.payment_id,
                address: order.address,
                buyer_name: order.buyer_name,
                buyer_phone: order.buyer_phone,
            })
            //* 訂單建立後從 store/cart.js 清空使用者的購物車資料
            await commit('cart/CLEAR_USER_CART', null, { root: true })
            //* 撈取最新的訂單資料
            await dispatch('fetchAllOrders')
            //* 最後導向至訂單頁面
            this.$router.push({ name: 'order' })
            //* 重新撈取通知
            await dispatch('notification/fetchAllNotifications', null, { root: true }) 
            //* 提示訊息
            const message = {
                type: 'success',
                text: '您建立了一筆訂單，請查閱。'
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log('建立失敗 from /store/order.js')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
    //* 刪除訂單
    async deleteSingleOrder({ dispatch, commit }, orderId) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            await apiDeleteSingleOrder(orderId)
            //* 刪除暫存中的訂單數據(可以減少撈取訂單 request 的次數)
            commit('REMOVE_SINGLE_ORDER', orderId)
            const message = {
                type: 'error',
                text: '您刪除了一筆訂單，請查閱。'
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error)
            console.log('刪除失敗 from /store/order.js')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
}
