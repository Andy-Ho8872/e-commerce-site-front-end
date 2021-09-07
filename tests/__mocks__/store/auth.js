export const state = () => ({
    token: 'test token',
    user: {
        id: 1,
        name: 'Tommy',
        email: 'Tommy@example.com',
        created_at: '2021/08/03'
    },
    loading: false,
    message: {
        email: ['必須是 E-MAIL 格式!'],
        password: ['密碼只能填入英文或數字!!!'],
    },
})

export const getters = {
    getToken(state) {
        return state.token
    },
    getUserInfo(state) {
        return state.user
    },
    getLoading(state) {
        return state.loading
    },
    getMessage(state) {
        return state.message
    },
}

export const mutations = {
    SET_TOKEN: jest.fn(),
}

export const actions = {
    fetchRequiredData: jest.fn(),
    logout: jest.fn(),
    checkIfUserHasLoggedIn: jest.fn(),
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
