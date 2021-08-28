export const state = () => ({
    //* autocomplete result
    autoCompleteItems: [
        {
            id: 1,
            title: '高品質相機',
            imgUrl: 'https:example.com/image/1',
        },
    ],
    autoCompleteLoading: false,
})

export const getters = {
    getAutoCompleteLoading(state) {
        return state.autoCompleteLoading
    },
    getAutoCompleteItems(state) {
        return state.autoCompleteItems
    },
}

export const mutations = {
    SET_SEARCH_TEXT: jest.fn(),
    SET_SEARCH_RESULT: jest.fn(),
    SET_PAGE_LOADING: jest.fn(),
    SET_AUTO_COMPLETE_LOADING: jest.fn(),
    SET_AUTO_COMPLETE_ITEMS: jest.fn((state, fakeItems) => {
        state.autoCompleteItems = fakeItems
    }),
    RESET_SEARCH_RESULT: jest.fn(),
    RESET_AUTO_COMPLETE_ITEMS: jest.fn(state => {
        state.autoCompleteItems = []
    }),
}

export const actions = {
    async fetchAutoComplete({ commit }) {
        const fakeItems = [
            {
                id: 1,
                title: '高品質相機',
                imgUrl: 'https:example.com/image/1',
            },
        ]
        commit('SET_AUTO_COMPLETE_ITEMS', fakeItems)
    },
    async searchProductsWithPagination({ commit }, payload) {
        //* 使用者輸入的關鍵字
        commit('SET_SEARCH_TEXT', payload.title)
        try {
            //* 若有輸入字符才向後端發送請求
            if (payload.title) {
                //* 將結果寫入 state
                const result = [
                    {
                        id: 1,
                        title: '登山背包',
                        imgUrl: 'https:example.com/image/3',
                    },
                ]
                await commit('SET_SEARCH_RESULT', result)
                //* 若有搜尋結果
                if (result) {
                    //* 導向至搜尋結果
                    console.log('navigated to search result page');
                } else {
                    //* 導向至搜尋失敗畫面
                    console.log('navigated to fail page');
                }
            } else {
                //* 導向至首頁
                console.log('navigated to home page');
            }
        } catch (error) {
            console.log(error)
            console.log('搜尋失敗 from /store/search.js')
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
