export const state = () => ({
    products: [
        {
            id: 1,
            title: 'test product title-1',
            imgUrl: 'https://www.example.com/iamge/1.jpg',
            unit_price: 888,
            discount_rate: 1,
            ratings: 5,
        },
        {
            id: 1,
            title: 'test product title-2',
            imgUrl: 'https://www.example.com/iamge/2.jpg',
            unit_price: 666,
            discount_rate: 1,
            ratings: 4,
        },
    ],
    //* 產品標籤
    productTags: [
        {
            id: 1,
            title: '3C',
        },
    ],
})

export const getters = {
    getIndexPageProducts(state) {
        return state.products
    },
    getAllProductTags(state) {
        return state.productTags
    },
}

export const mutations = {
    //* 產品的標籤
    SET_PRODUCT_TAGS: jest.fn((state, tags) => {
        state.productTags = tags
    }),
}

export const actions = {
    async fetchAllProductTags({ state, commit }) {
        //* state 裡面沒有資料才撈取
        // const res = await apiGetProductTags()
        const tags = [
            {
                id: 1,
                title: '3C',
            },
        ]
        commit('SET_PRODUCT_TAGS', tags)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
