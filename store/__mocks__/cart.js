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
})

export const getters = {
    getUserCart(state) {
        return state.userCart
    },
}

export const mutations = {
    
}

export const actions = {
    
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}