import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
// components
import QuantityField from '@/components/cart/QuantityField.vue'
// Vuex modules
import cart from '@/tests/__mocks__/store/cart.js'
// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
// use packages
Vue.use(Vuetify)
Vue.use(Vuex)
// Tests
describe('QuantityField.vue', () => {
    const localVue = createLocalVue()
    let vuetify
    let store
    // presets
    beforeEach(() => {
        vuetify = new Vuetify()
        store = new Vuex.Store({
            modules: {
                // 假資料
                cart
            },
        })
    })
    // sections
    test('should have a default value of product_quantity of 1', () => {
        const wrapper = mount(QuantityField, {
            localVue,
            vuetify, // 在這個 wrapper 內使用 vuetify
            store, // 在這個 wrapper 內使用 vuex store
        })
        const product_quantity = wrapper.vm.payload.product_quantity
        expect(product_quantity).toBe(1)
    })
    test('should receive correct props value of product_quantity and merge the value in data', async () => {
        const wrapper = mount(QuantityField, {
            localVue,
            vuetify,
            store,
            // 接收到的 Props
            propsData: {
                product_quantity: 2,
            },
        })
        const product_quantity = wrapper.vm.payload.product_quantity
        expect(product_quantity).toBe(2)
    })
    test('increment function should change the value of product_quantity', async () => {
        const wrapper = mount(QuantityField, {
            localVue,
            vuetify,
            store,
        })
        let product_quantity = wrapper.vm.payload.product_quantity
        // test function
        const incrementByOne = () => {
            product_quantity += 1
        }
        await incrementByOne()
        expect(product_quantity).toBe(2)
    })
    test('regular expression should work', async () => {
        const wrapper = mount(QuantityField, {
            localVue,
            vuetify,
            store,
        })
        const product_quantity = wrapper.vm.payload.product_quantity
        // regex
        const pattern = /^[1-9]\d{0,}/gi
        expect(pattern.test(product_quantity)).toBeTruthy()
    })
    test('should trigger button', async () => {
        const wrapper = mount(QuantityField, {
            localVue,
            vuetify,
            store,
        })
        expect(wrapper.find('.v-btn').trigger('click'))
    })
    test('vuex action should trigger mutation to change the quantity of the product', async () => {
        const wrapper = mount(QuantityField, {
            localVue,
            vuetify,
            store,
        })
        await store.dispatch('cart/increaseByOne')
        const product_quantity = store.state.cart.product.quantity
        expect(product_quantity).toBe(2)
    })
})
