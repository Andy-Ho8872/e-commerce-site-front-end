import colors from 'vuetify/es5/util/colors'

export default {
    //* Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        titleTemplate: '%s - OO購物',
        title: 'ShoppingSite-Clone',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            //* Font-AwesomeIcon (CDN)
            {
                rel: 'stylesheet',
                href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
                //! 舊版本，暫不使用 href: 'https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css',
            },
            //* 字型
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,600;1,700&display=swap',
            },
        ],
    },

    modules: ['@nuxtjs/axios'],

    css: ['@/assets/css/main.css', '@/assets/css/main.scss'],

    env: {
        apiUrl: process.env.API_URL || 'http://localhost:8000/api/v1'
    },

    components: true,

    buildModules: [
        '@nuxtjs/vuetify',
    ],

    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    build: {},

    //* transition
    pageTransition: {
        name: 'page',
        mode: 'out-in',
    },
}
