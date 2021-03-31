import {
    apiUserRegister,
    apiUserLogin,
    apiCsrfLogin,
    apiUserLogout,
} from '~/APIs/api.js'

export const state = () => ({
    token: null,
    userAccount: null,
    message: null, // 錯誤訊息
})

export const getters = {
    getToken(state) {
        return state.token
    },
    getUserAccount(state) {
        return state.userAccount
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
    // v-model 更新 state 狀態
    SET_USER_DATA(state, { userData }) {
        state.user.email = userData.email
        state.user.password = userData.password
    },
    // 取得錯誤訊息
    SET_MESSAGE(state, msg) {
        state.message = msg
    },
    // 清空錯誤訊息
    CLEAR_MESSAGE(state) {
        state.message = null
    },
    // 登出使用者( 清除 localStorage 中的 token 與 UserInfo )
    CLEAR_ALL_STORAGE(state) {
        localStorage.clear()
        state.userAccount = null
        console.log('使用者已登出')
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
                // 重新導向至首頁
                this.$router.push({ name: 'index' })
                // 撈取使用者資料
                await commit('FETCH_USER_ACCOUNT')
                // 從 store/cart.js 撈取使用者的購物車資料
                dispatch('cart/fetchUserCart', null, { root: true })
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
            // 清空 LocalStorage
            await commit('CLEAR_ALL_STORAGE')
            // 重新導向
            this.$router.push({ name: 'index' })
            alert('您已經登出')
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
}