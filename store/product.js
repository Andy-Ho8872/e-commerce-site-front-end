import { apiGetProducts, apiGetProduct, apiGetProductTags, apiGetIndexPageProducts } from '~/APIs/api.js'

export const state = () => ({
    //* 首頁的商品
    indexPageProducts: [],
    //* 瀏覽過的商品(暫存用)
    products: [],
    // 單一產品(由 id 進行篩選) //! 暫時不用
    product: {},
    //* 產品標籤
    productTags: [],
})

export const getters = {
    getIndexPageProducts(state) {
        return state.indexPageProducts
    },
    //* 瀏覽過的商品(暫存用)
    getAllProducts(state) {
        return state.products
    },
    //! 暫不使用
    getSingleProduct(state) {
        return state.product
    },
    getAllProductTags(state) {
        return state.productTags
    },
}

export const mutations = {
    SET_INDEX_PAGE_PRODUCTS(state, products) {
        state.indexPageProducts = products
    },
    // 所有瀏覽過的商品 //! 暫時不用
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    //* 單一商品
    SET_PRODUCT(state, product) {
        state.product = product
    },
    //* 紀錄瀏覽過的產品(作為快取用)
    PUSH_PRODUCT(state, product) {
        state.products.push(product)
    },
    //! 重設單品 (清空原有的 Object) 暫時未用
    RESET_PRODUCT(state) {
        state.product = {}
    },
    SET_PRODUCT_TAGS(state, tags) {
        state.productTags = tags
    },
}

export const actions = {
    async fetchIndexPageProducts({ state, commit }) {
        //* state 中沒有資料才撈取 
        if(!state.indexPageProducts.length) {
            try {
                const res = await apiGetIndexPageProducts()
                const products = res.data.products
                commit('SET_INDEX_PAGE_PRODUCTS', products)
            } catch (error) {
                console.log(error)
            }
        }
    },
    //! 抓取所有商品 (暫時未用)
    async fetchAllProducts(state) {
        try {
            const res = await apiGetProducts()
            //* 所有產品的資料
            const products = res.data
            state.commit('SET_PRODUCTS', products)
        } catch (error) {
            console.log(error)
        }
    },
    //* 抓取單一商品
    async fetchSingleProduct({ state, commit }, productId) {
        let exist = state.products.find(product => product.id == productId)
        //* 若是找不到才抓取
        if (exist === undefined) {
            try {
                const res = await apiGetProduct(productId)
                //* 所有產品的資料
                const product = res.data.product
                //* 將點擊過的產品放入 products 暫存，若使用者在瀏覽過相同產品的時候就不用再發送一次 request
                await commit('PUSH_PRODUCT', product)
                //! 暫時不用 commit('SET_PRODUCT', product)
            } catch (error) {
                console.log(error)
            }
        }
    },
    async fetchAllProductTags({ state, commit }) {
        //* state 裡面沒有資料才撈取
        if (!state.productTags.length) {
            try {
                const res = await apiGetProductTags()
                const tags = res.data.tags
                commit('SET_PRODUCT_TAGS', tags)
            } catch (error) {
                console.log(error)
            }
        }
    },
}
