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
                <!-- 彈出視窗 -->
                <v-dialog v-model="dialog" max-width="600px">
                    <v-card>
                        <v-card-title class="font-weight-bold mb-4">新增 / 變更檔案</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-text-field 
                                        v-model="profile.name"
                                        outlined
                                        prepend-inner-icon="fa-id-badge" 
                                        label="姓名" 
                                        name="user_name" 
                                        :value="user.name || null">
                                    </v-text-field>
                                    <v-text-field 
                                        v-model="profile.phone"
                                        outlined 
                                        prepend-inner-icon="fa-phone"
                                        label="電話" 
                                        name="user_phone" 
                                        :value="user.phone || null">
                                    </v-text-field>
                                    <v-text-field 
                                        v-model="profile.address"
                                        outlined 
                                        prepend-inner-icon="fa-map-marker-alt"
                                        label="地址" 
                                        name="user_address" 
                                        :value="user.address || null">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <!-- 按鈕操作 -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="dialog = false" color="error" text>取消</v-btn>
                            <v-btn @click="updateUserProfile(profile)" color="primary" :loading="loading">儲存</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- 按鈕操作 -->
                <v-card-actions>
                    <v-btn color="error" outlined>刪除檔案</v-btn>
                    <v-btn color="primary" @click="dialog = true">變更檔案</v-btn>
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
            dialog: false,
            defaultProfileText: "尚未填寫",
            // 個人資料欄位
            profile: {
                name: '',
                phone: '',
                address: ''
            }
        }
    },
    methods: {
        ...mapActions(({
            logout: 'auth/logout',
            updateUserProfile: 'auth/updateUserProfile',
        }))
    },
    computed: {
        ...mapGetters({
            loading: 'auth/getLoading'
        })
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
