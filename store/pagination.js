import { apiGetProductsWithPagination } from '../APIs/api.js'

export const state = () => ({
    products: [],
})

export const getters = {
    getPaginatedProducts(state) {
        return state.products
    },
}

export const mutations = {
    SET_PAGINATED_PRODUCTS(state, products) {
        state.products = products
    },
}

export const actions = {
    async fetchPaginatedProducts({ commit }, pageNumber) {
        try {
            const res = await apiGetProductsWithPagination(pageNumber)
            let products = res.data.products
            await commit('SET_PAGINATED_PRODUCTS', products)
            // 導向至該頁
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
