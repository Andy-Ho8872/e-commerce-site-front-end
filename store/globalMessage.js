export const state = () => ({
    //* 提示訊息
    message: null,
    timeout_id: null,
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
    SET_TIMEOUT_ID(state, timeout_id) {
        state.timeout_id = timeout_id
    },
}
export const actions = {
    async setFlashMessage({ state, commit }, message) {
        //* 將原本的 timeout 清除
        clearTimeout(state.timeout_id)
        //* 設置訊息 
        commit('SET_MESSAGE', message)
        //* 清除訊息 
        const new_timeout_id = setTimeout(() => {
            commit('SET_TIMEOUT_ID', new_timeout_id)
            commit('CLEAR_MESSAGE')
        }, 3500)
    }
}
