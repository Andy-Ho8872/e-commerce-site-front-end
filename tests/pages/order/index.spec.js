import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// pages
import orderPage from '@/pages/order/index.vue' //* 這裡使用 orderPage 做命名，為了避免和 vuex module 重複。
// mixins
import orderMixin from '@/mixins/orderMixin'
// mock vuex modules
import order from '@/tests/__mocks__/store/order.js'
import auth from '@/tests/__mocks__/store/auth.js'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
// use Mixins
localVue.use(orderMixin)

describe('order/index.vue', () => {
    // presets
    let vuetify
    let router
    let store
    const routes = [
        {
            path: '/order/:id/details',
            name: 'order-id-details',
        },
    ]
    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter({ routes })
        store = new Vuex.Store({
            modules: {
                order,
                auth,
            },
        })
    })
    // tests
    test('should not render EmptyOrder component when order list is not empty', () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                LoadingCircle: true, // fake component
                EmptyOrder: true, // fake component
                DeleteDialog: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const EmptyOrderComponent = wrapper.find('.empty_order_component')
        expect(EmptyOrderComponent.exists()).not.toBeTruthy()
    })
    test('should correctly render payment method by payment_id', () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                LoadingCircle: true, // fake component
                EmptyOrder: true, // fake component
                DeleteDialog: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const paymentMethod = wrapper.findAll('#payment_id')
        expect(paymentMethod.at(0).text()).toBe('現金付款')
        expect(paymentMethod.at(1).text()).toBe('刷卡付款')
    })
    test('should correctly render status by status_id', () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                LoadingCircle: true, // fake component
                EmptyOrder: true, // fake component
                DeleteDialog: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const status = wrapper.findAll('#status_id')
        expect(status.at(0).text()).toBe('出貨中')
        expect(status.at(1).text()).toBe('已到貨')
    })

    test('navigator button should change route correctly', async () => {
        const wrapper = mount(orderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                LoadingCircle: true, // fake component
                EmptyOrder: true, // fake component
                DeleteDialog: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const navBtn = wrapper.findAll('.nav_button')
        await navBtn.at(0).trigger('click')
        router.push({ name: 'order-id-details', params: { id: 1 } })
        expect(wrapper.vm.$route.path).toContain('order/1/details')
    })
})
