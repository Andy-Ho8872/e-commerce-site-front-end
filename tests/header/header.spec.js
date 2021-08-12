import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// components
import Header from '@/components/header/Header.vue'
import MiniNotification from '@/components/notification/MiniNotification.vue'
import AutoComplete from '@/components/search/AutoComplete.vue'
// Utilities
import { createLocalVue, RouterLinkStub, shallowMount } from '@vue/test-utils'
// use packages
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueRouter)

describe('Header.vue', () => {
    const localVue = createLocalVue()
    let router
    let store
    beforeEach(() => {
        router = new VueRouter()
        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    state: () => ({
                        token: 'test token',
                        user: {
                            id: 1,
                            name: 'Tommy',
                        },
                    }),
                    getters: {
                        getToken(state) {
                            return state.token
                        },
                        getUserInfo(state) {
                            return state.user
                        },
                    },
                    mutations: {
                        SET_TOKEN(state) {
                            state.token = 'Bearer token'
                        },
                    },
                    actions: {
                        fetchRequiredData() {
                            console.log('fake data fetched')
                        },
                    },
                },
                cart: {
                    namespaced: true,
                    state: () => ({
                        userCart: [
                            {
                                id: 1,
                                name: '3C',
                                quantity: 1,
                            },
                            {
                                id: 2,
                                name: '服裝',
                                quantity: 1,
                            },
                        ],
                    }),
                    getters: {
                        getUserCart(state) {
                            return state.userCart
                        },
                    },
                },
                notification: {
                    namespaced: true,
                    state: () => ({
                        unReadNotifications: [
                            {
                                id: 1,
                                text: 'fake notification-1',
                            },
                            {
                                id: 2,
                                text: 'fake notification-2',
                            },
                        ],
                    }),
                    getters: {
                        getUnreadNotifications(state) {
                            return state.unReadNotifications
                        },
                    },
                },
            },
        })
    })
    test('should change route correctly', () => {
        const wrapper = shallowMount(Header, {
            localVue,
            store,
            router,
            NuxtLink: RouterLinkStub,
            stubs: ['nuxt-link', 'MiniNotification.vue', 'AutoComplete.vue'],
            components: {
                'MiniNotification': MiniNotification,
                'AutoComplete': AutoComplete
            }
        })
        expect(wrapper.findComponent(Header).exists()).toBeTruthy()
    })
})
