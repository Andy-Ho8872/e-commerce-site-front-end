import Vue from 'vue'
import Vuetify from 'vuetify'
// components
import ProductV2 from '@/components/product/ProductV2.vue'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()

describe('ProductV2.vue', () => {
    // presets
    let vuetify
    let store
    beforeEach(() => {
        vuetify = new Vuetify()
    })
    test('should render product title', async () => {
        const wrapper = mount(ProductV2, {
            propsData: {
                // fake data
                product: {
                    id: 1,
                    title: 'product-1',
                    imgUrl: 'https://www.example.com/iamge/1.jpg',
                    unit_price: 888,
                    discount_rate: 1,
                    ratings: 5,
                },
            },
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                Tags: true, // fake component
                Ratings: true, // fake component
            },
            localVue,
            vuetify,
        })
        const productTitle = wrapper.find('.product_title')
        expect(productTitle.text()).toBe('product-1')
    })
    test('should render shorter product title correctly when title is too long', async () => {
        const wrapper = mount(ProductV2, {
            propsData: {
                // fake data
                product: {
                    id: 1,
                    title: 'very long product name',
                    imgUrl: 'https://www.example.com/iamge/1.jpg',
                    unit_price: 888,
                    discount_rate: 1,
                    ratings: 5,
                },
            },
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                Tags: true, // fake component
                Ratings: true, // fake component
            },
            localVue,
            vuetify,
        })
        const productTitle = wrapper.find('.product_title')
        expect(productTitle.text()).toBe('very long prod...')
    })
    test('should render formatted product label when discount_rate is not equal to 1', async () => {
        const wrapper = mount(ProductV2, {
            propsData: {
                // fake data
                product: {
                    id: 1,
                    title: 'product-1',
                    imgUrl: 'https://www.example.com/iamge/1.jpg',
                    unit_price: 888,
                    discount_rate: 0.85,
                    ratings: 5,
                },
            },
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                Tags: true, // fake component
                Ratings: true, // fake component
            },
            localVue,
            vuetify,
        })
        const productLabel = wrapper.find('.product_label')
        expect(productLabel.exists()).toBeTruthy()
        //* formatted label = discount_rate * 10
        expect(productLabel.text()).toContain('8.5')
    })
    test('should render discounted unit_price and class when discount_rate is not equal to 1', async () => {
        const wrapper = mount(ProductV2, {
            propsData: {
                // fake data
                product: {
                    id: 1,
                    title: 'product-1',
                    imgUrl: 'https://www.example.com/iamge/1.jpg',
                    unit_price: 888,
                    discount_rate: 0.85,
                    ratings: 5,
                },
            },
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                Tags: true, // fake component
                Ratings: true, // fake component
            },
            localVue,
            vuetify,
        })
        const productUnitPrice = wrapper.find('.product_unit_price')
        // discounted price = unit_price * discount_rate
        // 754 = 888 * 0.85
        expect(productUnitPrice.text()).toContain('754') //* discounted price
        expect(productUnitPrice.classes()).toContainEqual('blue--text') //* discounted class
    })

    test('should not render product_label when discount_rate is equal to 1', async () => {
        const wrapper = mount(ProductV2, {
            propsData: {
                // fake data
                product: {
                    id: 1,
                    title: 'product-1',
                    imgUrl: 'https://www.example.com/iamge/1.jpg',
                    unit_price: 888,
                    discount_rate: 1,
                    ratings: 5,
                },
            },
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                Tags: true, // fake component
                Ratings: true, // fake component
            },
            localVue,
            vuetify,
        })
        const productLabel = wrapper.find('.product_label')
        expect(productLabel.exists()).toBeFalsy()
    })
})
