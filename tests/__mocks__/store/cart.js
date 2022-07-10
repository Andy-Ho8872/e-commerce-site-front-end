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
            variation_option_values: ['高級版']
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
            variation_option_values: ['黑色']
        },
    ],
    product: {
        id: 1,
        title: 'test1',
        quantity: 1,
    },
    loading: false,
    //* 判定購物車內是否有商品 初始為 false
    valid: true,
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
    },
}

export const mutations = {
    INCREMENT(state) {
        state.product.quantity += 1
    },
    DECREMENT(state) {
        state.product.quantity -= 1
    },
    //* 判定購物車內是否有資料
    CHECK_AND_SET_VALID_STATUS: jest.fn((state) => {
        state.userCart.length ? (state.valid = true) : (state.valid = false)
    }),
    REMOVE_SINGLE_PRODUCT_FROM_CART: jest.fn((state, cart_id) => {
        const index = state.userCart.findIndex(cart => {
            return cart.id == cart_id
        })
        if (index !== -1) {
            state.userCart.splice(index, 1)
        }
    }),
    REMOVE_ALL_FROM_CART: jest.fn(state => {
        // state.userCart = [] // default
        state.userCart.length = 0
    }),
}

export const actions = {
    async increaseByOne({ commit }) {
        commit('INCREMENT')
    },
    async decreaseByOne({ commit }) {
        commit('DECREMENT')
    },
    deleteFromCart: jest.fn(({ commit }, data) => {
        commit('REMOVE_SINGLE_PRODUCT_FROM_CART', data.cart_id)
    }),
    deleteAllFromCart: jest.fn(async ({ commit }) => {
        //* 確認購物車內是否還有商品
        await commit('CHECK_AND_SET_VALID_STATUS')
        commit('REMOVE_ALL_FROM_CART')
    }),
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
