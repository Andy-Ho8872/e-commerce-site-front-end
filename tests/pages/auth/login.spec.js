import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// mixins
import authMixin from '@/mixins/authMixin'
// pages
import login from '@/pages/auth/login.vue'
// Utilities
import { createLocalVue, RouterLinkStub, mount } from '@vue/test-utils'
// mock vuex modules
import auth from '@/tests/__mocks__/store/auth.js'
import { expect } from '@jest/globals'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
// use mixin
localVue.use(authMixin)

describe('login.vue', () => {
    // presets
    let vuetify
    let router
    let store
    const routes = [
        {
            path: '/auth/register',
            name: 'auth-register',
        },
    ]
    beforeEach(() => {
        vuetify = new Vuetify()
        router = new VueRouter({ routes })
        store = new Vuex.Store({
            modules: {
                auth,
            },
        })
    })
    // tests
    test('The data of authMixin of show should be false by default', () => {
        const wrapper = mount(login, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        expect(wrapper.vm.show).toBeFalsy()
    })
    test('The text-field of password of type should be "password" by default', () => {
        const wrapper = mount(login, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const passwordField = wrapper.find('.input_password')
        expect(passwordField.props('type')).toBe('password')
    })
    test('The text-field of password of type should be "text" when show variable is true', async () => {
        const wrapper = mount(login, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        await wrapper.setData({
            show: true
        })
        const passwordField = wrapper.find('.input_password')
        expect(passwordField.props('type')).toBe('text')
    })
    test('submit button should have disabled prop by default', async () => {
        const wrapper = mount(login, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        const submitBtn = wrapper.find('.submit_btn')
        expect(submitBtn.props('disabled')).toBeTruthy()
    })
    test('submit button should not have disabled prop when form is validated', async () => {
        const wrapper = mount(login, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        // 送出按鈕
        const submitBtn = wrapper.find('.submit_btn')
        // 資料欄位
        const eMailField = wrapper.find('.input_email')
        const passwordField = wrapper.find('.input_password')
        // 觸發 input 事件
        await eMailField.trigger('input')
        await passwordField.trigger('input')
        // 設置假資料(合法資料)
        eMailField.element.value = 'helloWorld@gmail.com'
        passwordField.element.value = '12345678'
        await wrapper.setData({
            form: {
                email: eMailField.element.value,
                password: passwordField.element.value,
            },
            valid: true
        })
        // 按鈕應可以作用
        expect(submitBtn.props('disabled')).not.toBeTruthy()
    })
    test('should render error messages correctly', async () => {
        const wrapper = mount(login, {
            stubs: {
                NuxtLink: RouterLinkStub, // fake router
            },
            localVue,
            vuetify,
            router,
            store,
        })
        // 最多只有 email 與 password 兩種錯誤
        const errorMessages = wrapper.findAll('.v-alert')
        expect(errorMessages.at(0).text()).toBe('必須是 E-MAIL 格式!')
        expect(errorMessages.at(1).text()).toBe('密碼只能填入英文或數字!!!')
    })
})
