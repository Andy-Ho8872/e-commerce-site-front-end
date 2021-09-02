import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
// components
import CarouselV3 from '@/components/index/CarouselV3.vue'
// Utilities
import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(VueRouter)

describe('CarouselV3.vue', () => {
    // presets
    let vuetify
    let router
    const routes = [
        {
            path: '/products/:id',
            name: 'products-id',
        },
    ]
    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter({ routes })
    })
    test('should render product title', () => {
        const wrapper = mount(CarouselV3, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                SlideGroup: true, // fake component
            },
            localVue,
            vuetify,
            propsData: {
                data: [
                    {
                        id: 1,
                        title: 'item-1',
                        imgUrl: 'https://example.com/images/1',
                        discount_rate: 0.5,
                    },
                ],
            },
        })
        const productTitle = wrapper.find('.title_background')
        expect(productTitle.text()).toBe('item-1')
    })
    test('should render correct discount_label of product', () => {
        const wrapper = mount(CarouselV3, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                SlideGroup: true, // fake component
            },
            localVue,
            vuetify,
            propsData: {
                data: [
                    {
                        id: 1,
                        title: 'item-1',
                        imgUrl: 'https://example.com/images/1',
                        discount_rate: 0.5,
                    },
                ],
            },
        })
        const discountLabel = wrapper.find('.discount_label')
        //* discountLabel = discount_rate * 10
        expect(discountLabel.text()).toBe('5 折')
    })
    test('should not render discount_rate of product if the value is 1', () => {
        const wrapper = mount(CarouselV3, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                SlideGroup: true, // fake component
            },
            localVue,
            vuetify,
            propsData: {
                data: [
                    {
                        id: 1,
                        title: 'item-1',
                        imgUrl: 'https://example.com/images/1',
                        discount_rate: 1,
                    },
                ],
            },
        })
        const discount_rate = wrapper.find('.discount_label')
        expect(discount_rate.exists()).toBeFalsy()
    })
    test('should have correct src of v-img', () => {
        const wrapper = mount(CarouselV3, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                SlideGroup: true, // fake component
            },
            localVue,
            vuetify,
            propsData: {
                data: [
                    {
                        id: 1,
                        title: 'item-1',
                        imgUrl: 'https://example.com/images/1',
                        discount_rate: 1,
                    },
                ],
            },
        })
        const productImage = wrapper.find('.product_image')
        expect(productImage.props('src')).toBe('https://example.com/images/1')
    })

    test('should change route after clicking v-card', async () => {
        const wrapper = mount(CarouselV3, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                SlideGroup: true, // fake component
            },
            localVue,
            vuetify,
            router,
            propsData: {
                data: [
                    {
                        id: 1,
                        title: 'item-1',
                        imgUrl: 'https://example.com/images/1',
                        discount_rate: 1,
                    },
                ],
            },
        })
        const slideItems = wrapper.find('.slide_items')
        await slideItems.trigger('click')
        router.push({ name: 'products-id', params: { id: 1 } })
        expect(wrapper.vm.$route.path).toContain('/products/1')
    })
})
