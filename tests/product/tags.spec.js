import Vue from 'vue'
import Vuetify from 'vuetify'
// components
import Tags from '@/components/product/Tags.vue'
// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()

describe('Tags.vue', () => {
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify()
    })
    test('should render tag name', () => {
        const wrapper = mount(Tags, {
            localVue,
            vuetify,
            propsData: {
                product: {
                    tags: [
                        {
                            id: 1,
                            title: '3C'
                        },
                    ]
                }
            }
        })
        const tagTitle = wrapper.find('span')
        expect(tagTitle.text()).toBe('3C')
    })
})
