import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
// components
import AlertMessage from '@/components/global/AlertMessage.vue'
// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
// mock vuex modules
import globalMessage from '@/tests/__mocks__/store/globalMessage.js'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
// Tests
describe('AlertMessage.vue', () => {
    // presets
    let vuetify
    let store
    beforeEach(() => {
        vuetify = new Vuetify()
        store = new Vuex.Store({
            modules: {
                globalMessage,
            },
        })
    })
    // tests
    test('v-alert should exist when data is not empty', async () => {
        const wrapper = mount(AlertMessage, {
            localVue,
            vuetify,
            store,
        })
        const messageText = wrapper.find('.v-alert')
        expect(messageText.exists()).toBeTruthy()
    })
    test('should render message and receive correct props of type', async () => {
        const wrapper = mount(AlertMessage, {
            localVue,
            vuetify,
            store,
        })
        const messageText = wrapper.find('.v-alert')
        expect(messageText.text()).toBe('Welcome here')
        expect(messageText.props('type')).toBe('success')
    })
    test('SET_MESSAGE mutation should correctly set the state of message', async () => {
        const wrapper = mount(AlertMessage, {
            localVue,
            vuetify,
            store,
        })
        const state = {
            type: 'warning',
            text: 'normal warning',
        }
        const message = {
            type: 'danger',
            text: 'An error happened',
        }
        await globalMessage.mutations.SET_MESSAGE(state, message)
        expect(state.message.type).toBe('danger')
        expect(state.message.text).toBe('An error happened')
    })
    test('setFlashMessage action should be called with SET_MESSAGE mutation', async () => {
        const wrapper = mount(AlertMessage, {
            localVue,
            vuetify,
            store,
        })
        const commit = jest.fn()
        const message = {
            type: 'danger',
            text: 'An error happened',
        }
        await globalMessage.actions.setFlashMessage({ commit }, message)
        expect(commit).toBeCalledWith('SET_MESSAGE', message)
    })
})
