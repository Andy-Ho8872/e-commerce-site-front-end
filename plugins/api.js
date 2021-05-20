export default function({ $axios, redirect }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json, text/plain, */*',
            },
            'Content-Type': 'application/json',
        },
    })
    api.setBaseURL('http://localhost:8000/api/v1/auth/user')

    api.onRequest(config => {
        config.headers.authorization = localStorage.getItem('Token')
    })
    api.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
            redirect({ name: 'auth-login' })
        }
        redirect({ name: 'auth-register' })
    })

    inject('api', api)

    api.apiAddToCart = (productId) => api.get(`/cart/${productId}/create`)
    //-------------------------------------------------- 購物車相關 API --------------------------------------------------//
            //----------------------------------- 以下操作必須包含Token -------------------------------------//
//* 讀取
    //? 撈取購物車中的產品
api.apiGetCartProducts = () => api.get('/cart');
//* 新增
    //? 新增商品至購物車
api.apiAddToCart = (productId) => api.get(`/cart/${productId}/create`);
    //? 新增商品至購物車(包含使用者所輸入的數量)
api.apiAddToCartWithQuantity = (productId, quantity) => api.post(`/cart/${productId}/create`, quantity);
//* 刪除
    //? 購物車中移除商品
api.apiDeleteFromCart = (productId) => api.delete(`/cart/${productId}/delete`);
    //? 清空購物車
api.apiDeleteAllFromCart = () => api.delete(`/cart/deleteAll`);
//* 修改
    //? 直接輸入
api.apiUpdateQuantity = (productId, quantity) => api.post(`/cart/${productId}/update`, quantity);
    //? 增加 1
api.apiIncreseQuantityByOne = (productId) => api.get(`/cart/${productId}/increseByOne`);
    //? 減少 1
api.apiDecreseQuantityByOne = (productId) => api.get(`/cart/${productId}/decreseByOne`);
//-------------------------------------------------- 購物車相關 API --------------------------------------------------//
}


