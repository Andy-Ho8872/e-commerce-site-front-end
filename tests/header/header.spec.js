import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// components
import Header from '@/components/header/Header.vue'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// vuex modules
import auth from '@/store/__mocks__/auth.js'
import cart from '@/store/__mocks__/cart.js'
import notification from '@/store/__mocks__/notification.js'
// use packages
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Header.vue', () => {
    // presets
    const routes = [
        {
            path: '/auth/login',
            name: 'auth-login',
        },
    ]
    const vuetify = new Vuetify()
    const router = new VueRouter({ routes })
    const store = new Vuex.Store({
        modules: {
            auth,
            cart,
            notification,
        },
    })
    // 初始化元件的狀態
    const initSetup = () => {
        return mount(Header, {
            localVue,
            vuetify,
            store,
            router,
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                MiniNotification: true, // fake component
                AutoComplete: true, // fake component
            },
        })
    }
    // tests
    test('vuex actions should be called once', async () => {
        const wrapper = initSetup()
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
        const wrapper = initSetup()
        // 找出有切換路由功能的 DOM
        const loginButton = wrapper.findAll('li')
        // 等待點擊事件觸發
        await loginButton.trigger('click')
        // 觸發後切換路由
        router.push({ name: 'auth-login' })
        // APP 網址應該包含該路由的路徑
        expect(wrapper.vm.$route.path).toContain('auth/login')
    })
})
