import Vue from 'vue'
import Vuetify from 'vuetify'
// components
import Popups from '@/components/index/Popups.vue'
// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()

describe('Popups.vue', () => {
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify()
    })
    test('should have dismissible prop on v-alert', () => {
        const wrapper = mount(Popups, {
            localVue,
            vuetify,
        })
        const vAlert = wrapper.find('.v-alert')
        expect(vAlert.props(['dismissible'])).toBeTruthy()
    })
    test('should have default props data', () => {
        const wrapper = mount(Popups, {
            localVue,
            vuetify,
        })
        expect(wrapper.vm.type).toBe('info')
        expect(wrapper.vm.color).toBe('pink accent-2')
    })
})
