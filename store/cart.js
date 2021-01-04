import { 
    apiGetCartProducts, 
    apiAddToCart,
    apiDeleteFromCart,
    apiUpdateQuantity, 
    apiIncreseQuantityByOne, 
    apiDecreseQuantityByOne } 
from '../APIs/api.js';

export const state = () => ({
    userCart: [],
    item: {},
    test: 'test'

})

export const getters = {
    getUserCart (state) {
        return state.userCart
    },
    // 測試
    getCurrentQuantity: (state) => (id) => {
        return state.userCart.find(cart => cart.id === id)
    }
}

export const mutations = {
    SET_USER_CART (state, payload) {
        state.userCart = payload
    },

    // 測試
    // 更改購物車中商品數量
    CHANGE_QUANTITY_BY_ONE (state, index, value) {
        state.userCart[0].product_quantity += value
        console.log(`第${index} 個`,);

        // state.quantity += value
        // console.log(`編號${index}`,'已經改變');
    }
}

export const actions = {
    // 抓取使用者的購物車
    async fetchUserCart (state) {
        const userId = localStorage.getItem('UserID');
        const res = await apiGetCartProducts(userId);
        let payload = res.data.orders;
        state.commit('SET_USER_CART', payload);
    },
    // 新增商品至購物車
    async addToCart (state, productId) {
        const userId = localStorage.getItem('UserID');
        try {
            const res = await apiAddToCart(userId, productId);
            alert('已經新增至購物車')
            console.log(res);
        }
        catch (error) {
            console.log(error)
            console.log('新增失敗 from vuex');
        }
    },
    // 從購物車中移除商品
    async deleteFromCart (state, productId) {
        const userId = localStorage.getItem('UserID');
        try {
            const res = await apiDeleteFromCart(userId, productId);
            alert('已經移除一項商品');
            console.log(res);;
        } 
        catch (error) {
            console.log(error);
            console.log('刪除失敗 from vuex');
        }
    },
    
    



    // 測試
    // 更新使用者購物車中商品的數量
    async increseByOne (state, index) {
        const userId = localStorage.getItem('UserID')
       
        
        // 根據商品 id 來選擇
        
        // 選擇後更改數量
        console.log(productId);

        // state.commit('CHANGE_QUANTITY_BY_ONE', index, value)
    },
    
}