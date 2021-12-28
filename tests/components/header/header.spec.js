import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// components
import Header from '@/components/header/Header.vue'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// mock vuex modules
import auth from '@/tests/__mocks__/store/auth.js'
import cart from '@/tests/__mocks__/store/cart.js'
import notification from '@/tests/__mocks__/store/notification.js'
// mock api calls and data
import { mockApiGetUserInfo } from '@/tests/__mocks__/APIs/api.js'
import mockAxios from 'axios'
jest.mock('axios')
mockAxios.get.mockResolvedValue({
    data: {
        user: {
            name: 'Tommy',
            email: 'Tommy@example.com',
        },
    },
})
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
        const userTitle = wrapper.find('.user_title')
        // 找出有 logout function 的DOM
        const logoutBtn = wrapper.find('.logout_btn')
        // mock function
        const logout = auth.actions.logout
        // 點擊以觸發
        await logoutBtn.trigger('click')
        await wrapper.setData({
            user: {
                name: '',
                email: '',
            }
        })
        // 應被觸發一次
        expect(logout).toBeCalled()
        // 不應該渲染出使用者的 email 或 名字
        expect(userTitle.text()).toBe('')
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
    test('axios get should return a email of user', async () => {
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
        expect(result.user.email).toBe('Tommy@example.com')
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
    })
    test('should render user Email after fetching API data', async () => {
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
        await wrapper.setData({
            user: {
                name: result.user.name,
                email: result.user.email,
            },
        })
        const userTitle = wrapper.find('.user_title')
        expect(userTitle.text()).toBe('Tommy')
    })
    test('should toggle active status when clicking extend_bar', async () => {
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
        //* 初始為 false
        const extendBar = wrapper.find('.extend_bar')
        expect(wrapper.vm.active).toBeFalsy()
        //* 點擊後 active 應為 true
        await extendBar.trigger('click') // 切換 active 狀態
        expect(wrapper.vm.active).toBeTruthy()
        //* 點擊後 active 應為 false
        await extendBar.trigger('click')
        expect(wrapper.vm.active).toBeFalsy()
    })
})
