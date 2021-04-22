import { apiGetProductsWithPagination } from '../APIs/api.js'

export const state = () => ({
    products: [],
    loading: false
})

export const getters = {
    getPaginatedProducts(state) {
        return state.products
    },
    getLoading(state) {
        return state.loading
    }
}

export const mutations = {
    SET_PAGINATED_PRODUCTS(state, products) {
        state.products = products
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    }
}

export const actions = {
    async fetchPaginatedProducts({ commit }, pageNumber) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            //* 撈取資料
            const res = await apiGetProductsWithPagination(pageNumber)
            let products = res.data.products
            await commit('SET_PAGINATED_PRODUCTS', products)
            //* 最後導向至該頁
            this.$router.push({
                name: 'pagination-pageNumber',
                params: { pageNumber: pageNumber },
            })
        } 
        catch (error) {
            console.log(error, 'from store/pagination.js')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
}
