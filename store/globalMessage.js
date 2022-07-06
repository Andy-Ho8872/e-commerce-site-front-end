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
    async setFlashMessage({ commit }, message) {
        //* 設置訊息 
        commit('SET_MESSAGE', message)
        //* 3秒後清除訊息 
        const timeout = setTimeout(() => {
            commit('CLEAR_MESSAGE')
            //* 清除 timeout 以防止記憶體洩漏 
            clearTimeout(timeout)
        }, 5000)
    }
}
