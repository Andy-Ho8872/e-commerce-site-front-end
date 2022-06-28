// mock api calls and data
import { mockApiCreateOrder } from '@/tests/__mocks__/APIs/api.js'

export const state = () => ({
    //* 單筆訂單 (測試)
    order: {
        id: 1,
        payment_id: 1,
        status_id: 1,
        items_count: 2,
        sumSubtotal: 1380,
        items: [
            {
                id: 1,
                title: '精美服裝',
                imgUrl: 'https://example.com/images/1',
                pivot: {
                    product_id: 1,
                    product_quantity: 1,
                },
                subtotal: 800,
            },
            {
                id: 2,
                title: '時尚背包',
                imgUrl: 'https://example.com/images/2',
                pivot: {
                    product_id: 2,
                    product_quantity: 1,
                },
                subtotal: 580,
            },
        ],
        address: '桃園市OO區OO路OO號',
        created_at: '2021/09/04',
    },
    //* 所有訂單
    orders: [
        {
            id: 1,
            payment_id: 1,
            status_id: 1,
            items_count: 2,
            sumSubtotal: 1380,
            items: [
                {
                    id: 1,
                    title: '精美服裝',
                    imgUrl: 'https://example.com/images/1',
                    pivot: {
                        product_id: 1,
                        product_quantity: 1,
                    },
                    subtotal: 800,
                },
                {
                    id: 2,
                    title: '時尚背包',
                    imgUrl: 'https://example.com/images/2',
                    pivot: {
                        product_id: 2,
                        product_quantity: 1,
                    },
                    subtotal: 580,
                },
            ],
            address: '桃園市OO區OO路OO號',
            created_at: '2021/09/04',
        },
        {
            id: 2,
            payment_id: 2,
            status_id: 2,
            items_count: 1,
            sumSubtotal: 3660,
            items: [
                {
                    id: 3,
                    title: '舒適球鞋',
                    imgUrl: 'https://example.com/images/3',
                    pivot: {
                        product_id: 3,
                        product_quantity: 1,
                    },
                    subtotal: 3660,
                },
            ],
            address: '桃園市OO區OO路OO號',
            created_at: '2021/09/05',
        },
    ],
    //* 付款方式
    payments: [
        {
            id: 1,
            title: '現金付款',
        },
        {
            id: 2,
            title: '刷卡付款',
        },
    ],
    //* 商品狀態
    status: [
        {
            id: 1,
            title: '出貨中',
        },
        {
            id: 2,
            title: '已到貨',
        },
    ],
    //* */ loading 狀態
    loading: false,
})
export const getters = {
    getAllOrders(state) {
        return state.orders
    },
    getLoading(state) {
        return state.loading
    },
    getPayments(state) {
        return state.payments
    },
    getStatus(state) {
        return state.status
    },
}
export const mutations = {
    //* 訂單相關
    SET_ALL_ORDERS(state, orders) {
        state.orders = orders
    },
    REMOVE_SINGLE_ORDER: jest.fn(state => {
        state.order = {}
    }),
}
export const actions = {
    createOrder: jest.fn(async ({ commit }, order) => {
        //? start loading
        commit('SET_LOADING', true)
        try {
            //* 向後端發送資料
            await mockApiCreateOrder({
                payment_id: order.payment_id,
                address: order.address,
            })
        } catch (error) {
            console.log('假資料建立失敗 from tests/__mocks__/store/order.js')
        }
        //? start loading
        commit('SET_LOADING', false)
    }),
    fetchAllOrders: jest.fn(),
    fetchTableColumns: jest.fn(),
    deleteSingleOrder: jest.fn(({ commit }) => {
        commit('REMOVE_SINGLE_ORDER')
    }),
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
