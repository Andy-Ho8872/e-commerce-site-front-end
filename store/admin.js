import { apiAdminGetProducts, apiAdminGetSingleProduct } from '~/APIs/admin.js'
import { 
    apiAdminAddProductVariation, 
    apiAdminDeleteProductVariation, 
    apiAdminUpdateProductVariationOption,
    apiGetProductTags 
} from '../APIs/admin'

export const state = () => ({
    //* 所有商品的資料(目前不使用分頁)
    products: [],
    product: {},
    viewedProducts: [],
    productTags: [],
})

export const getters = {
    getProducts(state) {
        return state.products
    },
    getProduct(state) {
        return state.product
    },
    getViewedProducts(state) {
        return state.viewedProducts
    },
    getProductTags(state) {
        return state.productTags
    },
}

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    SET_PRODUCT(state, product) {
        state.product = product
    },
    PUSH_PRODUCT_TO_VIEWED_PRODUCTS(state, product) {
        state.viewedProducts.push(product)
    },
    SET_PRODUCT_TAGS(state, tags) {
        state.productTags = tags
    },
}

export const actions = {
    async fetchProducts({ state, commit }) {
        try {
            //* state 裡面沒有產品的資料才進行撈取
            if (!state.products.length) {
                const res = await apiAdminGetProducts()
                const products = res.data.products
                commit('SET_PRODUCTS', products)
            }
        } catch (error) {
            console.log(error)
        }
    },
    async fetchSingleProduct({ state, commit }, productId) {
        let exist = state.viewedProducts.find(
            product => product.id == productId
        )
        // //* 若是找不到才抓取
        if (exist === undefined) {
            try {
                const res = await apiAdminGetSingleProduct(productId)
                //* 所有產品的資料
                const product = res.data.product
                //* 將點擊過的產品放入 products 暫存，若使用者在瀏覽過相同產品的時候就不用再發送一次 request
                await commit('PUSH_PRODUCT_TO_VIEWED_PRODUCTS', product)
            } catch (error) {
                console.log(error)
            }
        }
    },
    async refetchSingleProduct({ commit }, productId) {
        try {
            const res = await apiAdminGetSingleProduct(productId)
            const product = res.data.product
            commit('SET_PRODUCT', product)
        } catch (error) {
            console.log(error);
        }
    },
    async fetchProductTags({ state, commit }) {
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
    updateProductInfo({ commit }) {
        //todo 
    },
    async addProductVariation({ dispatch, commit }, payload) {
        try {
            await apiAdminAddProductVariation(payload.product_id,{
                product_id: payload.product_id,
                variation_title: payload.variation_title,
                variation_options: payload.variation_options
            })
            dispatch('refetchSingleProduct', payload.product_id)
            //* 提示訊息
            const message = {
                type: 'success',
                text: '規格新增成功',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error)
            const message = {
                type: 'error',
                text: '規格新增失敗',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        }
    },
    async deleteProductVariation({ dispatch }, payload) {
        try {
            await apiAdminDeleteProductVariation(payload.product_id, payload.variation_id)
            //* 更新後重新撈取
            dispatch('refetchSingleProduct', payload.product_id)
            //* 提示訊息
            const message = {
                type: 'success',
                text: '規格刪除成功',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error);
        }
    },
    async updateProductVariationOption({ dispatch }, { product_id, variation_id, options, optionIndex }) {
        try {
            //* 建立一個暫存陣列
            const newOptionArray = Array.from(options)
            //* 先將暫存陣列中的該值篩刪除
            await newOptionArray.splice(optionIndex, 1)
            //* 向後端傳送新的陣列 
            await apiAdminUpdateProductVariationOption(product_id, variation_id, { variation_options: newOptionArray })
            //* 更新後重新撈取
            dispatch('refetchSingleProduct', product_id)
            //* 提示訊息
            const message = {
                type: 'success',
                text: '選項刪除成功',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error)
            const message = {
                type: 'error',
                text: '選項刪除失敗',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        }
    },
}
