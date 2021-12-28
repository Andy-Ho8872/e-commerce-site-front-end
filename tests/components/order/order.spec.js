import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
// components
import DeleteDialog from '@/components/order/DeleteDialog.vue'
// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
// mock vuex modules
import order from '@/tests/__mocks__/store/order.js'
// mock api calls and data
import { mockApiDeleteSingleOrder } from '@/tests/__mocks__/APIs/api.js'
import mockAxios from 'axios'
jest.mock('axios')
mockAxios.delete.mockResolvedValue({
    data: {
        order: {
            id: 1,
            items: [
                {
                    id: 2,
                    title: "test item"
                }
            ]
        }
    },
})
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
//* 必須使用此函式，否則 vuetify 會有 console.warn 的錯誤訊息 
const addElemWithDataAppToBody = () => {
    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.append(app);
}

describe('DeleteDialog.vue', () => {
    // presets
    let vuetify
    let store
    addElemWithDataAppToBody()
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
                            pivot: {
                                product_id: 1
                            }
                        },
                        {
                            id: 2,
                            title: 'item-22',
                            pivot: {
                                product_id: 2
                            }
                        },
                    ],
                },
            },
        })
        await wrapper.setData({
            dialog: true //* 打開 Dialog 文字框
        })
        const orderId = wrapper.find('.order_id')
        expect(orderId.text()).toContain('25')
    })
    test('should correctly trigger api call and vuex mutation', async () => {
        const wrapper = mount(DeleteDialog, {
            localVue,
            vuetify,
            store,
            propsData: {
                order: {
                    id: 1,
                    items: [
                        {
                            id: 2,
                            title: "test item",
                            pivot: {
                                product_id: 1
                            }
                        }
                    ]
                }
            },
        })
        await wrapper.setData({
            dialog: true
        })
        const deleteBtn = wrapper.find('.delete_btn')
        await deleteBtn.trigger('click')
        // vuex modules
        const commit = jest.fn()
        await order.actions.deleteSingleOrder({ commit })
        expect(commit).toHaveBeenCalledWith("REMOVE_SINGLE_ORDER")
        // api call
        const result = await mockApiDeleteSingleOrder(wrapper.vm.order.id)
        expect(result.order.id).toBe(1)
        expect(mockAxios.delete).toHaveBeenCalledTimes(1)
    })
})
