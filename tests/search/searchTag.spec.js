import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// components
import SearchTag from '@/components/search/SearchTag.vue'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// mock vuex modules
import product from '@/tests/__mocks__/store/product.js'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('SearchTag.vue', () => {
    // presets
    let vuetify
    let router
    let store
    const routes = [
        {
            name: 'search-title-pagination-pageNumber',
            path: '/products/search/:title/pagination/:pageNumber',
        },
    ]
    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter({ routes })
        store = new Vuex.Store({
            modules: {
                product
            },
        })
    })
    // tests
    test('should render tag title', async () => {
        const wrapper = mount(SearchTag, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const tagTitle = wrapper.find('.product_tag_title')
        expect(tagTitle.text()).toBe('3C')
    })
    test('should change route after clicking a product tag', async () => {
        const wrapper = mount(SearchTag, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const tagTitle = wrapper.find('.product_tag_title')
        await tagTitle.trigger('click')
        router.push({
            name: 'search-title-pagination-pageNumber',
            params: {
                title: tagTitle.text(),
                pageNumber: 1,
            },
        })
        const routePath = wrapper.vm.$route.path
        expect(routePath).toContain('/products/search')
    })
})