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
        const originalPrice = wrapper.findAll('.unit_price > .original_price')
        expect(originalPrice.at(0).classes()).toContain('discounted') // discount_rate 0.85
        expect(originalPrice.at(1).classes()).not.toContain('discounted') // discount_rate 1 (should not contain "discounted" class)
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
    test('should render subtotal correctly', async () => {
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
        const subtotal = wrapper.find('.cart_footer_value')
        // item 1    850
        // item 2    500
        // subtotal = item 1 + item 2
        expect(subtotal.text()).toContain('1350')
    })
    test('deleteFromCart action should be call with REMOVE_SINGLE_PRODUCT_FROM_CART mutation', async () => {
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
        const data = {
            cart_id: 1,
            product_id: 1
        }
        const commit = jest.fn()
        await cart.actions.deleteFromCart({ commit }, data)
        expect(commit).toBeCalledWith('REMOVE_SINGLE_PRODUCT_FROM_CART', data.cart_id)
    })
    test('should delete item with product_id by clicking delete single item button', async () => {
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
        const userCart = store.state.cart.userCart
        const valid = store.state.cart.valid
        const deleteBtn = wrapper.findAll('.delete_single_item')
        await deleteBtn.at(0).trigger('click') // 點擊第一個刪除按鈕
        expect(userCart).toHaveLength(1) // 原本有兩筆資料，但刪除了一筆
        // 因為前一筆商品(單眼相機)被刪除了，所以連身長裙的 index 從 1 變為 0
        expect(userCart[0].title).toBe('連身長裙') // product_id = 2
        // 購物車內還有商品存在，所以 valid 狀態為 true
        expect(valid).toBeTruthy()
    })
    test('deleteAllFromCart action should be call with REMOVE_ALL_FROM_CART mutation', async () => {
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
        const commit = jest.fn()
        await cart.actions.deleteAllFromCart({ commit })
        expect(commit).toBeCalledWith('REMOVE_ALL_FROM_CART')
    })
    test('should clear all items by clicking delete all items button', async () => {
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
        const userCart = store.state.cart.userCart // fake data
        const deleteAllBtn = wrapper.find('.delete_all_items')
        await deleteAllBtn.trigger('click')
        expect(userCart).toHaveLength(0)
    })
})