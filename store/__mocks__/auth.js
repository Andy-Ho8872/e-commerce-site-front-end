export const state = () => ({
    token: 'test token',
    user: {
        id: 1,
        name: 'Tommy',
    },
})

export const getters = {
    getToken(state) {
        return state.token
    },
    getUserInfo(state) {
        return state.user
    },
}

export const mutations = {
    SET_TOKEN: jest.fn()
}

export const actions = {
    fetchRequiredData: jest.fn(),
    logout: jest.fn(),
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}