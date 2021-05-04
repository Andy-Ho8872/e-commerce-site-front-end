export const state = () => ({
    //* 提示訊息
    message: null,
})
export const getters = {
    getMessage(state) {
        return state.message
    },
}
export const mutations = {
    //* 設置提示訊息
    SET_MESSAGE(state, message) {
        state.message = message
    },
    //* 清除提示訊息
    CLEAR_MESSAGE(state) {
        state.message = null
    },
}
export const actions = {
    //? 清除提示訊息
    clearMessage({ commit }) {
        setTimeout(() => {
            commit('CLEAR_MESSAGE')
        }, 3000)
    },
}
