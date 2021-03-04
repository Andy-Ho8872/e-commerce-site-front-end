import axios from 'axios';
axios.defaults.withCredentials = true;

// URL 與 設定
let base = 'http://localhost:8000/api'; // 後端 API 的 URL

// 使用者請求
const userRequest = axios.create({
    baseURL: `${ base }/user`
});

// 購物車請求------------------------------------------------------------------Start
const cartRequest = axios.create({
    baseURL: `${ base }/auth/user`
});
// 設置攔截器 (interceptors)
cartRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')
        if (token) {
            config.headers.authorization = token
        }
        return config
    }, 
    (error) => Promise.reject(error)
)
// 購物車請求------------------------------------------------------------------End



// CSRF Protection API 使用者第一次登入時要先取得 CSRF 憑證
const userCsrfRequest = axios.create({
    baseURL: 'http://localhost:8000'
});

// Product Request 取得商品資訊 (假資料)
const productRequest = axios.create({
    baseURL: `${ base }/products`
});


//------------------------------------------- 使用者相關 API -------------------------------------------//
    // 註冊 
export const apiUserRegister = data => userRequest.post('/register', data);
    // 登入 (取得 Token)
export const apiUserLogin = data => userRequest.post('/login', data);
    // CSRF 
export const apiCsrfLogin = () => userCsrfRequest.get('/sanctum/csrf-cookie');
    // 登出 (要有 Token 才能登出)
export const apiUserLogout = token => userRequest.get('/logout', token);
    // 取得 User 
// export const apiGetUserInfo = (id) => userRequest.get(`/user/${id}`);
//------------------------------------------- 使用者相關 API -------------------------------------------//



//------------------------------------------- 商品相關的 API -------------------------------------------//
    // 撈取所有產品
export const apiGetProducts = () => productRequest.get('/');
    // 網站首頁的產品
export const apiGetIndexPageProducts = () => productRequest.get('/indexPage');
    // 圖片輪播產品
export const apiGetCarouselProducts = () => productRequest.get('/carousel');
    // 撈取單一產品
export const apiGetProduct = (id) => productRequest.get(`/${id}`);
    // 商品換頁(Pagination) 
export const apiGetProductsWithPagination = (page) => productRequest.get(`/pagination?page=${page}`);
    // 搜尋商品(名稱)
export const apiSearchByTitle = (title) => productRequest.get(`/search/${title}`);
    // 搜尋商品(標籤)  暫時未用到
export const apiSearchByTag = (id) => productRequest.get(`/tag/${id}`);
//------------------------------------------- 商品相關的 API -------------------------------------------//



//-------------------------------------------------- 購物車相關 API --------------------------------------------------//
            //----------------------------------- 以下操作必須包含Token -------------------------------------//
// 讀取
// 使用者在購物車中的產品 get 順序 URL -> Headers
export const apiGetCartProducts = () => cartRequest.get('/cart');
// 新增
// 使用者新增商品至購物車  post 順序 URL -> BODY -> Headers
export const apiAddToCart = (productId) => cartRequest.get(`/cart/${productId}/create`);
// 新增商品至購物車(包含使用者所輸入的數量)
export const apiAddToCartWithQuantity = (productId, quantity) => cartRequest.post(`/cart/${productId}/create`, quantity);
// 刪除
// 使用者從購物車中移除商品
export const apiDeleteFromCart = (productId) => cartRequest.delete(`/cart/${productId}/delete`);
// 清空購物車
export const apiDeleteAllFromCart = () => cartRequest.delete(`/cart/deleteAll`);
// 修改
    // 直接輸入
export const apiUpdateQuantity = (productId, quantity) => cartRequest.post(`/cart/${productId}/update`, quantity);
// 增加 1
export const apiIncreseQuantityByOne = (productId) => cartRequest.get(`/cart/${productId}/increseByOne`);
// 減少 1
export const apiDecreseQuantityByOne = (productId) => cartRequest.get(`/cart/${productId}/decreseByOne`);
//-------------------------------------------------- 購物車相關 API --------------------------------------------------//
