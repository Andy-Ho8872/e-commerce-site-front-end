import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// components
import Header from '@/components/header/Header.vue'
// Utilities
import { createLocalVue, RouterLinkStub, shallowMount } from '@vue/test-utils'
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
    let router
    let store
    beforeEach(() => {
        router = new VueRouter()
        store = new Vuex.Store({
            modules: {
                auth,
                cart,
                notification
            },
        })
    })

    test('vuex actions should be called once', async () => {
        const wrapper = shallowMount(Header, {
            localVue,
            store,
            router,
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                MiniNotification: true, // fake component
                AutoComplete: true, // fake component
            },
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
})
