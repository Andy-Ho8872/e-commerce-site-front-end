import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// pages
import orderPage from '@/pages/order/create.vue' //* 這裡使用 orderPage 做命名，為了避免和 vuex module 重複。
// mock vuex modules
import order from '@/tests/__mocks__/store/order.js'
import cart from '@/tests/__mocks__/store/cart.js'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// mock api calls and data
import { mockApiCreateOrder } from '@/tests/__mocks__/APIs/api.js'
import mockAxios from 'axios'
jest.mock('axios')
mockAxios.post.mockResolvedValue({
    data: {
        order: {
            payment_id: 1,
            address: '桃園市OO區OO路'
        }
    },
})
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('order/create.vue', () => {
    // presets
    let vuetify
    let router
    let store
    const routes = [
        {
            path: '/order/index',
            name: 'order-index',
        },
    ]
    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter({ routes })
        store = new Vuex.Store({
            modules: {
                order,
                cart,
            },
        })
    })
    // tests
    test('should have default payment_id of 1', () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const defaultPaymentId = wrapper.vm.form.payment_id
        expect(defaultPaymentId).toBe(1)
    })
    test('should render payment title correctly', () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const paymentTitle = wrapper.findAll('.payment_title')
        expect(paymentTitle.at(0).text()).toBe('現金付款')
        expect(paymentTitle.at(1).text()).toBe('刷卡付款')
    })
    test('should receive correct payment_id', () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const paymentTitle = wrapper.findAll('.payment_title')
        expect(paymentTitle.at(0).props('value')).toBe(1)
        expect(paymentTitle.at(1).props('value')).toBe(2)
    })
    test('should receive correct data in v-text-field', async () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        await wrapper.setData({
            form: {
                payment_id: 1,
                address: '桃園市OO區',
            },
        })
        expect(wrapper.vm.form.address).toBe('桃園市OO區')
    })
    test('should render correct subtotal', async () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const subtotal = wrapper.find('.subtotal')
        // item-1 total 850    item-2 total 500
        expect(subtotal.text()).toContain('1350') // subtotal = 850 + 500
    })
    test('create order button should have disable prop of false by default', async () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const createOrderBtn = wrapper.find('.create_order_btn')
        expect(createOrderBtn.props('disable')).toBeFalsy()
    })
    test('create order button should call api', async () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        // 表單通過驗證
        await wrapper.setData({
            valid: true,
        })
        const createOrderBtn = wrapper.find('.create_order_btn')
        await createOrderBtn.trigger('click')
        const result = await mockApiCreateOrder()
        expect(result.order.payment_id).toBe(1)
        expect(result.order.address).toBe('桃園市OO區OO路')
        // test vuex action
        const commit = jest.fn()
        await order.actions.createOrder({ commit }, result.order)
        expect(commit).toBeCalledWith('SET_LOADING', true)
    })
})
