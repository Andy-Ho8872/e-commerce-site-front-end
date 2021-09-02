export const state = () => ({
    userCart: [
        {
            id: 1,
            name: '3C',
            quantity: 1,
        },
        {
            id: 2,
            name: '服裝',
            quantity: 1,
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