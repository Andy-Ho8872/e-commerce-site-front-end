import { 
    apiAdminGetProducts, 
    apiAdminGetSingleProduct,
    apiAdminStoreProduct,
    apiAdminAddProductVariation, 
    apiAdminDeleteProductVariation, 
    apiAdminUpdateProductVariationOption,
    apiGetProductTags,
    apiAdminUpdateProduct 
} from '../APIs/admin'

export const state = () => ({
    //* 所有商品的資料(目前不使用分頁)
    products: [],
    product: {},
    viewedProducts: [],
    productTags: [],
})

export const getters = {
    getProducts(state) {
        return state.products
    },
    getProduct(state) {
        return state.product
    },
    getViewedProducts(state) {
        return state.viewedProducts
    },
    getProductTags(state) {
        return state.productTags
    },
}

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    SET_PRODUCT(state, product) {
        state.product = product
    },
    PUSH_PRODUCT_TO_VIEWED_PRODUCTS(state, product) {
        state.viewedProducts.push(product)
    },
    SET_PRODUCT_TAGS(state, tags) {
        state.productTags = tags
    },
    REFRESH_PRODUCTS_ARRAY(state, product) {
        //* 需要更新的商品
        const productToFind = (product) => product.id == state.product.id
        //* 更新已瀏覽商品中的該筆資料(暫存) 
        const viewedProductIndex = state.viewedProducts.findIndex(productToFind)
        state.viewedProducts[viewedProductIndex] = product
        //* 更新所有商品中的該筆資料(暫存)
        const productIndex = state.products.findIndex(productToFind)
        state.products[productIndex] = product
    }
}

export const actions = {
    async fetchProducts({ state, commit }) {
        try {
            //* state 裡面沒有產品的資料才進行撈取
            if (!state.products.length) {
                const res = await apiAdminGetProducts()
                const products = res.data.products
                commit('SET_PRODUCTS', products)
            }
        } catch (error) {
            console.log(error)
        }
    },
    async refetchProducts({ commit }) {
        try {
            const res = await apiAdminGetProducts()
            const products = res.data.products
            commit('SET_PRODUCTS', products)
        } catch (error) {
            console.log(error)
        }
    },
    async fetchSingleProduct({ state, commit }, productId) {
        let exist = state.viewedProducts.find(product => product.id == productId)
        // //* 若是找不到才抓取
        if (exist === undefined) {
            try {
                const res = await apiAdminGetSingleProduct(productId)
                //* 所有產品的資料
                const product = res.data.product
                commit('SET_PRODUCT', product)
                //* 將點擊過的產品放入 products 暫存，若使用者在瀏覽過相同產品的時候就不用再發送一次 request
                await commit('PUSH_PRODUCT_TO_VIEWED_PRODUCTS', product)
            } catch (error) {
                console.log(error)
            }
        }
    },
    async refetchSingleProduct({ commit }, productId) {
        try {
            const res = await apiAdminGetSingleProduct(productId)
            const product = res.data.product
            commit('SET_PRODUCT', product)
        } catch (error) {
            console.log(error);
        }
    },
    async fetchProductTags({ state, commit }) {
        if (!state.productTags.length) {
            try {
                const res = await apiGetProductTags()
                const tags = res.data.tags
                commit('SET_PRODUCT_TAGS', tags)
            } catch (error) {
                console.log(error)
            }
        }
    },
    async storeProduct({ dispatch }, formInput) {
        try {
            //* 只取得 tag 的 id 的陣列(array)
            const tagIDs = formInput.tags.map(tag => tag.id)
            //* 商品資訊
            await apiAdminStoreProduct({
                title: formInput.title,
                imgUrl: formInput.imgUrl,
                unit_price: formInput.unit_price,
                description: formInput.description,
                rating: formInput.rating,
                stock_quantity: formInput.stock_quantity,
                tags: tagIDs, //* 此欄位只能回傳 ID 的值 ex: [1, 4]， 因後端接受只包含 ID 號碼的陣列。 
                discount_rate: formInput.discount_rate,
                available: formInput.available,
            })
            //* 重新撈取商品 
            dispatch('refetchProducts')
            //* 提示訊息
            const message = {
                type: 'success',
                text: '商品上架成功',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
            this.$router.push({ name: 'admin-product' })
        } catch (error) {
            const message = {
                type: 'error',
                text: '商品上架失敗',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        }
    },
    async updateProductInfo({ state, dispatch, commit }, { product_id, formInput }) {
        try {
            //* 只取得 tag 的 id 的陣列(array)
            const tagIDs = formInput.tags.map(tag => tag.id)
            //* 商品資料 
            await apiAdminUpdateProduct(product_id, {
                title: formInput.title,
                imgUrl: formInput.imgUrl,
                unit_price: formInput.unit_price,
                description: formInput.description,
                rating: formInput.rating,
                stock_quantity: formInput.stock_quantity,
                tags: tagIDs, //* 此欄位只能回傳 ID 的值 ex: [1, 4]， 因後端接受只包含 ID 號碼的陣列。 
                discount_rate: formInput.discount_rate,
                available: formInput.available,
            })
            //* 重新撈取更新後的商品 
            await dispatch('refetchSingleProduct', product_id)
            await commit('REFRESH_PRODUCTS_ARRAY', state.product)
            //* 提示訊息
            const message = {
                type: 'success',
                text: '商品更新成功',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
            this.$router.push({ name: 'admin-product-id', params: { id: product_id } })
        } catch (error) {
            console.log(error)
            const message = {
                type: 'error',
                text: '商品更新失敗',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        }
    },
    async addProductVariation({ state, dispatch, commit }, { product_id, variation_title, variation_options }) {
        try {
            await apiAdminAddProductVariation(product_id,{
                product_id,
                variation_title,
                variation_options
            })
            //* 重新撈取更新後的商品 
            await dispatch('refetchSingleProduct', product_id)
            await commit('REFRESH_PRODUCTS_ARRAY', state.product)
            //* 提示訊息
            const message = {
                type: 'success',
                text: '規格新增成功',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error)
            const message = {
                type: 'error',
                text: '規格新增失敗',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        }
    },
    async deleteProductVariation({ state, dispatch, commit }, { product_id, variation_id }) {
        try {
            await apiAdminDeleteProductVariation(product_id, variation_id)
            //* 更新後重新撈取
            await dispatch('refetchSingleProduct', product_id)
            commit('REFRESH_PRODUCTS_ARRAY', state.product)
            //* 提示訊息
            const message = {
                type: 'success',
                text: '規格刪除成功',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error);
        }
    },
    async deleteProductVariationOption({ state, commit, dispatch }, { product_id, variation_id, options, optionIndex }) {
        try {
            //* 建立一個暫存陣列
            const newOptionArray = Array.from(options)
            //* 先將暫存陣列中的該值篩刪除
            await newOptionArray.splice(optionIndex, 1)
            //* 向後端傳送新的陣列 
            await apiAdminUpdateProductVariationOption(product_id, variation_id, { variation_options: newOptionArray })
            //* 更新後重新撈取
            await dispatch('refetchSingleProduct', product_id)
            commit('REFRESH_PRODUCTS_ARRAY', state.product)
            //* 提示訊息
            const message = {
                type: 'success',
                text: '選項刪除成功',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        } catch (error) {
            console.log(error)
            const message = {
                type: 'error',
                text: '選項刪除失敗',
            }
            dispatch('globalMessage/setFlashMessage', message, { root: true })
        }
    },
}
