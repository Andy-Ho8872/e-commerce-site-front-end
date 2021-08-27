import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// components
import AutoComplete from '@/components/search/AutoComplete.vue'
// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
// mock vuex modules
import search from '@/tests/__mocks__/store/search.js'
// mock api calls and data
import { mockAutoComplete } from '@/tests/__mocks__/APIs/api.js'
import mockAxios from 'axios'
jest.mock('axios')
mockAxios.get.mockResolvedValue({
    data: {
        item: {
            id: 13,
            title: 'auto-complete-1',
        },
    },
})
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('AutoComplete.vue', () => {
    // presets
    let vuetify
    let store
    let router
    beforeEach(() => {
        vuetify = new Vuetify()
        store = new Vuex.Store({
            modules: {
                search,
            },
        })
        router = new VueRouter({})
    })
    // tests
    test('should have default no_result_text', async () => {
        const wrapper = mount(AutoComplete, {
            localVue,
            vuetify,
            store,
        })
        const noResultText = wrapper.vm.no_result_text
        expect(noResultText).toBe('找不到相關的結果')
    })
    test('should correctly receive user input', async () => {
        const wrapper = mount(AutoComplete, {
            localVue,
            vuetify,
            store,
        })
        const textField = wrapper.find('#search')
        await wrapper.setData({ searchText: '3C' })
        expect(textField.element.value).toBe('3C')
    })
    test('should not render autoComplete result when input field is empty', async () => {
        const wrapper = mount(AutoComplete, {
            localVue,
            vuetify,
            store,
        })
        const autoCompleteWrapper = wrapper.find('.auto_complete')
        expect(autoCompleteWrapper.isVisible()).toBeFalsy()
    })
    test('should render autoComplete result when receive a input value', async () => {
        const wrapper = mount(AutoComplete, {
            localVue,
            vuetify,
            store,
        })
        const autoCompleteResult = wrapper.find('.auto_complete__result')
        await wrapper.setData({ searchText: '高品質相機' })
        expect(autoCompleteResult.text()).toContain('高品質相機')
    })
    test('fetch autoComplete action should be called with SET_AUTO_COMPLETE_ITEMS mutation', async () => {
        const wrapper = mount(AutoComplete, {
            localVue,
            vuetify,
            store,
        })
        const commit = jest.fn()
        await search.actions.fetchAutoComplete({ commit })
        const fakeItems = [
            {
                id: 1,
                title: '高品質相機',
                imgUrl: 'https:example.com/image/1',
            },
        ]
        expect(commit).toHaveBeenCalledWith("SET_AUTO_COMPLETE_ITEMS", fakeItems)
    })
    test('SET_AUTO_COMPLETE_ITEMS mutation should change state', async () => {
        const wrapper = mount(AutoComplete, {
            localVue,
            vuetify,
            store,
        })
        const state = {
            autoCompleteItems: []
        }
        const fakeItems = [
            {
                id: 1,
                title: '精緻服裝',
                imgUrl: 'https:example.com/image/2',
            },
        ]
        await search.mutations.SET_AUTO_COMPLETE_ITEMS(state, fakeItems)
        expect(state.autoCompleteItems).toBe(fakeItems)
    })
    test('RESET_COMPLETE_ITEMS mutation should clear state of autoCompleteItems', async () => {
        const wrapper = mount(AutoComplete, {
            localVue,
            vuetify,
            store,
        })
        const state = {
            autoCompleteItems: [
                {
                    id: 1,
                    title: '高品質相機',
                    imgUrl: 'https:example.com/image/1',
                },
            ],
        }
    
        await search.mutations.RESET_AUTO_COMPLETE_ITEMS(state)
        // 陣列應被清空
        expect(state.autoCompleteItems).toHaveLength(0)
    })
})
