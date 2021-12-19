import config from '../APIs/config'

//-------------------------------------------------- 訂單相關 API --------------------------------------------------//
            //----------------------------------- 以下操作必須包含Token -------------------------------------//
//* 讀取
    //? 後端傳來的表單資料
export const apiGetTableColumns = () => config.authRequest.get('/orders/getTableColumns');
    //? 所有訂單
export const apiGetAllOrders = () => config.authRequest.get('/orders');
    //? 單筆訂單
export const apiGetSingleOrder = (orderId) => config.authRequest.get(`/orders/${orderId}`);
//* 新增
    //? 建立訂單
export const apiCreateOrder = (order) => config.authRequest.post('/orders/create', order);
//* 刪除
    //? 刪除訂單
export const apiDeleteSingleOrder = (orderId) => config.authRequest.delete(`/orders/${orderId}/delete`);
//-------------------------------------------------- 訂單相關 API --------------------------------------------------//