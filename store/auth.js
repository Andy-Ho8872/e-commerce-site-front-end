import { apiUserRegister, apiUserLogin, apiCsrfLogin, apiUserLogout } from '~/APIs/api.js'

export const state = () => ({
    user: {
        email: '',
        password: ''
    },
    userAccount: null,
    message: null // 錯誤訊息
})

export const getters = {
    fetchUserAccount (state) {
        return state.userAccount
    },
    fetchMessage (state) {    
        return state.message
    }
}

export const mutations = {
    // v-model 更新 state 狀態
    SET_USER_DATA (state, { userData }) {
        state.user.email = userData.email
        state.user.password = userData.password
        console.log('所接收到的 Email 為:', state.user.email);
    },
    
    // 取得使用者資訊
    FETCH_USER_ACCOUNT (state) {
        const getUserEmail = localStorage.getItem('UserEmail')
        // 更新使用者狀態
        state.userAccount = getUserEmail
        console.log('已取得使用者資訊', state.userAccount);
    },

    // 取得錯誤訊息
    FETCH_MESSAGE (state, msg) {
        state.message = msg
    },
    // 清空錯誤訊息
    CLEAR_MESSAGE (state) {
        state.message = null
    },

    // 登出使用者( 清除 localStorage 中的 token 與 UserInfo )
    CLEAR_ALL_STORAGE (state) {
        localStorage.clear()
        state.userAccount = null
        console.log("使用者已登出");
    }
}

export const actions = {
    // 註冊流程
    async register (state, user) {
        try {
            const result = await apiUserRegister({
                email: user.email,
                password: user.password
            })
            // 註冊成功訊息
            alert('註冊成功，即將為您跳轉至登入頁面。')
            // 註冊成功後跳轉
            this.$router.push({ name: 'auth-login' }) 
        }
        catch (error) {
            let msg = error.response.data.errors
            state.commit('FETCH_MESSAGE', msg)
        }
    },

    // 登入流程
    async login (state, user) {
        try {
            // 初次登入要先取得 CSRF
            const csrf = await apiCsrfLogin()
            console.log(csrf);
            // 登入使用者
            try {
                const result = await apiUserLogin({
                    // 從 state 抓取資料
                    email: user.email,
                    password: user.password
                })
                // 若帳密正確，則給予 Token 並儲存在 localStorage
                localStorage.setItem('Token', ('Bearer ' + result.data.token))
                localStorage.setItem('UserID', result.data.user.id)
                localStorage.setItem('UserEmail', result.data.user.email)
                // 重新導向
                this.$router.push('/')
            }
            catch (error) {
                // 抓取錯誤訊息
                let msg = error.response.data.errors
                console.log(msg);
                state.commit('FETCH_MESSAGE', msg)
            }
        }
        catch (error) {
            // 抓取錯誤訊息
            let msg = error.response.data.errors
            state.commit('FETCH_MESSAGE', msg)
        }
    },

    // 登出流程
    async logout (state) {
        const Bearer_token = localStorage.getItem('Token')
        const config = { headers: { Authorization: Bearer_token } }

        try {
            // 要取得使用者的 Token 才能執行登出
            const result = await apiUserLogout(config)
            console.log(result);
            // 清空 LocalStorage
            state.commit('CLEAR_ALL_STORAGE')
            alert('您已經登出')
        }
        catch (error) {
            console.log(error);
        }
    }
}
