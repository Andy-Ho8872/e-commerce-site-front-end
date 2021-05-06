//* 
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            //* 使用者的資料
            user: 'auth/getUserInfo',
        }),
    },
}