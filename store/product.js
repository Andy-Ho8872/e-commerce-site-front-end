import { apiGetProducts, apiGetProduct } from '~/APIs/api.js'

export const state = () => ({
    // 所有產品
    products: [],
    // 單一產品(由 id 進行篩選)
    product: {}, // 起始為空的 Object
    // 以上已經用 asyncData 達成，所以目前暫不使用?
})

export const getters = {
    getAllProducts(state) {
        return state.products
    },
    getSingleProduct(state) {
        return state.product
    },
}

export const mutations = {
    // 所有商品
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    // 單一商品
    SET_PRODUCT(state, product) {
        state.product = product
        console.log(state.product)
    },
    // 重設單品 (清空原有的 Object)
    RESET_PRODUCT(state) {
        state.product = {}
    },
}

export const actions = {
    // 抓取所有商品
    async fetchAllProducts(state) {
        try {
            const res = await apiGetProducts()
            // 所有產品的資料
            const products = res.data

            state.commit('SET_PRODUCTS', products)
        } catch (error) {
            console.log(error)
        }
    },

    // 抓取單一商品
    async fetchSingleProduct(state, productId) {
        try {
            const res = await apiGetProduct(productId)
            // 所有產品的資料
            const product = res.data

            console.log('已經傳入')

            state.commit('SET_PRODUCT', product)
        } catch (error) {
            console.log(error)
        }
    },
}
