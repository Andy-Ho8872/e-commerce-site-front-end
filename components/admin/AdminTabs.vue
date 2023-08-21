<template>
    <v-container v-if="user">
        <v-card class="pa-4" rounded="lg">
            <div class="d-flex justify-center align-center text-center text-h6 font-weight-bold">商品管理頁面</div>
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
                    icon: 'fa-store',
                    title: '所有商品',
                    to: { name: 'admin-product' },
                    
                },
                {
                    icon: 'fa-tag',
                    title: '商品標籤',
                    to: { name: 'admin-tag-all' },
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