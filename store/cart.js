import { 
    apiGetCartProducts, 
    apiAddToCart,
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
    CLEAR_MESSAGE (state) {
        state.message = null
    }
}

export const actions = {
    // 抓取使用者的購物車
    async fetchUserCart ({ commit }) {
        const userId = localStorage.getItem('UserID');
        const res = await apiGetCartProducts(userId);
        let payload = res.data.orders;
        // 將資料寫入
        commit('SET_USER_CART', payload);
    },
    // 新增商品至購物車
    async addToCart (context, productId) {
        const userId = localStorage.getItem('UserID');
        // 先撈取購物車中的資料
        let cart = context.getters.getUserCart;
        // 判斷新增至購物車的商品是否有重複(id)
        let duplicated = cart.find(cart => cart.product_id === productId);
        // 如果沒有發現重複，則新增進購物車
        if(duplicated === undefined) {
            try {
                await apiAddToCart(userId, productId);
                // 回傳提示訊息給使用者
                let message = "已經新增至購物車";
                context.commit('SET_MESSAGE', message);
                // 清除訊息
                setTimeout(() => {
                    context.commit('CLEAR_MESSAGE')
                }, 3000)
            }
            catch (error) {
                console.log(error);
                console.log('新增失敗 from vuex');
            }
            // 重新更新資料 (state.userCart) fetchUserCart 
            context.dispatch('fetchUserCart');
        }
        // 若有重複則單純 update 商品數量 + 1
        else {
            let msg = "商品已經存在至購物車，該商品購買數量 + 1";
            alert(msg);
        }   
    },

    // 商品數量增加 1
    async increseByOne (context, productId) {
        const userId = localStorage.getItem('UserID');

        try {
            await apiIncreseQuantityByOne(userId, productId)
        } 
        catch (error) {
            console.log(error);
            console.log("數量增加失敗");
        }

        context.dispatch('fetchUserCart');
    },

    // 商品數量減少 1
    async decreseByOne (context, productId) {
        const userId = localStorage.getItem('UserID');

        try {
            await apiDecreseQuantityByOne(userId, productId)
        } 
        catch (error) {
            console.log(error);
            console.log("數量增加失敗");
        }

        context.dispatch('fetchUserCart');
    },


    // 從購物車中移除商品
    async deleteFromCart (context, productId) {
        const userId = localStorage.getItem('UserID');
        try {
            await apiDeleteFromCart(userId, productId);
            // 重新更新資料 (state.userCart) fetchUserCart 
            await context.dispatch('fetchUserCart');
            // 提示訊息
            let message = "您刪除了一項商品";
            context.commit('SET_MESSAGE', message);
            // 清除訊息
            setTimeout(() => {
                context.commit('CLEAR_MESSAGE')
            }, 3000)
        } 
        catch (error) {
            console.log(error);
            console.log('刪除失敗 from vuex');
        }
    },
    // 清空購物車
    async deleteAllFromCart (context) {
        const userId = localStorage.getItem('UserID');
        try{
            await apiDeleteAllFromCart(userId);
            // 清空完之後 重新 fetch 資料
            await context.dispatch('fetchUserCart');
            // 提示訊息
            let message = "您的購物車已經清空";
            context.commit('SET_MESSAGE', message);
            // 清除訊息
            setTimeout(() => {
                context.commit('CLEAR_MESSAGE')
            }, 3000)
        }
        catch (error) {
            console.log(error);
            console.log('刪除失敗 from vuex');
        }
    }
}