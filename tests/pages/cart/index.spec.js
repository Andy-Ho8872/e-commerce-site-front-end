import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// pages
import cartPage from '@/pages/cart/index.vue' //* 這裡使用 cartPage 而不使用 cart 做命名，為了避免和 vuex module 重複。
// mock vuex modules
import cart from '@/tests/__mocks__/store/cart.js'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('cart.vue', () => {
    // presets
    let vuetify
    let router
    let store
    const routes = [
        {
            path: '/products/:id',
            name: 'products-id',
        },
    ]
    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter({ routes })
        store = new Vuex.Store({
            modules: {
                cart,
            },
        })
    })
    // tests
    test('should not render EmptyCart component when userCart is not empty', () => {
        const wrapper = mount(cartPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                EmptyCart: true, // fake component
                Banner: true, // fake component
                QuantityField: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const EmptyCart = wrapper.find('.empty_cart_component')
        expect(EmptyCart.exists()).toBeFalsy()
    })
    test('should change route after clicking nuxt-link', async () => {
        const wrapper = mount(cartPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                EmptyCart: true, // fake component
                Banner: true, // fake component
                QuantityField: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const productLink = wrapper.findAll('.navigator')
        await productLink.at(0).trigger('click') // 點擊購物車中的第一個產品
        router.push({ name: 'products-id', params: { id: 1 } })
        expect(wrapper.vm.$route.path).toContain('/products/1')
    })
    test('should have discounted class when discounted_rate is not equal to 1', async () => {
        const wrapper = mount(cartPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                EmptyCart: true, // fake component
                Banner: true, // fake component
                QuantityField: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const discountedPrice = wrapper.findAll('.unit_price > .original_price')
        expect(discountedPrice.at(0).classes()).toContain('discounted') // discount_rate 0.85
        expect(discountedPrice.at(1).classes()).not.toContain('discounted') // discount_rate 1 (should not contain "discounted" class)
    })

    test('should render discounted price when discounted_rate is not equal to 1', async () => {
        const wrapper = mount(cartPage, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                EmptyCart: true, // fake component
                Banner: true, // fake component
                QuantityField: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const discountedPrice = wrapper.findAll('.unit_price > .discounted_price')
        expect(discountedPrice.at(0).exists()).toBeTruthy() // discount_rate 0.85
    })
})
