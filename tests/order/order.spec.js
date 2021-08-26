import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
// components
import DeleteDialog from '@/components/order/DeleteDialog.vue'
// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
// mock vuex modules
import order from '@/tests/__mocks__/store/order.js'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('DeleteDialog.vue', () => {
    // presets
    let vuetify
    let store
    beforeEach(() => {
        vuetify = new Vuetify()
        store = new Vuex.Store({
            modules: {
                order,
            },
        })
    })
    // tests
    test('should correctly render order id after clicking a dialog', async () => {
        const wrapper = mount(DeleteDialog, {
            attachTo: document.body, // 必須使用 attachTo 否則 vuetify 將報錯
            localVue,
            vuetify,
            store,
            propsData: {
                order: {
                    id: 25,
                    items: [
                        {
                            id: 1,
                            title: 'item-1',
                        },
                        {
                            id: 2,
                            title: 'item-22',
                        },
                    ],
                },
            },
        })
        await wrapper.setData({
            dialog: true
        })
        const orderId = wrapper.find('.order_id')
        expect(orderId.text()).toContain('25')
        //* 當使用 attachTo 時，在測試結束後必須使用 wrapper.destroy() 來消除從元件或 document 中渲染的元素
        wrapper.destroy()
    })
})
