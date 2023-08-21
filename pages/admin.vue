<template>
    <v-container>
            <!-- loading -->
            <LoadingCircle v-if="!user"/>
            <div v-else>
                <AdminTabs />
                <nuxt-child />
            </div>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    middleware: ['authenticated', 'admin'], //* 要先通過驗證才能訪問此頁面
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUserInfo',
        }),
    },
}
</script>

<style></style>
