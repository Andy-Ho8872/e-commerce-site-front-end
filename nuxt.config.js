import colors from 'vuetify/es5/util/colors'

export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        titleTemplate: '%s - OO購物',
        title: 'ShoppingSite-Clone',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            // Font-AwesomeIcon (CDN)
            {
                href: 'https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css',
                rel: 'stylesheet',
            },
            // 字型
            {
                rel: 'preconnect',
                rel: 'stylesheet',
                href: 'https://fonts.gstatic.com',
                href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,600;1,700&display=swap',
            },
        ],
    },

    // axios 全域設定 , 所有的 axios request 都會使用 baseURL
    // axios: {
    //   baseURL: 'http://localhost:8000/api', // 後端 URL
    //   credentials: true,
    //   withCredentials : true,
    //   common: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    // },

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: ['@nuxtjs/axios'],

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: ['~/plugins/axios.js'],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
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

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},
}
