//! 目前此頁面暫不使用
import { apiGetProducts, apiGetProduct, apiGetProductTags } from '~/APIs/api.js'

export const state = () => ({
    //* 所有產品
    products: [],
    //* 單一產品(由 id 進行篩選)
    product: {}, // 起始為空的 Object
    //* 產品標籤
    productTags:[]
})

export const getters = {
    getAllProducts(state) {
        return state.products
    },
    //! 暫不使用
    getSingleProduct(state) {
        return state.product
    },
    getAllProductTags(state) {
        return state.tags
    }
}

export const mutations = {
    //* 所有商品
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    //* 單一商品
    SET_PRODUCT(state, product) {
        state.product = product
        console.log(state.product)
    },
    //* 將單一產品推送至所有產品(作為快取用) 
    PUSH_PRODUCT(state, product) {
        state.products.push(product)
    },
    //! 重設單品 (清空原有的 Object) 暫時未用
    RESET_PRODUCT(state) {
        state.product = {}
    },  
    SET_PRODUCT_TAGS(state, tags) {
        state.productTags = tags
    }
}

export const actions = {
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
        if(exist === undefined) {
            try {
                const res = await apiGetProduct(productId)
                //* 所有產品的資料
                const product = res.data.product
                await commit('PUSH_PRODUCT', product)
                commit('SET_PRODUCT', product)
            } catch (error) {
                console.log(error)
            }
        }
    },
    async fetchAllProductTags({ commit }) {
        try {
            const res = await apiGetProductTags()
            const tags = res.data.tags
            commit('SET_PRODUCT_TAGS', tags)
        } catch (error) {
            console.log(error);
        }
    }
}
