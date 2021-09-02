import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// components
import MiniNotification from '@/components/notification/MiniNotification.vue'
// Utilities
import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
// mock vuex modules
import notification from '@/tests/__mocks__/store/notification.js'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('MiniNotification.vue', () => {
    // presets
    let vuetify
    let store
    let router
    const routes = [
        {
            path: '/user/notification',
            name: 'user-notification',
        },
    ]
    beforeEach(() => {
        vuetify = new Vuetify()
        store = new Vuex.Store({
            modules: {
                notification,
            },
        })
        router = new VueRouter({ routes })
    })
    test('should not render EmptyNotification Component when unReadNotifications exist', async () => {
        const wrapper = mount(MiniNotification, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                EmptyNotification: true, // fake component
            },
            localVue,
            vuetify,
            store,
        })
        const emptyNotification = wrapper.find('.empty_notification')
        expect(emptyNotification.exists()).toBeFalsy()
    })
    test('should change route after clicking a nuxt-link', async () => {
        const wrapper = mount(MiniNotification, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
                EmptyNotification: true, // fake component
            },
            localVue,
            vuetify,
            store,
            router,
        })
        const notificationLink = wrapper.find('.user_notification_link')
        notificationLink.trigger('click')
        await router.push({ name: 'user-notification' })
        expect(wrapper.vm.$route.path).toContain('user/notification')
    })
})