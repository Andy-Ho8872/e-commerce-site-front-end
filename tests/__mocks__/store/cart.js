export const state = () => ({
    userCart: [
        {
            id: 1,
            product_id: 1,
            title: '單眼相機',
            unit_price: 1000,
            discount_rate: 0.85,
            quantity: 1,
            //! readonly
            total: 850, // unit_price * discount_rate * quantity 
        },
        {
            id: 2,
            product_id: 2,
            title: '連身長裙',
            unit_price: 500,
            discount_rate: 1,
            quantity: 1,
            //! readonly
            total: 500, // unit_price * discount_rate * quantity 
        },
    ],
    product: {
        id: 1,
        title: 'test1',
        quantity: 1,
    },
    loading: false,
    //* 判定購物車內是否有商品 初始為 false
    valid: false
})

export const getters = {
    getUserCart(state) {
        return state.userCart
    },
    getLoading(state) {
        return state.loading
    },
    getProduct(state) {
        return state.product
    },
    getValidStatus(state) {
        return state.valid
    }
}

export const mutations = {
    INCREMENT(state) {
        state.product.quantity += 1
    },
    DECREMENT(state) {
        state.product.quantity -= 1
    },
}

export const actions = {
    async increaseByOne({ commit }) {
        commit('INCREMENT')
    },
    async decreaseByOne({ commit }) {
        commit('DECREMENT')
    },
    deleteFromCart: jest.fn(),
    deleteAllFromCart: jest.fn()
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}