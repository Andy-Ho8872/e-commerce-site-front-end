import {
    // apiSearchByTitle, //! 舊版本 暫不使用
    apiSearchAutoComplete,
    apiSearchByTitleWithPagination,
} from '../APIs/api.js'

export const state = () => ({
    //* 搜尋關鍵字
    searchText: '',
    //* 搜尋結果
    searchResult: [],
    //* loading 狀態
    pageLoading: false,
    autoCompleteLoading: false,
    //* autocomplete result
    autoCompleteItems: [],
})

export const getters = {
    getSearchText(state) {
        return state.searchText
    },
    getResult(state) {
        return state.searchResult
    },
    getPageLoading(state) {
        return state.pageLoading
    },
    getAutoCompleteLoading(state) {
        return state.autoCompleteLoading
    },
    getAutoCompleteItems(state) {
        return state.autoCompleteItems
    },
}

export const mutations = {
    SET_SEARCH_TEXT(state, text) {
        state.searchText = text
    },
    SET_SEARCH_RESULT(state, result) {
        state.searchResult = result
    },
    SET_PAGE_LOADING(state, loading) {
        state.pageLoading = loading
    },
    SET_AUTO_COMPLETE_LOADING(state, loading) {
        state.autoCompleteLoading = loading
    },
    SET_AUTO_COMPLETE_ITEMS(state, items) {
        state.autoCompleteItems = items
    },
    RESET_SEARCH_RESULT(state) {
        state.searchResult = []
    },
    RESET_AUTO_COMPLETE_ITEMS(state) {
        state.autoCompleteItems = []
    },
}

export const actions = {
    async fetchAutoComplete({ commit }, title) {
        commit('SET_AUTO_COMPLETE_LOADING', true)
        try {
            if (title) {
                const res = await apiSearchAutoComplete(title)
                const items = res.data.products
                commit('SET_AUTO_COMPLETE_ITEMS', items)
            } else {
                commit('RESET_AUTO_COMPLETE_ITEMS')
            }
        } catch (error) {
            console.log(error)
        }
        commit('SET_AUTO_COMPLETE_LOADING', false)
    },
    // 搜尋功能(舊版本) //! 暫時不使用
    async searchProducts({ commit }, title) {
        commit('SET_PAGE_LOADING', true)
        try {
            //* 若有輸入字符才向後端發送請求
            if (title) {
                const res = await apiSearchByTitle(title)
                //* 將結果寫入 state
                let result = res.data.products
                await commit('SET_SEARCH_RESULT', result)
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
        commit('SET_PAGE_LOADING', false)
    },
    //* 搜尋功能(含分頁)
    async searchProductsWithPagination({ commit }, payload) {
        commit('SET_PAGE_LOADING', true)
        //* 使用者輸入的關鍵字
        commit('SET_SEARCH_TEXT', payload.title)
        try {
            //* 若有輸入字符才向後端發送請求
            if (payload.title) {
                const res = await apiSearchByTitleWithPagination(
                    payload.title,
                    payload.pageNumber
                )
                //* 將結果寫入 state
                const result = res.data.products
                await commit('SET_SEARCH_RESULT', result)
                //* 若有搜尋結果
                if (result) {
                    //* 導向至搜尋結果
                    this.$router.push({
                        name: 'search-title-pagination-pageNumber',
                        params: {
                            title: payload.title,
                            pageNumber: payload.pageNumber,
                        },
                    })
                } else {
                    //* 導向至搜尋失敗畫面
                    this.$router.push({
                        name: 'search-searchNotFound',
                    })
                }
            } else {
                //* 導向至首頁
                this.$router.push({ name: 'index' })
            }
        } catch (error) {
            console.log(error)
            console.log('搜尋失敗 from /store/search.js')
        }
        commit('SET_PAGE_LOADING', false)
    },
}
