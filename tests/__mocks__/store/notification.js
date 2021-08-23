export const state = () => ({
    unReadNotifications: [
        {
            id: 1,
            text: 'fake notification-1',
        },
        {
            id: 2,
            text: 'fake notification-2',
        },
    ],
})

export const getters = {
    getUnreadNotifications(state) {
        return state.unReadNotifications
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