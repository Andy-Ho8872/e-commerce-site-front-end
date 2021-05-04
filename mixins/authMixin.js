//* 使用在 pages/auth/register.vue 和 pages/auth/login.vue
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            //* 表單中的值
            form: {
                email: '',
                password: '',
            },
            //* 表單驗證規則
            valid: null, //* 是否合格
            show: false, //* 顯示 or 不顯示 密碼
            rules: {
                required: value => !!value || '此欄位必填',
                min: value => value.length >= 6 || '至少需要6個英文或數字',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || '範例 : abc123@gmail.com'
                },
            },
        }
    },
    computed: {
        ...mapGetters({
            //* 錯誤訊息
            message: 'auth/getMessage',
            //* loading 狀態
            loading: 'auth/getLoading'
        }),
    },
    methods: {
        ...mapActions({
            //* 確認使用者是否已經登入
            checkIfUserHasLoggedIn: 'auth/checkIfUserHasLoggedIn'
        })
    }
}
