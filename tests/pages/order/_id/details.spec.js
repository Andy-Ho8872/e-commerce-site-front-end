import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// pages
import dynamicOrderPage from '@/pages/order/_id/details.vue' //* 這是動態頁面。
// mock vuex modules
import order from '@/tests/__mocks__/store/order.js'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
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
            },
        })
    })
    // tests
    test('should not render loading circle when order exists', async () => {
        const wrapper = mount(dynamicOrderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        expect(wrapper.vm.userOrder).toHaveLength(2)
        const loadingCircle = wrapper.find('.loading_circle')
        expect(loadingCircle.exists()).not.toBeTruthy()
    })
    test('should render order details by order_id', async () => {
        const wrapper = mount(dynamicOrderPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        // fake route
        await router.push({ name: 'order-id-details', params: { id: 1 } })
        // fake data
        const productTitle = wrapper.findAll('#items_title')
        const productId = wrapper.findAll('#items_id')
        expect(productTitle.at(0).text()).toBe('精美服裝')
        expect(productId.at(0).text()).toBe('1') 
        // change to another route
        await router.push({ name: 'order-id-details', params: { id: 2 } })
        // fake data
        const productTitle2 = wrapper.findAll('#items_title')
        const productId2 = wrapper.findAll('#items_id')
        expect(productTitle2.at(0).text()).toBe('舒適球鞋')
        expect(productId2.at(0).text()).toBe('3') 
    })
})