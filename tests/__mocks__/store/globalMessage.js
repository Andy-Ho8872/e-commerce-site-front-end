export const state = () => ({
    //* 提示訊息
    message: {
        type: 'success',
        text: 'Welcome here'
    },
})
export const getters = {
    getMessage(state) {
        return state.message
    },
}
export const mutations = {
    //* 設置提示訊息
    SET_MESSAGE: jest.fn((state, message) => {
        state.message = message
    }),
    //* 清除提示訊息
    CLEAR_MESSAGE: jest.fn((state) => {
        state.message = null
    }),
}
export const actions = {
    async setFlashMessage({ commit }, message) {
        //* 設置訊息 
        commit('SET_MESSAGE', message)
        // //* 3秒後清除訊息 
        // setTimeout(() => {
        //     commit('CLEAR_MESSAGE')
        // }, 3000)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}