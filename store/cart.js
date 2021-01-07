import { 
    apiGetCartProducts, 
    apiAddToCart,
    apiDeleteFromCart,
    apiUpdateQuantity, 
    apiIncreseQuantityByOne, 
    apiDecreseQuantityByOne } 
from '../APIs/api.js';

export const state = () => ({
    // 購物車中的內容
    userCart: [], 
})

export const getters = {
    getUserCart (state) {
        return state.userCart;
    },
}

export const mutations = {
    SET_USER_CART (state, payload) {
        state.userCart = payload;
    },
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
    async addToCart (state, productId) {
        const userId = localStorage.getItem('UserID');
        // 先撈取購物車中的資料
        let cart = state.getters.getUserCart;
        // 判斷是否有重複(id)的商品
        let duplicated = cart.find(cart => cart.product_id === productId);
        // 如果沒有發現重複，則新增進購物車
        if(duplicated === undefined) {
            try {
                await apiAddToCart(userId, productId);
                let msg = "已經新增至購物車";
                alert(msg);
            }
            catch (error) {
                console.log(error);
                console.log('新增失敗 from vuex');
            }
            // 重新更新資料 (state.userCart)
            const res = await apiGetCartProducts(userId);
            let payload = res.data.orders;
            state.commit('SET_USER_CART', payload);
        }
        // 若有重複則單純 update 商品數量 + 1
        else {
            let msg = "商品已經存在至購物車，該商品購買數量 + 1";
            alert(msg);
        }   
    },
    // 從購物車中移除商品
    async deleteFromCart (productId) {
        const userId = localStorage.getItem('UserID');
        try {
            await apiDeleteFromCart(userId, productId);
            let msg = '已經移除一項商品'
            alert(msg);
        } 
        catch (error) {
            console.log(error);
            console.log('刪除失敗 from vuex');
        }
    }
}