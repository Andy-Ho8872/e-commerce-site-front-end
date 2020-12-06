import axios from 'axios';
import { apiUserLogin, apiCsrfLogin } from '~/APIs/api.js'

export const state = () => ({
    user: {
        email: '',
        password: ''
    },
    userAccount: null
})

export const getters = {
   
}

export const mutations = {
    // v-model 更新狀態
    SET_USER_DATA (state, { userData }) {
        state.user.email = userData.email
        state.user.password = userData.password
        state.isOnline = true
        console.log('已經在 vuex 中讀取到了');
        console.log('所接收到的 Email 為:', state.user.email);
    },
    // 登入使用者
    async LOGIN (state) {
        try {
            // 初次登入要先取得 CSRF
            const csrf = await apiCsrfLogin()
            console.log(csrf);
            // 登入使用者
            try {
                const result = await apiUserLogin({
                    email: state.form.email,
                    password: state.form.password
                })
                // 若帳密正確，則給予 Token 並儲存在 localStorage
                localStorage.setItem('Token', 'Bearer' + result.data.token)
                localStorage.setItem('UserID', result.data.user.id)
                localStorage.setItem('UserEmail', result.data.user.email)
                // 印出結果
                console.log(result);
                // 取得使用者資訊
                const getUserEmail = localStorage.getItem('UserEmail')
                // 更新使用者狀態
                state.userAccount = getUserEmail
            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            const result = error.response.data.errors
            console.log(result);
        }
    },
    // 登出使用者( 清除 localStorage 中的 token 與 UserInfo )
    LOGOUT (state) {
        localStorage.clear()
        state.userAccount = null
        console.log("使用者已登出");
    }
}

export const actions = {
    login (state) {
        state.commit('LOGIN')
    },
}
