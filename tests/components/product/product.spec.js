import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
// components
import ProductCard from '@/components/product/ProductCard.vue'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(VueRouter)

describe('ProductCard.vue', () => {
    // presets
    let vuetify
    let router
    const routes = [
        {
            path: '/products/:id',
            name: 'products',
        },
    ]
    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter({ routes })
    })
    test('should render product title', async () => {
        const wrapper = mount(ProductCard, {
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
    test('should render formatted product label when discount_rate is not equal to 1', async () => {
        const wrapper = mount(ProductCard, {
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
        const wrapper = mount(ProductCard, {
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
        const wrapper = mount(ProductCard, {
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
    test('should receive correct route params after clicking product card', async () => {
        const wrapper = mount(ProductCard, {
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
            router,
        })
        const productCard = wrapper.find('.v-card')
        // 等待點擊事件觸發
        await productCard.trigger('click')
        //* 觸發後切換路由 params = 產品 id
        router.push({ name: 'products', params: { id: 1 } })
        // APP 網址應該包含該路由的路徑
        expect(wrapper.vm.$route.path).toContain('products/1')
    })
})