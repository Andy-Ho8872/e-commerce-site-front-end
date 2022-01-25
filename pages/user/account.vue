<template>
    <v-container>
        <!-- 已登入 -->
        <v-card class="pa-4" rounded="lg">
            <!-- 用戶編號 -->
            <v-card-subtitle class="font-weight-bold">
                用戶編號:
                <span class="black--text">
                    {{ user.id }}
                </span>
            </v-card-subtitle>
            <!-- 用戶帳號 -->
            <v-card-subtitle class="font-weight-bold">
                用戶帳號:
                <span class="black--text">
                    {{ user.email }}
                </span>
            </v-card-subtitle>
            <!-- 加入時間 -->
            <v-card-subtitle class="font-weight-bold">
                加入時間:
                <span class="black--text">
                    {{ $moment(user.created_at).format('LL') }}
                </span>
                <!-- Relative Time -->
                <span class="gray--text">
                    ({{ $moment(user.created_at).fromNow() }})
                </span>
            </v-card-subtitle>
            <!-- 個人檔案 -->
            <v-divider class="my-6"></v-divider>
            <v-card-subtitle class="font-weight-bold">
                個人檔案:  
                <ul class="user_profile">
                    <li>姓名: {{ user.name || defaultProfileText }}</li>
                    <li>電話: {{ user.phone || defaultProfileText }}</li>
                    <li>地址: {{ user.address || defaultProfileText }}</li>
                </ul>
                <!-- 更新檔案彈出視窗 -->
                <v-dialog v-model="updateDialog" max-width="600px">
                    <v-card>
                        <v-form ref="form" v-model="saveBtnValid">
                        <v-card-title class="font-weight-bold mb-4">新增 / 變更檔案</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-text-field 
                                        v-model="profile.name"
                                        placeholder="王小明"
                                        :rules="[rules.lettersOnly, rules.required]"
                                        outlined
                                        prepend-inner-icon="fa-id-badge" 
                                        label="姓名" 
                                        name="user_name" 
                                        :value="user.name || null">
                                    </v-text-field>
                                    <v-text-field 
                                        v-model="profile.phone"
                                        placeholder="0912345678"
                                        :rules="[rules.required, rules.numbersOnly]"
                                        maxlength="10"
                                        counter="10"
                                        outlined 
                                        prepend-inner-icon="fa-phone"
                                        label="電話" 
                                        name="user_phone" 
                                        :value="user.phone || null">
                                    </v-text-field>
                                    <v-text-field 
                                        v-model="profile.address"
                                        placeholder="OO市OO區OO路..."
                                        :rules="[rules.required]"
                                        outlined 
                                        prepend-inner-icon="fa-map-marker-alt"
                                        label="地址" 
                                        name="user_address" 
                                        :value="user.address || null">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        </v-form>
                        <!-- 按鈕操作 -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="updateDialog = false" color="error" outlined>取消</v-btn>
                            <v-btn @click="updateProfileAndSetDialog" color="primary" :disabled="!saveBtnValid" :loading="loading">儲存</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- 清空檔案彈出視窗 -->
                <v-dialog v-model="deleteDialog" max-width="600px">
                    <v-card>
                        <v-card-title class="font-weight-bold mb-4">清空檔案</v-card-title>
                        <v-card-text>即將清空您的個人檔案，是否繼續執行?</v-card-text>
                        <!-- 按鈕操作 -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="deleteDialog = false" color="error" outlined>取消</v-btn>
                            <v-btn @click="clearProfileAndSetDialog" color="primary" :loading="loading">確認</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- 按鈕操作 -->
                <v-card-actions>
                    <v-btn color="error" outlined :disabled="!deleteBtnValid" @click="deleteDialog = true">清空檔案</v-btn>
                    <v-btn color="primary" @click="updateDialog = true">變更檔案</v-btn>
                </v-card-actions>
            </v-card-subtitle>
            <!-- 登出 -->
            <v-divider class="my-6"></v-divider>
            <v-card-actions class="btn_container ma-4">
                <v-btn dark color="red lighten-1" @click="logout" :loading="loading">
                    <v-icon>fa-share fa-fw</v-icon>
                    <span>登出</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import userMixin from '~/mixins/userMixin'
import { mapActions, mapGetters } from 'vuex'

export default {
    head() {
        return {
            title: '個人資料',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '使用者的帳戶資料'
                }
            ]
        }
    },
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    mixins: [userMixin],
    data() {
        return {
            // 彈出視窗
            updateDialog: false,
            deleteDialog: false,
            // 按鈕是否禁用
            saveBtnValid: true,
            deleteBtnValid: false,
            // 個人資料預設文字
            defaultProfileText: "尚未填寫",
            // 個人資料欄位
            profile: {
                name: '',
                phone: '',
                address: ''
            },
            //* 欄位規則
            rules: {
                numbersOnly: value => {
                    const pattern = /^[\d ]*$/
                    return pattern.test(value) || '電話號碼只能有數字。'
                },
                lettersOnly: value => {
                    const pattern = /^\D*$/
                    return pattern.test(value) || '名字不能包含數字。'
                },
                required: value => !!value || '此欄位必填',
            }
        }
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout',
            updateUserProfile: 'auth/updateUserProfile',
            clearUserProfile: 'auth/clearUserProfile',
        }),
        //* 初始化使用者的輸入欄位預設值
        initUserProfileInputs() {
            if(this.user) {
                //* 若使用者沒有設定，則為 null 
                this.profile = {
                    name: this.user.name || null,
                    phone: this.user.phone || null,
                    address: this.user.address || null,
                }
            }
            return null
        },
        async updateProfileAndSetDialog() {
            await this.updateUserProfile(this.profile)
            this.checkIfProfileValueExists()
            //* 關閉 dialog
            this.updateDialog = false
        },
        async clearProfileAndSetDialog() {
            await this.clearUserProfile()
            await this.initUserProfileInputs()
            this.checkIfProfileValueExists()
            this.deleteDialog = false
        },
        checkIfProfileValueExists() {
            //* 欄位至少要有一個值，否則禁用按鈕 
            if(this.user.name || this.user.phone || this.user.address) {
                this.saveBtnValid = true
            } 
            if(this.profile.name || this.profile.phone || this.address) {
                this.saveBtnValid = true
                this.deleteBtnValid = true
            }
            else {
                this.saveBtnValid = false
                this.deleteBtnValid = false
            }
        }
    },
    computed: {
        ...mapGetters({
            loading: 'auth/getLoading'
        })
    },
    mounted() {
        this.initUserProfileInputs()
        this.checkIfProfileValueExists()
    }
}
</script>

<style lang="scss" scoped>
li {
    list-style: none;
    margin: 12px 0;
}
    .btn_container {
        text-align: start;
    }
    @media (max-width: 768px) {
        .btn_container {
            text-align: center;
        }
    }
</style>
