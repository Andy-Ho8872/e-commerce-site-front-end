import {
    apiUserRegister,
    apiUserLogin,
    apiCsrfLogin,
    apiGetUserInfo,
    apiUserLogout,
} from '~/APIs/api.js'

export const state = () => ({
    token: null,
    user: null,
    message: null, // 錯誤訊息
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
}

export const mutations = {
    // 取得 Token
    SET_TOKEN(state) {
        if (process.browser) {
            const token = localStorage.getItem('Token')
            // 更新使用者狀態
            state.token = token
        }
    },
    // 取得錯誤訊息
    SET_MESSAGE(state, msg) {
        state.message = msg
    },
    // 設置使用者資料
    SET_USER_INFO(state, user) {
        state.user = user
    },
    // 清除使用者資料
    CLEAR_USER_INFO(state) {
        state.user = null
    },
    // 清空錯誤訊息
    CLEAR_MESSAGE(state) {
        state.message = null
    },
    // 清除 LocalStorage
    CLEAR_ALL_STORAGE() {
        localStorage.clear()
    },
    // 清除 Token
    CLEAR_TOKEN(state) {
        state.token = null
    },
}

export const actions = {
    // 註冊流程
    async register({ commit }, user) {
        try {
            await apiUserRegister({
                email: user.email,
                password: user.password,
            })
            // 註冊成功訊息
            alert('註冊成功，即將為您跳轉至登入頁面。')
            // 註冊成功後跳轉
            this.$router.push({ name: 'auth-login' })
        } catch (error) {
            // 錯誤訊息
            let msg = error.response.data.errors
            commit('SET_MESSAGE', msg)
            // 清除錯誤訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE')
            }, 3000)
        }
    },
    // 撈取使用者資料
    async fetchUserInfo({ commit }) {
        try {
            const res = await apiGetUserInfo()
            let user = res.data.user
            commit('SET_USER_INFO', user)
        } catch (error) {
            console.log(error)
            console.log('抓取失敗 from store/auth.js')
        }
    },
    // 登入流程
    async login({ commit, dispatch }, user) {
        try {
            // 初次登入要先取得 CSRF
            await apiCsrfLogin()
            // 登入使用者
            try {
                const res = await apiUserLogin({
                    // 從 login 頁面 抓取資料
                    email: user.email,
                    password: user.password,
                })
                // 若帳密正確，則給予 Token 並儲存在 localStorage
                if (process.browser) {
                    localStorage.setItem('Token', 'Bearer ' + res.data.token)
                    localStorage.setItem('UserEmail', res.data.user.email)
                }
                // 撈取使用者資料
                await dispatch('fetchUserInfo')
                // 從 store/cart.js 撈取使用者的購物車資料
                dispatch('cart/fetchUserCart', null, { root: true })
                // 重新導向至首頁
                this.$router.push({ name: 'index' })
            } catch (error) {
                // 錯誤訊息
                let msg = error.response.data.errors
                commit('SET_MESSAGE', msg)
                // 清除錯誤訊息
                setTimeout(() => {
                    commit('CLEAR_MESSAGE')
                }, 3000)
            }
        } catch (error) {
            // 錯誤訊息
            let msg = error.response.data.errors
            commit('SET_MESSAGE', msg)
            // 清除錯誤訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE')
            }, 3000)
        }
    },
    // 登出流程
    async logout({ commit }) {
        try {
            // 要取得使用者的 Token 才能執行登出
            await apiUserLogout()
            // 清空 LocalStorage 與暫存
            await commit('CLEAR_ALL_STORAGE')
            await commit('CLEAR_USER_INFO')
            await commit('CLEAR_TOKEN')
            // 清空購物車暫存
            commit('cart/CLEAR_USER_CART', null, { root: true })
            // 重新導向
            this.$router.push({ name: 'index' })
            alert('您已經登出')
        } catch (error) {
            console.log('erroe from store/auth.js')
        }
    },
}
