import { 
    apiGetCartProducts, 
    apiAddToCart,
    apiAddToCartWithQuantity,
    apiDeleteFromCart,
    apiDeleteAllFromCart,
    apiUpdateQuantity, 
    apiIncreseQuantityByOne, 
    apiDecreseQuantityByOne } 
from '../APIs/api.js';

export const state = () => ({
    // 購物車中的內容
    userCart: [], 
    // 提示訊息
    message: null
})

export const getters = {
    getUserCart (state) {
        return state.userCart
    },
    getMessage (state) {
        return state.message
    }
}

export const mutations = {
    SET_USER_CART (state, payload) {
        state.userCart = payload;
    },
    SET_MESSAGE (state, message) {
        state.message = message;  
        
    },
    // 清除訊息
    CLEAR_MESSAGE (state) {
        state.message = null
    }
}

export const actions = {
// 首頁 (pages/index.vue)
    // 抓取使用者的購物車
    async fetchUserCart ({ commit }) {
        const userId = localStorage.getItem('UserID');
        const res = await apiGetCartProducts(userId);
        let payload = res.data.orders;
        // 將資料寫入
        commit('SET_USER_CART', payload);
    },

    // 直接新增商品至購物車 (預設數量 1)
    async addToCart ({ dispatch, commit }, productId) {
        const userId = localStorage.getItem('UserID');
        try {
            await apiAddToCart(userId, productId);
            // 重新撈取資料
            await dispatch('fetchUserCart');
            // 回傳提示訊息給使用者
            let message = {
                type: 'success',
                text: "已經新增至購物車"
            };
            commit('SET_MESSAGE', message);
            // 清除訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 3000) 
        }
        catch (error) {
            console.log(error);
            console.log('新增失敗 from vuex');
        }
    },

// 動態頁面  (pages/products/_id.vue)
    // 新增商品至購物車(附帶商品數量)
    async addToCartWithQuantity ({ dispatch, commit }, product) {
        const userId = localStorage.getItem('UserID');
        try {
            // 若要從表單傳遞參數要透過 Object
            await apiAddToCartWithQuantity(userId, product.id, { product_quantity: product.quantity });
            // 重新撈取資料
            await dispatch('fetchUserCart');
            // 回傳提示訊息給使用者
            let message = {
                type: 'success',
                text: "已經新增至購物車"
            };
            commit('SET_MESSAGE', message);
            // 清除訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 3000) 
        }
        catch (error) {
            console.log(error);
            console.log('新增失敗 from vuex');
        }
    },

// 購物車結帳頁面 (pages/cart/index.vue)
    // 商品數量增加 1
    async increseByOne ({ dispatch, commit }, productId) {
        const userId = localStorage.getItem('UserID');

        try {
            await apiIncreseQuantityByOne(userId, productId);
            // 重新撈取資料
            await dispatch('fetchUserCart');
            // 提示訊息
            let message = {
                type: 'warning',
                text: "您增加了商品數量，請查看"
            };
            commit('SET_MESSAGE', message);
            // 清除訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 3000) 
        } 
        catch (error) {
            console.log(error);
            console.log("數量增加失敗");
        }
    },
    // 商品數量減少 1
    async decreseByOne ({ dispatch, commit }, productId) {
        const userId = localStorage.getItem('UserID');

        try {
            await apiDecreseQuantityByOne(userId, productId);
            // 重新撈取資料
            await dispatch('fetchUserCart');
            // 提示訊息
            let message = {
                type: 'warning',
                text: "您減少了商品數量，請查看"
            };
            commit('SET_MESSAGE', message);
            // 清除訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 3000)
        } 
        catch (error) {
            console.log(error);
            console.log("數量增加失敗");
        }
    },
    // 從購物車中移除商品
    async deleteFromCart ({ dispatch, commit }, productId) {
        const userId = localStorage.getItem('UserID');
        try {
            await apiDeleteFromCart(userId, productId);
            // 重新撈取資料
            await dispatch('fetchUserCart');
            // 提示訊息
            let message = {
                type: 'error',
                text: "您刪除了一項商品"
            };
            commit('SET_MESSAGE', message);
            // 清除訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 3000)
        } 
        catch (error) {
            console.log(error);
            console.log('刪除失敗 from vuex');
        }
    },
    // 清空購物車
    async deleteAllFromCart ({ dispatch, commit }) {
        const userId = localStorage.getItem('UserID');
        try{
            await apiDeleteAllFromCart(userId);
            // 清空完之後 重新 fetch 資料
            await dispatch('fetchUserCart');
            // 提示訊息
            let message = {
                type: 'error',
                text: "您的購物車已經清空"
            };
            commit('SET_MESSAGE', message);
            // 清除訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 3000)
        }
        catch (error) {
            console.log(error);
            console.log('刪除失敗 from vuex');
        }
    }
}