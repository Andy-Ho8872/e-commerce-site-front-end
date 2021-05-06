//* 使用在 pages/user/notification/index.vue
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            notifications: 'notification/getNotifications', //* 所有通知
            unReadNotifications: 'notification/getUnreadNotifications', //* 未讀取的通知 
            notificationLoading: 'notification/getLoading' //* loading 狀態
        })
    },
    methods: {
        ...mapActions({
            //* 標示為已讀 
            markNotification: 'notification/markNotification', //? 單筆通知
            markAllNotifications: 'notification/markAllNotifications', //? 所有通知 
            //* 刪除通知 
            deleteAllNotifications: 'notification/deleteAllNotifications' //? 所有通知
        })
    }
}