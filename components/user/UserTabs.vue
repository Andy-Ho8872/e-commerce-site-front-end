<template>
    <v-container v-if="user">
        <v-card class="pa-4" rounded="lg">
            <div class="d-flex justify-center align-center text-center text-h6 font-weight-bold">歡迎回來 {{ user.name || user.email }}</div>
            <!-- tabs -->
            <v-tabs centered v-model="tab">
                <v-tab v-for="(item, index) in items" :key="index" :to="item.to" nuxt>
                    <v-icon>{{ item.icon }}</v-icon>
                    <span>{{ item.title }}</span>
                </v-tab>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            tab: null,
            items: [
                {
                    icon: 'fa-address-book fa-fw',
                    title: '個人資料',
                    to: { name: 'user-account' },
                    
                },
                {
                    icon: 'fa-list-alt fa-fw',
                    title: '我的訂單',
                    to: { name: 'user-order' },
                },
                {
                    icon: 'fa-bell fa-fw',
                    title: '通知總覽',
                    to: { name: 'user-notification' },
                },
            ],
        }
    },
    computed: {
        ...mapGetters({
            //* 使用者的資料
            user: 'auth/getUserInfo',
        }),
    },
}
</script>