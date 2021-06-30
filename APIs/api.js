import axios from 'axios';
axios.defaults.withCredentials = true;

//* URL 與 設定
let base = process.env.apiUrl; //? 從 nuxt.config.js 獲取後端 API 的 URL 


//* CSRF請求------------------------------------------------------------------Start
//! 暫時不用
// const userCsrfRequest = axios.create({
//     baseURL: 'http://localhost:8000'
// });
//* CSRF請求------------------------------------------------------------------End


//* 產品請求-------------------------------------------------------------------Start
const productRequest = axios.create({
    baseURL: `${ base }/products`
});
//* 產品請求-------------------------------------------------------------------End


//* 使用者請求------------------------------------------------------------------Start
const userRequest = axios.create({
    baseURL: `${ base }/user`
});
//* 使用者請求------------------------------------------------------------------End
    

//* 驗證請求-------------------------------------------------------------------Start
const authRequest = axios.create({
    baseURL: `${ base }/auth/user`
});
//? 設置攔截器 (interceptors)
authRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')
        if (token) {
            config.headers.authorization = token
        }
        return config
    }, 
    (error) => Promise.reject(error)
)
//* 異常(錯誤)處理 
authRequest.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if(error && error.response) {
            switch (error.response.status) {
                case 401:
                    //* 重新導向
                    $nuxt._router.push({ name: 'auth-login' })
                    break; 
                default:
                    console.log("axios 錯誤。");
            }
        }
    }
)
//* 驗證請求-------------------------------------------------------------------End



//------------------------------------------- 使用者相關 API -------------------------------------------//
    //* 註冊 
export const apiUserRegister = data => userRequest.post('/register', data);
    //* 登入 (取得 Token)
export const apiUserLogin = data => userRequest.post('/login', data);
    //* CSRF 
// export const apiCsrfLogin = () => userCsrfRequest.get('/sanctum/csrf-cookie'); //! 暫時不用
    //----------------------------------- 以下操作必須包含Token -------------------------------------//
    //* 登出 
export const apiUserLogout = () => authRequest.get('/logout');
    //* 取得使用者
export const apiGetUserInfo = () => authRequest.get('/getUser');
//------------------------------------------- 使用者相關 API -------------------------------------------//



//------------------------------------------- 商品相關的 API -------------------------------------------//
    //* 撈取所有產品
export const apiGetProducts = () => productRequest.get('/');
    //* 網站首頁的產品
export const apiGetIndexPageProducts = () => productRequest.get('/indexPage');
    //* 圖片輪播產品
export const apiGetCarouselProducts = () => productRequest.get('/carousel');
    //* 撈取單一產品
export const apiGetProduct = (id) => productRequest.get(`/${id}`);
    //* 撈取商品標籤
export const apiGetProductTags = () => productRequest.get(`/tags/getTags`);
    //* 商品換頁(Pagination) 
export const apiGetProductsWithPagination = (page) => productRequest.get(`/pagination?page=${page}`);
    //* 搜尋商品(名稱)
export const apiSearchByTitle = (title) => productRequest.get(`/search/${title}`);
    //! 搜尋商品(標籤)  暫時未用到
export const apiSearchByTag = (id) => productRequest.get(`/tags/${id}`);
//------------------------------------------- 商品相關的 API -------------------------------------------//



//-------------------------------------------------- 購物車相關 API --------------------------------------------------//
            //----------------------------------- 以下操作必須包含Token -------------------------------------//
//* 讀取
    //? 撈取購物車中的產品
export const apiGetCartProducts = () => authRequest.get('/cart');
//* 新增
    //? 新增商品至購物車
export const apiAddToCart = (productId) => authRequest.get(`/cart/${productId}/create`);
    //? 新增商品至購物車(包含使用者所輸入的數量)
export const apiAddToCartWithQuantity = (productId, quantity) => authRequest.post(`/cart/${productId}/create`, quantity);
//* 刪除
    //? 購物車中移除商品
export const apiDeleteFromCart = (productId) => authRequest.delete(`/cart/${productId}/delete`);
    //? 清空購物車
export const apiDeleteAllFromCart = () => authRequest.delete(`/cart/deleteAll`);
//* 修改
    //? 直接輸入
export const apiUpdateQuantity = (productId, quantity) => authRequest.post(`/cart/${productId}/update`, quantity);
    //? 增加 1
export const apiIncreaseQuantityByOne = (productId) => authRequest.get(`/cart/${productId}/increaseByOne`);
    //? 減少 1
export const apiDecreaseQuantityByOne = (productId) => authRequest.get(`/cart/${productId}/decreaseByOne`);
//-------------------------------------------------- 購物車相關 API --------------------------------------------------//


//-------------------------------------------------- 訂單相關 API --------------------------------------------------//
            //----------------------------------- 以下操作必須包含Token -------------------------------------//
//* 讀取
    //? 後端傳來的表單資料
    export const apiGetTableColumns = () => authRequest.get('/orders/getTableColumns');
    //? 所有訂單
    export const apiGetAllOrders = () => authRequest.get('/orders');
    //? 單筆訂單
    export const apiGetSingleOrder = (orderId) => authRequest.get(`/orders/${orderId}`);
//* 新增
    //? 建立訂單
    export const apiCreateOrder = (order) => authRequest.post('/orders/create', order);
//* 刪除
    //? 刪除訂單
    export const apiDeleteSingleOrder = (orderId) => authRequest.delete(`/orders/${orderId}/delete`);
//-------------------------------------------------- 訂單相關 API --------------------------------------------------//


//-------------------------------------------------- 通知相關 API --------------------------------------------------//
            //----------------------------------- 以下操作必須包含Token -------------------------------------//
//* 讀取
    //? 所有通知 
    export const apiGetAllNotifications = () => authRequest.get('/notifications');
    //! 未讀的通知 (暫時不用)
    export const apiGetUnReadNotifications = () => authRequest.get('/notifications/unread');
//* 標示為已讀
    //? 單筆通知
    export const apiMarkNotification = (notification) => authRequest.post('/notifications/markAsRead', notification);
    //? 所有通知
    export const apiMarkAllNotifications = () => authRequest.get('/notifications/markAllAsRead');
//* 刪除
    //? 所有通知 
    export const apiDeleteAllNotifications = () => authRequest.delete('/notifications/deleteAll');
//-------------------------------------------------- 通知相關 API --------------------------------------------------//