import { apiSearchByTitle } from '../APIs/api.js'

export const state = () => ({
    //* 搜尋結果
    searchResult: [],
})

export const getters = {
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
    //* 搜尋功能
    async searchProducts({ commit }, title) {
        try {
            //* 若有輸入字符才向後端發送請求
            if (title) {
                const res = await apiSearchByTitle(title)
                //* 將結果寫入 state
                let result = res.data.products
                await commit('SET_SEARCH_PRODUCTS', result)
                //* 導向至搜尋結果
                this.$router.push({
                    name: 'search-title',
                    params: { title: title },
                })
            } else {
                //* 導向至首頁
                this.$router.push({ name: 'index' })
            }
        } catch (error) {
            console.log(error)
            console.log('搜尋失敗 from /store/search.js')
        }
    },
}
