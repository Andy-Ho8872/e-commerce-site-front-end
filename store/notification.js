//! old version
// import {
//     apiGetAllNotifications,
//     apiGetUnReadNotifications,
//     apiMarkNotification,
//     apiMarkAllNotifications,
//     apiDeleteAllNotifications
// } from '~/APIs/api'
//* new version 
import {
    apiGetAllNotifications,
    apiGetUnReadNotifications,
    apiMarkNotification,
    apiMarkAllNotifications,
    apiDeleteAllNotifications
} from '~/APIs/notification'

export const state = () => ({
    //* 通知訊息
    notifications: [], //? 所有通知
    unReadNotifications: [], //? 未讀的通知
    //* loading 狀態
    loading: false 
})
export const getters = {
    getNotifications(state) {
        return state.notifications
    },
    getUnreadNotifications(state) {
        return state.notifications.filter((notification) => {
            return notification.read_at == null
        })
    },
    getLoading(state) {
        return state.loading
    }
}
export const mutations = {
    SET_NOTIFICATIONS(state, notifications) {
        state.notifications = notifications
    },
    SET_UNREAD_NOTIFICATIONS(state, unReadNotifications) {
        state.unReadNotifications = unReadNotifications
    },
    CLEAR_ALL_NOTIFICATIONS(state) {
        state.notifications = []
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    }
}
export const actions = {
//* 讀取 
    //? 所有通知 
    async fetchAllNotifications({ commit }) {
        try {
            const res = await apiGetAllNotifications()
            const notifications = res.data.notifications
            commit('SET_NOTIFICATIONS', notifications) 
        } catch (error) {
            console.log(error);
            console.log('抓取失敗 from /store/notification');
        }
    },
    //! 未讀取通知 (暫時不用)
    async fetchUnreadNotifications({ commit }) {
        try {
            const res = await apiGetUnReadNotifications()
            const unReadNotifications = res.data.notifications
            commit('SET_UNREAD_NOTIFICATIONS', unReadNotifications)
        } catch (error) {
            console.log(error);
            console.log('抓取失敗 from /store/notification');
        }
    },
//*  將通知標示為已讀
    //? 單一通知 
    async markNotification({ dispatch, commit }, notification) {
        commit('SET_LOADING', true)
        try {
            await apiMarkNotification({ id: notification.id })
            //* 重新撈取通知 
            await dispatch('fetchAllNotifications')
            //* 提示訊息
            const message = {
                type: 'success',
                text: '已將通知變為已讀',
            } 
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error);
            console.log('抓取失敗 from /store/notification');
        }
        commit('SET_LOADING', false)
    },
    //? 所有通知
    async markAllNotifications({ dispatch, commit }) {
        commit('SET_LOADING', true)
        try {
            await apiMarkAllNotifications()
            //* 重新撈取通知 
            await dispatch('fetchAllNotifications')
            //* 提示訊息
            const message = {
                type: 'success',
                text: '已將所有通知變為已讀',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error);
            console.log('抓取失敗 from /store/notification');
        }
        commit('SET_LOADING', false)
    },
//* 刪除
    //? 所有通知
    async deleteAllNotifications({ dispatch, commit }) {
        commit('SET_LOADING', true)
        try {
            await apiDeleteAllNotifications()
            //* 刪除所有通知(暫存)
            await commit('CLEAR_ALL_NOTIFICATIONS')
            //* 提示訊息
            const message = {
                type: 'error',
                text: '已刪除所有通知',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error);
            console.log('抓取失敗 from /store/notification');
        }
        commit('SET_LOADING', false)
    }
}
