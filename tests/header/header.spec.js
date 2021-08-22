import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// components
import Header from '@/components/header/Header.vue'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// mock vuex modules
import auth from '@/store/__mocks__/auth.js'
import cart from '@/store/__mocks__/cart.js'
import notification from '@/store/__mocks__/notification.js'
// mock api calls
import { mockApiGetUserInfo } from '@/APIs/__mocks__/mockAPI.js'
import mockAxios from 'axios'
// mock api data
jest.mock('axios')
mockAxios.get.mockResolvedValue({ data: { name: 'Tommy' } })
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Header.vue', () => {
    // presets
    let vuetify
    let router
    let store
    const routes = [
        {
            path: '/auth/login',
            name: 'auth-login',
        },
    ]
    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter({ routes })
        store = new Vuex.Store({
            modules: {
                auth,
                cart,
                notification,
            },
        })
    })
    afterEach(jest.clearAllMocks)
    // tests
    test('vuex actions should be called once', async () => {
        const wrapper = mount(Header, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                MiniNotification: true, // fake component
                AutoComplete: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        // 找出有 logout function 的DOM
        const logoutBtn = wrapper.findAll('li')
        // logout function
        const logout = auth.actions.logout
        // 點擊以觸發
        await logoutBtn.trigger('click')
        // 觸發完成
        expect(logout).toBeCalled()
    })
    test('login route should be pushed correctly after triggering a click event', async () => {
        const wrapper = mount(Header, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                MiniNotification: true, // fake component
                AutoComplete: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        // 找出有切換路由功能的 DOM
        const loginButton = wrapper.findAll('li')
        // 等待點擊事件觸發
        await loginButton.trigger('click')
        // 觸發後切換路由
        router.push({ name: 'auth-login' })
        // APP 網址應該包含該路由的路徑
        expect(wrapper.vm.$route.path).toContain('auth/login')
    })
    test('axios get should return a name of user', async () => {
        const wrapper = mount(Header, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                MiniNotification: true, // fake component
                AutoComplete: true, // fake component
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const result = await mockApiGetUserInfo()
        expect(result.name).toBe('Tommy')
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
    })
})