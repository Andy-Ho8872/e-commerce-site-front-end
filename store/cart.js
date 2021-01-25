import { 
    apiGetCartProducts, 
    apiAddToCart,
    apiAddToCartWithQuantity,
    apiDeleteFromCart,
    apiDeleteAllFromCart,
    apiUpdateQuantity,
    apiIncreseQuantityByOne, 
    apiDecreseQuantityByOne 
} from '../APIs/api.js';

export const state = () => ({
    // 購物車中的內容
    userCart: [], 
    // 提示訊息
    message: null,
    // Pending 狀態
    pendingStatus: false
})

export const getters = {
    getUserCart (state) {
        return state.userCart
    },
    getMessage (state) {
        return state.message
    },
    getPendingStatus (state) {
        return state.pendingStatus
    }
}

export const mutations = {
    // 設置使用者購物車的資料
    SET_USER_CART (state, payload) {
        state.userCart = payload;
    },
    // 設置提示訊息
    SET_MESSAGE (state, message) {
        state.message = message;  
    },
    // ajax request pending 狀態
    SET_PENDING_STATUS (state, status) {
        state.pendingStatus = status
    },
    // 清除提示訊息
    CLEAR_MESSAGE (state) {
        state.message = null
    }
}

export const actions = {
// 首頁 (pages/index.vue)
    // 抓取使用者的購物車
    async fetchUserCart ({ commit }) {
        const token = { headers: { Authorization: localStorage.getItem('Token') } }; 
        try {
            const res = await apiGetCartProducts(token);
            let payload = res.data.orders;
            // 將資料寫入
            commit('SET_USER_CART', payload);
        }
        catch (error) {
            console.log(error);
            console.log("抓取失敗 from vuex");
        }
    },
    // 直接新增商品至購物車 (預設數量 1)
    async addToCart ({ dispatch, commit }, productId) {  
        const token = { headers: { Authorization: localStorage.getItem('Token') } };
        try {
            await apiAddToCart(productId, token);
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
        const token = { headers: { Authorization: localStorage.getItem('Token') } };
        try {
            // 若要從表單傳遞參數要透過 Object    產品                    購買數量                    憑證
            await apiAddToCartWithQuantity(product.id, { product_quantity: product.quantity }, token);
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
    // 修改商品數量
    async updateQuantity ({ dispatch, commit }, product) {
        const token = { headers: { Authorization: localStorage.getItem('Token') } };  
        try {  
            // pending 狀態
            commit('SET_PENDING_STATUS', true);
            //                         產品 id                    變更數量                 憑證
            await apiUpdateQuantity(product.id, { product_quantity: product.quantity } ,token);
            // pending 狀態
            commit('SET_PENDING_STATUS', false);
            // 重新撈取資料
            await dispatch('fetchUserCart');
            // 提示訊息
            let message = {
                type: 'warning',
                text: "您修改了商品數量，請查看"
            };
            commit('SET_MESSAGE', message);
            // 清除訊息
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 3000) 
        }
        catch (error) {
            console.log(error);
            console.log("更新失敗");
        }
    },

    // 商品數量增加 1
    async increseByOne ({ dispatch, commit }, productId) {
        const token = { headers: { Authorization: localStorage.getItem('Token') } };
        try {
            // pending 狀態
            commit('SET_PENDING_STATUS', true);
            // 增加數量
            await apiIncreseQuantityByOne(productId, token);
            // pending 狀態
            commit('SET_PENDING_STATUS', false);
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
        const token = { headers: { Authorization: localStorage.getItem('Token') } };
        try {
            // pending 狀態
            commit('SET_PENDING_STATUS', true);
            // 減少數量
            await apiDecreseQuantityByOne(productId, token);
            // pending 狀態
            commit('SET_PENDING_STATUS', false);
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
        const token = { headers: { Authorization: localStorage.getItem('Token') } };
        try {
            await apiDeleteFromCart(productId, token);
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
        const token = { headers: { Authorization: localStorage.getItem('Token') } };
        try{
            await apiDeleteAllFromCart(token);
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