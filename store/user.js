import { apiGetUserInfo } from '../APIs/api.js'

export const state = () => ({
    user: [],
})

export const getters = {
    getUserInfo(state) {
        return state.user
    },
}

export const mutations = {
    SET_USER_INFO(state, user) {
        state.user = user
    },
}

export const actions = {
    async fetchUserInfo({ commit }) {
        try {
            const res = await apiGetUserInfo()
            let user = res.data.user
            commit('SET_USER_INFO', user)
        } catch (error) {
            console.log(error);
            console.log("抓取失敗 from store/user.js");
        }
    },
}
