import { apiUserRegister, apiUserLogin, apiCsrfLogin, apiUserLogout } from '~/APIs/api.js';

export const state = () => ({
    userAccount: null,
    message: null // 錯誤訊息
})

export const getters = {
    fetchUserAccount (state) {
        return state.userAccount;
    },
    fetchMessage (state) {    
        return state.message;
    }
}

export const mutations = {
    // v-model 更新 state 狀態
    SET_USER_DATA (state, { userData }) {
        state.user.email = userData.email;
        state.user.password = userData.password;
    },
    // 取得使用者資訊
    FETCH_USER_ACCOUNT (state) {
        if(process.browser) {
            const user = localStorage.getItem('UserEmail');
            // 更新使用者狀態
            state.userAccount = user;
        }
    },
    // 取得錯誤訊息
    SET_MESSAGE (state, msg) {
        state.message = msg;
    },
    // 清空錯誤訊息
    CLEAR_MESSAGE (state) {
        state.message = null;
    },
    // 登出使用者( 清除 localStorage 中的 token 與 UserInfo )
    CLEAR_ALL_STORAGE (state) {
        localStorage.clear()
        state.userAccount = null;
        console.log("使用者已登出");
    }
}

export const actions = {
    // 註冊流程
    async register ({ commit }, user) {
        try {
            await apiUserRegister({
                email: user.email,
                password: user.password
            });
            // 註冊成功訊息
            alert('註冊成功，即將為您跳轉至登入頁面。');
            // 註冊成功後跳轉
            this.$router.push({ name: 'auth-login' });
        }
        catch (error) {
            // 錯誤訊息
            let msg = error.response.data.errors;
            commit('SET_MESSAGE', msg);
            // 清除錯誤訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 3000)
        }
    },
    // 登入流程
    async login ({ commit }, user) {
        try {
            // 初次登入要先取得 CSRF
            await apiCsrfLogin();
            // 登入使用者
            try {
                const res = await apiUserLogin({
                    // 從 login 頁面 抓取資料
                    email: user.email,
                    password: user.password
                });
                // 若帳密正確，則給予 Token 並儲存在 localStorage
                localStorage.setItem('Token', ('Bearer ' + res.data.token));
                localStorage.setItem('UserEmail', res.data.user.email);
                // 重新導向至首頁
                this.$router.push('/');
                // 撈取使用者資料
                commit('FETCH_USER_ACCOUNT');
            }
            catch (error) {
                 // 錯誤訊息
                let msg = error.response.data.errors;
                commit('SET_MESSAGE', msg);
                // 清除錯誤訊息
                setTimeout(() => {
                    commit('CLEAR_MESSAGE');
                }, 3000)
            }
        }
        catch (error) {
            // 錯誤訊息
            let msg = error.response.data.errors;
            commit('SET_MESSAGE', msg);
            // 清除錯誤訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 3000)
        }
    },
    // 登出流程
    async logout ({ commit }) {
        const token = { headers: { Authorization: localStorage.getItem('Token') } };
        try {
            // 要取得使用者的 Token 才能執行登出
            await apiUserLogout(token);
            // 清空 LocalStorage
            await commit('CLEAR_ALL_STORAGE');
            // 重新導向
            this.$router.push('/');
            alert('您已經登出');
        }
        catch (error) {
            // 錯誤訊息
            let msg = error.response.data.errors;
            commit('SET_MESSAGE', msg);
            // 清除錯誤訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 3000)
        }
    }
}
