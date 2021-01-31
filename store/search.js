import { apiSearchByTitle } from '../APIs/api.js'

export const state = () => ({
    searchResult: [], // 原始為空陣列
})

export const getters = {}

export const mutations = {
    SET_SEARCH_PRODUCTS(state, result) {
        state.searchResult = result
    },
}

export const actions = {
    async search({ commit }, title) {
        try {
            const res = await apiSearchByTitle(title)
            commit('SET_SEARCH_PRODUCTS', res)
        } catch (error) {
            let msg = '搜尋失敗'
            console.log(msg)
            alert(msg)
        }
    },
}
