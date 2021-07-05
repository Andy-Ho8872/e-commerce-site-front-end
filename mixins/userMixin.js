//* 使用在 page/user.vue , pages/user/account.vue
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            //* 使用者的資料
            user: 'auth/getUserInfo',
        }),
    },
}