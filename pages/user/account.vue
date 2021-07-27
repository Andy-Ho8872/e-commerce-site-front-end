<template>
    <v-container>
        <!-- 已登入 -->
        <v-card class="pa-4" rounded="lg">
            <div class="btn_container ma-4">
                <v-btn dark color="red lighten-1" @click="logout" :loading="loading">
                    <v-icon>fa-share fa-fw</v-icon>
                    <span>登出</span>
                </v-btn>
            </div>
            <!-- 用戶編號 -->
            <v-card-subtitle>
                用戶編號:
                <span class="font-weight-bold black--text">
                    {{ user.id }}
                </span>
            </v-card-subtitle>
            <!-- 用戶帳號 -->
            <v-card-subtitle>
                用戶帳號:
                <span class="font-weight-bold black--text">
                    {{ user.email }}
                </span>
            </v-card-subtitle>
            <!-- 加入時間 -->
            <v-card-subtitle>
                加入時間:
                <span class="font-weight-bold black--text">
                    {{ $moment(user.created_at).format('LL') }}
                </span>
                <!-- Relative Time -->
                <span class="font-weight-bold gray--text">
                    ({{ $moment(user.created_at).fromNow() }})
                </span>
            </v-card-subtitle>
        </v-card>
    </v-container>
</template>

<script>
import userMixin from '~/mixins/userMixin'
import { mapActions, mapGetters } from 'vuex'

export default {
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    mixins: [userMixin],
    methods: {
        ...mapActions(({
            logout: 'auth/logout',
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
    .btn_container {
        text-align: start;
    }
    @media (max-width: 768px) {
        .btn_container {
            text-align: center;
        }
    }
</style>
