import Vue from 'vue'
import Vuetify from 'vuetify'
// components
import Banner from '@/components/global/Banner.vue'
// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
// use packages
Vue.use(Vuetify)
// Tests
describe('Banner.vue', () => {
    const localVue = createLocalVue()
    let vuetify
    // presets
    beforeEach(() => {
        vuetify = new Vuetify()
    })
    // sections
    test('should have a default banner text', () => {
        const wrapper = mount(Banner, {
            localVue,
            vuetify, // 在這個 wrapper 內使用 vuetify
        })
        expect(wrapper.props('text')).toBe("Banner Text")
    })
    test('should have a default icon', () => {
        const wrapper = mount(Banner, {
            localVue,
            vuetify,
        }) 
        expect(wrapper.props('icon')).toBe("fa-icons")
    })
})
