import {
    apiUserRegister,
    apiUserLogin,
    // apiCsrfLogin, //! 暫時不用
    apiGetUserInfo,
    apiUserLogout,
} from '~/APIs/api.js'

export const state = () => ({
    token: null, //* 憑證
    user: null, //* 使用者資料
    message: null, //* 錯誤訊息
    loading: false,
})

export const getters = {
    getToken(state) {
        return state.token
    },
    getUserInfo(state) {
        return state.user
    },
    getMessage(state) {
        return state.message
    },
    getLoading(state) {
        return state.loading
    },
}

export const mutations = {
    //* 取得 Token
    SET_TOKEN(state) {
        if (process.browser) {
            const token = localStorage.getItem('Token')
            // 更新使用者狀態
            state.token = token
        }
    },
    //* 將資料設置在 LocalStorage
    SET_LOCAL_STORAGE(state, res) {
        //! 第一個 state 參數(必須存在)並未使用到，因為 payload 要放在第二個參數才能使用。
        localStorage.setItem('Token', `Bearer ${res.data.token}`)
        localStorage.setItem('UserEmail', res.data.user.email)
    },
    //* 設置錯誤訊息
    SET_MESSAGE(state, msg) {
        state.message = msg
    },
    //* 設置 Loading 狀態
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    //* 設置使用者資料
    SET_USER_INFO(state, user) {
        state.user = user
    },
    //* 清除使用者資料
    CLEAR_USER_INFO(state) {
        state.user = null
    },
    //* 清空錯誤訊息
    CLEAR_MESSAGE(state) {
        state.message = null
    },
    //* 清除 LocalStorage
    CLEAR_ALL_STORAGE() {
        localStorage.clear()
    },
    //* 清除 Token
    CLEAR_TOKEN(state) {
        state.token = null
    },
}

export const actions = {
    //? 清除提示訊息
    clearMessage({ commit }) {
        setTimeout(() => {
            commit('CLEAR_MESSAGE')
        }, 3000)
    },
    //* 註冊流程
    async register({ dispatch, commit }, user) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            await apiUserRegister({
                email: user.email,
                password: user.password,
            })
            //* 註冊成功後跳轉
            alert('註冊成功，即將為您跳轉至登入頁面。')
            this.$router.push({ name: 'auth-login' })
        } catch (error) {
            //* 錯誤訊息
            const msg = error.response.data.errors
            commit('SET_MESSAGE', msg)
            //* 清除錯誤訊息
            dispatch('clearMessage')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
    //* 撈取使用者資料
    async fetchUserInfo({ commit }) {
        try {
            const res = await apiGetUserInfo()
            const user = res.data.user
            commit('SET_USER_INFO', user)
        } catch (error) {
            console.log(error)
            console.log('抓取失敗 from store/auth.js')
        }
    },
    async fetchRequiredData({ dispatch }) {
        //* 撈取使用者資料
        await dispatch('fetchUserInfo')
        //* 從 store/cart.js 撈取
        await dispatch('cart/fetchUserCart', null, { root: true }) //? 使用者的購物車
        //* 從 store/order.js 撈取
        await dispatch('order/fetchAllOrders', null, { root: true }) //? 使用者的訂單
        await dispatch('order/fetchTableColumns', null, { root: true }) //? 付款方式欄位
        //* 從 store/notification.js 撈取
        await dispatch('notification/fetchAllNotifications', null, { root: true }) //? 使用者的通知
    },
    //* 確認使用者是否已經登入
    async checkIfUserHasLoggedIn({ state }) {
        setTimeout(() => {
            if (state.user) {
                this.$router.push({ name: 'index' })
                console.log('您目前已經登入，將導向至首頁')
            }
        }, 3000)
    },
    //* 登入流程
    async login({ commit, dispatch }, user) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            //* 先取得 CSRF Cookie
            // await apiCsrfLogin() //! 暫時不用
            //* 從 login 頁面 抓取資料
            const res = await apiUserLogin({
                email: user.email,
                password: user.password,
            })
            //* 若帳密正確，則將資料儲存在 localStorage
            await commit('SET_LOCAL_STORAGE', res)
            //* 撈取必要的資料 
            await dispatch('fetchRequiredData')
            //* 重新導向
            this.$router.push({ name: 'user-account' })
        } catch (error) {
            //* 錯誤訊息
            const msg = error.response.data.errors
            commit('SET_MESSAGE', msg)
            //* 清除錯誤訊息
            dispatch('clearMessage')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
    //* 清除所有的 state
    clearAllVuexStates({ commit }) {
        commit('CLEAR_USER_INFO')
        commit('CLEAR_TOKEN')
        commit('cart/CLEAR_USER_CART', null, { root: true }) //* store/cart.js
        commit('order/CLEAR_USER_ORDERS', null, { root: true }) //* store/order.js
        commit('notification/CLEAR_ALL_NOTIFICATIONS', null, { root: true }) //* store/notification.js
    },
    //* 登出流程
    async logout({ commit, dispatch }) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            await apiUserLogout()
            //* 清空 LocalStorage
            await commit('CLEAR_ALL_STORAGE')
            //* 清空 Vuex 暫存
            await dispatch('clearAllVuexStates')
            //* 重新導向
            this.$router.push({ name: 'index' })
            alert('您已經登出')
        } catch (error) {
            console.log('error from store/auth.js')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
}
