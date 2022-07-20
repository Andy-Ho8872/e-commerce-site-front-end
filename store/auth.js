import {
    apiUserRegister,
    apiUserLogin,
    apiUserLogout,
    apiGetUserInfo,
    apiClearUserProfile,
    apiUpdateUserProfile,
    apiUserSocialiteLogin,
    apiAddCreditCard,
    apiDeleteCreditCard
} from '~/APIs/user.js'

export const state = () => ({
    token: null, //* 憑證
    user: null, //* 使用者資料
    message: null, //* 錯誤訊息
    loading: false,
    timeout_id: null
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
    SET_TIMEOUT_ID(state, timeout_id) {
        state.timeout_id = timeout_id
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
    //* 提示訊息
    async setAuthPageMessage({ state, commit }, message) {
        //* 將原本的 timeout 清除
        clearTimeout(state.timeout_id)
        //* 設置訊息 
        commit('SET_MESSAGE', message)
        //* 清除訊息 
        const new_timeout_id = setTimeout(() => {
            commit('SET_TIMEOUT_ID', new_timeout_id)
            commit('CLEAR_MESSAGE')
        }, 3500)
    },
    //* 註冊流程
    async register({ dispatch, commit }, user) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            await apiUserRegister({
                email: user.email,
                password: user.password,
                password_confirmation: user.password_confirmation,
            })
            //* 註冊成功後跳轉
            const message = {
                type: 'success',
                text: '註冊成功，歡迎加入。',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
            this.$router.push({ name: 'auth-login' })
        } catch (error) {
            //* 錯誤訊息
            const msg = error.response.data.errors
            dispatch('setAuthPageMessage', msg)
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
        await dispatch('notification/fetchAllNotifications', null, {
            root: true,
        }) //? 使用者的通知
    },
    //* 確認使用者是否已經登入
    async checkIfUserHasLoggedIn({ state, dispatch }) {
        const timeout = setTimeout(() => {
            if (state.user) {
                this.$router.push({ name: 'index' })
            }
            if (!state.token) {
                dispatch('clearAllVuexStates')
            }
            clearTimeout(timeout)
        }, 3000)
    },
    //* 登入流程
    async login({ commit, dispatch }, user) {
        //? start loading
        commit('SET_LOADING', true)
        try {
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
            await this.$router.push({ name: 'index' })
            const message = {
                type: 'success',
                text: '已經登入，歡迎光臨。',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            //* 錯誤訊息
            const msg = error.response.data.errors
            dispatch('setAuthPageMessage', msg)
        }
        //? end loading
        commit('SET_LOADING', false)
    },
    //* 使用第三方登入 
    async socialiteLogin({ commit }, provider) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            //* 開啟第三方登入的網址
            window.location.href = (`${apiUserSocialiteLogin(provider)}`)
            const message = {
                type: 'success',
                text: '已經登入，歡迎光臨。',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            this.$router.push({ name: 'auth-login' })
            console.log(error);
        }
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
            await this.$router.push({ name: 'index' })
            const message = {
                type: 'success',
                text: '已經登出，感謝您的光臨。',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log('error from store/auth.js')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
    //* 更新使用者個人檔案
    async updateUserProfile({ commit, dispatch }, data) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            await apiUpdateUserProfile({
                user_name: data.name,
                user_phone: data.phone,
                user_address: data.address,
            })
            //* 重新撈取資料
            await dispatch('fetchUserInfo')
            //* 提示訊息
            const message = {
                type: 'success',
                text: '個人資料變更成功',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log('error from store/auth.js')
            const message = {
                type: 'error',
                text: '個人資料變更失敗，請重新嘗試。',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        }
        //? end loading
        commit('SET_LOADING', false)
    },
    //* 清除使用者個人檔案
    async clearUserProfile({ commit, dispatch }) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            await apiClearUserProfile()
            //* 重新撈取資料
            await dispatch('fetchUserInfo')
            //* 提示訊息
            const message = {
                type: 'success',
                text: '個人資料已經清除',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log('error from store/auth.js')
            const message = {
                type: 'error',
                text: '個人資料刪除失敗，請重新嘗試。',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        }
        //? end loading
        commit('SET_LOADING', false)
    },
    async addCreditCard({ dispatch, commit }, { type, number, holder_name, expiration_month, expiration_year, cvv }) {
        commit('SET_LOADING', true)
        try {
            await apiAddCreditCard({
                type,
                number,
                holder_name,
                expiration_month,
                expiration_year,
                cvv
            })
            //* 重新撈取資料
            await dispatch('fetchUserInfo')
            //* 提示訊息
            const message = {
                type: 'success',
                text: '成功新增信用卡',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            const message = {
                type: 'error',
                text: '信用卡新增失敗',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        }
        commit('SET_LOADING', false)
    },
    async deleteCreditCard({ dispatch, commit }, card_id) {
        commit('SET_LOADING', true)
        try {
            await apiDeleteCreditCard(card_id)
            //* 重新撈取資料
            await dispatch('fetchUserInfo')
            //* 提示訊息
            const message = {
                type: 'success',
                text: '成功刪除信用卡',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            const message = {
                type: 'error',
                text: '信用卡刪除失敗',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        }
        commit('SET_LOADING', false)
    }
}