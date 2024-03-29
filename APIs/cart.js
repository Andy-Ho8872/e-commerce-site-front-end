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
export const apiDeleteFromCart = (cart_id) => config.authRequest.delete(`/cart/${cart_id}/delete`);
    //? 清空購物車
export const apiDeleteAllFromCart = () => config.authRequest.delete(`/cart/deleteAll`);
//* 修改
    //? 直接輸入
export const apiUpdateQuantity = (data) => config.authRequest.post(`/cart/${data.cart_id}/update`, data);
    //? 增加 1
export const apiIncreaseQuantityByOne = (cart_id) => config.authRequest.get(`/cart/${cart_id}/increaseByOne`);
    //? 減少 1
export const apiDecreaseQuantityByOne = (cart_id) => config.authRequest.get(`/cart/${cart_id}/decreaseByOne`);
//-------------------------------------------------- 購物車相關 API --------------------------------------------------//