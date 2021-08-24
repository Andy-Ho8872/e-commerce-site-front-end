export const state = () => ({
    products: [
        {
            id: 1,
            title: "test product title-1",
            imgUrl: "https://www.example.com/iamge/1.jpg",
            unit_price: 888,
            discount_rate: 1,
            ratings: 5
        },
        {
            id: 1,
            title: "test product title-2",
            imgUrl: "https://www.example.com/iamge/2.jpg",
            unit_price: 666,
            discount_rate: 1,
            ratings: 4
        },
    ]
})

export const getters = {
    getIndexPageProducts(state) {
        return state.products
    }
}

export const mutations = {
    
}

export const actions = {
    
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}