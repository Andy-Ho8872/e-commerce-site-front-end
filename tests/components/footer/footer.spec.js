import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
// components
import Footer from '@/components/footer/Footer.vue'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(VueRouter)

describe('Footer.vue', () => {
    // presets
    let vuetify
    let router
    const routes = [
        {
            name: 'user-account',
            path: '/user/account',
        },
        {
            name: 'user-order',
            path: '/user/order',
        },
        {
            name: 'user-notification',
            path: '/user/notification',
        },
    ]
    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter({ routes })
    })
    // tests
    test('social links should have correct value', () => {
        const wrapper = mount(Footer, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
        })
        const socialLinks = wrapper.findAll('.social_links > div > li > a')
        expect(socialLinks.at(0).element.href).toBe('https://github.com/Andy-Ho8872')
        expect(socialLinks.at(1).element.href).toBe('https://twitter.com/home?lang=zh-tw')
        expect(socialLinks.at(2).element.href).toBe('https://www.facebook.com/profile.php?id=100002704069788')
        expect(socialLinks.at(3).element.href).toBe('https://www.instagram.com/andy_ho8872/')
    })
    test('href links should have target property', () => {
        const wrapper = mount(Footer, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
        })
        const socialLinks = wrapper.findAll('.social_links > div > li > a')
        expect(socialLinks.at(0).element.target).toBe('_blank')
        expect(socialLinks.at(1).element.target).toBe('_blank')
        expect(socialLinks.at(2).element.target).toBe('_blank')
        expect(socialLinks.at(3).element.target).toBe('_blank')
    })
    test('account links should change route correctly', async () => {
        const wrapper = mount(Footer, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
        })
        await router.push({ name: 'user-account' })
        expect(wrapper.vm.$route.path).toContain('/user/account')
        await router.push({ name: 'user-order' })
        expect(wrapper.vm.$route.path).toContain('/user/order')
        await router.push({ name: 'user-notification' })
        expect(wrapper.vm.$route.path).toContain('/user/notification')
    })
})
