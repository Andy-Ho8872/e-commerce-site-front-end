export const state = () => ({
    viewedProducts: [
        {
            id: 1,
            title: '精美服裝',
            imgUrl: 'https://www.example.com/iamge/1.jpg',
            description: 'this is good',
            unit_price: 888,
            discount_rate: 1,
            ratings: 5,
            created_at: '2020/10/01',
        },
        {
            id: 2,
            title: '手機支架',
            imgUrl: 'https://www.example.com/iamge/2.jpg',
            description: 'this is cheap and good',
            unit_price: 666,
            discount_rate: 1,
            ratings: 4,
            created_at: '2020/10/02',
        },
        // new product id = 3
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
    getViewedProducts(state) {
        return state.viewedProducts
    }
}

export const mutations = {
    //* 產品的標籤
    SET_PRODUCT_TAGS: jest.fn((state, tags) => {
        state.productTags = tags
    }),
    //* 紀錄瀏覽過的產品(作為快取用)
    PUSH_PRODUCT_TO_VIEWED_PRODUCTS(state, product) {
        state.viewedProducts.push(product)
    },
}

export const actions = {
    async fetchAllProductTags({ commit }) {
        // const res = await apiGetProductTags()
        const tags = [
            {
                id: 1,
                title: '3C',
            },
        ]
        commit('SET_PRODUCT_TAGS', tags)
    },
    fetchSingleProduct: jest.fn(async({ state, commit }, productId) => {
        let exist = state.viewedProducts.find(product => product.id == productId)
        //* 若是找不到才抓取
        if (exist === undefined) {
            try {
                // const res = await apiGetProduct(productId)
                //* 所有產品的資料
                const product = {
                    id: 3,
                    title: '時尚包包',
                    imgUrl: 'https://www.example.com/iamge/3.jpg',
                    description: 'this is good',
                    unit_price: 999,
                    discount_rate: 1,
                    ratings: 5,
                    created_at: '2020/10/01',
                }
                //* 將點擊過的產品放入 products 暫存，若使用者在瀏覽過相同產品的時候就不用再發送一次 request
                commit('PUSH_PRODUCT_TO_VIEWED_PRODUCTS', product)
            } catch (error) {
                console.log(error)
            }
        }
    }),
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
