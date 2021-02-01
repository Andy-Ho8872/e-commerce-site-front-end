import { apiSearchByTitle } from '../APIs/api.js'

export const state = () => ({
    searchResult: [], // 原始為空陣列
})

export const getters = {
    // 搜尋結果
    getResult(state) {
        return state.searchResult
    },
}

export const mutations = {
    SET_SEARCH_PRODUCTS(state, result) {
        state.searchResult = result
    },
}

export const actions = {
    // 搜尋功能
    async searchProducts({ commit }, title) {
        try {
            const res = await apiSearchByTitle(title)
            // 將結果寫入 state
            await commit('SET_SEARCH_PRODUCTS', res.data.products)
            // 導向至搜尋結果
            this.$router.push({
                name: 'search-title',
                params: { title: title },
            })
        } catch (error) {
            console.log(error);
            let msg = '搜尋失敗'
            alert(msg)
        }
    },
}
