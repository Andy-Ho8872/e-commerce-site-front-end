import config from '../APIs/config'

//-------------------------------------------------- 購物車相關 API --------------------------------------------------//
        //----------------------------------- 以下操作必須包含Token -------------------------------------//
//* 讀取
    //? 撈取購物車中的產品
export const apiGetCartProducts = () => config.authRequest.get('/cart');
//* 新增
    //? 新增商品至購物車
export const apiAddToCart = (productId) => config.authRequest.get(`/cart/product/${productId}/create`);
    //? 新增商品至購物車(包含使用者所輸入的數量)
export const apiAddToCartWithData = (data) => config.authRequest.post(`/cart/product/${data.product_id}/create`, data);
//* 刪除
    //? 購物車中移除商品
export const apiDeleteFromCart = (productId) => config.authRequest.delete(`/cart/product/${productId}/delete`);
    //? 清空購物車
export const apiDeleteAllFromCart = () => config.authRequest.delete(`/cart/product/deleteAll`);
//* 修改
    //? 直接輸入
export const apiUpdateQuantity = (productId, quantity) => config.authRequest.post(`/cart/product/${productId}/update`, quantity);
    //? 增加 1
export const apiIncreaseQuantityByOne = (productId) => config.authRequest.get(`/cart/product/${productId}/increaseByOne`);
    //? 減少 1
export const apiDecreaseQuantityByOne = (productId) => config.authRequest.get(`/cart/product/${productId}/decreaseByOne`);
//-------------------------------------------------- 購物車相關 API --------------------------------------------------//