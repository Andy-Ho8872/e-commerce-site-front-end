<template>
<!-- 第三方登入跳轉頁 -->
    <v-container>
        <div>執行第三方登入中...</div>
        <LoadingCircle />
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            token: this.$route.query.token || null,
            errorCode: this.$route.query.errorCode || null,
            errorMessage: this.$route.query.errorMessage || null
        }
    },
    methods: {
        ...mapActions({
            fetchRequiredData: 'auth/fetchRequiredData',
            setFlashMessage: 'globalMessage/setFlashMessage'
        })
    },
    async mounted() {
        if(this.token) {
            await localStorage.setItem('Token', `Bearer ${this.token}`)
            this.fetchRequiredData()
            this.$router.push({ name: 'index' })
        }
        if(this.errorCode) {
            await this.$router.push({ name: 'auth-login' })
            const message = {
                type: 'error',
                text: this.errorMessage
            }
            this.setFlashMessage(message)
        }
    }
}
</script>

<style>

</style>