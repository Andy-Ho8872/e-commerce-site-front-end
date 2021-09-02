import Vue from 'vue'
import Vuetify from 'vuetify'
// components
import Ratings from '@/components/product/Ratings.vue'
// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
// use packages or library
Vue.use(Vuetify)
const localVue = createLocalVue()

describe('Ratings.vue', () => {
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify()
    })
    test('should render 5 stars', () => {
        const wrapper = mount(Ratings, {
            localVue,
            vuetify,
            propsData: {
                product: {
                    rating: 5
                }
            }
        })
        const rating = wrapper.find('span')
        expect(wrapper.vm.product.rating).toBe(5)
        expect(rating.text()).toContain('5')
    })
    test('should have readonly property', () => {
        const wrapper = mount(Ratings, {
            localVue,
            vuetify,
            propsData: {
                product: {
                    rating: 5
                }
            }
        })
        const rating = wrapper.find('.product_rating')
        expect(rating.props('readonly')).toBeTruthy()
    })
})