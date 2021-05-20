export default function({ $axios, redirect }) {
    $axios.onRequest(config => {
        config.headers.authorization = localStorage.getItem('Token')
    })
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        switch (code) {
            case 401:
                console.log('沒權限')
                redirect({ name: 'auth-login' })
                break
            case 500:
                console.log('Server 錯誤')
            default:
                redirect({ name: 'auth-register' })
                break
        }
    })
    //-------------------------------------------------- 購物車相關 API --------------------------------------------------//
                //----------------------------------- 以下操作必須包含Token -------------------------------------//
    //* 讀取
        //? 撈取購物車中的產品
    $axios.apiGetCartProducts = () => $axios.get('/cart');
    //* 新增
        //? 新增商品至購物車
    $axios.apiAddToCart = (productId) => $axios.get(`/cart/${productId}/create`);
        //? 新增商品至購物車(包含使用者所輸入的數量)
    $axios.apiAddToCartWithQuantity = (productId, quantity) => $axios.post(`/cart/${productId}/create`, quantity);
    //* 刪除
        //? 購物車中移除商品
    $axios.apiDeleteFromCart = (productId) => $axios.delete(`/cart/${productId}/delete`);
        //? 清空購物車
    $axios.apiDeleteAllFromCart = () => $axios.delete(`/cart/deleteAll`);
    //* 修改
        //? 直接輸入
    $axios.apiUpdateQuantity = (productId, quantity) => $axios.post(`/cart/${productId}/update`, quantity);
        //? 增加 1
    $axios.apiIncreseQuantityByOne = (productId) => $axios.get(`/cart/${productId}/increseByOne`);
        //? 減少 1
    $axios.apiDecreseQuantityByOne = (productId) => $axios.get(`/cart/${productId}/decreseByOne`);
    //-------------------------------------------------- 購物車相關 API --------------------------------------------------//
}
