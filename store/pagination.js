import { apiGetProductsWithPagination } from '../APIs/api.js'

export const state = () => ({
    products: [],
    pending: false
})

export const getters = {
    getPaginatedProducts(state) {
        return state.products
    },
    getPending(state) {
        return state.pending
    }
}

export const mutations = {
    SET_PAGINATED_PRODUCTS(state, products) {
        state.products = products
    },
    SET_PENDING(state, pending) {
        state.pending = pending
    }
}

export const actions = {
    async fetchPaginatedProducts({ commit }, pageNumber) {
        try {
            // pending 狀態
            commit('SET_PENDING', true)
            // 撈取資料
            const res = await apiGetProductsWithPagination(pageNumber)
            let products = res.data.products
            await commit('SET_PAGINATED_PRODUCTS', products)
            commit('SET_PENDING', false)
            // 最後導向至該頁
            this.$router.push({
                name: 'pagination-pageNumber',
                params: { pageNumber: pageNumber },
            })
        } 
        catch (error) {
            console.log(error, 'from store/pagination.js')
        }
    },
}
