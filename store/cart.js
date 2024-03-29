//* new version 
import {
    apiGetCartProducts,
    apiAddToCart,
    apiAddToCartWithData,
    apiDeleteFromCart,
    apiDeleteAllFromCart,
    apiUpdateQuantity,
    apiIncreaseQuantityByOne,
    apiDecreaseQuantityByOne,
} from '../APIs/cart.js'

export const state = () => ({
    //* 購物車中的內容
    userCart: [],
    //* loading 狀態
    loading: false,
    //* 是否合格
    valid: false
})

export const getters = {
    getUserCart(state) {
        return state.userCart
    },
    getLoading(state) {
        return state.loading
    },
    getValidStatus(state) {
        return state.valid
    }
}

export const mutations = {
    //* 設置使用者購物車的資料
    SET_USER_CART(state, carts) {
        state.userCart = carts
    },
    //* 判定購物車內是否有資料
    CHECK_AND_SET_VALID_STATUS(state) {
        state.userCart.length ? state.valid = true : state.valid = false
    },
    //* 使用者登出時清空暫存
    CLEAR_USER_CART(state) {
        state.userCart = []
    },
    //* 設置 loading 狀態
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    //***** 處理購物車的暫存 *****//
    //* 清除資料 //todo refactor with item.id
    REMOVE_SINGLE_PRODUCT_FROM_CART(state, cart_id) { //? 單筆資料
        const index = state.userCart.findIndex((cart) => {
            return cart.id == cart_id
        })
        if(index !== -1) {
            state.userCart.splice(index, 1)
        }   
    },
    REMOVE_ALL_FROM_CART(state) { //? 所有資料
        //* 如果 solution 1 無法正確清除陣列資料，請使用 solution 2 
        state.userCart = [] // solution 1
        // state.userCart.length = 0 // solution 2
    }
}

export const actions = {
// 首頁 (pages/index.vue)
    //* 抓取使用者的購物車
    async fetchUserCart({ commit }) {
        try {
            const res = await apiGetCartProducts()
            const carts = res.data.carts
            //* 將資料寫入
            await commit('SET_USER_CART', carts)
            //* 確認購物車內是否還有商品
            commit('CHECK_AND_SET_VALID_STATUS')
        } catch (error) {
            console.log(error)
            console.log('抓取失敗 from vuex')
        }
    },
    //* 直接"新增"商品至購物車 (預設數量 1)
    async addToCart({ dispatch, commit }, productId) {
        try {
            const res = await apiAddToCart(productId)
            if(res.status == 200 || 201) {
                //? 回傳提示訊息給使用者
                const message = {
                    type: 'success',
                    text: '已經新增至購物車',
                }
                //* 重新撈取資料
                await dispatch('fetchUserCart')
                //* 提示訊息
                dispatch('globalMessage/setFlashMessage', message, { root: true })
            }
        } catch (error) {
            //* 提示訊息
            if(error || error.response.status == 401) {
                const message = {
                    type: 'error',
                    text: '請先登入'
                }
                dispatch('globalMessage/setFlashMessage', message, { root: true })
            }
        }
    },

// 動態頁面  (pages/products/_id.vue)
    //* "新增"商品至購物車(附帶商品數量)
    async addToCartWithQuantity({ dispatch }, product) {
        try {
            const res = await apiAddToCartWithData({
                product_id: product.id,
                product_quantity: product.quantity,
                variation_option_values: product.optionValues
            })
            //* 重新撈取資料
            await dispatch('fetchUserCart')
            //? 回傳提示訊息給使用者
            const message = {
                type: res.data.type,
                text: res.data.msg,
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            if(error.response.status == 401) {
                //* 提示訊息
                const message = {
                    type: 'error',
                    text: '請先登入'
                }
                dispatch('globalMessage/setFlashMessage', message, { root: true })
            }
        }
    },

// 購物車結帳頁面 (pages/cart/index.vue)
    //* "修改"商品數量
    async updateQuantity({ dispatch, commit }, data) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            const res = await apiUpdateQuantity
            ({ cart_id: data.cart_id, product_quantity: data.product_quantity })
            //* 重新撈取資料
            await dispatch('fetchUserCart')
            // 提示訊息
            const message = {
                type: res.data.type,
                text: res.data.msg,
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error)
            console.log('更新失敗')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
    //* 商品數量增加 1
    async increaseByOne({ dispatch, commit }, cart_id) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            //* 增加數量
            const res = await apiIncreaseQuantityByOne(cart_id)
            //* 重新撈取資料
            await dispatch('fetchUserCart')
            // 提示訊息
            const message = {
                type: res.data.type,
                text: res.data.msg,
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error)
            console.log('數量增加失敗')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
    //* 商品數量減少 1
    async decreaseByOne({ dispatch, commit }, cart_id) {
        //? start loading
        commit('SET_LOADING', true)
        try {
            //* 減少數量
            const res = await apiDecreaseQuantityByOne(cart_id)
            //* 重新撈取資料
            await dispatch('fetchUserCart')
            // 提示訊息
            const message = {
                type: res.data.type,
                text: res.data.msg,
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error)
            console.log('數量增加失敗')
        }
        //? end loading
        commit('SET_LOADING', false)
    },
    //* 從購物車中"移除"商品
    async deleteFromCart({ dispatch, commit }, cart_id) {
        try {
            const res = await apiDeleteFromCart(cart_id)
            //* 刪除該商品的暫存數據(可以減少向後端發送撈取的 request)
            await commit('REMOVE_SINGLE_PRODUCT_FROM_CART', cart_id)
            //* 確認購物車內是否還有商品
            await commit('CHECK_AND_SET_VALID_STATUS')
            // 提示訊息
            const message = {
                type: res.data.type,
                text: res.data.msg,
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error)
            console.log('刪除失敗 from vuex')
        }
    },
    //* 清空購物車
    async deleteAllFromCart({ state, dispatch, commit }) {
        //* 購物車內有商品才發出請求
        if(state.userCart.length) {
            try {
                const res = await apiDeleteAllFromCart()
                //* 刪除所有商品的暫存數據
                await commit('REMOVE_ALL_FROM_CART')
                //* 確認購物車內是否還有商品
                await commit('CHECK_AND_SET_VALID_STATUS')
                // 提示訊息
                const message = {
                    type: res.data.type,
                    text: res.data.msg,
                }
                dispatch('globalMessage/setFlashMessage', message, { root: true })
            } catch (error) {
                console.log(error)
                console.log('刪除失敗 from vuex')
            }
        }
    },
}