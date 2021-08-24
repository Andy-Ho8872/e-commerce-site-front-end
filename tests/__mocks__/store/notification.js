export const state = () => ({
    unReadNotifications: [
        {
            id: 1,
            data: [
                {
                    title: 'fake notification-1',
                    order_id: 5,
                    created_at: '2021/08/25',
                },
            ],
        },
        {
            id: 2,
            data: [
                {
                    title: 'fake notification-2',
                    order_id: 6,
                    created_at: '2021/08/26',
                },
            ],
        },
    ],
})

export const getters = {
    getUnreadNotifications(state) {
        return state.unReadNotifications
    },
}

export const mutations = {}

export const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
