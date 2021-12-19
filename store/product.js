//! old version 
// import {
//     // apiGetProducts, //! 暫時不用
//     apiGetProduct,
//     apiGetProductsWithPagination,
//     apiGetProductTags,
//     apiGetIndexPageProducts,
// } from '~/APIs/api.js'
//* new version
import {
    // apiGetProducts, //! 暫時不用
    apiGetProduct,
    apiGetProductsWithPagination,
    apiGetProductTags,
    apiGetIndexPageProducts,
} from '~/APIs/product'

export const state = () => ({
    //* 首頁的商品
    indexPageProducts: [],
    //* 瀏覽過的商品(暫存用)
    viewedProducts: [],
    //* 分頁的產品
    paginatedProducts: [], 
    //* pagination 的 loading 狀態 
    loading: false,
    //* 產品標籤
    productTags: [],
})

export const getters = {
    getIndexPageProducts(state) {
        return state.indexPageProducts
    },
    //* 瀏覽過的商品(暫存用)
    getViewedProducts(state) {
        return state.viewedProducts
    },
    getPaginatedProducts(state) {
        return state.paginatedProducts
    },
    getLoading(state) {
        return state.loading
    },
    getAllProductTags(state) {
        return state.productTags
    },
}

export const mutations = {
    SET_INDEX_PAGE_PRODUCTS(state, products) {
        state.indexPageProducts = products
    },
    //* 單一商品
    SET_PRODUCT(state, product) {
        state.product = product
    },
    SET_PAGINATED_PRODUCTS(state, products) {
        state.paginatedProducts = products
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    //* 紀錄瀏覽過的產品(作為快取用)
    PUSH_PRODUCT_TO_VIEWED_PRODUCTS(state, product) {
        state.viewedProducts.push(product)
    },
    //* 產品的標籤 
    SET_PRODUCT_TAGS(state, tags) {
        state.productTags = tags
    },
}

export const actions = {
    async fetchIndexPageProducts({ state, commit }) {
        //* state 中沒有資料才撈取
        if (!state.indexPageProducts.length) { 
            try {
                const res = await apiGetIndexPageProducts()
                const products = res.data.products
                commit('SET_INDEX_PAGE_PRODUCTS', products)
            } catch (error) {
                console.log(error)
            }
        }
    },
    //* 抓取單一商品
    async fetchSingleProduct({ state, commit }, productId) {
        let exist = state.viewedProducts.find(product => product.id == productId)
        //* 若是找不到才抓取
        if (exist === undefined) {
            try {
                const res = await apiGetProduct(productId)
                //* 所有產品的資料
                const product = res.data.product
                //* 將點擊過的產品放入 products 暫存，若使用者在瀏覽過相同產品的時候就不用再發送一次 request
                await commit('PUSH_PRODUCT_TO_VIEWED_PRODUCTS', product)
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
    //* 產品的資料(含分頁)
    async fetchPaginatedProducts({ commit }, payload) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            //* 撈取資料
            const res = await apiGetProductsWithPagination(payload.orderBy, payload.sortBy, payload.page)
            const products = res.data.products
            await commit('SET_PAGINATED_PRODUCTS', products)
            //* 最後導向至該頁
            this.$router.push({
                name: 'products-pagination-pageNumber',
                params: { pageNumber: payload.page },
            })
        } 
        catch (error) {
            console.log(error, 'from store/pagination.js')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
}
