import config from '../APIs/config'

//-------------------------------------------------- 通知相關 API --------------------------------------------------//
            //----------------------------------- 以下操作必須包含Token -------------------------------------//
//* 讀取
    //? 所有通知 
export const apiGetAllNotifications = () => config.authRequest.get('/notifications');
    //! 未讀的通知 (暫時不用)
export const apiGetUnReadNotifications = () => config.authRequest.get('/notifications/unread');
//* 標示為已讀
    //? 單筆通知
export const apiMarkNotification = (notification) => config.authRequest.post('/notifications/markAsRead', notification);
    //? 所有通知
export const apiMarkAllNotifications = () => config.authRequest.get('/notifications/markAllAsRead');
//* 刪除
    //? 所有通知 
export const apiDeleteAllNotifications = () => config.authRequest.delete('/notifications/deleteAll');
//-------------------------------------------------- 通知相關 API --------------------------------------------------//